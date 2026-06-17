import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { Database } from '../../types/database';

type Post = Database['public']['Tables']['posts']['Row'] & {
  profiles: { name: string | null } | null;
};

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchPosts() {
    const { data } = await supabase
      .from('posts')
      .select('*, profiles(name)')
      .order('created_at', { ascending: false });
    setPosts((data as Post[]) ?? []);
    setLoading(false);
  }

  useEffect(() => { fetchPosts(); }, []);

  async function togglePublish(id: string, current: boolean) {
    await supabase.from('posts').update({ is_published: !current }).eq('id', id);
    fetchPosts();
  }

  async function handleDelete(id: string) {
    if (!confirm('게시글을 삭제하시겠습니까?')) return;
    await supabase.from('posts').delete().eq('id', id);
    fetchPosts();
  }

  return (
    <div className="py-section">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="mb-6 font-display text-display-md font-semibold text-ink">게시글 관리</h1>

        {loading ? (
          <div className="animate-pulse space-y-2">
            {[1, 2, 3].map((i) => <div key={i} className="h-14 rounded-lg bg-surface-2" />)}
          </div>
        ) : posts.length === 0 ? (
          <div className="rounded-lg border border-hairline bg-surface-1 p-xxl text-center">
            <p className="text-body text-ink-muted">게시글이 없습니다.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-hairline">
            <table className="w-full text-body-sm">
              <thead className="border-b border-hairline bg-surface-2">
                <tr>
                  {['카테고리', '제목', '작성자', '공개', '작성일', ''].map((h) => (
                    <th key={h} className="px-4 py-3 text-left font-medium text-ink-subtle">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline bg-surface-1">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-surface-2">
                    <td className="px-4 py-3">
                      <span className="rounded-xs bg-surface-3 px-1.5 py-0.5 text-caption text-ink-subtle">
                        {post.category === 'notice' ? '공지' : post.category === 'qna' ? 'Q&A' : '자유'}
                      </span>
                    </td>
                    <td className="max-w-xs truncate px-4 py-3 text-ink">{post.title}</td>
                    <td className="px-4 py-3 text-ink-muted">{post.profiles?.name ?? '-'}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => togglePublish(post.id, post.is_published)}
                        className={`rounded-xs px-1.5 py-0.5 text-caption transition-colors ${
                          post.is_published
                            ? 'bg-semantic-success/20 text-semantic-success hover:bg-semantic-success/30'
                            : 'bg-surface-3 text-ink-subtle hover:bg-surface-4'
                        }`}
                      >
                        {post.is_published ? '공개' : '비공개'}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-ink-tertiary">
                      {new Date(post.created_at).toLocaleDateString('ko-KR')}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="text-caption text-red-400 hover:text-red-300"
                      >
                        삭제
                      </button>
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
