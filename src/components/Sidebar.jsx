import React from 'react';
import {
  ShieldCheck,
  FileLock2,
  UserCheck,
  Cpu,
  GraduationCap,
  BarChart3,
  Award,
  MessageSquare,
  BookOpen,
  MapPin
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, userRole }) {
  const menuItems = [
    { id: 'complaint', label: '1. Pengaduan & Bukti Digital', icon: FileLock2, category: 'Layanan Pengaduan' },
    { id: 'victim', label: '2. Eskalasi Darurat Korban', icon: UserCheck, category: 'Layanan Pengaduan' },
    { id: 'breach', label: '3. AI Breach Monitoring', icon: Cpu, category: 'Deteksi & Analisis' },
    { id: 'campus', label: '4. Campus Privacy Center', icon: GraduationCap, category: 'Institusi & Kampus', badge: userRole === 'investigator' ? 'PPKS Desk' : null },
    { id: 'consultation', label: '5. Legal CS & Live Queue', icon: MessageSquare, category: 'Edukasi & Konsultasi' },
    { id: 'learning', label: '6. Privacy Learning', icon: BookOpen, category: 'Edukasi & Konsultasi' },
  ];

  const categories = ['Layanan Pengaduan', 'Deteksi & Analisis', 'Institusi & Kampus', 'Edukasi & Konsultasi'];

  const renderNavItem = (item) => {
    const Icon = item.icon;
    const isActive = activeTab === item.id;

    return (
      <div
        key={item.id}
        className={`nav-item ${isActive ? 'active' : ''}`}
        onClick={() => setActiveTab(item.id)}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Icon size={18} />
          <span>{item.label}</span>
        </div>
        {item.badge && (
          <span style={{ 
            fontSize: '10px', 
            background: '#7c3aed', 
            color: '#fff', 
            padding: '2px 6px', 
            borderRadius: '6px', 
            fontWeight: 700 
          }}>
            {item.badge}
          </span>
        )}
      </div>
    );
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon-box">
          <ShieldCheck size={24} color="#ffffff" />
        </div>
        <div className="logo-text">
          <h1>IDPC+</h1>
          <p>Lembaga Perlindungan</p>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {categories.map((cat) => (
          <div key={cat} style={{ marginBottom: '12px' }} className="desktop-nav-group">
            <div className="nav-section-label">{cat}</div>
            <div className="nav-menu desktop-nav-menu">
              {menuItems
                .filter((item) => item.category === cat)
                .map(renderNavItem)}
            </div>
          </div>
        ))}

        <div className="nav-menu mobile-nav-menu">
          {menuItems.map(renderNavItem)}
        </div>
      </div>

      <div style={{
        marginTop: 'auto',
        paddingTop: '16px',
        borderTop: '1px solid var(--border-color)',
        fontSize: '11px',
        color: 'var(--text-dim)',
        textAlign: 'center'
      }}>
        IDPC+ System v2.4 Encrypted<br />
        Republik Indonesia © 2026
      </div>
    </aside>
  );
}
