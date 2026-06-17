import { Link } from 'react-router-dom';

const ADMIN_MENUS = [
  { to: '/admin/products', label: '제품 관리', desc: '제품 등록 / 수정 / 삭제' },
  { to: '/admin/inquiries', label: '문의 관리', desc: '문의 목록 확인 및 상태 변경' },
  { to: '/admin/posts', label: '게시글 관리', desc: '커뮤니티 게시글 관리' },
  { to: '/admin/users', label: '회원 관리', desc: '회원 목록 조회' },
];

export default function AdminPage() {
  return (
    <div className="py-section">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 font-display text-display-md font-semibold text-ink">관리자</h1>
        <div className="grid grid-cols-1 gap-lg md:grid-cols-2">
          {ADMIN_MENUS.map(({ to, label, desc }) => (
            <Link
              key={to}
              to={to}
              className="rounded-lg border border-hairline bg-surface-1 p-lg transition-colors hover:border-hairline-strong hover:bg-surface-2"
            >
              <h2 className="mb-1 text-card-title font-semibold text-ink">{label}</h2>
              <p className="text-body-sm text-ink-muted">{desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
