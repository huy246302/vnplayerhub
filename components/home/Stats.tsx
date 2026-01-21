export function Stats({ playerCount }: { playerCount: number }) {
  return (
    <section className="container mx-auto grid gap-6 px-6 md:grid-cols-2">
      <StatCard label="Players" value={`${playerCount}+`} />
      <StatCard label="Clubs" value="14+" />
    </section>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-white p-6 text-center shadow-sm">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm text-gray-600">
        {label}
      </div>
    </div>
  )
}
