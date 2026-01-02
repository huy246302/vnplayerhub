import { supabase } from '@/lib/supabase'
import Hero from '@/components/home/Hero'
import { Stats } from '@/components/home/Stats'
import { FeatureGrid } from '@/components/home/FeatureGrid'

export default async function HomePage() {
  const { count } = await supabase
    .from('players')
    .select('*', { count: 'exact', head: true })

  return (
    <div className="flex flex-col gap-24">
      <Hero />
      <Stats playerCount={count || 0} />
      <FeatureGrid />

      <section className="bg-blue-600 py-16 text-center text-white">
        <h2 className="mb-4 text-3xl font-bold">Ready to dive in?</h2>
        <p className="mb-6 text-blue-100">
          Khám phá dữ liệu bóng đá Việt Nam ngay hôm nay.
        </p>
      </section>
    </div>
  )
}
