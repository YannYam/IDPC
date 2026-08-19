import React from 'react';
import { Shield, Bell, Lock, UserCheck, ShieldAlert, Cpu, GraduationCap, User, LogOut, CheckCircle2 } from 'lucide-react';

export default function Header({ 
  activeTab, 
  threatCount, 
  userRole, 
  setUserRole, 
  setActiveTab,
  ppksAuthSession,
  onRequestAuth,
  onLogoutSatgas
}) {
  const getTabTitle = () => {
    switch (activeTab) {
      case 'complaint': return 'Pusat Pengaduan & Brankas Bukti Digital Terenkripsi';
      case 'victim': return 'Victim Protection Hub (Perlindungan Korban & KSBS)';
      case 'breach': return 'AI Data Breach Monitoring (Deteksi Dini Kebocoran)';
      case 'campus': return userRole === 'investigator' ? 'Campus Privacy Command Desk (Investigator Satgas PPKTPT)' : 'Campus Privacy Center (Portal Pelaporan Publik & PPKTPT)';
      case 'dashboard': return 'National Data Compliance Dashboard (Indeks PDP)';
      case 'rating': return 'Institution Privacy Rating (Rating Kepatuhan Institusi)';
      case 'consultation': return 'Legal Consultation Hub (Konsultasi Pakar & Klinik Hukum)';
      case 'learning': return 'Privacy Learning Center (Edukasi & Sertifikasi Subjek Data)';
      case 'map': return 'National Data Incident Map (Peta Sebaran Insiden Siber)';
      default: return 'IDPC+ Dashboard';
    }
  };

  const handleSwitchToInvestigator = () => {
    if (!ppksAuthSession || !ppksAuthSession.isAuthenticated) {
      onRequestAuth();
    } else {
      setUserRole('investigator');
      if (activeTab !== 'campus') {
        setActiveTab('campus');
      }
    }
  };

  const handleSwitchToPublic = () => {
    setUserRole('public');
  };

  return (
    <header className="top-header">
      <div className="header-title">
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>{getTabTitle()}</h2>
        <span className="brand-badge">STANDAR KEPATUHAN PDP</span>
      </div>

      <div className="header-status" style={{ gap: '14px' }}>
        {/* Host Portal Routing Switcher */}
        <div style={{
          display: 'flex',
          background: '#f1f5f9',
          borderRadius: '12px',
          padding: '3px',
          border: '1px solid #e2e8f0',
          alignItems: 'center'
        }}>
          <button
            onClick={handleSwitchToPublic}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '9px',
              border: 'none',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              background: userRole === 'public' ? '#ffffff' : 'transparent',
              color: userRole === 'public' ? '#2563eb' : '#64748b',
              boxShadow: userRole === 'public' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <User size={14} color={userRole === 'public' ? '#2563eb' : '#64748b'} />
            <span>Portal Pelapor</span>
          </button>

          <button
            onClick={handleSwitchToInvestigator}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: '9px',
              border: 'none',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              background: userRole === 'investigator' ? '#7c3aed' : 'transparent',
              color: userRole === 'investigator' ? '#ffffff' : '#64748b',
              boxShadow: userRole === 'investigator' ? '0 2px 6px rgba(124, 58, 237, 0.3)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <GraduationCap size={14} color={userRole === 'investigator' ? '#ffffff' : '#64748b'} />
            <span>Satgas PPKTPT Investigator</span>
          </button>
        </div>

        {/* Authenticated Officer Status Badge */}
        {ppksAuthSession && ppksAuthSession.isAuthenticated ? (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#f3e8ff',
            border: '1px solid #ddd6fe',
            borderRadius: '10px',
            padding: '4px 10px',
            fontSize: '12px',
            color: '#6d28d9'
          }}>
            <CheckCircle2 size={15} color="#7c3aed" />
            <div>
              <strong>{ppksAuthSession.officerName.split(',')[0]}</strong>
              <span style={{ fontSize: '11px', opacity: 0.8, marginLeft: '4px' }}>({ppksAuthSession.campus})</span>
            </div>
            <button 
              onClick={onLogoutSatgas}
              title="Keluar dari Sesi Satgas"
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: '#be123c',
                display: 'flex',
                alignItems: 'center',
                marginLeft: '4px'
              }}
            >
              <LogOut size={14} />
            </button>
          </div>
        ) : null}
      </div>
    </header>
  );
}
