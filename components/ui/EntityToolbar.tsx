'use client'

import { useEffect, useState, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

type Props = {
  basePath: string
  view: 'grid' | 'list'
  searchPlaceholder: string
}

export function EntityToolbar({
  basePath,
  view,
  searchPlaceholder,
}: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const initialQuery = searchParams.get('q') ?? ''
  const [query, setQuery] = useState(initialQuery)

  useEffect(() => {
    const timeout = setTimeout(() => {
      startTransition(() => {
        const params = new URLSearchParams()
        if (query) params.set('q', query)
        params.set('view', view)

        router.replace(`${basePath}?${params.toString()}`)
      })
    }, 400)

    return () => clearTimeout(timeout)
  }, [query, view, basePath, router, startTransition])

  return (
    <div className="mb-6 flex items-center justify-between gap-4">
      {/* Search */}
      <div className="relative flex-1">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full rounded-lg border px-4 py-2"
        />
        {isPending && (
          <span className="absolute right-3 top-2.5 text-xs text-gray-400">
            ...
          </span>
        )}
      </div>

      {/* View Toggle */}
      <div className="flex gap-2">
        <Link
          href={`${basePath}?view=grid${query ? `&q=${query}` : ''}`}
          className={`rounded-lg border px-3 py-2 text-sm ${
            view === 'grid' ? 'bg-gray-900 text-white' : 'bg-white'
          }`}
        >
          Grid
        </Link>
        <Link
          href={`${basePath}?view=list${query ? `&q=${query}` : ''}`}
          className={`rounded-lg border px-3 py-2 text-sm ${
            view === 'list' ? 'bg-gray-900 text-white' : 'bg-white'
          }`}
        >
          List
        </Link>
      </div>
    </div>
  )
}
