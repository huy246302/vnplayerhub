import Link from 'next/link'
import Image from 'next/image'

export type EntityGridItem = {
  id: string
  href: string
  title: string
  subtitle?: string
  imageUrl?: string
  badge?: string
  meta?: string
}

type EntityGridProps = {
  items: EntityGridItem[]
}

export function EntityGrid({ items }: EntityGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
      {items.map(item => (
        <Link
          key={item.id}
          href={item.href}
          className="rounded-xl border bg-white p-4 hover:shadow-md"
        >
          <div className="relative mb-3 aspect-square overflow-hidden rounded-lg bg-gray-100">
            {item.imageUrl ? (
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-3xl">
                ⚽
              </div>
            )}
          </div>

          <h3 className="font-semibold">{item.title}</h3>

          {item.subtitle && (
            <p className="text-sm text-gray-600">{item.subtitle}</p>
          )}

          {(item.badge || item.meta) && (
            <div className="mt-2 flex items-center justify-between text-sm">
              {item.badge && (
                <span className="rounded bg-red-100 px-2 py-0.5 text-red-600">
                  {item.badge}
                </span>
              )}

              {item.meta && (
                <span className="text-gray-500">{item.meta}</span>
              )}
            </div>
          )}
        </Link>
      ))}
    </div>
  )
}
