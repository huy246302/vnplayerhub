import { Club } from '@/types/club'
import { EntityTable, EntityTableRow } from '@/components/ui/EntityTable'

type Props = {
  clubs: Club[]
}

export function ClubList({ clubs }: Props) {
  const rows: EntityTableRow[] = clubs.map(clubs => ({
    id: clubs.id,
    href: `/clubs/${clubs.slug}`,
    title: clubs.name,
    imageUrl: clubs.logo_url ?? undefined,
    cols: [
      clubs.short_name,
      clubs.league,
      clubs.stadium,
      clubs.founded_year ? clubs.founded_year.toString() : null,
    ],
  }))

  return (
    <EntityTable
      headers={['CLB', 'Viết tắt', 'Giải đấu', 'Sân', 'Năm TL']}
      rows={rows}
    />
  )
}
