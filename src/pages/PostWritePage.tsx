import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../features/auth/AuthContext';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';

const schema = z.object({
  category: z.enum(['notice', 'free', 'qna']),
  title: z.string().min(1, '제목을 입력해주세요.'),
  content: z.string().min(1, '내용을 입력해주세요.'),
});

type FormValues = z.infer<typeof schema>;

export default function PostWritePage() {
  const { user, role } = useAuth();
  const navigate = useNavigate();

  const categoryOptions = [
    ...(role === 'admin' ? [{ value: 'notice', label: '공지사항' }] : []),
    { value: 'free', label: '자유게시판' },
    { value: 'qna', label: 'Q&A' },
  ];

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { category: 'free' },
  });

  async function onSubmit(values: FormValues) {
    if (!user) return;
    const { data, error } = await supabase.from('posts').insert({
      user_id: user.id,
      category: values.category,
      title: values.title,
      content: values.content,
    }).select('id').single();

    if (error || !data) return;
    navigate(`/community/${data.id}`);
  }

  return (
    <div className="py-section">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-display text-display-md font-semibold text-ink">게시글 작성</h1>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto max-w-2xl space-y-5 rounded-lg border border-hairline bg-surface-1 p-xxl"
        >
          <Select
            id="category"
            label="카테고리"
            options={categoryOptions}
            {...register('category')}
          />
          <Input
            id="title"
            label="제목 *"
            placeholder="제목을 입력해주세요"
            error={errors.title?.message}
            {...register('title')}
          />
          <Textarea
            id="content"
            label="내용 *"
            rows={12}
            placeholder="내용을 입력해주세요"
            error={errors.content?.message}
            {...register('content')}
          />
          <div className="flex gap-3">
            <Button
              type="button"
              variant="secondary"
              className="flex-1"
              onClick={() => navigate('/community')}
            >
              취소
            </Button>
            <Button type="submit" loading={isSubmitting} className="flex-1">
              등록
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
