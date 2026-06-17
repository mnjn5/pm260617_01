import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Badge } from '../../components/ui/Badge';
import type { Database, UserRole } from '../../types/database';

type Profile = Database['public']['Tables']['profiles']['Row'];

const ROLE_FILTERS: { value: UserRole | 'all'; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'user', label: '일반 회원' },
  { value: 'admin', label: '관리자' },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<UserRole | 'all'>('all');

  useEffect(() => {
    setLoading(true);
    let query = supabase.from('profiles').select('*').order('created_at', { ascending: false });
    if (filter !== 'all') query = query.eq('role', filter);
    query.then(({ data }) => { setUsers(data ?? []); setLoading(false); });
  }, [filter]);

  return (
    <div className="py-section">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="mb-6 font-display text-display-md font-semibold text-ink">회원 관리</h1>

        <div className="mb-4 flex gap-2">
          {ROLE_FILTERS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`rounded-pill px-[14px] py-1.5 text-body-sm transition-colors ${filter === value ? 'bg-surface-2 text-ink' : 'bg-canvas text-ink-subtle hover:text-ink'}`}
            >
              {label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="animate-pulse space-y-2">
            {[1, 2, 3].map((i) => <div key={i} className="h-14 rounded-lg bg-surface-2" />)}
          </div>
        ) : users.length === 0 ? (
          <div className="rounded-lg border border-hairline bg-surface-1 p-xxl text-center">
            <p className="text-body text-ink-muted">회원이 없습니다.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-hairline">
            <table className="w-full text-body-sm">
              <thead className="border-b border-hairline bg-surface-2">
                <tr>
                  {['이름', '이메일', '연락처', '역할', '가입일'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left font-medium text-ink-subtle">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline bg-surface-1">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-surface-2">
                    <td className="px-4 py-3 text-ink">{u.name ?? '-'}</td>
                    <td className="px-4 py-3 text-ink-muted">{u.email}</td>
                    <td className="px-4 py-3 text-ink-muted">{u.phone ?? '-'}</td>
                    <td className="px-4 py-3">
                      <Badge variant={u.role === 'admin' ? 'info' : 'default'}>
                        {u.role === 'admin' ? '관리자' : '일반'}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-ink-tertiary">
                      {new Date(u.created_at).toLocaleDateString('ko-KR')}
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
