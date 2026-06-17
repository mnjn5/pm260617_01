export default function AboutPage() {
  const history = [
    { year: '2020', event: '회사 설립' },
    { year: '2021', event: '첫 번째 제품 출시' },
    { year: '2022', event: '시리즈 A 투자 유치' },
    { year: '2023', event: '글로벌 시장 진출' },
    { year: '2024', event: '누적 고객 1,000사 달성' },
  ];

  return (
    <div className="py-section">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="mb-2 text-eyebrow font-medium uppercase tracking-widest text-ink-subtle">
            About
          </p>
          <h1 className="font-display text-display-md font-semibold text-ink">회사소개</h1>
        </div>

        {/* Overview */}
        <section className="mb-16 rounded-lg border border-hairline bg-surface-1 p-xxl">
          <h2 className="mb-4 text-headline font-semibold text-ink">회사 개요</h2>
          <p className="text-body-lg text-ink-muted">
            PM-site는 2020년 설립된 B2B 솔루션 전문 기업입니다.
            고객의 비즈니스 문제를 기술로 해결하는 것을 사명으로 삼고 있습니다.
            수백 개 기업 고객의 신뢰를 바탕으로 지속적으로 성장해 왔습니다.
          </p>
        </section>

        {/* Vision & Mission */}
        <section className="mb-16 grid grid-cols-1 gap-lg md:grid-cols-2">
          <div className="rounded-lg border border-hairline bg-surface-1 p-lg">
            <h2 className="mb-3 text-card-title font-semibold text-ink">비전</h2>
            <p className="text-body text-ink-muted">
              모든 기업이 기술을 통해 더 나은 미래를 만들 수 있도록 돕는 글로벌 솔루션 파트너
            </p>
          </div>
          <div className="rounded-lg border border-hairline bg-surface-1 p-lg">
            <h2 className="mb-3 text-card-title font-semibold text-ink">미션</h2>
            <p className="text-body text-ink-muted">
              혁신적인 제품과 신뢰할 수 있는 서비스로 고객의 성장을 가속화한다
            </p>
          </div>
        </section>

        {/* Business Areas */}
        <section className="mb-16">
          <h2 className="mb-8 text-headline font-semibold text-ink">주요 사업 영역</h2>
          <div className="grid grid-cols-1 gap-lg md:grid-cols-3">
            {[
              { title: '엔터프라이즈 소프트웨어', desc: '대기업 맞춤형 ERP 및 업무 자동화 솔루션' },
              { title: 'SaaS 플랫폼', desc: '클라우드 기반 구독형 비즈니스 솔루션' },
              { title: '기술 컨설팅', desc: 'IT 전략 수립 및 디지털 전환 컨설팅' },
            ].map(({ title, desc }) => (
              <div key={title} className="rounded-lg border border-hairline bg-surface-1 p-lg">
                <h3 className="mb-2 text-card-title font-semibold text-ink">{title}</h3>
                <p className="text-body-sm text-ink-muted">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* History */}
        <section className="mb-16">
          <h2 className="mb-8 text-headline font-semibold text-ink">연혁</h2>
          <div className="relative border-l border-hairline pl-8">
            {history.map(({ year, event }) => (
              <div key={year} className="mb-8 last:mb-0">
                <div className="absolute -left-1.5 h-3 w-3 rounded-full bg-primary" />
                <p className="mb-1 text-body-sm font-semibold text-primary">{year}</p>
                <p className="text-body text-ink-muted">{event}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="rounded-lg border border-hairline bg-surface-1 p-lg">
          <h2 className="mb-4 text-card-title font-semibold text-ink">연락처 및 위치</h2>
          <div className="grid grid-cols-1 gap-4 text-body-sm text-ink-muted md:grid-cols-2">
            <div>
              <p className="mb-1 font-medium text-ink">이메일</p>
              <p>contact@pm-site.com</p>
            </div>
            <div>
              <p className="mb-1 font-medium text-ink">전화</p>
              <p>02-0000-0000</p>
            </div>
            <div>
              <p className="mb-1 font-medium text-ink">주소</p>
              <p>서울특별시 강남구 테헤란로 123</p>
            </div>
            <div>
              <p className="mb-1 font-medium text-ink">업무시간</p>
              <p>평일 09:00 – 18:00</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
