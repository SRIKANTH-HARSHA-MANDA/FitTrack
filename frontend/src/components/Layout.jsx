import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  Activity,
  CalendarDays,
  Droplets,
  Dumbbell,
  LogOut,
  Scale,
  Target,
  UserRound
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Layout() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const links = [
    ['/dashboard', 'Overview', Activity],
    ['/workouts', 'Workouts', Dumbbell],
    ['/water', 'Hydration', Droplets],
    ['/weight', 'Weight & BMI', Scale],
    ['/goals', 'Goals', Target],
    ['/history', 'History', CalendarDays],
    ['/profile', 'Profile', UserRound]
  ];

  const firstName =
    user?.name?.split(' ')[0] || 'there';

  const todayLabel = new Intl.DateTimeFormat(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  }).format(new Date());

  const handleLogout = () => {
    logout();
    nav('/login');
  };

  return (
    <div className="app">

      {/* =========================
          SIDEBAR
      ========================= */}

      <aside className="sidebar">

        <div className="sidebar-top">

          {/* BRAND */}

          <div className="brand">
            <div className="brand-mark">
              FT
            </div>

            <div>
              <h1>
                Fit<span>Track</span>
              </h1>

              <small>
                FITNESS COMPANION
              </small>
            </div>
          </div>

          {/* USER */}

          <div className="sidebar-user">

            <div className="sidebar-avatar">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>

            <div className="sidebar-user-info">
              <strong>{firstName}</strong>
              <span>Fitness Journey</span>
            </div>

            <div className="online-dot" />

          </div>

          {/* NAVIGATION */}

          <div className="nav-label">
            MAIN MENU
          </div>

          <nav className="sidebar-nav">

            {links.map(([to, label, Icon]) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  isActive ? 'active' : ''
                }
              >
                <span className="nav-icon">
                  <Icon size={18} strokeWidth={1.8} />
                </span>

                <span className="nav-text">
                  {label}
                </span>

                <span className="nav-arrow" aria-hidden="true" />
              </NavLink>
            ))}

          </nav>

        </div>

        {/* BOTTOM */}

        <div className="sidebar-bottom">

          <div className="sidebar-motivation">
            <span>🔥</span>

            <div>
              <strong>
                Keep going!
              </strong>

              <p>
                Small steps, big results.
              </p>
            </div>
          </div>

          <button
            className="logout"
            onClick={handleLogout}
          >
            <LogOut size={17} strokeWidth={1.8} />
            Logout
          </button>

          <div className="sidebar-footer">
            FitTrack • Your fitness companion
          </div>

        </div>

      </aside>

      {/* =========================
          MAIN CONTENT
      ========================= */}

      <main className="main-content">
        <div className="workspace-bar">
          <div className="workspace-date">
            <CalendarDays size={16} strokeWidth={1.8} />
            <span>{todayLabel}</span>
          </div>
          <div className="workspace-person">
            <span className="workspace-greeting">Your fitness space</span>
            <span className="workspace-avatar">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </span>
          </div>
        </div>
        <Outlet />
      </main>

    </div>
  );
}