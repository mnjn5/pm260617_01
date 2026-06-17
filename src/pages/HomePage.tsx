import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { Database } from '../types/database';

type Product = Database['public']['Tables']['products']['Row'];
type Post = Database['public']['Tables']['posts']['Row'];

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
      <section className="py-section">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="mb-4 text-eyebrow font-medium uppercase tracking-widest text-ink-subtle">
            기업형 홈페이지
          </p>
          <h1 className="mb-6 font-display text-display-lg font-semibold text-ink sm:text-display-xl">
            신뢰할 수 있는<br />비즈니스 파트너
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-body-lg text-ink-muted">
            최고의 제품과 서비스로 고객의 성공을 함께 만들어갑니다.
            지금 바로 시작하세요.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/products"
              className="rounded-md bg-primary px-[14px] py-2 text-button font-medium text-primary-on transition-colors hover:bg-primary-hover"
            >
              제품 살펴보기
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

      {/* Features */}
      <section className="py-section">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <p className="mb-2 text-center text-eyebrow font-medium uppercase tracking-widest text-ink-subtle">
            주요 강점
          </p>
          <h2 className="mb-12 text-center font-display text-display-md font-semibold text-ink">
            왜 PM-site인가
          </h2>
          <div className="grid grid-cols-1 gap-lg md:grid-cols-3">
            {[
              { title: '검증된 기술력', desc: '다년간의 경험과 전문 기술로 최고의 솔루션을 제공합니다.' },
              { title: '신속한 지원', desc: '전담 지원팀이 언제나 빠르게 응답합니다.' },
              { title: '지속적 혁신', desc: '최신 트렌드를 반영한 제품을 끊임없이 개발합니다.' },
            ].map(({ title, desc }) => (
              <div key={title} className="rounded-lg border border-hairline bg-surface-1 p-lg">
                <h3 className="mb-2 text-card-title font-semibold text-ink">{title}</h3>
                <p className="text-body-sm text-ink-muted">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      {products.length > 0 && (
        <section className="py-section">
          <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
            <p className="mb-2 text-center text-eyebrow font-medium uppercase tracking-widest text-ink-subtle">
              제품
            </p>
            <h2 className="mb-12 text-center font-display text-display-md font-semibold text-ink">
              대표 제품
            </h2>
            <div className="grid grid-cols-1 gap-lg md:grid-cols-3">
              {products.map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="group rounded-lg border border-hairline bg-surface-1 p-lg transition-colors hover:border-hairline-strong hover:bg-surface-2"
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
                모든 제품 보기 →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <section className="py-section">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-hairline bg-surface-1 p-xxl text-center">
            <h2 className="mb-4 font-display text-headline font-semibold text-ink">
              지금 바로 문의하세요
            </h2>
            <p className="mb-8 text-body-lg text-ink-muted">
              제품 관련 궁금한 점을 무엇이든 물어보세요.
            </p>
            <Link
              to="/inquiry"
              className="inline-flex rounded-md bg-primary px-[14px] py-2 text-button font-medium text-primary-on transition-colors hover:bg-primary-hover"
            >
              온라인 문의
            </Link>
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
