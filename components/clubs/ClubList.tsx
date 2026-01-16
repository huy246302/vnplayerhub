import { Club } from '@/types/club'
import { EntityTable, EntityTableRow } from '@/components/ui/EntityTable'

type Props = {
  clubs: Club[]
}

export function ClubList({ clubs }: Props) {
  const rows: EntityTableRow[] = clubs.map(c => ({
    id: c.id,
    href: `/clubs/${c.id}`,
    title: c.name,
    imageUrl: c.logo_url,
    cols: [
      c.short_name,
      c.league,
      c.stadium,
      c.founded_year ? c.founded_year.toString() : null,
    ],
  }))

  return (
    <EntityTable
      headers={['CLB', 'Viết tắt', 'Giải đấu', 'Sân', 'Năm TL']}
      rows={rows}
    />
  )
}
