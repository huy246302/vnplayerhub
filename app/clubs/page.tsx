import { supabase } from '@/lib/supabase'
import { ClubGrid } from '@/components/clubs/ClubGrid'
import { ClubList } from '@/components/clubs/ClubList'
import { ClubsToolbar } from '@/components/clubs/ClubsToolbar'

interface SearchParams {
  q?: string
  view?: 'grid' | 'list'
}

export default async function ClubsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const { q, view = 'grid' } = await searchParams

  let query = supabase
    .from('clubs')
    .select('*')
    .order('name')

    console.log(query,'query')

  if (q) {
    query = query.or(
      `name.ilike.%${q}%,short_name.ilike.%${q}%`
    )
  }

  const { data: clubs } = await query

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-2 text-3xl font-bold">Câu lạc bộ</h1>
      <p className="mb-6 text-gray-600">
        Danh sách các câu lạc bộ bóng đá Việt Nam
      </p>

      <ClubsToolbar view={view} />


      {clubs && clubs.length > 0 ? (
        view === 'grid' ? (
          <ClubGrid clubs={clubs} />
        ) : (
          <ClubList clubs={clubs} />
        )
      ) : (
        <p className="py-12 text-center text-gray-500">
          Không tìm thấy câu lạc bộ
        </p>
      )}
    </div>
  )
}
