import Link from 'next/link'
import Image from 'next/image'
import { Player } from '@/types/player'

type PlayerGridProps = {
  players: Player[]
}

export function PlayerList({ players }: PlayerGridProps) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-left">
          <tr>
            <th className="px-4 py-3">Cầu thủ</th>
            <th className="px-4 py-3">Vị trí</th>
            <th className="px-4 py-3">CLB</th>
            <th className="px-4 py-3 text-right">Số áo</th>
          </tr>
        </thead>
        <tbody>
          {players.map(player => (
            <tr
              key={player.id}
              className="border-t hover:bg-gray-50"
            >
              <td className="px-4 py-3">
                <Link
                  href={`/players/${player.slug}`}
                  className="flex items-center gap-3"
                >
                  <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gray-100">
                    {player.profile_image_url && (
                      <Image
                        src={player.profile_image_url}
                        alt={player.full_name}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <span className="font-medium">{player.full_name}</span>
                </Link>
              </td>
              <td className="px-4 py-3">{player.position}</td>
              <td className="px-4 py-3">{player.current_club || '-'}</td>
              <td className="px-4 py-3 text-right">
                {player.club_jersey_number || '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
