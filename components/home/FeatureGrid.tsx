import Link from 'next/link'

export function FeatureGrid() {
  return (
    <section className="container mx-auto px-4">
      <h2 className="mb-10 text-center text-3xl font-bold">
        Why VNPlayerHub?
      </h2>

      <div className="grid gap-6 md:grid-cols-4">
        <Feature
          title="Comprehensive Database"
          desc="Hồ sơ cầu thủ, câu lạc bộ và đội tuyển Việt Nam."
        />
        <Feature
          title="Real-time Statistics"
          desc="Theo dõi dữ liệu và phong độ."
        />
        <Feature
          title="Market Insights"
          desc="Giá trị chuyển nhượng và xu hướng."
        />
        <Feature
          title="Community"
          desc="Kết nối người hâm mộ bóng đá Việt."
        />
      </div>

      <h2 className="my-12 text-center text-3xl font-bold">
        Explore Our Database
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        <Explore title="Players" href="/players" />
        <Explore title="Clubs" href="/clubs" />
      </div>
    </section>
  )
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-xl border bg-white p-6">
      <h3 className="mb-2 font-semibold">{title}</h3>
      <p className="text-sm text-gray-600">
        {desc}
      </p>
    </div>
  )
}

function Explore({ title, href }: { title: string; href: string }) {
  return (
    <Link
      href={href}
      className="rounded-xl border bg-white p-6 hover:shadow-md"
    >
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <span className="text-red-600">Browse →</span>
    </Link>
  )
}
