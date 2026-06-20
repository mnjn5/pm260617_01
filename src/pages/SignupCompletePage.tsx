import { Link } from 'react-router-dom';

export default function SignupCompletePage() {
  return (
    <div className="flex min-h-[calc(100vh-56px)] flex-col items-center justify-center py-section text-center">
      <h1 className="mb-4 font-display text-display-md font-semibold text-ink">회원가입 완료</h1>
      <p className="mb-8 text-body-lg text-ink-muted">회원가입이 완료되었습니다. 로그인 후 이용해주세요.</p>
      <Link
        to="/login"
        className="rounded-md bg-primary px-[14px] py-2 text-button font-medium text-primary-on transition-colors hover:bg-primary-hover"
      >
        로그인하기
      </Link>
    </div>
  );
}
