import React from 'react';
import {
  ShieldCheck,
  FileText,
  UserCheck,
  Cpu,
  Key,
  GraduationCap,
  BarChart3,
  Award,
  MessageSquare,
  BookOpen,
  MapPin
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'complaint', label: '1. Secure Complaint', icon: FileText, category: 'Layanan Pengaduan' },
    { id: 'victim', label: '2. Victim Shield Hub', icon: UserCheck, category: 'Layanan Pengaduan' },
    { id: 'breach', label: '3. AI Breach Monitoring', icon: Cpu, category: 'Deteksi & Bukti' },
    { id: 'vault', label: '4. Digital Evidence Vault', icon: Key, category: 'Deteksi & Bukti' },
    { id: 'campus', label: '5. Campus Privacy Center', icon: GraduationCap, category: 'Institusi & Kampus' },
    { id: 'dashboard', label: '6. Data Compliance Index', icon: BarChart3, category: 'Kepatuhan & Rating' },
    { id: 'rating', label: '7. Institution Rating', icon: Award, category: 'Kepatuhan & Rating' },
    { id: 'consultation', label: '8. Legal Consultation', icon: MessageSquare, category: 'Edukasi & Konsultasi' },
    { id: 'learning', label: '9. Privacy Learning', icon: BookOpen, category: 'Edukasi & Konsultasi' },
    { id: 'map', label: '10. Incident Map', icon: MapPin, category: 'Analisis Nasional' },
  ];

  const categories = ['Layanan Pengaduan', 'Deteksi & Bukti', 'Institusi & Kampus', 'Kepatuhan & Rating', 'Edukasi & Konsultasi', 'Analisis Nasional'];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon-box">
          <ShieldCheck size={24} color="#ffffff" />
        </div>
        <div className="logo-text">
          <h1>IDPC+</h1>
          <p>Lembaga Pelindungan Data Pribadi</p>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {categories.map((cat) => (
          <div key={cat} style={{ marginBottom: '12px' }}>
            <div className="nav-section-label">{cat}</div>
            <div className="nav-menu">
              {menuItems
                .filter((item) => item.category === cat)
                .map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <div
                      key={item.id}
                      className={`nav-item ${isActive ? 'active' : ''}`}
                      onClick={() => setActiveTab(item.id)}
                    >
                      <Icon size={18} />
                      <span>{item.label}</span>
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
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
