import { supabase } from '@/lib/supabase'
import Hero from '@/components/home/Hero'
import { Stats } from '@/components/home/Stats'
import { FeatureGrid } from '@/components/home/FeatureGrid'

export default async function HomePage() {
  const { count } = await supabase
    .from('players')
    .select('*', { count: 'exact', head: true })

  return (
    <div className="flex flex-col py-8 gap-24">
      <Hero />
      <Stats playerCount={count || 0} />
      <FeatureGrid />
    </div>
  )
}
