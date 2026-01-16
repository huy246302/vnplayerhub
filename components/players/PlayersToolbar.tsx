import { EntityToolbar } from '@/components/ui/EntityToolbar'

export function PlayersToolbar({ view }: { view: 'grid' | 'list' }) {
  return (
    <EntityToolbar
      basePath="/players"
      view={view}
      searchPlaceholder="Tìm kiếm cầu thủ..."
    />
  )
}
