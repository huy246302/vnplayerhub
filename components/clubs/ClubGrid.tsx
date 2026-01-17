import { Club } from '@/types/club'
import { EntityGrid, EntityGridItem } from '@/components/ui/EntityGrid'

type Props = {
  clubs: Club[]
}

export function ClubGrid({ clubs }: Props) {
  const items: EntityGridItem[] = clubs.map(club => ({
    id: club.id,
    href: `/clubs/${club.slug}`,
    title: club.name,
    subtitle: club.short_name ?? undefined,
    imageUrl: club.logo_url ?? undefined,
    badge: club.league ?? undefined,
    meta: club.founded_year
      ? `Founded ${club.founded_year}`
      : undefined,
  }))

  return <EntityGrid items={items} />
}
