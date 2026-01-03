import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className="container mx-auto px-4 pt-16 text-center">
      <h1 className="mb-4 text-5xl font-bold">
        <span className="text-red-600">VNPlayerHub</span>
      </h1>

      <p className="mx-auto max-w-3xl text-lg text-gray-600">
        Nền tảng dữ liệu cầu thủ bóng đá Việt Nam — hồ sơ, thống kê, và cộng đồng.
      </p>

      <div className="mt-8 flex justify-center gap-4">
        <Link
          href="/players"
          className="rounded-lg bg-red-600 px-6 py-3 text-white hover:bg-red-700"
        >
          Browse Players →
        </Link>
        <Link
          href="/clubs"
          className="rounded-lg border px-6 py-3 hover:bg-gray-100"
        >
          Browse Clubs →
        </Link>
      </div>

      <div className="relative mt-12 h-[320px] w-full overflow-hidden rounded-2xl">
        <Image
          src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=500&fit=crop"
          alt="Vietnam football"
          fill
          className="object-cover"
          priority
        />
      </div>
    </section>
  )
}
