import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../features/auth/AuthContext';
import { Badge } from '../components/ui/Badge';
import type { Database, InquiryStatus } from '../types/database';

type Post = Database['public']['Tables']['posts']['Row'];
type Inquiry = Database['public']['Tables']['inquiries']['Row'];
type Profile = Database['public']['Tables']['profiles']['Row'];

const statusLabel: Record<InquiryStatus, string> = {
  pending: '접수 완료',
  in_progress: '확인 중',
  completed: '답변 완료',
};

const statusVariant: Record<InquiryStatus, 'default' | 'info' | 'success'> = {
  pending: 'default',
  in_progress: 'info',
  completed: 'success',
};

export default function MyPage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  useEffect(() => {
    if (!user) return;
    supabase.from('profiles').select('*').eq('id', user.id).single().then(({ data }) => setProfile(data));
    supabase.from('posts').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).then(({ data }) => setPosts(data ?? []));
    supabase.from('inquiries').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).then(({ data }) => setInquiries(data ?? []));
  }, [user]);

  return (
    <div className="py-section">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 font-display text-display-md font-semibold text-ink">마이페이지</h1>

        {/* Profile */}
        <section className="mb-8 rounded-lg border border-hairline bg-surface-1 p-lg">
          <h2 className="mb-4 text-card-title font-semibold text-ink">내 정보</h2>
          {profile ? (
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { label: '이름', value: profile.name ?? '-' },
                { label: '이메일', value: profile.email },
                { label: '연락처', value: profile.phone ?? '-' },
                { label: '역할', value: profile.role === 'admin' ? '관리자' : '일반 회원' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <dt className="text-caption text-ink-subtle">{label}</dt>
                  <dd className="mt-1 text-body text-ink">{value}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <div className="h-20 animate-pulse rounded bg-surface-2" />
          )}
        </section>

        {/* My Posts */}
        <section className="mb-8">
          <h2 className="mb-4 text-card-title font-semibold text-ink">내 게시글</h2>
          {posts.length === 0 ? (
            <div className="rounded-lg border border-hairline bg-surface-1 p-lg text-center">
              <p className="text-body-sm text-ink-muted">작성한 게시글이 없습니다.</p>
              <Link to="/community/new" className="mt-2 inline-block text-body-sm text-primary">
                첫 글 작성하기 →
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-hairline rounded-lg border border-hairline bg-surface-1">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  to={`/community/${post.id}`}
                  className="flex items-center justify-between p-lg transition-colors hover:bg-surface-2"
                >
                  <span className="text-body-sm text-ink">{post.title}</span>
                  <span className="text-caption text-ink-tertiary">
                    {new Date(post.created_at).toLocaleDateString('ko-KR')}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* My Inquiries */}
        <section>
          <h2 className="mb-4 text-card-title font-semibold text-ink">내 문의 내역</h2>
          {inquiries.length === 0 ? (
            <div className="rounded-lg border border-hairline bg-surface-1 p-lg text-center">
              <p className="text-body-sm text-ink-muted">문의 내역이 없습니다.</p>
            </div>
          ) : (
            <div className="divide-y divide-hairline rounded-lg border border-hairline bg-surface-1">
              {inquiries.map((inq) => (
                <div key={inq.id} className="flex items-center justify-between p-lg">
                  <div>
                    <p className="text-body-sm text-ink">{inq.title}</p>
                    <p className="mt-0.5 text-caption text-ink-tertiary">
                      {new Date(inq.created_at).toLocaleDateString('ko-KR')}
                    </p>
                  </div>
                  <Badge variant={statusVariant[inq.status]}>
                    {statusLabel[inq.status]}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
