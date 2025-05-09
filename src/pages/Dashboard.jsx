export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('arion-user'))

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Welcome, {user?.email}</h1>
        <p>This is your dashboard. More features coming soon.</p>
      </div>
    </div>
  )
}