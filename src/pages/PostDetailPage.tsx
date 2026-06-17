import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../features/auth/AuthContext';
import type { Database } from '../types/database';

type Post = Database['public']['Tables']['posts']['Row'] & {
  profiles: { name: string | null } | null;
};

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user, role } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    supabase
      .from('posts')
      .select('*, profiles(name)')
      .eq('id', id)
      .single()
      .then(({ data, error }) => {
        if (error || !data) { navigate('/community', { replace: true }); return; }
        const postData = data as Post;
        setPost(postData);
        setLoading(false);
        supabase.from('posts').update({ view_count: (postData.view_count ?? 0) + 1 }).eq('id', id);
      });
  }, [id, navigate]);

  async function handleDelete() {
    if (!post || !confirm('게시글을 삭제하시겠습니까?')) return;
    await supabase.from('posts').delete().eq('id', post.id);
    navigate('/community');
  }

  if (loading) {
    return (
      <div className="py-section">
        <div className="max-w-content mx-auto animate-pulse px-4 sm:px-6 lg:px-8">
          <div className="mb-4 h-8 w-2/3 rounded bg-surface-2" />
          <div className="mb-8 h-4 w-1/3 rounded bg-surface-2" />
          <div className="h-48 rounded-lg bg-surface-2" />
        </div>
      </div>
    );
  }

  if (!post) return null;

  const isAuthor = user?.id === post.user_id;
  const canEdit = isAuthor || role === 'admin';

  return (
    <div className="py-section">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/community" className="mb-6 inline-block text-body-sm text-ink-subtle hover:text-ink">
          ← 목록으로
        </Link>

        {/* Header */}
        <div className="mb-6 rounded-lg border border-hairline bg-surface-1 p-lg">
          <div className="mb-3 flex items-start justify-between gap-4">
            <h1 className="font-display text-headline font-semibold text-ink">{post.title}</h1>
            {canEdit && (
              <div className="flex shrink-0 gap-2">
                <Link
                  to={`/community/${post.id}/edit`}
                  className="rounded-md border border-hairline bg-surface-2 px-3 py-1.5 text-caption text-ink transition-colors hover:bg-surface-3"
                >
                  수정
                </Link>
                <button
                  onClick={handleDelete}
                  className="rounded-md border border-red-900 bg-red-950/30 px-3 py-1.5 text-caption text-red-400 transition-colors hover:bg-red-950/60"
                >
                  삭제
                </button>
              </div>
            )}
          </div>
          <div className="flex items-center gap-4 text-caption text-ink-subtle">
            <span>{post.profiles?.name ?? '익명'}</span>
            <span>{new Date(post.created_at).toLocaleDateString('ko-KR')}</span>
            <span>조회 {post.view_count}</span>
          </div>
        </div>

        {/* Content */}
        <div className="rounded-lg border border-hairline bg-surface-1 p-lg">
          <p className="whitespace-pre-wrap text-body text-ink-muted">{post.content}</p>
        </div>
      </div>
    </div>
  );
}
