import { Link } from 'react-router-dom';

export default function LoginCompletePage() {
  return (
    <div className="flex min-h-[calc(100vh-56px)] flex-col items-center justify-center py-section text-center">
      <h1 className="mb-4 font-display text-display-md font-semibold text-ink">로그인 완료</h1>
      <p className="mb-8 text-body-lg text-ink-muted">로그인이 완료되었습니다.</p>
      <Link
        to="/"
        className="rounded-md bg-primary px-[14px] py-2 text-button font-medium text-primary-on transition-colors hover:bg-primary-hover"
      >
        홈으로 이동
      </Link>
    </div>
  );
}
