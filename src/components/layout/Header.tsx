import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/AuthContext';
import { supabase } from '../../lib/supabase';

const NAV_LINKS = [
  { to: '/about', label: '회사소개' },
  { to: '/products', label: '제품소개' },
  { to: '/community', label: '커뮤니티' },
  { to: '/inquiry', label: '온라인 문의' },
];

export default function Header() {
  const { user, role } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate('/');
  }

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-canvas">
      <div className="max-w-content mx-auto flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-body-sm font-semibold tracking-tight text-ink">
          ENTERWORLD
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `text-body-sm transition-colors ${isActive ? 'text-ink' : 'text-ink-subtle hover:text-ink'}`
              }
            >
              {label}
            </NavLink>
          ))}
          {role === 'admin' && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `text-body-sm transition-colors ${isActive ? 'text-primary' : 'text-ink-subtle hover:text-primary'}`
              }
            >
              관리자
            </NavLink>
          )}
        </nav>

        {/* Desktop auth */}
        <div className="hidden items-center gap-2 md:flex">
          {user ? (
            <>
              <Link
                to="/mypage"
                className="rounded-md border border-hairline bg-surface-1 px-[14px] py-2 text-button font-medium text-ink transition-colors hover:bg-surface-2"
              >
                마이페이지
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-md px-[14px] py-2 text-button font-medium text-ink-subtle transition-colors hover:text-ink"
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-md border border-hairline bg-surface-1 px-[14px] py-2 text-button font-medium text-ink transition-colors hover:bg-surface-2"
              >
                로그인
              </Link>
              <Link
                to="/signup"
                className="rounded-md bg-primary px-[14px] py-2 text-button font-medium text-primary-on transition-colors hover:bg-primary-hover"
              >
                시작하기
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex flex-col gap-1.5 p-2 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="메뉴 열기"
        >
          <span className={`block h-0.5 w-5 bg-ink transition-transform ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block h-0.5 w-5 bg-ink transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-5 bg-ink transition-transform ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-hairline bg-canvas md:hidden">
          <nav className="flex flex-col gap-1 px-4 py-3">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 text-body-sm transition-colors ${isActive ? 'bg-surface-1 text-ink' : 'text-ink-subtle hover:text-ink'}`
                }
              >
                {label}
              </NavLink>
            ))}
            {role === 'admin' && (
              <NavLink
                to="/admin"
                onClick={() => setMenuOpen(false)}
                className="rounded-md px-3 py-2 text-body-sm text-ink-subtle hover:text-primary"
              >
                관리자
              </NavLink>
            )}
            <div className="mt-2 flex gap-2 border-t border-hairline pt-2">
              {user ? (
                <>
                  <Link
                    to="/mypage"
                    onClick={() => setMenuOpen(false)}
                    className="flex-1 rounded-md border border-hairline bg-surface-1 px-3 py-2 text-center text-button font-medium text-ink"
                  >
                    마이페이지
                  </Link>
                  <button
                    onClick={() => { setMenuOpen(false); handleLogout(); }}
                    className="flex-1 rounded-md px-3 py-2 text-button font-medium text-ink-subtle"
                  >
                    로그아웃
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="flex-1 rounded-md border border-hairline bg-surface-1 px-3 py-2 text-center text-button font-medium text-ink"
                  >
                    로그인
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMenuOpen(false)}
                    className="flex-1 rounded-md bg-primary px-3 py-2 text-center text-button font-medium text-primary-on"
                  >
                    시작하기
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
