import React, { useState } from 'react';
import { Topbar } from '../../layouts/Topbar';
import { mockInboxMessages } from '../../mocks/inboxMessages';
import { Badge } from '../../components/ui/Badge';
import { SearchInput } from '../../components/ui/SearchInput';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../context/ToastContext';

export const InboxPage: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(mockInboxMessages[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');
  const { showToast } = useToast();

  const selectedMessage = mockInboxMessages.find((m) => m.id === selectedId) || mockInboxMessages[0];

  const filteredMessages = mockInboxMessages.filter((m) => {
    const q = searchQuery.toLowerCase();
    return m.senderName.toLowerCase().includes(q) || m.rawSnippet.toLowerCase().includes(q);
  });

  return (
    <div className="inbox-page">
      <Topbar
        title="AI Inbox"
        subtitle="Semua dokumentasi masuk dari kanal terintegrasi (Telegram & WhatsApp)."
        customActions={
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Badge label="AI processing normal" type="success" />
            <Button
              variant="secondary"
              onClick={() => showToast('Pemrosesan ulang pesan dimulai.')}
            >
              Proses ulang terpilih
            </Button>
          </div>
        }
      />

      <div className="inbox-master-detail-layout">
        {/* Left: Message List */}
        <article className="glass-panel" style={{ padding: '20px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '14px' }}>Pesan Masuk</h2>
          <SearchInput
            placeholder="Cari pesan atau pengirim..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClear={() => setSearchQuery('')}
            style={{ maxWidth: '100%', marginBottom: '14px' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {filteredMessages.map((msg) => {
              const isSelected = msg.id === selectedId;
              return (
                <div
                  key={msg.id}
                  onClick={() => {
                    setSelectedId(msg.id);
                    showToast('Pesan dipilih. Detail sumber diperbarui.');
                  }}
                  style={{
                    padding: '12px',
                    borderRadius: '12px',
                    backgroundColor: isSelected ? 'rgba(247, 250, 255, 0.9)' : 'transparent',
                    border: isSelected ? '1px solid rgba(47, 111, 218, 0.3)' : '1px solid transparent',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>{msg.senderName}</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>{msg.timestamp}</div>
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {msg.rawSnippet}
                  </div>
                  <div style={{ marginTop: '6px' }}>
                    <Badge label={msg.status} />
                  </div>
                </div>
              );
            })}
          </div>
        </article>

        {/* Right: Message Detail */}
        {selectedMessage && (
          <article className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <div className="eyebrow-label">MESSAGE DETAIL</div>
              <h2 style={{ fontSize: '20px', fontWeight: 800, marginTop: '4px', color: '#0f172a' }}>{selectedMessage.senderName}</h2>
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                {selectedMessage.channel} · {selectedMessage.timestamp}
              </div>
              <div
                style={{
                  marginTop: '12px',
                  padding: '16px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(241, 245, 251, 0.7)',
                  border: '1px solid rgba(15, 30, 85, 0.1)',
                  color: '#0f172a',
                  lineHeight: 1.5,
                  fontSize: '13px',
                }}
              >
                {selectedMessage.fullMessage}
              </div>
            </div>

            {selectedMessage.matchedWorkOrderId && (
              <div>
                <div className="eyebrow-label">WORK ORDER TERKAIT</div>
                <div
                  style={{
                    marginTop: '8px',
                    padding: '14px 16px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(247, 250, 255, 0.85)',
                    border: '1px solid rgba(47, 111, 218, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Servis AC Split 2 PK</div>
                    <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>{selectedMessage.matchedWorkOrderId} · PT Arunika</div>
                  </div>
                  <Badge label="Konfirmasi dibutuhkan" type="warning" />
                </div>
              </div>
            )}

            <div>
              <div className="eyebrow-label">TINDAKAN AI</div>
              <p style={{ fontSize: '13px', color: '#334155', marginTop: '6px', lineHeight: 1.5 }}>
                AI menemukan dua work order yang mungkin cocok. Pilih salah satu untuk melanjutkan pembuatan draf.
              </p>
              <div style={{ display: 'flex', gap: '10px', marginTop: '14px', flexWrap: 'wrap' }}>
                <Button variant="primary" onClick={() => showToast('Work order dikonfirmasi.')}>
                  Konfirmasi work order
                </Button>
                <Button variant="secondary" onClick={() => showToast('Draf manual dibuat.')}>
                  Buat draf manual
                </Button>
              </div>
            </div>
          </article>
        )}
      </div>

      <style>{`
        .inbox-master-detail-layout {
          display: grid;
          grid-template-columns: 360px 1fr;
          gap: 20px;
        }

        @media (max-width: 900px) {
          .inbox-master-detail-layout {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
