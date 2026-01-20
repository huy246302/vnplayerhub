import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Ruler,
  Shield,
  BadgeCheck,
  UserCircle,
  Footprints,
} from 'lucide-react'

interface Player {
  id: string
  slug: string
  full_name: string
  short_name: string | null
  birth_date: string | null
  nationality: string | null
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
  clubs: {
    name: string
    short_name: string | null
    logo_url: string | null
  } | null
}

export default async function PlayerPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const { data: player } = await supabase
    .from('players')
    .select(`
      *,
      clubs (name, short_name, logo_url)
    `)
    .eq('slug', slug)
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
        <Link href="/clubs" className="flex items-center gap-2 text-sm text-gray-600 hover:underline">
          <ArrowLeft className="h-4 w-4" />
          Quay lại câu lạc bộ
        </Link>
      </div>
      
      <div className="space-y-8 rounded-xl bg-white p-8 shadow-sm">

      <div className="flex items-start gap-6">
        {/* Left Column - Profile Image */}
        <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-full bg-gray-100">
          {player.profile_image_url ? (
            <Image
              src={player.profile_image_url}
              alt={player.full_name}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <UserCircle className="h-10 w-10 text-gray-300" />
            </div>
          )}
        </div>
        
        {/* Right Column - Info */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold">{player.full_name}</h1>

            {player.is_verified && (
              <span className="flex items-center gap-1 rounded bg-red-100 px-2 py-0.5 text-xs text-red-600">
                <BadgeCheck className="h-3 w-3" />
                Verified
              </span>
            )}
          </div>

          <div className="mt-2 text-sm text-gray-600">
            {player.position}
            {player.club_jersey_number && ` • #${player.club_jersey_number}`}
          </div>

          {/* Meta row */}
          <div className="mt-4 flex flex-wrap gap-6 text-sm text-gray-600">
            {player.nationality && (
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {player.nationality}
              </span>
            )}

            {formattedBirthDate && (
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {formattedBirthDate}
              </span>
            )}

            {player.height_cm && (
              <span className="flex items-center gap-2">
                <Ruler className="h-4 w-4" />
                {player.height_cm} cm
              </span>
            )}

            {player.current_club && (
              <span className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                {player.current_club}
              </span>
            )}
          </div>
        </div>
      </div>
        {player.bio && (
          <section>
            <h2 className="mb-2 text-sm font-semibold uppercase text-gray-500">
              About
            </h2>
            <p className="leading-relaxed text-gray-700">
              {player.bio}
            </p>
          </section>
        )}
        <section>
          <h2 className="mb-3 text-sm font-semibold uppercase text-gray-500">
            Player Information
          </h2>

          <dl className="grid grid-cols-2 gap-y-4 text-sm">
            <div>
              <dt className="text-gray-500">Full name</dt>
              <dd className="font-medium">{player.full_name}</dd>
            </div>

            {player.birth_date && (
              <div>
                <dt className="text-gray-500">Date of birth</dt>
                <dd className="font-medium">{formattedBirthDate}</dd>
              </div>
            )}

            {player.height_cm && (
              <div>
                <dt className="text-gray-500">Height</dt>
                <dd className="font-medium">{player.height_cm} cm</dd>
              </div>
            )}

            {player.preferred_foot && (
              <div>
                <dt className="flex items-center gap-2 text-gray-500">
                  <Footprints className="h-4 w-4" />
                  Preferred foot
                </dt>
                <dd className="font-medium">
                  {getPreferredFootText(player.preferred_foot)}
                </dd>
              </div>
            )}
          </dl>
        </section>
      </div>
    </div>
  )
}