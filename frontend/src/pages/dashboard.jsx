const stats = [
  { label: "Total Users", value: "1,284", change: "+12.4%", tone: "text-success" },
  { label: "Active Sessions", value: "86", change: "+3.1%", tone: "text-success" },
  { label: "Pending Orders", value: "24", change: "-2.8%", tone: "text-danger" },
  { label: "Revenue", value: "$9,530", change: "+8.2%", tone: "text-success" },
];

const activities = [
  { id: 1, user: "alice@example.com", action: "Signed in", time: "2 minutes ago" },
  { id: 2, user: "bob@example.com", action: "Created an account", time: "18 minutes ago" },
  { id: 3, user: "carol@example.com", action: "Updated profile", time: "1 hour ago" },
  { id: 4, user: "dave@example.com", action: "Signed out", time: "3 hours ago" },
];

function Dashboard() {
  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Dashboard</h2>
          <p className="text-muted mb-0">Overview of the latest activity</p>
        </div>
        <button type="button" className="btn btn-primary">
          Create User
        </button>
      </div>

      <div className="row g-3 mb-4">
        {stats.map((stat) => (
          <div className="col-sm-6 col-xl-3" key={stat.label}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h6 className="card-subtitle mb-2 text-muted">{stat.label}</h6>
                <p className="display-6 fw-semibold mb-0">{stat.value}</p>
                <small className={`${stat.tone}`}>{stat.change} since last week</small>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-3">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-header">Recent Activity</div>
            <div className="card-body p-0">
              <table className="table table-hover align-middle mb-0">
                <thead>
                  <tr>
                    <th scope="col">User</th>
                    <th scope="col">Action</th>
                    <th scope="col">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity) => (
                    <tr key={activity.id}>
                      <td>{activity.user}</td>
                      <td>{activity.action}</td>
                      <td className="text-muted">{activity.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card shadow-sm">
            <div className="card-header">Quick Actions</div>
            <div className="card-body d-grid gap-2">
              <button type="button" className="btn btn-outline-primary">
                Manage Users
              </button>
              <button type="button" className="btn btn-outline-secondary">
                Export Report
              </button>
              <button type="button" className="btn btn-outline-danger">
                Reset Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
