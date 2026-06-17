import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { Database } from '../types/database';

type Product = Database['public']['Tables']['products']['Row'];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from('products')
      .select('*')
      .eq('is_published', true)
      .order('sort_order')
      .then(({ data, error }) => {
        if (error) setError('제품 목록을 불러오는 데 실패했습니다.');
        else setProducts(data ?? []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="py-section">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-2 text-eyebrow font-medium uppercase tracking-widest text-ink-subtle">Products</p>
          <h1 className="font-display text-display-md font-semibold text-ink">제품소개</h1>
        </div>

        {loading && (
          <div className="grid grid-cols-1 gap-lg md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse rounded-lg border border-hairline bg-surface-1 p-lg">
                <div className="mb-4 h-40 rounded-md bg-surface-3" />
                <div className="mb-2 h-5 w-3/4 rounded bg-surface-3" />
                <div className="h-4 w-full rounded bg-surface-3" />
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-hairline bg-surface-1 p-lg text-center text-body text-ink-muted">
            {error}
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="rounded-lg border border-hairline bg-surface-1 p-xxl text-center">
            <p className="text-body text-ink-muted">등록된 제품이 없습니다.</p>
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 gap-lg md:grid-cols-3">
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="group rounded-lg border border-hairline bg-surface-1 transition-colors hover:border-hairline-strong hover:bg-surface-2"
              >
                {product.thumbnail_url ? (
                  <img
                    src={product.thumbnail_url}
                    alt={product.title}
                    className="h-48 w-full rounded-t-lg object-cover"
                  />
                ) : (
                  <div className="h-48 rounded-t-lg bg-surface-3" />
                )}
                <div className="p-lg">
                  <h2 className="mb-2 text-card-title font-semibold text-ink">{product.title}</h2>
                  {product.summary && (
                    <p className="text-body-sm text-ink-muted">{product.summary}</p>
                  )}
                  <p className="mt-4 text-body-sm text-primary group-hover:text-primary-hover">
                    자세히 보기 →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
