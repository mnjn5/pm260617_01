import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { Database } from '../types/database';

type Product = Database['public']['Tables']['products']['Row'];
type ProductImage = Database['public']['Tables']['product_images']['Row'];
type ProductFeature = Database['public']['Tables']['product_features']['Row'];

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [images, setImages] = useState<ProductImage[]>([]);
  const [features, setFeatures] = useState<ProductFeature[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;

    Promise.all([
      supabase.from('products').select('*').eq('id', id).single(),
      supabase.from('product_images').select('*').eq('product_id', id).order('sort_order'),
      supabase.from('product_features').select('*').eq('product_id', id).order('sort_order'),
    ]).then(([{ data: product, error }, { data: images }, { data: features }]) => {
      if (error || !product) { setNotFound(true); }
      else {
        setProduct(product);
        setImages(images ?? []);
        setFeatures(features ?? []);
      }
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="py-section">
        <div className="max-w-content mx-auto animate-pulse px-4 sm:px-6 lg:px-8">
          <div className="mb-4 h-8 w-1/2 rounded bg-surface-2" />
          <div className="mb-8 h-4 w-full rounded bg-surface-2" />
          <div className="h-64 rounded-lg bg-surface-2" />
        </div>
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div className="py-section text-center">
        <h1 className="mb-4 text-headline font-semibold text-ink">제품을 찾을 수 없습니다.</h1>
        <Link to="/products" className="text-body-sm text-primary hover:text-primary-hover">
          ← 제품 목록으로
        </Link>
      </div>
    );
  }

  return (
    <div className="py-section">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/products" className="mb-8 inline-block text-body-sm text-ink-subtle hover:text-ink">
          ← 제품 목록
        </Link>

        <h1 className="mb-4 font-display text-display-md font-semibold text-ink">{product.title}</h1>
        {product.summary && (
          <p className="mb-8 text-body-lg text-ink-muted">{product.summary}</p>
        )}

        {/* Thumbnail */}
        {product.thumbnail_url && (
          <div className="mb-8 overflow-hidden rounded-xl border border-hairline bg-surface-1">
            <img src={product.thumbnail_url} alt={product.title} className="w-full object-cover" />
          </div>
        )}

        {/* Description */}
        {product.description && (
          <section className="mb-8 rounded-lg border border-hairline bg-surface-1 p-lg">
            <h2 className="mb-4 text-card-title font-semibold text-ink">제품 설명</h2>
            <p className="whitespace-pre-wrap text-body text-ink-muted">{product.description}</p>
          </section>
        )}

        {/* Images */}
        {images.length > 0 && (
          <section className="mb-8">
            <h2 className="mb-4 text-card-title font-semibold text-ink">상세 이미지</h2>
            <div className="grid grid-cols-1 gap-lg md:grid-cols-2">
              {images.map((img) => (
                <div key={img.id} className="overflow-hidden rounded-xl border border-hairline bg-surface-1">
                  <img src={img.image_url} alt={img.alt_text ?? product.title} className="w-full object-cover" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Features */}
        {features.length > 0 && (
          <section className="mb-8">
            <h2 className="mb-4 text-card-title font-semibold text-ink">주요 기능</h2>
            <div className="grid grid-cols-1 gap-lg md:grid-cols-2">
              {features.map((feat) => (
                <div key={feat.id} className="rounded-lg border border-hairline bg-surface-1 p-lg">
                  <h3 className="mb-2 text-body font-semibold text-ink">{feat.title}</h3>
                  {feat.description && (
                    <p className="text-body-sm text-ink-muted">{feat.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="rounded-lg border border-hairline bg-surface-1 p-lg text-center">
          <p className="mb-4 text-body-lg font-semibold text-ink">이 제품에 대해 더 알고 싶으신가요?</p>
          <Link
            to="/inquiry"
            className="inline-flex rounded-md bg-primary px-[14px] py-2 text-button font-medium text-primary-on transition-colors hover:bg-primary-hover"
          >
            문의하기
          </Link>
        </div>
      </div>
    </div>
  );
}
