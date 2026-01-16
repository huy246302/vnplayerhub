import { Player } from '@/types/player'
import { EntityTable, EntityTableRow } from '@/components/ui/EntityTable'

type Props = {
  players: Player[]
}

export function PlayerList({ players }: Props) {
  const rows: EntityTableRow[] = players.map(p => ({
    id: p.id,
    href: `/players/${p.slug}`,
    title: p.full_name,
    imageUrl: p.profile_image_url ?? undefined,
    cols: [
      p.position,
      p.current_club,
      p.club_jersey_number ? `#${p.club_jersey_number}` : null,
    ],
  }))

  return (
    <EntityTable
      headers={['Cầu thủ', 'Vị trí', 'CLB', 'Số áo']}
      rows={rows}
    />
  )
}
