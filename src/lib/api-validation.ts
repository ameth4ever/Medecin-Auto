import { NextResponse } from 'next/server'

export interface ValidationRule {
  field: string
  label: string
  required?: boolean
  maxLength?: number
  pattern?: RegExp
  patternMessage?: string
}

export function validateBody(
  body: Record<string, unknown>,
  rules: ValidationRule[]
): string | null {
  for (const rule of rules) {
    const value = body[rule.field]

    if (rule.required && (!value || typeof value !== 'string' || !value.trim())) {
      return `${rule.label} est requis`
    }

    if (value && typeof value === 'string') {
      const trimmed = value.trim()

      if (rule.maxLength && trimmed.length > rule.maxLength) {
        return `${rule.label} ne doit pas dépasser ${rule.maxLength} caractères`
      }

      if (rule.pattern && !rule.pattern.test(trimmed)) {
        return rule.patternMessage || `${rule.label} n'est pas valide`
      }
    }
  }

  return null
}

export function sanitize(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}

export function checkOrigin(request: Request): boolean {
  const origin = request.headers.get('origin')
  const referer = request.headers.get('referer')
  const host = request.headers.get('host')

  const allowed = origin || referer || ''

  if (!allowed) return true

  return allowed.includes(host || '') || allowed.includes('medecinauto.sn') || allowed.includes('localhost')
}

export function errorResponse(message: string, status: number = 400) {
  return NextResponse.json({ error: message }, { status })
}

export function successResponse(data?: Record<string, unknown>) {
  return NextResponse.json({ success: true, ...data })
}
