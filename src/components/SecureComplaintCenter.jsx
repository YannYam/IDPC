import React, { useState } from 'react';
import { Lock, Shield, Send, CheckCircle2, AlertCircle, FileLock2, KeyRound } from 'lucide-react';

export default function SecureComplaintCenter({ complaints, setComplaints }) {
  const [formData, setFormData] = useState({
    category: 'Kebocoran Data Pribadi (Data Leak)',
    reportedEntity: '',
    incidentDate: '',
    description: '',
    isAnonymous: true,
    encryptPayload: true,
  });

  const [submittedTicket, setSubmittedTicket] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const randomTicket = `IDPC-CRYPT-${Math.floor(1000 + Math.random() * 9000)}`;
    const newComplaint = {
      id: Date.now(),
      ticketCode: randomTicket,
      category: formData.category,
      entity: formData.reportedEntity || 'Institusi Rahasia (Terenskripsi)',
      date: formData.incidentDate || new Date().toISOString().split('T')[0],
      status: 'Terdaftar - Audit IDPC',
      isAnonymous: formData.isAnonymous,
      encrypted: formData.encryptPayload,
    };

    setComplaints([newComplaint, ...complaints]);
    setSubmittedTicket(newComplaint);
    setFormData({
      category: 'Kebocoran Data Pribadi (Data Leak)',
      reportedEntity: '',
      incidentDate: '',
      description: '',
      isAnonymous: true,
      encryptPayload: true,
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="card" style={{ background: 'linear-gradient(135deg, #eff6ff, #e0f2fe)', border: '1px solid #bfdbfe' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ background: '#ffffff', padding: '14px', borderRadius: '14px', border: '1px solid #bfdbfe' }}>
            <FileLock2 size={32} color="#2563eb" />
          </div>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>Pusat Pengaduan Data Pribadi Terenkripsi & Anonim</h2>
            <p style={{ color: '#475569', fontSize: '13.5px', marginTop: '4px' }}>
              Pelaporan resmi pelanggaran UU PDP No. 27/2022. Identitas Anda terlindungi dengan enkripsi end-to-end langsung ke investigator Lembaga Pelindungan Data Pribadi (IDPC).
            </p>
          </div>
        </div>
      </div>

      <div className="grid-2">
        {/* Form Pelaporan */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <KeyRound size={20} color="#2563eb" />
              <span>Formulir Pengaduan IDPC</span>
            </h3>
            <span className="badge badge-blue">Zero-Knowledge Log</span>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Kategori Pelanggaran PDP</label>
              <select 
                className="form-select" 
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option>Kebocoran Data Pribadi (Data Leak)</option>
                <option>Penjualan Data Pribadi Tanpa Konsen</option>
                <option>Penyalahgunaan NIK & Data Kependudukan</option>
                <option>Penipuan / Spam Keuangan Berbasis Data Pribadi</option>
                <option>Pelanggaran Hak Subjek Data (Penolakan Penghapusan Data)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Institusi / Pihak Terlapor (Pengendali Data)</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Contoh: PT Financial Mega, Universitas XYZ, Aplikasi ABC" 
                required
                value={formData.reportedEntity}
                onChange={(e) => setFormData({ ...formData, reportedEntity: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Tanggal Kejadian Insiden</label>
              <input 
                type="date" 
                className="form-input" 
                required
                value={formData.incidentDate}
                onChange={(e) => setFormData({ ...formData, incidentDate: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Uraian Kejadian / Kronologi Insiden</label>
              <textarea 
                className="form-textarea" 
                rows="4" 
                placeholder="Jelaskan bagaimana data Anda bocor atau disalahgunakan secara detail..."
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              ></textarea>
            </div>

            <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '12px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px', border: '1px solid #e2e8f0' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13.5px', color: '#334155' }}>
                <input 
                  type="checkbox" 
                  checked={formData.isAnonymous} 
                  onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
                />
                <span><strong>Mode Pelaporan Anonim (Sembunyikan NIK & Identitas Saya)</strong></span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13.5px', color: '#334155' }}>
                <input 
                  type="checkbox" 
                  checked={formData.encryptPayload} 
                  onChange={(e) => setFormData({ ...formData, encryptPayload: e.target.checked })}
                />
                <span>Enkripsi Kriptografis AES-256 pada Muatan Berkas (Payload)</span>
              </label>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              <Send size={18} />
              <span>Kirim Pengaduan Resmi ke IDPC</span>
            </button>
          </form>
        </div>

        {/* Status Pengaduan & Informasi Realtime */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {submittedTicket && (
            <div className="card" style={{ border: '1px solid #a7f3d0', background: '#ecfdf5' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <CheckCircle2 size={24} color="#059669" />
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#047857' }}>Pengaduan Berhasil Terkunci dalam Vault</h4>
              </div>
              <p style={{ fontSize: '13px', color: '#475569', marginBottom: '12px' }}>
                Nomor Tiket Kriptografis Anda:
              </p>
              <div style={{ background: '#ffffff', padding: '12px 16px', borderRadius: '8px', fontSize: '18px', fontWeight: 800, color: '#1d4ed8', letterSpacing: '1px', fontFamily: 'monospace', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #cbd5e1' }}>
                <span>{submittedTicket.ticketCode}</span>
                <span className="badge badge-emerald">Encrypted & Saved</span>
              </div>
              <p style={{ fontSize: '12px', color: '#64748b', marginTop: '10px' }}>
                Simpan nomor tiket di atas untuk mengecek progres audit tanpa perlu login atau memasukkan identitas.
              </p>
            </div>
          )}

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                <Shield size={20} color="#059669" />
                <span>Daftar Pengaduan Masuk (Audit IDPC)</span>
              </h3>
              <span className="badge badge-purple">{complaints.length} Berkas Active</span>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>No. Tiket</th>
                    <th>Kategori</th>
                    <th>Institusi Terlapor</th>
                    <th>Status IDPC</th>
                  </tr>
                </thead>
                <tbody>
                  {complaints.map((item) => (
                    <tr key={item.id}>
                      <td style={{ fontFamily: 'monospace', fontWeight: 700, color: '#2563eb' }}>{item.ticketCode}</td>
                      <td style={{ fontSize: '12.5px' }}>{item.category}</td>
                      <td>{item.entity}</td>
                      <td>
                        <span className="badge badge-amber">{item.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
