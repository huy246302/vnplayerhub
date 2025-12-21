// app/players/[slug]/page.tsx
import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

interface Player {
  id: string
  slug: string
  full_name: string
  short_name: string | null
  birth_date: string | null
  nationality: string
  position: string
  height_cm: number | null
  preferred_foot: string | null
  current_club: string | null
  club_jersey_number: number | null
  bio: string | null
  career_highlights: string[] | null
  profile_image_url: string | null
  is_verified: boolean
  is_active: boolean
  club_id: string | null
  created_at: string
  updated_at: string
  clubs?: {
    name: string
    short_name: string | null
    logo_url: string | null
  } | null
}

export default async function PlayerPage({
  params
}: {
  params: { slug: string }
}) {
  const { data: player } = await supabase
    .from('players')
    .select(`
      *,
      clubs (name, short_name, logo_url)
    `)
    .eq('slug', params.slug)
    .single<Player>()
  
  if (!player) {
    notFound()
  }
  
  // Format date
  const formattedBirthDate = player.birth_date 
    ? new Date(player.birth_date).toLocaleDateString('vi-VN')
    : null
  
  // Translate preferred foot
  const getPreferredFootText = (foot: string | null) => {
    switch (foot) {
      case 'left': return 'Trái'
      case 'right': return 'Phải'
      case 'both': return 'Cả hai'
      default: return 'Không rõ'
    }
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/players" className="text-red-600 hover:underline">
          ← Quay lại danh sách
        </Link>
      </div>
      
      <div className="rounded-xl border bg-white p-8 shadow-sm">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Profile Image */}
          <div>
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
              {player.profile_image_url ? (
                <Image 
                  src={player.profile_image_url} 
                  alt={player.full_name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <div className="text-8xl text-gray-300">⚽</div>
                </div>
              )}
            </div>
          </div>
          
          {/* Right Column - Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h1 className="text-3xl font-bold">{player.full_name}</h1>
              {player.short_name && (
                <p className="text-xl text-gray-600">{player.short_name}</p>
              )}
              
              {player.is_verified && (
                <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm text-green-800">
                  ✓ Đã xác minh
                </span>
              )}
            </div>
            
            {/* Stats Grid */}
            <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="rounded-lg border p-4">
                <div className="text-sm text-gray-500">Vị trí</div>
                <div className="text-lg font-semibold">{player.position}</div>
              </div>
              
              {player.height_cm && (
                <div className="rounded-lg border p-4">
                  <div className="text-sm text-gray-500">Chiều cao</div>
                  <div className="text-lg font-semibold">{player.height_cm} cm</div>
                </div>
              )}
              
              {player.preferred_foot && (
                <div className="rounded-lg border p-4">
                  <div className="text-sm text-gray-500">Chân thuận</div>
                  <div className="text-lg font-semibold">
                    {getPreferredFootText(player.preferred_foot)}
                  </div>
                </div>
              )}
              
              {formattedBirthDate && (
                <div className="rounded-lg border p-4">
                  <div className="text-sm text-gray-500">Ngày sinh</div>
                  <div className="text-lg font-semibold">{formattedBirthDate}</div>
                </div>
              )}
            </div>
            
            {/* Club Info */}
            {player.clubs && (
              <div className="mb-6 rounded-lg border p-4">
                <div className="mb-2 text-sm text-gray-500">Câu lạc bộ hiện tại</div>
                <div className="flex items-center gap-3">
                  {player.clubs.logo_url && (
                    <div className="relative h-10 w-10">
                      <Image 
                        src={player.clubs.logo_url} 
                        alt={player.clubs.name}
                        fill
                        className="object-contain"
                        sizes="40px"
                      />
                    </div>
                  )}
                  <div>
                    <div className="font-semibold">{player.clubs.name}</div>
                    {player.club_jersey_number && (
                      <div className="text-sm text-gray-600">Số áo: {player.club_jersey_number}</div>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {/* Bio */}
            {player.bio && (
              <div className="mb-6">
                <h3 className="mb-2 text-lg font-semibold">Tiểu sử</h3>
                <p className="text-gray-700">{player.bio}</p>
              </div>
            )}
            
            {/* Career Highlights */}
            {player.career_highlights && player.career_highlights.length > 0 && (
              <div>
                <h3 className="mb-3 text-lg font-semibold">Thành tích nổi bật</h3>
                <ul className="space-y-2">
                  {player.career_highlights.map((highlight: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="mt-1 text-yellow-500">★</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}