import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../features/auth/AuthContext';
import type { Database, PostCategory } from '../types/database';

type Post = Database['public']['Tables']['posts']['Row'] & {
  profiles: { name: string | null } | null;
};

const TABS: { value: PostCategory | 'all'; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'notice', label: '공지' },
  { value: 'free', label: '자유' },
  { value: 'qna', label: 'Q&A' },
];

export default function CommunityPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<PostCategory | 'all'>('all');

  useEffect(() => {
    setLoading(true);
    let query = supabase
      .from('posts')
      .select('*, profiles(name)')
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (activeTab !== 'all') query = query.eq('category', activeTab);

    query.then(({ data }) => {
      setPosts((data as Post[]) ?? []);
      setLoading(false);
    });
  }, [activeTab]);

  return (
    <div className="py-section">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="mb-1 text-eyebrow font-medium uppercase tracking-widest text-ink-subtle">Community</p>
            <h1 className="font-display text-display-md font-semibold text-ink">커뮤니티</h1>
          </div>
          {user && (
            <Link
              to="/community/new"
              className="rounded-md bg-primary px-[14px] py-2 text-button font-medium text-primary-on transition-colors hover:bg-primary-hover"
            >
              글쓰기
            </Link>
          )}
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-2">
          {TABS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setActiveTab(value)}
              className={`rounded-pill px-[14px] py-1.5 text-body-sm transition-colors ${
                activeTab === value
                  ? 'bg-surface-2 text-ink'
                  : 'bg-canvas text-ink-subtle hover:text-ink'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* List */}
        {loading && (
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="animate-pulse rounded-lg border border-hairline bg-surface-1 p-lg">
                <div className="mb-2 h-4 w-3/4 rounded bg-surface-3" />
                <div className="h-3 w-1/4 rounded bg-surface-3" />
              </div>
            ))}
          </div>
        )}

        {!loading && posts.length === 0 && (
          <div className="rounded-lg border border-hairline bg-surface-1 p-xxl text-center">
            <p className="text-body text-ink-muted">게시글이 없습니다.</p>
            {user && (
              <Link to="/community/new" className="mt-4 inline-block text-body-sm text-primary">
                첫 글을 작성해보세요 →
              </Link>
            )}
          </div>
        )}

        {!loading && posts.length > 0 && (
          <div className="divide-y divide-hairline rounded-lg border border-hairline bg-surface-1">
            {posts.map((post) => (
              <Link
                key={post.id}
                to={`/community/${post.id}`}
                className="flex items-center justify-between p-lg transition-colors hover:bg-surface-2"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <CategoryBadge category={post.category} />
                    <span className="truncate text-body text-ink">{post.title}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-caption text-ink-subtle">
                    <span>{post.profiles?.name ?? '익명'}</span>
                    <span>조회 {post.view_count}</span>
                  </div>
                </div>
                <span className="ml-4 shrink-0 text-caption text-ink-tertiary">
                  {new Date(post.created_at).toLocaleDateString('ko-KR')}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function CategoryBadge({ category }: { category: PostCategory }) {
  const map: Record<PostCategory, { label: string; className: string }> = {
    notice: { label: '공지', className: 'bg-primary/20 text-primary' },
    free:   { label: '자유', className: 'bg-surface-3 text-ink-subtle' },
    qna:    { label: 'Q&A', className: 'bg-surface-3 text-ink-subtle' },
  };
  const { label, className } = map[category];
  return (
    <span className={`shrink-0 rounded-xs px-1.5 py-0.5 text-caption font-medium ${className}`}>
      {label}
    </span>
  );
}
