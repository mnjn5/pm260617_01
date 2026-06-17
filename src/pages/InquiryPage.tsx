import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '../lib/supabase';
import { useAuth } from '../features/auth/AuthContext';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';

const schema = z.object({
  name: z.string().min(1, '이름을 입력해주세요.'),
  email: z.string().email('올바른 이메일 형식이 아닙니다.'),
  phone: z.string().optional(),
  type: z.string().optional(),
  title: z.string().min(1, '제목을 입력해주세요.'),
  content: z.string().min(10, '내용을 10자 이상 입력해주세요.'),
});

type FormValues = z.infer<typeof schema>;

const INQUIRY_TYPES = [
  { value: '', label: '문의 유형 선택' },
  { value: '일반 문의', label: '일반 문의' },
  { value: '제품 문의', label: '제품 문의' },
  { value: '기타', label: '기타' },
];

export default function InquiryPage() {
  const { user } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(values: FormValues) {
    setServerError(null);
    const { error } = await supabase.from('inquiries').insert({
      user_id: user?.id ?? null,
      name: values.name,
      email: values.email,
      phone: values.phone || null,
      type: values.type || null,
      title: values.title,
      content: values.content,
    });

    if (error) { setServerError('문의 접수 중 오류가 발생했습니다. 다시 시도해주세요.'); return; }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="py-section">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-lg rounded-lg border border-hairline bg-surface-1 p-xxl text-center">
            <div className="mb-4 text-4xl">✓</div>
            <h2 className="mb-2 text-headline font-semibold text-ink">문의가 접수되었습니다</h2>
            <p className="text-body text-ink-muted">
              담당자 확인 후 이메일로 답변 드리겠습니다.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-section">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-2 text-eyebrow font-medium uppercase tracking-widest text-ink-subtle">Contact</p>
          <h1 className="font-display text-display-md font-semibold text-ink">온라인 문의</h1>
          <p className="mt-4 text-body-lg text-ink-muted">
            궁금한 점을 남겨주시면 빠르게 답변 드리겠습니다.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto max-w-2xl space-y-5 rounded-lg border border-hairline bg-surface-1 p-xxl"
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Input
              id="name"
              label="이름 *"
              placeholder="홍길동"
              error={errors.name?.message}
              {...register('name')}
            />
            <Input
              id="email"
              label="이메일 *"
              type="email"
              placeholder="email@example.com"
              error={errors.email?.message}
              {...register('email')}
            />
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Input
              id="phone"
              label="연락처"
              placeholder="010-0000-0000"
              {...register('phone')}
            />
            <Select
              id="type"
              label="문의 유형"
              options={INQUIRY_TYPES}
              {...register('type')}
            />
          </div>
          <Input
            id="title"
            label="제목 *"
            placeholder="문의 제목을 입력해주세요"
            error={errors.title?.message}
            {...register('title')}
          />
          <Textarea
            id="content"
            label="내용 *"
            rows={6}
            placeholder="문의 내용을 입력해주세요"
            error={errors.content?.message}
            {...register('content')}
          />

          {serverError && (
            <p className="text-body-sm text-red-400">{serverError}</p>
          )}

          <Button type="submit" loading={isSubmitting} className="w-full">
            문의 접수
          </Button>
        </form>
      </div>
    </div>
  );
}
