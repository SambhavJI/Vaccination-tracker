import { useState, useEffect } from 'react';
import api from '../services/api';
import { HiOutlineUsers, HiOutlineClipboardCheck, HiOutlineClock, HiOutlineShieldCheck } from 'react-icons/hi';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    users: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const usersRes = await api.get('/admin/users');
      const users = usersRes.data;
      setStats({
        totalUsers: users.length,
        users,
      });
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      label: 'Total Users',
      value: stats.totalUsers,
      icon: HiOutlineUsers,
      gradient: 'stat-card--emerald',
    },
    {
      label: 'Registered Today',
      value: stats.users.filter(u => {
        const today = new Date().toDateString();
        return new Date(u.createdAt).toDateString() === today;
      }).length,
      icon: HiOutlineClipboardCheck,
      gradient: 'stat-card--blue',
    },
    {
      label: 'This Week',
      value: stats.users.filter(u => {
        const now = new Date();
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return new Date(u.createdAt) >= weekAgo;
      }).length,
      icon: HiOutlineClock,
      gradient: 'stat-card--violet',
    },
    {
      label: 'Active Platform',
      value: '✓',
      icon: HiOutlineShieldCheck,
      gradient: 'stat-card--amber',
    },
  ];

  if (loading) {
    return (
      <div className="page-loader">
        <div className="page-loader__spinner" />
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="page-header">
        <h1 className="page-header__title">Dashboard</h1>
        <p className="page-header__subtitle">Overview of your vaccination tracker</p>
      </div>

      <div className="stat-grid">
        {statCards.map((card, i) => (
          <div key={i} className={`stat-card ${card.gradient}`}>
            <div className="stat-card__icon-wrap">
              <card.icon className="stat-card__icon" />
            </div>
            <div className="stat-card__info">
              <p className="stat-card__label">{card.label}</p>
              <p className="stat-card__value">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Users */}
      <div className="card">
        <div className="card__header">
          <h2 className="card__title">Recent Users</h2>
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {stats.users.slice(0, 5).map((user) => (
                <tr key={user._id}>
                  <td>
                    <div className="user-cell">
                      <div className="user-cell__avatar">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <span>{user.name}</span>
                    </div>
                  </td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {stats.users.length === 0 && (
                <tr>
                  <td colSpan={4} className="data-table__empty">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
