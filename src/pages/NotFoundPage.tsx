import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[calc(100vh-56px)] flex-col items-center justify-center py-section text-center">
      <h1 className="mb-4 font-display text-display-md font-semibold text-ink">404</h1>
      <p className="mb-8 text-body-lg text-ink-muted">페이지를 찾을 수 없습니다.</p>
      <Link
        to="/"
        className="rounded-md bg-primary px-[14px] py-2 text-button font-medium text-primary-on transition-colors hover:bg-primary-hover"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
