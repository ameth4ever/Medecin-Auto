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
      { field: 'vehicleId', label: 'Véhicule', required: true, maxLength: 100 },
      { field: 'message', label: 'Message', maxLength: 5000 },
    ])

    if (error) {
      return errorResponse(error)
    }

    await sendNotificationEmail(
      {
        Nom: body.name,
        'Téléphone': body.phone,
        'Véhicule (ID)': body.vehicleId,
        Message: body.message,
      },
      `Nouvelle demande d'information — ${body.name}`,
      "Nouvelle demande d'information véhicule"
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to send inquiry email:', error)
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
