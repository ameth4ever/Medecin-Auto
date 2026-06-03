'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Send, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ContactForm() {
  const t = useTranslations('form')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    setIsSubmitting(true)

    const formData = new FormData(form)
    const data = Object.fromEntries(formData)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        setIsSuccess(true)
        form.reset()
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="rounded-2xl border border-border/50 bg-card p-12 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
          <Send className="h-8 w-8 text-green-500" />
        </div>
        <h3 className="mt-6 font-heading text-xl font-semibold">
          {t('messageEnvoye')}
        </h3>
        <p className="mt-2 text-muted-foreground">
          {t('reponseBreve')}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            {t('nomComplet')}
          </label>
          <input
            id="name"
            name="name"
            required
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder={t('votreNom')}
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-2">
            {t('telephone')}
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder={t('telPlaceholder')}
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          {t('email')}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder={t('emailPlaceholder')}
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium mb-2">
          {t('sujet')}
        </label>
        <select
          id="subject"
          name="subject"
          required
          className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">{t('selectionnezSujet')}</option>
          <option value="reservation">{t('reservationService')}</option>
          <option value="location">{t('demandeLocation')}</option>
          <option value="achat">{t('achatVehicule')}</option>
          <option value="devis">{t('demandeDevis')}</option>
          <option value="autre">{t('autre')}</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          {t('message')}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          placeholder={t('messagePlaceholder')}
        />
      </div>

      <Button type="submit" disabled={isSubmitting} size="lg" className="w-full">
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t('envoiEnCours')}
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            {t('envoyerMessage')}
          </>
        )}
      </Button>
    </form>
  )
}
