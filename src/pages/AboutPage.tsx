export default function AboutPage() {
  const history = [
    { year: '2015', event: '엔터월드 설립' },
    { year: '2017', event: '소속 아티스트 첫 정규 앨범 발매 및 데뷔 성공' },
    { year: '2019', event: '대형 콘서트 프로덕션 사업부 출범' },
    { year: '2021', event: '일본·동남아 시장 진출, 해외 투어 기획' },
    { year: '2023', event: '누적 콘서트 관객 100만 명 달성' },
    { year: '2024', event: '소속 아티스트 200인 달성, 글로벌 엔터테인먼트 그룹으로 성장' },
  ];

  return (
    <div className="py-section">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="mb-2 text-eyebrow font-medium uppercase tracking-widest text-primary">
            About
          </p>
          <h1 className="font-display text-display-md font-semibold text-ink">회사소개</h1>
        </div>

        {/* Overview */}
        <section className="mb-16 overflow-hidden rounded-lg border border-hairline bg-surface-1">
          <img
            src="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1280&q=80&auto=format&fit=crop"
            alt="엔터월드 공연 현장"
            className="h-64 w-full object-cover"
          />
          <div className="p-xxl">
            <h2 className="mb-4 text-headline font-semibold text-ink">회사 개요</h2>
            <p className="text-body-lg text-ink-muted">
              엔터월드는 2015년 설립된 종합 엔터테인먼트 기획사입니다.
              아티스트 발굴과 육성, 대형 콘서트 프로덕션, 콘텐츠 제작을 중심으로
              대한민국 엔터테인먼트 산업을 선도해 왔습니다.
              10년의 업력과 200여 명의 소속 아티스트, 누적 관객 100만 명을 바탕으로
              국내를 넘어 아시아 전역으로 무대를 넓혀가고 있습니다.
            </p>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="mb-16 grid grid-cols-1 gap-lg md:grid-cols-2">
          <div className="rounded-lg border border-hairline bg-surface-1 p-lg">
            <h2 className="mb-3 text-card-title font-semibold text-ink">비전</h2>
            <p className="text-body text-ink-muted">
              아시아를 대표하는 글로벌 엔터테인먼트 그룹으로 성장하여,
              한국 문화의 세계화를 이끈다.
            </p>
          </div>
          <div className="rounded-lg border border-hairline bg-surface-1 p-lg">
            <h2 className="mb-3 text-card-title font-semibold text-ink">미션</h2>
            <p className="text-body text-ink-muted">
              아티스트의 꿈을 실현하고, 팬들에게 최고의 감동을 선사하며,
              엔터테인먼트 산업의 새로운 기준을 만든다.
            </p>
          </div>
        </section>

        {/* Business Areas */}
        <section className="mb-16">
          <h2 className="mb-8 text-headline font-semibold text-ink">주요 사업 영역</h2>
          <div className="grid grid-cols-1 gap-lg md:grid-cols-3">
            {[
              {
                title: '아티스트 매니지먼트',
                desc: '신인 발굴부터 국내외 활동 지원, 브랜드 관리까지 아티스트의 전 생애를 함께합니다.',
              },
              {
                title: '이벤트 프로덕션',
                desc: '콘서트, 팬미팅, 시상식, 페스티벌 등 모든 엔터테인먼트 이벤트를 기획·운영합니다.',
              },
              {
                title: '콘텐츠 제작',
                desc: '음원 프로듀싱, 뮤직비디오, 숏폼 콘텐츠 등 디지털 시대에 맞는 콘텐츠를 제작합니다.',
              },
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
              <p>contact@enterworld.co.kr</p>
            </div>
            <div>
              <p className="mb-1 font-medium text-ink">전화</p>
              <p>02-0000-0000</p>
            </div>
            <div>
              <p className="mb-1 font-medium text-ink">주소</p>
              <p>서울특별시 강남구 테헤란로 123 엔터월드빌딩</p>
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
