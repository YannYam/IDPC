import React, { useState } from 'react';
import { GraduationCap, ShieldCheck, UserCheck, Plus, CheckCircle2, Building, AlertCircle } from 'lucide-react';

export default function CampusPrivacyCenter({ campusCases, setCampusCases }) {
  const [showNewCaseModal, setShowNewCaseModal] = useState(false);
  const [selectedCampus, setSelectedCampus] = useState('Universitas Indonesia');
  const [newCaseForm, setNewCaseForm] = useState({
    category: 'Kekerasan Seksual Berbasis Siber (KSBS)',
    priority: 'Sangat Tinggi',
    victimAlias: `Korban-STUDENT-${Math.floor(100 + Math.random() * 900)}`,
  });

  const handleCreateCampusCase = (e) => {
    e.preventDefault();
    const newCase = {
      id: `PPKS-2026-00${campusCases.length + 1}`,
      campus: selectedCampus,
      category: newCaseForm.category,
      victimAlias: newCaseForm.victimAlias,
      priority: newCaseForm.priority,
      status: 'Dalam Penanganan Satgas PPKS',
      date: new Date().toISOString().split('T')[0]
    };
    setCampusCases([newCase, ...campusCases]);
    setShowNewCaseModal(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header Banner */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #eff6ff, #e0f2fe)', border: '1px solid #bfdbfe' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ background: '#ffffff', padding: '16px', borderRadius: '16px', border: '1px solid #bfdbfe' }}>
              <GraduationCap size={36} color="#2563eb" />
            </div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>Campus Privacy Center (Integrasi Satgas PPKS Perguruan Tinggi)</h2>
              <p style={{ color: '#475569', fontSize: '13.5px', marginTop: '4px' }}>
                Portal khusus perguruan tinggi terintegrasi dengan Satgas Pencegahan dan Penanganan Kekerasan Seksual (PPKS) untuk pengamanan data korban & efisiensi pelaporan siber.
              </p>
            </div>
          </div>

          <button className="btn btn-primary" onClick={() => setShowNewCaseModal(true)}>
            <Plus size={18} />
            <span>Buat Kasus PPKS Baru</span>
          </button>
        </div>
      </div>

      <div className="grid-3">
        <div className="metric-box">
          <div className="metric-icon" style={{ background: '#eff6ff', color: '#1d4ed8' }}>
            <Building size={24} />
          </div>
          <div>
            <div className="metric-val">142</div>
            <div className="metric-lbl">Kampus Terhubung Satgas</div>
          </div>
        </div>

        <div className="metric-box">
          <div className="metric-icon" style={{ background: '#ecfdf5', color: '#047857' }}>
            <ShieldCheck size={24} />
          </div>
          <div>
            <div className="metric-val">98.4%</div>
            <div className="metric-lbl">Tingkat Perlindungan Korban</div>
          </div>
        </div>

        <div className="metric-box">
          <div className="metric-icon" style={{ background: '#f3e8ff', color: '#6d28d9' }}>
            <UserCheck size={24} />
          </div>
          <div>
            <div className="metric-val">{campusCases.length}</div>
            <div className="metric-lbl">Kasus PPKS Terenkripsi</div>
          </div>
        </div>
      </div>

      {/* Tabel Kasus PPKS Kampus */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">
            <GraduationCap size={20} color="#2563eb" />
            <span>Direktori Kasus & Audit Satgas PPKS Kampus</span>
          </h3>
          <select 
            className="form-select" 
            style={{ width: 'auto', padding: '6px 12px' }}
            value={selectedCampus}
            onChange={(e) => setSelectedCampus(e.target.value)}
          >
            <option>Semua Perguruan Tinggi</option>
            <option>Universitas Indonesia</option>
            <option>Universitas Gadjah Mada</option>
            <option>Universitas Mataram</option>
          </select>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="custom-table">
            <thead>
              <tr>
                <th>ID Registrasi PPKS</th>
                <th>Perguruan Tinggi</th>
                <th>Kategori Kasus Siber</th>
                <th>Alias Kripto Korban</th>
                <th>Prioritas</th>
                <th>Status Kasus</th>
              </tr>
            </thead>
            <tbody>
              {campusCases.map((item) => (
                <tr key={item.id}>
                  <td style={{ fontFamily: 'monospace', fontWeight: 700, color: '#2563eb' }}>{item.id}</td>
                  <td style={{ fontWeight: 600, color: '#0f172a' }}>{item.campus}</td>
                  <td style={{ fontSize: '13px' }}>{item.category}</td>
                  <td style={{ fontFamily: 'monospace', color: '#6d28d9', fontWeight: 700 }}>{item.victimAlias}</td>
                  <td>
                    <span className={`badge ${item.priority === 'Sangat Tinggi' ? 'badge-rose' : 'badge-amber'}`}>
                      {item.priority}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-emerald">{item.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Buat Kasus Baru */}
      {showNewCaseModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: '#0f172a' }}>
              <Plus size={20} color="#2563eb" />
              <span>Registrasi Penanganan Kasus Satgas PPKS Baru</span>
            </h3>

            <form onSubmit={handleCreateCampusCase}>
              <div className="form-group">
                <label className="form-label">Perguruan Tinggi (Kampus)</label>
                <select className="form-select" value={selectedCampus} onChange={(e) => setSelectedCampus(e.target.value)}>
                  <option>Universitas Indonesia</option>
                  <option>Universitas Gadjah Mada</option>
                  <option>Universitas Mataram</option>
                  <option>Institut Teknologi Bandung</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Kategori Kekerasan / Kebocoran Data Korban</label>
                <select 
                  className="form-select"
                  value={newCaseForm.category}
                  onChange={(e) => setNewCaseForm({ ...newCaseForm, category: e.target.value })}
                >
                  <option>Kekerasan Seksual Berbasis Siber (KSBS)</option>
                  <option>Pengancaman Pembocoran Data Pribadi Mahasiswa</option>
                  <option>Penjualan KTP / Kartu Mahasiswa Ilegal</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Prioritas Penanganan Satgas</label>
                <select 
                  className="form-select"
                  value={newCaseForm.priority}
                  onChange={(e) => setNewCaseForm({ ...newCaseForm, priority: e.target.value })}
                >
                  <option>Sangat Tinggi</option>
                  <option>Tinggi</option>
                  <option>Sedang</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowNewCaseModal(false)}>
                  Batal
                </button>
                <button type="submit" className="btn btn-primary">
                  Simpan & Enkripsi Data Kasus
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
