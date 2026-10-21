import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { useToast } from '../context/ToastContext';
import { mockWorkOrders, WorkOrder } from '../mocks/workOrders';

export const AppShell: React.FC<{ children: (props: { onOpenCreateModal: () => void }) => React.ReactNode }> = ({
  children,
}) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCustomer, setNewCustomer] = useState('PT Arunika');
  const [newLocation, setNewLocation] = useState('Gedung Arunika Lt. 4');
  const [newTechnician, setNewTechnician] = useState('Dina Kartika');
  const { showToast } = useToast();

  const handleCreateWorkOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      showToast('Harap isi judul pekerjaan.');
      return;
    }

    const newWO: WorkOrder = {
      id: `WO-240318-${String(mockWorkOrders.length + 1).padStart(3, '0')}`,
      title: newTitle.trim(),
      customer: newCustomer,
      location: newLocation,
      technician: newTechnician,
      scheduledDate: '23 Jul 2024',
      scheduledTime: '09:00',
      jobStatus: 'ASSIGNED',
      reportStatus: 'NONE',
      notes: 'Dibuat melalui form quick creation.',
    };

    mockWorkOrders.unshift(newWO);
    showToast(`Work order ${newWO.id} berhasil dibuat!`);
    setIsCreateModalOpen(false);
    setNewTitle('');
  };

  return (
    <div className="bisalapor-app-container">
      {/* Sidebar Rail */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="bisalapor-main-content">
        <div className="bisalapor-content-inner">
          {children({ onOpenCreateModal: () => setIsCreateModalOpen(true) })}
        </div>
      </main>

      {/* Create Work Order Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Buat Work Order Baru"
        subtitle="Isi penugasan teknisi dan rincian pekerjaan servis."
      >
        <form onSubmit={handleCreateWorkOrder} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label className="eyebrow-label" style={{ display: 'block', marginBottom: '6px' }}>
              Judul Pekerjaan
            </label>
            <input
              type="text"
              placeholder="Contoh: Pembersihan filter AC Daikin 3 PK"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              required
              style={{
                width: '100%',
                height: '42px',
                padding: '0 14px',
                borderRadius: '11px',
                border: '1px solid rgba(226, 232, 240, 0.95)',
                backgroundColor: 'rgba(241, 245, 251, 0.6)',
                fontSize: '13px',
                color: '#0f172a',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label className="eyebrow-label" style={{ display: 'block', marginBottom: '6px' }}>
                Pelanggan
              </label>
              <select
                value={newCustomer}
                onChange={(e) => setNewCustomer(e.target.value)}
                style={{
                  width: '100%',
                  height: '42px',
                  padding: '0 12px',
                  borderRadius: '11px',
                  border: '1px solid rgba(226, 232, 240, 0.95)',
                  backgroundColor: 'rgba(241, 245, 251, 0.6)',
                  fontSize: '13px',
                  color: '#0f172a',
                }}
              >
                <option value="PT Arunika">PT Arunika</option>
                <option value="CV Nusa Data">CV Nusa Data</option>
                <option value="PT Sinar Jaya">PT Sinar Jaya</option>
                <option value="PT Meridian">PT Meridian</option>
              </select>
            </div>

            <div>
              <label className="eyebrow-label" style={{ display: 'block', marginBottom: '6px' }}>
                Teknisi Ditugaskan
              </label>
              <select
                value={newTechnician}
                onChange={(e) => setNewTechnician(e.target.value)}
                style={{
                  width: '100%',
                  height: '42px',
                  padding: '0 12px',
                  borderRadius: '11px',
                  border: '1px solid rgba(226, 232, 240, 0.95)',
                  backgroundColor: 'rgba(241, 245, 251, 0.6)',
                  fontSize: '13px',
                  color: '#0f172a',
                }}
              >
                <option value="Dina Kartika">Dina Kartika</option>
                <option value="Budi Santoso">Budi Santoso</option>
                <option value="Rafi Pratama">Rafi Pratama</option>
              </select>
            </div>
          </div>

          <div>
            <label className="eyebrow-label" style={{ display: 'block', marginBottom: '6px' }}>
              Lokasi Pekerjaan
            </label>
            <input
              type="text"
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
              placeholder="Contoh: Gedung Arunika Lt. 4"
              style={{
                width: '100%',
                height: '42px',
                padding: '0 14px',
                borderRadius: '11px',
                border: '1px solid rgba(226, 232, 240, 0.95)',
                backgroundColor: 'rgba(241, 245, 251, 0.6)',
                fontSize: '13px',
                color: '#0f172a',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
            <Button type="button" variant="secondary" onClick={() => setIsCreateModalOpen(false)}>
              Batal
            </Button>
            <Button type="submit" variant="primary">
              Simpan & Jadwalkan
            </Button>
          </div>
        </form>
      </Modal>

      <style>{`
        .bisalapor-app-container {
          min-height: 100vh;
          display: flex;
          background: transparent;
        }

        .bisalapor-main-content {
          flex: 1 1 auto;
          min-width: 0;
          display: flex;
          flex-direction: column;
        }

        .bisalapor-content-inner {
          flex: 1;
          width: 100%;
          max-width: 1440px;
          margin: 0 auto;
          padding: 28px 36px 48px;
        }

        @media (max-width: 1180px) {
          .bisalapor-content-inner {
            padding: 24px 20px 40px;
          }
        }

        @media (max-width: 760px) {
          .bisalapor-app-container {
            display: block;
          }

          .bisalapor-content-inner {
            padding: 20px 16px 36px;
          }
        }
      `}</style>
    </div>
  );
};
