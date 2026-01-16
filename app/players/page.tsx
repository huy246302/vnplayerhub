import { supabase } from '@/lib/supabase'
import { PlayersToolbar } from '@/components/players/PlayersToolbar'
import { PlayerGrid } from '@/components/players/PlayerGrid'
import { PlayerList } from '@/components/players/PlayerList'

interface SearchParams {
  q?: string
  view?: 'grid' | 'list'
}

export default async function PlayersPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const { q, view = 'grid' } = await searchParams

  let query = supabase
    .from('players')
    .select('*')
    .order('full_name')

  if (q) {
    query = query.or(
      `full_name.ilike.%${q}%,short_name.ilike.%${q}%`
    )
  }

  const { data: players } = await query

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold">Cầu thủ</h1>
      <p className="mb-6 text-gray-600">
        Duyệt và khám phá hồ sơ cầu thủ Việt Nam
      </p>

      <PlayersToolbar view={view} />

      {players && players.length > 0 ? (
        view === 'grid' ? (
          <PlayerGrid players={players} />
        ) : (
          <PlayerList players={players} />
        )
      ) : (
        <p className="py-12 text-center text-gray-500">
          Không tìm thấy cầu thủ
        </p>
      )}
    </div>
  )
}
