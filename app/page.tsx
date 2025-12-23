import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { Search } from 'lucide-react'

export default async function HomePage() {
  // Get player count
  const { count: playerCount } = await supabase
    .from('players')
    .select('*', { count: 'exact', head: true })

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-5xl font-bold text-gray-900">
          <span className="text-red-600">VNPlayerHub</span>
        </h1>
        <p className="mx-auto max-w-2xl text-xl text-gray-600">
          Trung tâm dữ liệu cầu thủ bóng đá Việt Nam. Thông tin, số liệu, và cộng đồng.
        </p>
        
        {/* Quick Stats */}
        <div className="mx-auto mt-8 flex max-w-md justify-center gap-6">
          <div className="rounded-lg bg-white p-4 shadow">
            <div className="text-2xl font-bold text-red-600">
              {playerCount || 0}+
            </div>
            <div className="text-sm text-gray-600">Cầu thủ</div>
          </div>
          <div className="rounded-lg bg-white p-4 shadow">
            <div className="text-2xl font-bold text-yellow-500">
              14+
            </div>
            <div className="text-sm text-gray-600">Câu lạc bộ</div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mx-auto mb-12 max-w-2xl">
        <form action="/players" className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            name="q"
            type="search"
            placeholder="Tìm kiếm..."
            className="w-full rounded-full border pl-12 pr-6 py-3 shadow-lg focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-red-600 px-6 py-2 text-white hover:bg-red-700"
          >
            Tìm kiếm
          </button>
        </form>
      </div>

      {/* Quick Links */}
      <div className="grid gap-6 md:grid-cols-3">
        <Link href="/players">
          <div className="rounded-xl border bg-white p-8 text-center shadow-sm hover:shadow-md">
            <h3 className="mb-2 text-xl font-semibold">Danh sách cầu thủ</h3>
            <p className="text-gray-600">Tìm kiếm và xem hồ sơ cầu thủ Việt Nam</p>
          </div>
        </Link>
        
        <Link href="/clubs">
          <div className="rounded-xl border bg-white p-8 text-center shadow-sm hover:shadow-md">
            <h3 className="mb-2 text-xl font-semibold">Câu lạc bộ</h3>
            <p className="text-gray-600">Đội bóng và cầu thủ</p>
          </div>
        </Link>
      </div>
    </div>
  )
}