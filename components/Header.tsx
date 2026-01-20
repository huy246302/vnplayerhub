import Link from 'next/link'

export default async function Header() {
  // const { data: { user } } = await supabase.auth.getUser()

  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-red-600">
              VNPlayerHub
            </Link>
            <nav className="hidden ml-auto md:flex gap-6">
              <Link href="/players" className="hover:text-red-600">
                Cầu thủ
              </Link>
              <Link href="/clubs" className="hover:text-red-600">
                Câu lạc bộ
              </Link>
            </nav>
        </div>
      </div>
    </header>
  )
}