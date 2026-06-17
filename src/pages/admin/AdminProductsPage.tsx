import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '../../lib/supabase';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Button } from '../../components/ui/Button';
import type { Database } from '../../types/database';

type Product = Database['public']['Tables']['products']['Row'];

const schema = z.object({
  title: z.string().min(1, '제목을 입력해주세요.'),
  summary: z.string().optional(),
  description: z.string().optional(),
  thumbnail_url: z.string().optional(),
  sort_order: z.coerce.number().default(0),
  is_published: z.boolean().default(true),
});

type FormValues = z.infer<typeof schema>;

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { sort_order: 0, is_published: true },
  });

  async function fetchProducts() {
    const { data } = await supabase.from('products').select('*').order('sort_order');
    setProducts(data ?? []);
    setLoading(false);
  }

  useEffect(() => { fetchProducts(); }, []);

  function openCreate() {
    setEditing(null);
    reset({ sort_order: 0, is_published: true });
    setShowForm(true);
  }

  function openEdit(product: Product) {
    setEditing(product);
    setValue('title', product.title);
    setValue('summary', product.summary ?? '');
    setValue('description', product.description ?? '');
    setValue('thumbnail_url', product.thumbnail_url ?? '');
    setValue('sort_order', product.sort_order);
    setValue('is_published', product.is_published);
    setShowForm(true);
  }

  async function onSubmit(values: FormValues) {
    const payload = {
      title: values.title,
      summary: values.summary || null,
      description: values.description || null,
      thumbnail_url: values.thumbnail_url || null,
      sort_order: values.sort_order,
      is_published: values.is_published,
    };

    if (editing) {
      await supabase.from('products').update(payload).eq('id', editing.id);
    } else {
      await supabase.from('products').insert(payload);
    }
    setShowForm(false);
    fetchProducts();
  }

  async function handleDelete(id: string) {
    if (!confirm('제품을 삭제하시겠습니까? 연관된 이미지와 기능도 함께 삭제됩니다.')) return;
    await supabase.from('products').delete().eq('id', id);
    fetchProducts();
  }

  return (
    <div className="py-section">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="font-display text-display-md font-semibold text-ink">제품 관리</h1>
          <Button onClick={openCreate}>+ 제품 등록</Button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="mb-8 rounded-lg border border-hairline bg-surface-1 p-lg">
            <h2 className="mb-4 text-card-title font-semibold text-ink">
              {editing ? '제품 수정' : '제품 등록'}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input id="title" label="제목 *" error={errors.title?.message} {...register('title')} />
              <Input id="summary" label="요약" {...register('summary')} />
              <Textarea id="description" label="설명" rows={4} {...register('description')} />
              <Input id="thumbnail_url" label="썸네일 URL" {...register('thumbnail_url')} />
              <div className="grid grid-cols-2 gap-4">
                <Input id="sort_order" label="정렬 순서" type="number" {...register('sort_order')} />
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-2 text-body-sm text-ink">
                    <input type="checkbox" {...register('is_published')} className="rounded" />
                    공개
                  </label>
                </div>
              </div>
              <div className="flex gap-3">
                <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>취소</Button>
                <Button type="submit" loading={isSubmitting}>{editing ? '수정' : '등록'}</Button>
              </div>
            </form>
          </div>
        )}

        {/* Table */}
        {loading ? (
          <div className="animate-pulse space-y-2">
            {[1, 2, 3].map((i) => <div key={i} className="h-14 rounded-lg bg-surface-2" />)}
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-lg border border-hairline bg-surface-1 p-xxl text-center">
            <p className="text-body text-ink-muted">등록된 제품이 없습니다.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-hairline">
            <table className="w-full text-body-sm">
              <thead className="border-b border-hairline bg-surface-2">
                <tr>
                  {['제목', '정렬', '공개', '등록일', ''].map((h) => (
                    <th key={h} className="px-4 py-3 text-left font-medium text-ink-subtle">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline bg-surface-1">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-surface-2">
                    <td className="px-4 py-3 text-ink">{p.title}</td>
                    <td className="px-4 py-3 text-ink-muted">{p.sort_order}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-xs px-1.5 py-0.5 text-caption ${p.is_published ? 'bg-semantic-success/20 text-semantic-success' : 'bg-surface-3 text-ink-subtle'}`}>
                        {p.is_published ? '공개' : '비공개'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-ink-tertiary">
                      {new Date(p.created_at).toLocaleDateString('ko-KR')}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => openEdit(p)} className="text-caption text-primary hover:text-primary-hover">수정</button>
                        <button onClick={() => handleDelete(p.id)} className="text-caption text-red-400 hover:text-red-300">삭제</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
