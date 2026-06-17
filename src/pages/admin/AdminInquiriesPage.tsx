import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Badge } from '../../components/ui/Badge';
import type { Database, InquiryStatus } from '../../types/database';

type Inquiry = Database['public']['Tables']['inquiries']['Row'];

const STATUS_OPTIONS: { value: InquiryStatus | 'all'; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'pending', label: '접수 완료' },
  { value: 'in_progress', label: '확인 중' },
  { value: 'completed', label: '답변 완료' },
];

const statusLabel: Record<InquiryStatus, string> = {
  pending: '접수 완료',
  in_progress: '확인 중',
  completed: '답변 완료',
};

const nextStatus: Record<InquiryStatus, InquiryStatus | null> = {
  pending: 'in_progress',
  in_progress: 'completed',
  completed: null,
};

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<InquiryStatus | 'all'>('all');
  const [selected, setSelected] = useState<Inquiry | null>(null);

  async function fetchInquiries() {
    let query = supabase.from('inquiries').select('*').order('created_at', { ascending: false });
    if (filter !== 'all') query = query.eq('status', filter);
    const { data } = await query;
    setInquiries(data ?? []);
    setLoading(false);
  }

  useEffect(() => { fetchInquiries(); }, [filter]);

  async function handleStatusChange(id: string, status: InquiryStatus) {
    const next = nextStatus[status];
    if (!next) return;
    await supabase.from('inquiries').update({ status: next }).eq('id', id);
    fetchInquiries();
    if (selected?.id === id) setSelected({ ...selected, status: next });
  }

  return (
    <div className="py-section">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="mb-6 font-display text-display-md font-semibold text-ink">문의 관리</h1>

        {/* Filter */}
        <div className="mb-4 flex gap-2">
          {STATUS_OPTIONS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`rounded-pill px-[14px] py-1.5 text-body-sm transition-colors ${filter === value ? 'bg-surface-2 text-ink' : 'bg-canvas text-ink-subtle hover:text-ink'}`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Detail modal */}
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-semantic-overlay/70 p-4">
            <div className="w-full max-w-lg rounded-lg border border-hairline bg-surface-1 p-lg">
              <div className="mb-4 flex items-start justify-between">
                <h2 className="text-card-title font-semibold text-ink">{selected.title}</h2>
                <button onClick={() => setSelected(null)} className="text-ink-subtle hover:text-ink">✕</button>
              </div>
              <dl className="mb-4 grid grid-cols-2 gap-3 text-body-sm">
                <div><dt className="text-ink-subtle">이름</dt><dd className="text-ink">{selected.name}</dd></div>
                <div><dt className="text-ink-subtle">이메일</dt><dd className="text-ink">{selected.email}</dd></div>
                <div><dt className="text-ink-subtle">연락처</dt><dd className="text-ink">{selected.phone ?? '-'}</dd></div>
                <div><dt className="text-ink-subtle">유형</dt><dd className="text-ink">{selected.type ?? '-'}</dd></div>
              </dl>
              <div className="mb-4 rounded-md bg-surface-2 p-sm text-body-sm text-ink-muted">
                {selected.content}
              </div>
              <div className="flex items-center justify-between">
                <Badge variant={selected.status === 'completed' ? 'success' : selected.status === 'in_progress' ? 'info' : 'default'}>
                  {statusLabel[selected.status]}
                </Badge>
                {nextStatus[selected.status] && (
                  <button
                    onClick={() => handleStatusChange(selected.id, selected.status)}
                    className="rounded-md bg-primary px-[14px] py-2 text-button font-medium text-primary-on hover:bg-primary-hover"
                  >
                    {selected.status === 'pending' ? '확인 중으로 변경' : '답변 완료로 변경'}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Table */}
        {loading ? (
          <div className="animate-pulse space-y-2">
            {[1, 2, 3].map((i) => <div key={i} className="h-14 rounded-lg bg-surface-2" />)}
          </div>
        ) : inquiries.length === 0 ? (
          <div className="rounded-lg border border-hairline bg-surface-1 p-xxl text-center">
            <p className="text-body text-ink-muted">문의 내역이 없습니다.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-hairline">
            <table className="w-full text-body-sm">
              <thead className="border-b border-hairline bg-surface-2">
                <tr>
                  {['이름', '이메일', '제목', '유형', '상태', '접수일', ''].map((h) => (
                    <th key={h} className="px-4 py-3 text-left font-medium text-ink-subtle">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline bg-surface-1">
                {inquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-surface-2">
                    <td className="px-4 py-3 text-ink">{inq.name}</td>
                    <td className="px-4 py-3 text-ink-muted">{inq.email}</td>
                    <td className="max-w-xs truncate px-4 py-3 text-ink">{inq.title}</td>
                    <td className="px-4 py-3 text-ink-muted">{inq.type ?? '-'}</td>
                    <td className="px-4 py-3">
                      <Badge variant={inq.status === 'completed' ? 'success' : inq.status === 'in_progress' ? 'info' : 'default'}>
                        {statusLabel[inq.status]}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-ink-tertiary">
                      {new Date(inq.created_at).toLocaleDateString('ko-KR')}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setSelected(inq)}
                        className="text-caption text-primary hover:text-primary-hover"
                      >
                        상세
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
