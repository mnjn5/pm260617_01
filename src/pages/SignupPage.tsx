import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

const schema = z.object({
  name: z.string().min(1, '이름을 입력해주세요.'),
  email: z.string().email('올바른 이메일 형식이 아닙니다.'),
  password: z.string().min(8, '비밀번호는 8자 이상이어야 합니다.'),
  phone: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function SignupPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(values: FormValues) {
    setError(null);
    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: { data: { name: values.name, phone: values.phone } },
    });
    if (error) { setError(error.message); return; }
    navigate('/signup/complete');
  }

  return (
    <div className="flex min-h-[calc(100vh-56px)] items-center justify-center py-section px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="font-display text-headline font-semibold text-ink">회원가입</h1>
          <p className="mt-2 text-body-sm text-ink-muted">
            이미 계정이 있으신가요?{' '}
            <Link to="/login" className="text-primary hover:text-primary-hover">
              로그인
            </Link>
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 rounded-lg border border-hairline bg-surface-1 p-xxl"
        >
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
          <Input
            id="password"
            label="비밀번호 *"
            type="password"
            placeholder="8자 이상"
            error={errors.password?.message}
            {...register('password')}
          />
          <Input
            id="phone"
            label="연락처"
            placeholder="010-0000-0000"
            {...register('phone')}
          />

          {error && <p className="text-body-sm text-red-400">{error}</p>}

          <Button type="submit" loading={isSubmitting} className="w-full">
            가입하기
          </Button>
        </form>
      </div>
    </div>
  );
}
