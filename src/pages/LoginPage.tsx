import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

const schema = z.object({
  email: z.string().email('올바른 이메일 형식이 아닙니다.'),
  password: z.string().min(1, '비밀번호를 입력해주세요.'),
});

type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(values: FormValues) {
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });
    if (error) { setError('이메일 또는 비밀번호가 올바르지 않습니다.'); return; }
    navigate('/login/complete');
  }

  return (
    <div className="flex min-h-[calc(100vh-56px)] items-center justify-center py-section px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="font-display text-headline font-semibold text-ink">로그인</h1>
          <p className="mt-2 text-body-sm text-ink-muted">
            계정이 없으신가요?{' '}
            <Link to="/signup" className="text-primary hover:text-primary-hover">
              회원가입
            </Link>
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 rounded-lg border border-hairline bg-surface-1 p-xxl"
        >
          <Input
            id="email"
            label="이메일"
            type="email"
            placeholder="email@example.com"
            error={errors.email?.message}
            {...register('email')}
          />
          <Input
            id="password"
            label="비밀번호"
            type="password"
            placeholder="비밀번호 입력"
            error={errors.password?.message}
            {...register('password')}
          />

          {error && <p className="text-body-sm text-red-400">{error}</p>}

          <Button type="submit" loading={isSubmitting} className="w-full">
            로그인
          </Button>
        </form>
      </div>
    </div>
  );
}
