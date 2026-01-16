import Link from 'next/link'
import Image from 'next/image'

export type EntityTableRow = {
  id: string
  href: string
  title: string
  imageUrl?: string
  cols: (string | null)[]
}

type EntityTableProps = {
  headers: string[]
  rows: EntityTableRow[]
}

export function EntityTable({ headers, rows }: EntityTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-left">
          <tr>
            <th className="px-4 py-3">{headers[0]}</th>
            {headers.slice(1).map(h => (
              <th key={h} className="px-4 py-3">
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map(row => (
            <tr key={row.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-3">
                <Link href={row.href} className="flex items-center gap-3">
                  <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gray-100">
                    {row.imageUrl && (
                      <Image
                        src={row.imageUrl}
                        alt={row.title}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <span className="font-medium">{row.title}</span>
                </Link>
              </td>

              {row.cols.map((col, i) => (
                <td key={i} className="px-4 py-3">
                  {col ?? '-'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
