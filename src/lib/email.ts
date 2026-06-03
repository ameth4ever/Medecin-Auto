import nodemailer from 'nodemailer'
import { siteConfig } from '@/config/site'
import { sanitize } from './api-validation'

type EmailData = Record<string, string | undefined>

function buildEmailHtml(data: EmailData, formLabel: string): string {
  const safeLabel = sanitize(formLabel)
  const rows = Object.entries(data)
    .filter(([, v]) => v)
    .map(
      ([key, value]) =>
        `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:600;color:#333;white-space:nowrap">${sanitize(key)}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#555">${sanitize(value || '')}</td></tr>`
    )
    .join('')

  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#0F172A;padding:24px;text-align:center">
        <h1 style="color:#0EA5E9;margin:0;font-size:20px">MÉDECIN AUTO</h1>
      </div>
      <div style="padding:24px;background:#f9fafb">
        <h2 style="color:#0F172A;font-size:18px;margin:0 0 4px">${safeLabel}</h2>
        <p style="color:#6b7280;font-size:13px;margin:0 0 20px">Reçu le ${new Date().toLocaleString('fr-FR')}</p>
        <table style="width:100%;border-collapse:collapse;background:white;border-radius:8px;overflow:hidden">
          ${rows}
        </table>
      </div>
      <div style="padding:16px;text-align:center;font-size:11px;color:#9ca3af">
        ${sanitize(siteConfig.name)} — ${sanitize(siteConfig.contact.address)}
      </div>
    </div>
  `
}

async function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

export async function sendNotificationEmail(
  data: EmailData,
  subject: string,
  formLabel: string
) {
  const smtpUser = process.env.SMTP_USER
  if (!smtpUser) {
    throw new Error('SMTP_USER is not configured')
  }
  const transporter = await createTransporter()
  await transporter.sendMail({
    from: process.env.SMTP_FROM || smtpUser,
    to: smtpUser,
    subject: sanitize(subject),
    html: buildEmailHtml(data, formLabel),
  })
}

export async function sendContactEmail(data: EmailData) {
  await sendNotificationEmail(
    data,
    `Nouveau message de contact — ${data.Nom || data.name || 'Anonyme'}`,
    'Nouveau message de contact'
  )
}
