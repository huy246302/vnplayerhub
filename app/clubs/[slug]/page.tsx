// app/clubs/[slug]/page.tsx
import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  Trophy,
  Calendar,
  Landmark,
  Shield,
  ArrowLeft,
} from 'lucide-react'

interface Club {
  id: string
  slug: string,
  name: string
  short_name: string | null
  founded_year: number | null
  stadium: string | null
  league: string | null
  logo_url: string | null
}

export default async function ClubPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const { data: club } = await supabase
    .from('clubs')
    .select('*')
    .eq('slug', slug)
    .single<Club>()

  if (!club) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/clubs" className="flex items-center gap-2 text-sm text-gray-600 hover:underline">
          <ArrowLeft className="h-4 w-4" />
          Quay lại câu lạc bộ
        </Link>
      </div>

      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="flex gap-6">
          {/* Logo */}
          <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-100">
            {club.logo_url ? (
              <Image
                src={club.logo_url}
                alt={club.name}
                width={96}
                height={96}
                className="object-contain"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <Shield className="h-10 w-10 text-gray-300" />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-xl font-semibold">{club.name}</h1>

            {club.short_name && (
              <p className="text-sm text-gray-600">{club.short_name}</p>
            )}

            {/* Meta row */}
            <div className="mt-4 flex flex-wrap gap-6 text-sm text-gray-600">
              {club.league && (
                <span className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-gray-500" />
                  {club.league}
                </span>
              )}

              {club.founded_year && (
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  Founded {club.founded_year}
                </span>
              )}

              {club.stadium && (
                <span className="flex items-center gap-2">
                  <Landmark className="h-4 w-4 text-gray-500" />
                  {club.stadium}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Club Information ===== */}
      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-sm font-semibold uppercase text-gray-500">
          Club Information
        </h2>

        <div className="grid grid-cols-2 gap-y-4 text-sm">
          <div className="text-gray-500">Full Name</div>
          <div className="font-medium">{club.name}</div>

          <div className="text-gray-500">Short Name</div>
          <div className="font-medium">{club.short_name ?? '-'}</div>

          <div className="text-gray-500">Founded</div>
          <div className="font-medium">{club.founded_year ?? '-'}</div>

          <div className="text-gray-500">Stadium</div>
          <div className="font-medium">{club.stadium ?? '-'}</div>

          <div className="text-gray-500">League</div>
          <div className="font-medium">{club.league ?? '-'}</div>
        </div>
      </section>
    </div>
  )
}
