import { EntityToolbar } from '@/components/ui/EntityToolbar'

export function ClubsToolbar({ view }: { view: 'grid' | 'list' }) {
  return (
    <EntityToolbar
      basePath="/clubs"
      view={view}
      searchPlaceholder="Tìm kiếm câu lạc bộ..."
    />
  )
}
