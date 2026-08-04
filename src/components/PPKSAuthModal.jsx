import React, { useState } from 'react';
import { ShieldCheck, Lock, Key, GraduationCap, CheckCircle, AlertCircle, RefreshCw, Sparkles, UserCheck } from 'lucide-react';

export default function PPKSAuthModal({ isOpen, onClose, onAuthenticate }) {
  const [selectedCampus, setSelectedCampus] = useState('Universitas Indonesia');
  const [officerId, setOfficerId] = useState('');
  const [securityPin, setSecurityPin] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  // Preset demo accounts for quick testing
  const demoAccounts = [
    {
      campus: 'Universitas Indonesia',
      officerName: 'Dr. Rina Wijaya, S.H., M.H.',
      officerId: 'PPKS-UI-2026-092',
      roleTitle: 'Ketua Satgas PPKS & Investigator Utama UI',
      pin: '8899'
    },
    {
      campus: 'Universitas Gadjah Mada',
      officerName: 'Prof. Dr. Hendra K., M.Si.',
      officerId: 'PPKS-UGM-2026-104',
      roleTitle: 'Kepala Divisi Hukum & Penanganan Korban UGM',
      pin: '7722'
    },
    {
      campus: 'Universitas Mataram',
      officerName: 'Dr. Ahmad Zaini, S.H.',
      officerId: 'PPKS-UNRAM-2026-301',
      roleTitle: 'Koordinator Satgas PPKS UNRAM',
      pin: '5511'
    }
  ];

  const handleManualLogin = (e) => {
    e.preventDefault();
    if (!officerId.trim()) {
      setErrorMessage('Nomor ID / NIP Satgas PPKS wajib diisi.');
      return;
    }
    setErrorMessage('');
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      const session = {
        isAuthenticated: true,
        officerName: `Petugas Satgas (${officerId.trim()})`,
        officerId: officerId.trim(),
        campus: selectedCampus,
        roleTitle: `Investigator Terverifikasi Satgas ${selectedCampus}`,
        token: `AUTH-SIG-${Math.floor(10000 + Math.random() * 90000)}`,
        verifiedAt: new Date().toLocaleString()
      };
      onAuthenticate(session);
    }, 800);
  };

  const handleQuickDemoLogin = (acc) => {
    setSelectedCampus(acc.campus);
    setOfficerId(acc.officerId);
    setSecurityPin(acc.pin);
    setErrorMessage('');
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      const session = {
        isAuthenticated: true,
        officerName: acc.officerName,
        officerId: acc.officerId,
        campus: acc.campus,
        roleTitle: acc.roleTitle,
        token: `AUTH-SIG-IDPC-${Math.floor(100000 + Math.random() * 900000)}`,
        verifiedAt: new Date().toLocaleString()
      };
      onAuthenticate(session);
    }, 600);
  };

  return (
    <div className="modal-overlay" style={{ zIndex: 1100 }}>
      <div className="modal-card" style={{ maxWidth: '540px', padding: '28px', border: '2px solid #7c3aed' }}>
        {/* Header Modal */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px', borderBottom: '1px solid #e2e8f0', paddingBottom: '14px' }}>
          <div style={{ background: '#7c3aed', padding: '12px', borderRadius: '14px', color: '#fff' }}>
            <GraduationCap size={28} />
          </div>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>
              Autentikasi Satgas PPKS Perguruan Tinggi
            </h3>
            <p style={{ fontSize: '12.5px', color: '#475569', marginTop: '2px' }}>
              Verifikasi keabsahan identitas Anggota Satgas PPKS sebelum mengakses Investigator Command Desk.
            </p>
          </div>
        </div>

        {/* Form Verification */}
        <form onSubmit={handleManualLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div className="form-group">
            <label className="form-label">Asal Perguruan Tinggi (Kampus)</label>
            <select 
              className="form-select"
              value={selectedCampus}
              onChange={(e) => setSelectedCampus(e.target.value)}
            >
              <option>Universitas Indonesia</option>
              <option>Universitas Gadjah Mada</option>
              <option>Universitas Mataram</option>
              <option>Institut Teknologi Bandung</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Nomor ID Satgas PPKS / NIP / NIDN Official</label>
            <input 
              type="text"
              className="form-input"
              placeholder="Contoh: PPKS-UI-2026-092 atau NIP 1985..."
              value={officerId}
              onChange={(e) => setOfficerId(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Kode Kunci Keamanan / PIN Otorisasi</label>
            <input 
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={securityPin}
              onChange={(e) => setSecurityPin(e.target.value)}
            />
          </div>

          {errorMessage && (
            <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', color: '#be123c', padding: '10px', borderRadius: '8px', fontSize: '12.5px' }}>
              <AlertCircle size={15} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
              {errorMessage}
            </div>
          )}

          <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
            <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={onClose}>
              Batal
            </button>
            <button 
              type="submit" 
              className="btn" 
              disabled={isVerifying}
              style={{ flex: 2, background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', color: '#fff', padding: '10px' }}
            >
              {isVerifying ? <RefreshCw className="spin" size={16} /> : <Lock size={16} />}
              <span>{isVerifying ? 'Memverifikasi Sertifikat Digital...' : 'Verifikasi & Masuk Portal'}</span>
            </button>
          </div>
        </form>

        {/* Quick Demo Login Preset Helper */}
        <div style={{ marginTop: '22px', borderTop: '1px dashed #cbd5e1', paddingTop: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', fontWeight: 700, color: '#7c3aed', marginBottom: '10px' }}>
            <Sparkles size={16} />
            <span>Pilihan Akses Cepat Demo (1-Click Verification):</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {demoAccounts.map((acc, idx) => (
              <div 
                key={idx}
                onClick={() => handleQuickDemoLogin(acc)}
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.2s ease'
                }}
              >
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>{acc.officerName}</div>
                  <div style={{ fontSize: '11.5px', color: '#475569' }}>{acc.roleTitle}</div>
                </div>
                <span className="badge badge-purple" style={{ fontSize: '11px' }}>
                  Akses {acc.campus.split(' ')[1] || acc.campus}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
