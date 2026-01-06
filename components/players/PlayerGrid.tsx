import Link from 'next/link'
import Image from 'next/image'
import { Player } from '@/types/player'

type PlayerGridProps = {
  players: Player[]
}

export function PlayerGrid({ players }: PlayerGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
      {players.map(player => (
        <Link
          key={player.id}
          href={`/players/${player.slug}`}
          className="rounded-xl border bg-white p-4 hover:shadow-md"
        >
          <div className="relative mb-3 aspect-square overflow-hidden rounded-lg bg-gray-100">
            {player.profile_image_url ? (
              <Image
                src={player.profile_image_url}
                alt={player.full_name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-3xl">
                ⚽
              </div>
            )}
          </div>

          <h3 className="font-semibold">{player.full_name}</h3>

          {player.short_name && (
            <p className="text-sm text-gray-600">{player.short_name}</p>
          )}

          {player.position && (
            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="rounded bg-red-100 px-2 py-0.5 text-red-600">
                {player.position}
              </span>

              {player.club_jersey_number && (
                <span className="text-gray-500">
                  #{player.club_jersey_number}
                </span>
              )}
            </div>
          )}

          {player.current_club && (
            <p className="mt-1 text-sm text-gray-500">
              {player.current_club}
            </p>
          )}
        </Link>
      ))}
    </div>
  )
}
