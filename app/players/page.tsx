// app/players/page.tsx
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import Image from 'next/image'

type Player = {
  id: string
  slug: string
  full_name: string
  short_name: string | null
  position: string
  current_club: string | null
  club_jersey_number: number | null
  profile_image_url: string | null
}

interface SearchParams {
  q?: string
  position?: string
}

export default async function PlayersPage({
  searchParams
}: {
  searchParams: Promise<SearchParams>
}) {
  // Await the searchParams promise
  const params = await searchParams
  const { q, position } = params
  
  // Build the query
  let query = supabase
    .from('players')
    .select('*')
    .order('full_name')
  
  if (q) {
    const searchTerm = `%${q}%`
    query = query.or(`full_name.ilike.${searchTerm},short_name.ilike.${searchTerm}`)
  }
  
  if (position) {
    query = query.eq('position', position)
  }
  
  const { data } = await query
  const players = data as Player[] | null
  
  const positions = ['Thủ môn', 'Hậu vệ', 'Tiền vệ', 'Tiền đạo']
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Danh sách cầu thủ</h1>
      
      {/* Filters */}
      <div className="mb-6 flex flex-wrap gap-2">
        <Link 
          href="/players" 
          className={`rounded-full px-4 py-2 ${!position ? 'bg-red-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
        >
          Tất cả
        </Link>
        {positions.map(pos => (
          <a 
            key={pos}
            href={`/players?position=${encodeURIComponent(pos)}`}
            className={`rounded-full px-4 py-2 ${position === pos ? 'bg-red-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          >
            {pos}
          </a>
        ))}
      </div>
      
      {/* Search */}
      {q && (
        <div className="mb-6">
          <p className="text-gray-600">
            Kết quả tìm kiếm cho: <span className="font-semibold">&quot;{q}&quot;</span>
          </p>
        </div>
      )}
      
      {/* Players Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {players?.map((player) => (
          <Link 
            key={player.id}
            href={`/players/${player.slug}`}
            className="overflow-hidden rounded-xl border bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="p-6">
              <div className="relative mb-4 aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
                {player.profile_image_url ? (
                  <Image 
                    src={player.profile_image_url} 
                    alt={player.full_name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <div className="text-4xl text-gray-400">⚽</div>
                  </div>
                )}
              </div>
              
              <h3 className="text-lg font-semibold">{player.full_name}</h3>
              <p className="text-sm text-gray-600">{player.short_name}</p>
              
              <div className="mt-3 flex items-center justify-between">
                <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-600">
                  {player.position}
                </span>
                {player.club_jersey_number && (
                  <span className="text-sm text-gray-500">Số {player.club_jersey_number}</span>
                )}
              </div>
              
              {player.current_club && (
                <p className="mt-2 text-sm text-gray-500">{player.current_club}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
      
      {(!players || players.length === 0) && (
        <div className="py-12 text-center">
          <p className="text-gray-500">Không tìm thấy cầu thủ phù hợp</p>
          <Link href="/players" className="mt-2 inline-block text-red-600 hover:underline">
            Xem tất cả cầu thủ
          </Link>
        </div>
      )}
    </div>
  )
}