import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import {
  HiOutlineHome,
  HiOutlineUsers,
  HiOutlineUserAdd,
  HiOutlineShieldCheck,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from 'react-icons/hi';

const navItems = [
  { to: '/', label: 'Dashboard', icon: HiOutlineHome },
  { to: '/users', label: 'Users', icon: HiOutlineUsers },
  { to: '/register-child', label: 'Register Child', icon: HiOutlineUserAdd },
  { to: '/vaccines', label: 'Vaccines', icon: HiOutlineShieldCheck },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={`sidebar ${collapsed ? 'sidebar--collapsed' : ''}`}
    >
      {/* Brand */}
      <div className="sidebar__brand">
        {!collapsed && (
          <div className="sidebar__brand-text">
            <span className="sidebar__brand-icon">💉</span>
            <span>VaxAdmin</span>
          </div>
        )}
        <button
          className="sidebar__toggle"
          onClick={() => setCollapsed(!collapsed)}
          aria-label="Toggle sidebar"
        >
          {collapsed ? <HiOutlineChevronRight /> : <HiOutlineChevronLeft />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="sidebar__nav">
        {navItems.map(({ to, label, icon: Icon }) => {
          const isActive = location.pathname === to;
          return (
            <NavLink
              key={to}
              to={to}
              className={`sidebar__link ${isActive ? 'sidebar__link--active' : ''}`}
              title={label}
            >
              <Icon className="sidebar__link-icon" />
              {!collapsed && <span className="sidebar__link-label">{label}</span>}
              {isActive && <div className="sidebar__link-indicator" />}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="sidebar__footer">
          <p>Vaccination Tracker</p>
          <p className="sidebar__footer-version">v1.0.0</p>
        </div>
      )}
    </aside>
  );
}
