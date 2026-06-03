'use client'

import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4">
      <h1 className="font-heading text-4xl font-bold">Something went wrong</h1>
      <p className="mt-4 text-muted-foreground max-w-md">
        Please try again or contact us if the problem persists.
      </p>
      <Button onClick={reset} className="mt-8">
        Try again
      </Button>
    </div>
  )
}
