import Link from 'next/link'

export function PlayersToolbar({
  query,
  view,
}: {
  query?: string
  view: 'grid' | 'list'
}) {
  return (
    <div className="mb-6 flex items-center justify-between gap-4">
      {/* Search */}
      <form action="/players" className="relative flex-1">
        <input
          name="q"
          defaultValue={query}
          placeholder="Tìm kiếm cầu thủ..."
          className="w-full rounded-lg border px-4 py-2"
        />
      </form>

      {/* View Toggle */}
      <div className="flex gap-2">
        <Link
          href={`/players?view=grid${query ? `&q=${query}` : ''}`}
          className={`rounded-lg border px-3 py-2 text-sm ${
            view === 'grid' ? 'bg-gray-900 text-white' : 'bg-white'
          }`}
        >
          Grid
        </Link>
        <Link
          href={`/players?view=list${query ? `&q=${query}` : ''}`}
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
