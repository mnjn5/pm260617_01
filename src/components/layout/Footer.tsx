import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-hairline bg-canvas py-16">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <p className="mb-1 text-body-sm font-semibold text-ink">ENTERWORLD</p>
            <p className="mb-1 text-caption text-ink-subtle">엔터월드</p>
            <p className="text-caption text-ink-tertiary">
              엔터테인먼트 산업을 선도하는<br />종합 기획사
            </p>
          </div>
          <div>
            <p className="mb-4 text-caption font-medium text-ink-subtle">서비스</p>
            <ul className="space-y-2">
              {[
                { to: '/products', label: '서비스 소개' },
                { to: '/inquiry', label: '온라인 문의' },
                { to: '/community', label: '커뮤니티' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-caption text-ink-tertiary transition-colors hover:text-ink-subtle">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-4 text-caption font-medium text-ink-subtle">회사</p>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-caption text-ink-tertiary transition-colors hover:text-ink-subtle">
                  회사소개
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-4 text-caption font-medium text-ink-subtle">연락처</p>
            <p className="text-caption text-ink-tertiary">contact@enterworld.co.kr</p>
            <p className="mt-1 text-caption text-ink-tertiary">02-0000-0000</p>
            <p className="mt-1 text-caption text-ink-tertiary">서울특별시 강남구</p>
          </div>
        </div>
        <div className="mt-12 border-t border-hairline pt-8">
          <p className="text-caption text-ink-tertiary">
            © {new Date().getFullYear()} 엔터월드(ENTERWORLD). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
