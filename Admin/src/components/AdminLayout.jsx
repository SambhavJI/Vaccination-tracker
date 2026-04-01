import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAuth } from '../context/AuthContext';
import { HiOutlineLogout } from 'react-icons/hi';

export default function AdminLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-layout__main">
        {/* Top Bar */}
        <header className="topbar">
          <div className="topbar__left">
            <h2 className="topbar__greeting">
              Welcome back, <span className="topbar__name">{user?.name || 'Admin'}</span>
            </h2>
          </div>
          <div className="topbar__right">
            <div className="topbar__avatar">
              {(user?.name || 'A').charAt(0).toUpperCase()}
            </div>
            <button className="topbar__logout" onClick={logout}>
              <HiOutlineLogout />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="admin-layout__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
