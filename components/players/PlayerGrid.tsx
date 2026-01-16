import { Player } from '@/types/player'
import { EntityGrid, EntityGridItem } from '@/components/ui/EntityGrid'

type Props = {
  players: Player[]
}

export function PlayerGrid({ players }: Props) {
  const items: EntityGridItem[] = players.map(player => ({
    id: player.id,
    href: `/players/${player.slug}`,
    title: player.full_name,
    subtitle: player.short_name || undefined,
    imageUrl: player.profile_image_url || undefined,
    badge: player.position || undefined,
    meta: player.club_jersey_number
      ? `#${player.club_jersey_number}`
      : undefined,
  }))

  return <EntityGrid items={items} />
}
