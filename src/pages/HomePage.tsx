import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { Database } from '../types/database';

type Product = Database['public']['Tables']['products']['Row'];
type Post = Database['public']['Tables']['posts']['Row'];

const SERVICES = [
  {
    icon: '🎤',
    title: '아티스트 매니지먼트',
    desc: '국내외 아티스트 발굴·육성부터 전속 계약, 스케줄 관리까지 토탈 매니지먼트를 제공합니다.',
  },
  {
    icon: '🎪',
    title: '이벤트 프로덕션',
    desc: '콘서트, 팬미팅, 시상식 등 대형 이벤트의 기획·연출·운영을 원스톱으로 진행합니다.',
  },
  {
    icon: '🎬',
    title: '콘텐츠 제작',
    desc: '뮤직비디오, 앨범 프로듀싱, 디지털 콘텐츠까지 창의적인 콘텐츠를 제작합니다.',
  },
];

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    supabase
      .from('products')
      .select('*')
      .eq('is_published', true)
      .order('sort_order')
      .limit(3)
      .then(({ data }) => setProducts(data ?? []));

    supabase
      .from('posts')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false })
      .limit(3)
      .then(({ data }) => setPosts(data ?? []));
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[640px] items-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=1920&q=80&auto=format&fit=crop"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-canvas via-canvas/85 to-canvas/30" />
        <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-section">
          <p className="mb-4 text-eyebrow font-medium uppercase tracking-widest text-primary">
            ENTERWORLD
          </p>
          <h1 className="mb-6 max-w-2xl font-display text-display-lg font-semibold text-ink sm:text-display-xl">
            엔터테인먼트의<br />새로운 기준
          </h1>
          <p className="mb-10 max-w-xl text-body-lg text-ink-muted">
            아티스트 매니지먼트부터 대형 이벤트 프로덕션, 콘텐츠 제작까지<br />
            엔터월드가 함께합니다.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/products"
              className="rounded-md bg-primary px-[14px] py-2 text-button font-medium text-primary-on transition-colors hover:bg-primary-hover"
            >
              서비스 알아보기
            </Link>
            <Link
              to="/inquiry"
              className="rounded-md border border-hairline bg-surface-1 px-[14px] py-2 text-button font-medium text-ink transition-colors hover:bg-surface-2"
            >
              문의하기
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-hairline bg-surface-1">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 divide-x divide-hairline md:grid-cols-4">
            {[
              { value: '200+', label: '소속 아티스트' },
              { value: '500+', label: '프로덕션 공연' },
              { value: '1천만+', label: '누적 관객' },
              { value: '10년+', label: '업력' },
            ].map(({ value, label }) => (
              <div key={label} className="px-lg py-xl text-center">
                <p className="mb-1 font-display text-display-md font-semibold text-primary">{value}</p>
                <p className="text-body-sm text-ink-muted">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-section">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <p className="mb-2 text-center text-eyebrow font-medium uppercase tracking-widest text-primary">
            SERVICES
          </p>
          <h2 className="mb-12 text-center font-display text-display-md font-semibold text-ink">
            핵심 사업 영역
          </h2>
          <div className="grid grid-cols-1 gap-lg md:grid-cols-3">
            {SERVICES.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="rounded-lg border border-hairline bg-surface-1 p-lg transition-colors hover:border-primary/40 hover:bg-surface-2"
              >
                <span className="mb-4 block text-4xl">{icon}</span>
                <h3 className="mb-2 text-card-title font-semibold text-ink">{title}</h3>
                <p className="text-body-sm text-ink-muted">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase image band */}
      <section className="py-section">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-lg md:grid-cols-2">
            <div className="relative overflow-hidden rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80&auto=format&fit=crop"
                alt="대형 콘서트 현장"
                className="h-72 w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-canvas/80 to-transparent" />
              <div className="absolute bottom-0 p-lg">
                <p className="text-body-sm font-medium text-primary">CONCERT</p>
                <p className="text-card-title font-semibold text-ink">대형 공연 프로덕션</p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg">
              <img
                src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80&auto=format&fit=crop"
                alt="아티스트 활동"
                className="h-72 w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-canvas/80 to-transparent" />
              <div className="absolute bottom-0 p-lg">
                <p className="text-body-sm font-medium text-primary">ARTIST</p>
                <p className="text-card-title font-semibold text-ink">아티스트 매니지먼트</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products from DB */}
      {products.length > 0 && (
        <section className="py-section">
          <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
            <p className="mb-2 text-center text-eyebrow font-medium uppercase tracking-widest text-primary">
              SERVICES
            </p>
            <h2 className="mb-12 text-center font-display text-display-md font-semibold text-ink">
              대표 서비스
            </h2>
            <div className="grid grid-cols-1 gap-lg md:grid-cols-3">
              {products.map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="group rounded-lg border border-hairline bg-surface-1 p-lg transition-colors hover:border-primary/40 hover:bg-surface-2"
                >
                  {product.thumbnail_url ? (
                    <img
                      src={product.thumbnail_url}
                      alt={product.title}
                      className="mb-4 h-40 w-full rounded-md object-cover"
                    />
                  ) : (
                    <div className="mb-4 h-40 rounded-md bg-surface-3" />
                  )}
                  <h3 className="mb-2 text-card-title font-semibold text-ink">{product.title}</h3>
                  {product.summary && (
                    <p className="text-body-sm text-ink-muted">{product.summary}</p>
                  )}
                </Link>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                to="/products"
                className="text-body-sm text-primary transition-colors hover:text-primary-hover"
              >
                모든 서비스 보기 →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <section className="py-section">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1280&q=80&auto=format&fit=crop"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-canvas/80" />
            <div className="relative p-xxl text-center">
              <h2 className="mb-4 font-display text-headline font-semibold text-ink">
                엔터월드와 함께 새로운 무대를 열어보세요
              </h2>
              <p className="mb-8 text-body-lg text-ink-muted">
                아티스트, 기획사, 이벤트 관계자 모두를 위한 파트너가 되겠습니다.
              </p>
              <Link
                to="/inquiry"
                className="inline-flex rounded-md bg-primary px-[14px] py-2 text-button font-medium text-primary-on transition-colors hover:bg-primary-hover"
              >
                지금 문의하기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      {posts.length > 0 && (
        <section className="py-section">
          <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="font-display text-headline font-semibold text-ink">최근 게시글</h2>
              <Link to="/community" className="text-body-sm text-primary hover:text-primary-hover">
                더 보기 →
              </Link>
            </div>
            <div className="divide-y divide-hairline rounded-lg border border-hairline bg-surface-1">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  to={`/community/${post.id}`}
                  className="flex items-center justify-between p-lg transition-colors hover:bg-surface-2"
                >
                  <div>
                    <span className="mr-2 text-caption text-ink-subtle">
                      {post.category === 'notice' ? '[공지]' : post.category === 'qna' ? '[Q&A]' : '[자유]'}
                    </span>
                    <span className="text-body-sm text-ink">{post.title}</span>
                  </div>
                  <span className="text-caption text-ink-tertiary">
                    {new Date(post.created_at).toLocaleDateString('ko-KR')}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
