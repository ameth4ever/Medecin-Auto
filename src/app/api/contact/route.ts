import { NextResponse } from 'next/server'
import { sendContactEmail } from '@/lib/email'
import { validateBody, checkOrigin, errorResponse } from '@/lib/api-validation'

export async function POST(req: Request) {
  try {
    if (!checkOrigin(req)) {
      return errorResponse('Requête non autorisée', 403)
    }

    const body = await req.json()
    const error = validateBody(body, [
      { field: 'name', label: 'Nom', required: true, maxLength: 100 },
      { field: 'phone', label: 'Téléphone', required: true, maxLength: 20, pattern: /^[+\d][\d\s().-]{6,20}$/, patternMessage: 'Numéro de téléphone invalide' },
      { field: 'email', label: 'Email', maxLength: 200, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, patternMessage: 'Email invalide' },
      { field: 'subject', label: 'Sujet', maxLength: 200 },
      { field: 'message', label: 'Message', required: true, maxLength: 5000 },
    ])

    if (error) {
      return errorResponse(error)
    }

    await sendContactEmail({
      Nom: body.name,
      Téléphone: body.phone,
      Email: body.email,
      Sujet: body.subject,
      Message: body.message,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to send contact email:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
