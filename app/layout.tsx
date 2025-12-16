import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'VNPlayerHub - Cầu thủ Việt Nam | Vietnamese Football Players Database',
  description: 'Trung tâm dữ liệu cầu thủ bóng đá Việt Nam. Thông tin, số liệu, và cộng đồng cho người hâm mộ.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className={`${inter.className} bg-gray-50`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="border-t bg-white py-8 text-center text-gray-600">
          <p>© 2024 VNPlayerHub - Database cầu thủ Việt Nam</p>
        </footer>
      </body>
    </html>
  )
}