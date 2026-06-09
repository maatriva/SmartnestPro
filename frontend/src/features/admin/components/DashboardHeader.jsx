export default function DashboardHeader({
  onRefresh,
}) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

      <div>
        <h1 className="text-4xl font-black text-(--text-dark) bg-gradient-to-r from-(--text-dark) to-(--primary) bg-clip-text text-transparent">
          Admin Command Center
        </h1>

        <p className="text-(--text-light) font-medium">
          Real-time ecosystem insights and community feedback.
        </p>
      </div>

      <button
        onClick={onRefresh}
        className="px-6 py-3 clay-btn clay-btn-primary"
      >
        Refresh Data
      </button>

    </div>
  );
}