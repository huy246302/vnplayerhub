import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default async function Header() {
  // const { data: { user } } = await supabase.auth.getUser()

  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold text-red-600">
              VNPlayerHub
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/players" className="hover:text-red-600">
                Cầu thủ
              </Link>
              <Link href="/clubs" className="hover:text-red-600">
                Câu lạc bộ
              </Link>
              <Link href="/forum" className="hover:text-red-600">
                Diễn đàn
              </Link>
            </nav>
          </div>
          
          {/* <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <Link 
                  href="/profile"
                  className="text-sm hover:text-red-600"
                >
                  {user.email}
                </Link>
                <form action="/auth/signout" method="post">
                  <button className="text-sm text-red-600 hover:text-red-700">
                    Đăng xuất
                  </button>
                </form>
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              >
                Đăng nhập
              </Link>
            )}
          </div> */}
        </div>
      </div>
    </header>
  )
}