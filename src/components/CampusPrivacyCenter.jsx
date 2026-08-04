import React, { useState } from 'react';
import { 
  GraduationCap, 
  ShieldCheck, 
  UserCheck, 
  Plus, 
  CheckCircle2, 
  Building, 
  AlertCircle, 
  Search, 
  FileText, 
  Lock, 
  ShieldAlert, 
  Key, 
  ArrowRight, 
  FileKey, 
  ExternalLink, 
  User, 
  Award, 
  Check,
  LogOut,
  Sparkles
} from 'lucide-react';

export default function CampusPrivacyCenter({ 
  campusCases, 
  setCampusCases, 
  userRole, 
  setUserRole,
  ppksAuthSession,
  onRequestAuth,
  onLogoutSatgas
}) {
  const [activePortalTab, setActivePortalTab] = useState(userRole || 'public');
  
  // Public Reporter Form State
  const [reporterForm, setReporterForm] = useState({
    campus: 'Universitas Indonesia',
    category: 'Kekerasan Seksual Berbasis Siber (KSBS)',
    threatDetail: '',
    urgentCounseling: true
  });
  const [submittedTicket, setSubmittedTicket] = useState(null);

  // Public Case Tracker State
  const [trackTicketInput, setTrackTicketInput] = useState('');
  const [trackedCaseResult, setTrackedCaseResult] = useState(null);

  // Investigator Portal State
  const [selectedCampusFilter, setSelectedCampusFilter] = useState('Semua');
  const [selectedCaseForDetail, setSelectedCaseForDetail] = useState(null);
  const [investigatorNoteInput, setInvestigatorNoteInput] = useState('');
  const [caseNotes, setCaseNotes] = useState({
    'PPKS-2026-001': ['Verifikasi tangkapan layar obrolan selesai. Hash SHA-256 cocok dengan Brankas Bukti.'],
    'PPKS-2026-002': ['Sesi konseling psikologis darurat telah diberikan kepada korban alias Korban-B44.']
  });

  // Modal for New Case (Investigator)
  const [showNewCaseModal, setShowNewCaseModal] = useState(false);
  const [newCaseForm, setNewCaseForm] = useState({
    campus: 'Universitas Indonesia',
    category: 'Kekerasan Seksual Berbasis Siber (KSBS)',
    priority: 'Sangat Tinggi',
    victimAlias: `Korban-STUDENT-${Math.floor(100 + Math.random() * 900)}`,
  });

  React.useEffect(() => {
    if (userRole) {
      setActivePortalTab(userRole);
    }
  }, [userRole]);

  // Handle Public Submission
  const handlePublicSubmit = (e) => {
    e.preventDefault();
    const newId = `PPKS-2026-00${campusCases.length + 1}`;
    const alias = `Korban-STUDENT-${Math.floor(1000 + Math.random() * 9000)}`;
    const newCase = {
      id: newId,
      campus: reporterForm.campus,
      category: reporterForm.category,
      victimAlias: alias,
      priority: reporterForm.urgentCounseling ? 'Sangat Tinggi' : 'Tinggi',
      status: 'Terdaftar - Menunggu Verifikasi Satgas',
      date: new Date().toISOString().split('T')[0],
      threatDetail: reporterForm.threatDetail || 'Laporan Pengaduan Publik Siber Korban'
    };
    setCampusCases([newCase, ...campusCases]);
    setSubmittedTicket({ id: newId, alias: alias });
    setReporterForm({
      campus: 'Universitas Indonesia',
      category: 'Kekerasan Seksual Berbasis Siber (KSBS)',
      threatDetail: '',
      urgentCounseling: true
    });
  };

  // Handle Public Case Tracking
  const handleTrackCase = (e) => {
    e.preventDefault();
    if (!trackTicketInput.trim()) return;
    const found = campusCases.find(c => c.id.toLowerCase() === trackTicketInput.trim().toLowerCase());
    setTrackedCaseResult(found || { status: 'NOT_FOUND' });
  };

  // Handle Investigator Case Creation
  const handleCreateCampusCase = (e) => {
    e.preventDefault();
    const newCase = {
      id: `PPKS-2026-00${campusCases.length + 1}`,
      campus: newCaseForm.campus,
      category: newCaseForm.category,
      victimAlias: newCaseForm.victimAlias,
      priority: newCaseForm.priority,
      status: 'Dalam Penanganan Satgas PPKS',
      date: new Date().toISOString().split('T')[0]
    };
    setCampusCases([newCase, ...campusCases]);
    setShowNewCaseModal(false);
  };

  // Handle Investigator Status Change
  const handleUpdateStatus = (caseId, newStatus) => {
    setCampusCases(campusCases.map(item => {
      if (item.id === caseId) {
        return { ...item, status: newStatus };
      }
      return item;
    }));
    if (selectedCaseForDetail && selectedCaseForDetail.id === caseId) {
      setSelectedCaseForDetail(prev => ({ ...prev, status: newStatus }));
    }
  };

  // Handle Adding Investigator Case Note
  const handleAddNote = (caseId) => {
    if (!investigatorNoteInput.trim()) return;
    const existing = caseNotes[caseId] || [];
    setCaseNotes({
      ...caseNotes,
      [caseId]: [...existing, `${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}: ${investigatorNoteInput}`]
    });
    setInvestigatorNoteInput('');
  };

  const filteredCasesForInvestigator = selectedCampusFilter === 'Semua' 
    ? campusCases 
    : campusCases.filter(c => c.campus === selectedCampusFilter);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Banner Utama Header */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #eff6ff, #e0f2fe)', border: '1px solid #bfdbfe' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ background: '#ffffff', padding: '16px', borderRadius: '16px', border: '1px solid #bfdbfe' }}>
              <GraduationCap size={36} color="#2563eb" />
            </div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>
                Campus Privacy Center (Integrasi Satgas PPKS Perguruan Tinggi)
              </h2>
              <p style={{ color: '#475569', fontSize: '13.5px', marginTop: '4px' }}>
                Pusat penanganan kasus kekerasan siber & pelindungan data pribadi kampus. Memisahkan secara tegas antara Portal Pelapor Publik/Korban dan Portal Investigator Satgas PPKS.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span className="badge badge-blue" style={{ padding: '8px 16px', fontSize: '13px' }}>
              <ShieldCheck size={14} /> Permendikbudristek No. 30/2021 & UU PDP
            </span>
          </div>
        </div>
      </div>

      {/* Host Routing Mode Navigation Switcher */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#ffffff',
        padding: '12px 18px',
        borderRadius: '16px',
        border: '1px solid #cbd5e1',
        boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            className={`btn ${activePortalTab === 'public' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => {
              setActivePortalTab('public');
              if (setUserRole) setUserRole('public');
            }}
            style={{ padding: '8px 18px', fontSize: '13.5px', borderRadius: '10px' }}
          >
            <User size={16} />
            <span>1. Portal Pelapor Publik & Korban</span>
          </button>

          <button
            className={`btn ${activePortalTab === 'investigator' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => {
              if (ppksAuthSession && ppksAuthSession.isAuthenticated) {
                setActivePortalTab('investigator');
                if (setUserRole) setUserRole('investigator');
              } else {
                onRequestAuth();
              }
            }}
            style={{ 
              padding: '8px 18px', 
              fontSize: '13.5px', 
              borderRadius: '10px',
              background: activePortalTab === 'investigator' ? 'linear-gradient(135deg, #7c3aed, #6d28d9)' : undefined,
              color: activePortalTab === 'investigator' ? '#ffffff' : undefined
            }}
          >
            <GraduationCap size={16} />
            <span>2. Portal Investigator Satgas PPKS (Internal)</span>
          </button>
        </div>

        <div style={{ fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Lock size={14} color={ppksAuthSession?.isAuthenticated ? '#059669' : '#d97706'} />
          <span>Status Otorisasi: <strong>{ppksAuthSession?.isAuthenticated ? `Terverifikasi (${ppksAuthSession.officerName.split(',')[0]})` : 'Terkunci (Memerlukan Verifikasi NIP/ID Satgas)'}</strong></span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 1. PUBLIC REPORTER INTERFACE (Pelapor Publik & Korban) */}
      {/* ========================================================= */}
      {activePortalTab === 'public' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="grid-2">
            {/* Form Pelaporan Kasus Publik */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">
                  <FileText size={20} color="#2563eb" />
                  <span>Formulir Pelaporan Darurat Kasus PPKS & Siber</span>
                </h3>
                <span className="badge badge-purple">Enkripsi End-to-End</span>
              </div>

              {!submittedTicket ? (
                <form onSubmit={handlePublicSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <p style={{ fontSize: '13px', color: '#475569' }}>
                    Laporan ini akan langsung diteruskan ke <strong>Satgas PPKS Perguruan Tinggi</strong> terkait secara rahasia. Identitas asli Anda akan disamarkan menggunakan Alias Kriptografis.
                  </p>

                  <div className="form-group">
                    <label className="form-label">Pilih Perguruan Tinggi (Kampus Anda)</label>
                    <select 
                      className="form-select"
                      value={reporterForm.campus}
                      onChange={(e) => setReporterForm({ ...reporterForm, campus: e.target.value })}
                    >
                      <option>Universitas Indonesia</option>
                      <option>Universitas Gadjah Mada</option>
                      <option>Universitas Mataram</option>
                      <option>Institut Teknologi Bandung</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Kategori Insiden / Pelanggaran</label>
                    <select 
                      className="form-select"
                      value={reporterForm.category}
                      onChange={(e) => setReporterForm({ ...reporterForm, category: e.target.value })}
                    >
                      <option>Kekerasan Seksual Berbasis Siber (KSBS)</option>
                      <option>Pengancaman Pembocoran Konten Intim (NCII)</option>
                      <option>Doxxing & Penyebaran Data Pribadi Mahasiswa</option>
                      <option>Cyberstalking & Pelecehan Akun Akademik</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Ringkasan Ancaman / Pelakunya (Opsional & Anonim)</label>
                    <textarea 
                      className="form-input" 
                      rows={3}
                      placeholder="Jelaskan secara ringkas insiden yang dialami (Misal: Terduga pelaku mengancam menyebarkan foto ke media sosial jika tidak menuruti permintaan)..."
                      value={reporterForm.threatDetail}
                      onChange={(e) => setReporterForm({ ...reporterForm, threatDetail: e.target.value })}
                      style={{ resize: 'vertical' }}
                    />
                  </div>

                  <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13px', color: '#334155' }}>
                      <input 
                        type="checkbox" 
                        checked={reporterForm.urgentCounseling}
                        onChange={(e) => setReporterForm({ ...reporterForm, urgentCounseling: e.target.checked })}
                      />
                      <span>Minta Pendampingan Legal & Psikologis Darurat dari Satgas PPKS 24/7</span>
                    </label>
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ padding: '12px' }}>
                    <ShieldCheck size={18} />
                    <span>Kirim Laporan Kasus Terenkripsi Ke Satgas PPKS</span>
                  </button>
                </form>
              ) : (
                <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '24px', borderRadius: '12px', textAlign: 'center' }}>
                  <CheckCircle2 size={42} color="#059669" style={{ margin: '0 auto 10px' }} />
                  <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#047857' }}>LAPORAN PPKS BERHASIL TERKIRIM</h4>
                  <p style={{ fontSize: '13px', color: '#475569', marginTop: '6px' }}>
                    Laporan Anda telah terdaftar dan terenkripsi dengan aman dalam sistem Satgas PPKS Kampus.
                  </p>

                  <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', padding: '14px', borderRadius: '8px', margin: '16px 0', textAlign: 'left' }}>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>Nomor Tiket Laporan Anda:</div>
                    <div style={{ fontSize: '20px', fontWeight: 800, color: '#2563eb', fontFamily: 'monospace' }}>{submittedTicket.id}</div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: '8px' }}>Alias Rahasia Korban:</div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#6d28d9', fontFamily: 'monospace' }}>{submittedTicket.alias}</div>
                  </div>

                  <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '16px' }}>
                    Simpan Kode Tiket di atas untuk melacak progres investigasi Satgas secara anonim tanpa membuka identitas asli Anda.
                  </p>

                  <button className="btn btn-secondary" onClick={() => setSubmittedTicket(null)}>
                    Buat Laporan Baru
                  </button>
                </div>
              )}
            </div>

            {/* Pelacak Progres Tiket Publik & Kontak Darurat */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">
                    <Search size={20} color="#0891b2" />
                    <span>Lacak Status Tiket Laporan Anonim</span>
                  </h3>
                  <span className="badge badge-blue">Public Tracker</span>
                </div>

                <form onSubmit={handleTrackCase} style={{ display: 'flex', gap: '10px' }}>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Masukkan Kode Tiket (Misal: PPKS-2026-001)..."
                    value={trackTicketInput}
                    onChange={(e) => setTrackTicketInput(e.target.value)}
                  />
                  <button type="submit" className="btn btn-primary">
                    <span>Lacak</span>
                  </button>
                </form>

                {trackedCaseResult && (
                  <div style={{ marginTop: '16px' }}>
                    {trackedCaseResult.status === 'NOT_FOUND' ? (
                      <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', padding: '12px', borderRadius: '8px', fontSize: '13px', color: '#be123c' }}>
                        Kode Tiket tidak ditemukan dalam basis data Satgas PPKS. Pastikan format nomor tiket benar.
                      </div>
                    ) : (
                      <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', padding: '14px', borderRadius: '10px', fontSize: '13px' }}>
                        <div style={{ fontWeight: 700, color: '#1d4ed8', fontSize: '15px' }}>Tiket: {trackedCaseResult.id}</div>
                        <div style={{ marginTop: '6px', color: '#334155' }}><strong>Kampus:</strong> {trackedCaseResult.campus}</div>
                        <div style={{ color: '#334155' }}><strong>Kategori:</strong> {trackedCaseResult.category}</div>
                        <div style={{ color: '#334155' }}><strong>Alias Korban:</strong> <span style={{ fontFamily: 'monospace', color: '#6d28d9' }}>{trackedCaseResult.victimAlias}</span></div>
                        <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <strong style={{ color: '#0f172a' }}>Status Saat Ini:</strong>
                          <span className="badge badge-emerald">{trackedCaseResult.status}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Banner Beralih ke Portal Investigator */}
              <div className="card" style={{ background: 'linear-gradient(135deg, #f3e8ff, #fae8ff)', border: '1px solid #ddd6fe' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <ShieldAlert size={32} color="#7c3aed" />
                  <div>
                    <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>Anda Anggota Satgas PPKS Kampus?</h4>
                    <p style={{ fontSize: '12.5px', color: '#475569', marginTop: '2px' }}>
                      Masuk dengan verifikasi NIP/ID resmi untuk mengelola berkas pengaduan, verifikasi bukti digital, dan memperbarui status kasus.
                    </p>
                    <button 
                      className="btn" 
                      style={{ marginTop: '10px', background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', color: '#fff', fontSize: '12.5px' }}
                      onClick={onRequestAuth}
                    >
                      <Lock size={14} />
                      <span>Verifikasi & Buka Investigator Command Desk →</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. INVESTIGATOR PORTAL INTERFACE (Satgas PPKS Kampus Internal) */}
      {/* ========================================================= */}
      {activePortalTab === 'investigator' && (
        <>
          {!ppksAuthSession || !ppksAuthSession.isAuthenticated ? (
            /* Locked Gate Screen if not authenticated */
            <div className="card" style={{ textAlign: 'center', padding: '48px 24px', background: '#f8fafc', border: '2px dashed #cbd5e1' }}>
              <Lock size={48} color="#7c3aed" style={{ margin: '0 auto 16px' }} />
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>
                Akses Terbatas: Satgas PPKS Investigator Command Desk
              </h3>
              <p style={{ fontSize: '13.5px', color: '#475569', maxWidth: '520px', margin: '8px auto 24px' }}>
                Portal ini hanya dapat diakses oleh Anggota Satgas PPKS Perguruan Tinggi terverifikasi berdasarkan Permendikbudristek No. 30/2021 & UU PDP No. 27/2022.
              </p>
              <button 
                className="btn" 
                style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', color: '#fff', padding: '12px 24px', fontSize: '14px' }}
                onClick={onRequestAuth}
              >
                <Key size={18} />
                <span>Verifikasi Identitas & Masuk Portal Satgas PPKS</span>
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Satgas Investigator Identity Bar */}
              <div className="card" style={{ background: '#f8fafc', border: '1px solid #cbd5e1' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ background: '#7c3aed', padding: '12px', borderRadius: '12px', color: '#fff' }}>
                      <Award size={24} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>
                        {ppksAuthSession.officerName}
                      </h3>
                      <p style={{ fontSize: '12.5px', color: '#475569' }}>
                        Otoritas: <strong>{ppksAuthSession.roleTitle}</strong> • ID: <span style={{ fontFamily: 'monospace', color: '#7c3aed' }}>{ppksAuthSession.officerId}</span> • Token: <span style={{ fontFamily: 'monospace', color: '#059669' }}>{ppksAuthSession.token}</span>
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <button className="btn btn-primary" onClick={() => setShowNewCaseModal(true)}>
                      <Plus size={18} />
                      <span>Registrasi Kasus Satgas Baru</span>
                    </button>

                    <button 
                      className="btn btn-secondary" 
                      onClick={onLogoutSatgas}
                      style={{ color: '#be123c', border: '1px solid #fecdd3' }}
                    >
                      <LogOut size={16} />
                      <span>Keluar Sesi</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Metric Overview Satgas */}
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

              {/* Tabel Direktori Kasus & Panel Manajemen Status */}
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">
                    <GraduationCap size={20} color="#7c3aed" />
                    <span>Direktori Kasus & Audit Satgas PPKS ({ppksAuthSession.campus})</span>
                  </h3>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '13px', color: '#475569', fontWeight: 600 }}>Filter Perguruan Tinggi:</span>
                    <select 
                      className="form-select" 
                      style={{ width: 'auto', padding: '6px 12px' }}
                      value={selectedCampusFilter}
                      onChange={(e) => setSelectedCampusFilter(e.target.value)}
                    >
                      <option>Semua</option>
                      <option>Universitas Indonesia</option>
                      <option>Universitas Gadjah Mada</option>
                      <option>Universitas Mataram</option>
                    </select>
                  </div>
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
                        <th>Status Kasus Saat Ini</th>
                        <th>Aksi Investigator</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCasesForInvestigator.map((item) => (
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
                          <td>
                            <button 
                              className="btn btn-secondary" 
                              style={{ padding: '4px 10px', fontSize: '12px' }}
                              onClick={() => setSelectedCaseForDetail(item)}
                            >
                              <span>Kelola Berkas Kasus</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Panel Detail & Manajemen Kasus Investigator */}
              {selectedCaseForDetail && (
                <div className="card" style={{ border: '2px solid #7c3aed' }}>
                  <div className="card-header">
                    <h3 className="card-title">
                      <ShieldCheck size={20} color="#7c3aed" />
                      <span>Manajemen Berkas Kasus: {selectedCaseForDetail.id}</span>
                    </h3>
                    <button className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '12px' }} onClick={() => setSelectedCaseForDetail(null)}>
                      Tutup Detail
                    </button>
                  </div>

                  <div className="grid-2">
                    <div>
                      <h4 style={{ fontSize: '14.5px', fontWeight: 700, color: '#0f172a' }}>Informasi Berkas Kasus</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', marginTop: '10px', color: '#334155' }}>
                        <div><strong>Perguruan Tinggi:</strong> {selectedCaseForDetail.campus}</div>
                        <div><strong>Kategori:</strong> {selectedCaseForDetail.category}</div>
                        <div><strong>Alias Kriptografis Korban:</strong> <span style={{ fontFamily: 'monospace', color: '#6d28d9', fontWeight: 700 }}>{selectedCaseForDetail.victimAlias}</span></div>
                        <div><strong>Tanggal Registrasi:</strong> {selectedCaseForDetail.date}</div>
                      </div>

                      <div style={{ marginTop: '16px' }}>
                        <label className="form-label">Perbarui Status Penanganan Satgas:</label>
                        <select 
                          className="form-select"
                          value={selectedCaseForDetail.status}
                          onChange={(e) => handleUpdateStatus(selectedCaseForDetail.id, e.target.value)}
                        >
                          <option>Terdaftar - Menunggu Verifikasi Satgas</option>
                          <option>Dalam Penanganan Satgas PPKS</option>
                          <option>Pendampingan Hukum & Verifikasi Bukti</option>
                          <option>Penyidikan Selesai & Rekomendasi Sanksi Rektor</option>
                          <option>Selesai & Proteksi Identitas Dipermanenkan</option>
                        </select>
                      </div>

                      <button 
                        className="btn" 
                        style={{ marginTop: '16px', background: '#059669', color: '#fff', width: '100%' }}
                        onClick={() => alert(`Draft Surat Peringatan Hukum & Rekomendasi Sanksi Rektor untuk ${selectedCaseForDetail.id} berhasil diterbitkan oleh ${ppksAuthSession.officerName}.`)}
                      >
                        <FileText size={16} />
                        <span>Terbitkan Draft Surat Rekomendasi Sanksi Rektor</span>
                      </button>
                    </div>

                    {/* Catatan Internal Investigator */}
                    <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                      <h4 style={{ fontSize: '14.5px', fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>Log Catatan Internal Investigator Satgas</h4>
                      
                      <div style={{ maxHeight: '160px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
                        {(caseNotes[selectedCaseForDetail.id] || ['Belum ada catatan internal khusus untuk kasus ini.']).map((note, idx) => (
                          <div key={idx} style={{ background: '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '12px', border: '1px solid #cbd5e1', color: '#334155' }}>
                            {note}
                          </div>
                        ))}
                      </div>

                      <div style={{ display: 'flex', gap: '8px' }}>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="Tambah catatan investigator..."
                          value={investigatorNoteInput}
                          onChange={(e) => setInvestigatorNoteInput(e.target.value)}
                        />
                        <button className="btn btn-primary" onClick={() => handleAddNote(selectedCaseForDetail.id)}>
                          Simpan
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Modal Buat Kasus Baru (Investigator Mode) */}
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
                <select className="form-select" value={newCaseForm.campus} onChange={(e) => setNewCaseForm({ ...newCaseForm, campus: e.target.value })}>
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
