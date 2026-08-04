import React from 'react';
import { Shield, Bell, Lock, UserCheck, ShieldAlert, Cpu } from 'lucide-react';

export default function Header({ activeTab, threatCount }) {
  const getTabTitle = () => {
    switch (activeTab) {
      case 'complaint': return 'Secure Complaint Center (Pusat Pengaduan Aman)';
      case 'victim': return 'Victim Protection Hub (Perlindungan Korban & KSBS)';
      case 'breach': return 'AI Data Breach Monitoring (Deteksi Dini Kebocoran)';
      case 'vault': return 'Digital Evidence Vault (Brankas Bukti Digital Standard ISO)';
      case 'campus': return 'Campus Privacy Center (Integrasi Satgas PPKS)';
      case 'dashboard': return 'National Data Compliance Dashboard (Indeks PDP)';
      case 'rating': return 'Institution Privacy Rating (Rating Kepatuhan Institusi)';
      case 'consultation': return 'Legal Consultation Hub (Konsultasi Pakar & Klinik Hukum)';
      case 'learning': return 'Privacy Learning Center (Edukasi & Sertifikasi Subjek Data)';
      case 'map': return 'National Data Incident Map (Peta Sebaran Insiden Siber)';
      default: return 'IDPC+ Dashboard';
    }
  };

  return (
    <header className="top-header">
      <div className="header-title">
        <h2 style={{ fontSize: '18px', fontWeight: 700 }}>{getTabTitle()}</h2>
        <span className="brand-badge">UU PDP NO. 27/2022</span>
      </div>

      <div className="header-status">
        <div className="live-indicator">
          <span className="pulse-dot"></span>
          <span>AI Threat Monitor: <strong>AKTIF</strong></span>
        </div>

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            background: '#eff6ff',
            border: '1px solid #bfdbfe',
            borderRadius: '10px',
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '13px',
            color: '#1d4ed8',
            fontWeight: 600
          }}>
            <Lock size={15} color="#2563eb" />
            <span>Encrypted Node: <strong>IDPC-NODE-01</strong></span>
          </div>

          {threatCount > 0 && (
            <div style={{
              background: '#fff1f2',
              border: '1px solid #fecdd3',
              borderRadius: '10px',
              padding: '8px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              color: '#be123c',
              fontWeight: 600
            }}>
              <ShieldAlert size={15} color="#e11d48" />
              <span>{threatCount} AI Alerts</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
