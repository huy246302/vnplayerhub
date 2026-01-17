// app/clubs/[slug]/page.tsx
import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

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
        <Link href="/clubs" className="text-red-600 hover:underline">
          ← Quay lại danh sách
        </Link>
      </div>

      <div className="rounded-xl border bg-white p-8 shadow-sm">
        <div className="grid gap-8 lg:grid-cols-3">
          <div>
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
              {club.logo_url ? (
                <Image
                  src={club.logo_url}
                  alt={club.name}
                  fill
                  className="object-contain"
                  priority
                />
              ) : (
                <div className="flex h-full items-center justify-center text-8xl text-gray-300">
                  ⚽
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h1 className="mb-2 text-3xl font-bold">{club.name}</h1>
            {club.short_name && (
              <p className="text-xl text-gray-600">{club.short_name}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
