import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'
import { revalidateSecret } from '@/sanity/lib/api'

type WebhookPayload = {
  _type: string
  slug?: { current: string }
}

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      revalidateSecret,
      true
    )

    if (!isValidSignature) {
      return new Response('Invalid signature', { status: 401 })
    }

    if (!body?._type) {
      return new Response('Missing _type', { status: 400 })
    }

    const paths: string[] = []

    switch (body._type) {
      case 'siteSettings':
        paths.push('/[locale]')
        break
      case 'service':
        paths.push('/[locale]/services')
        if (body.slug?.current) paths.push(`/[locale]/services/${body.slug.current}`)
        break
      case 'vehicle':
        paths.push('/[locale]/vehicles')
        if (body.slug?.current) paths.push(`/[locale]/vehicles/${body.slug.current}`)
        break
      case 'rental':
        paths.push('/[locale]/rentals')
        if (body.slug?.current) paths.push(`/[locale]/rentals/${body.slug.current}`)
        break
      case 'blogPost':
        paths.push('/[locale]/blog')
        if (body.slug?.current) paths.push(`/[locale]/blog/${body.slug.current}`)
        break
      case 'testimonial':
      case 'faq':
        paths.push('/[locale]')
        paths.push('/[locale]/faq')
        break
      default:
        paths.push('/[locale]')
    }

    paths.forEach((path) => revalidatePath(path, 'page'))

    return NextResponse.json({ revalidated: paths })
  } catch (err) {
    return new Response((err as Error).message, { status: 500 })
  }
}
