import { NextResponse } from 'next/server'
import { sendNotificationEmail } from '@/lib/email'
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
      { field: 'serviceId', label: 'Service', required: true, maxLength: 100 },
      { field: 'date', label: 'Date souhaitée', maxLength: 50 },
      { field: 'message', label: 'Message', maxLength: 5000 },
    ])

    if (error) {
      return errorResponse(error)
    }

    await sendNotificationEmail(
      {
        Nom: body.name,
        'Téléphone': body.phone,
        'Service': body.serviceId,
        'Date souhaitée': body.date,
        Message: body.message,
      },
      `Nouvelle réservation de service — ${body.name}`,
      'Nouvelle réservation de service'
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to send booking email:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
