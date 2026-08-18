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
  Sparkles,
  UploadCloud,
  Paperclip,
  X
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
    urgentCounseling: true,
    isAnonymous: true,
    reporterName: '',
    reporterNim: '',
    reporterFaculty: '',
    reporterInstitution: '',
    reporterContact: '',
    contactPersonName: '',
    contactPersonChannel: 'WhatsApp',
    contactPersonDetail: '',
    perpetratorStatus: 'Mahasiswa',
    perpetratorPlatform: 'Instagram',
    perpetratorName: '',
    perpetratorFaculty: ''
  });
  const [attachedEvidence, setAttachedEvidence] = useState([]);
  const [isHashing, setIsHashing] = useState(false);
  const [evidenceError, setEvidenceError] = useState('');
  const [submittedTicket, setSubmittedTicket] = useState(null);

  // Public Case Tracker State
  const [trackTicketInput, setTrackTicketInput] = useState('');
  const [trackedCaseResult, setTrackedCaseResult] = useState(null);

  // Investigator Portal State
  const [selectedCampusFilter, setSelectedCampusFilter] = useState('Semua');
  const [selectedCaseForDetail, setSelectedCaseForDetail] = useState(null);
  const [investigatorNoteInput, setInvestigatorNoteInput] = useState('');
  const [caseNotes, setCaseNotes] = useState({
    'PPKTPT-2026-001': ['Verifikasi tangkapan layar obrolan selesai. Hash SHA-256 cocok dengan Brankas Bukti.'],
    'PPKTPT-2026-002': ['Sesi konseling psikologis darurat telah diberikan kepada korban alias Korban-B44.']
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

  // Handle Evidence Upload with SHA-256 Calculation
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsHashing(true);
    setEvidenceError('');
    try {
      const arrayBuffer = await file.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      setAttachedEvidence(prev => [...prev, {
        id: Date.now(),
        name: file.name,
        size: `${(file.size / 1024).toFixed(1)} KB`,
        type: file.type || 'Berkas Digital',
        sha256: hashHex,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
        status: 'Terverifikasi (SHA-256)'
      }]);
    } catch (err) { console.error(err); }
    finally { setIsHashing(false); }
    e.target.value = '';
  };

  const handleRemoveEvidence = (id) => {
    setAttachedEvidence(prev => prev.filter(f => f.id !== id));
  };

  // Handle Public Submission
  const handlePublicSubmit = (e) => {
    e.preventDefault();
    if (attachedEvidence.length === 0) {
      setEvidenceError('Wajib melampirkan minimal 1 (satu) bukti digital konkret (screenshot chat, dokumen, rekaman) sebelum laporan PPKTPT dapat dikirim.');
      return;
    }
    setEvidenceError('');

    const newId = `PPKTPT-2026-00${campusCases.length + 1}`;
    const alias = reporterForm.isAnonymous 
      ? `Korban-STUDENT-${Math.floor(1000 + Math.random() * 9000)}`
      : `${reporterForm.reporterName} (NIM: ${reporterForm.reporterNim})`;

    const perpDetails = `${reporterForm.perpetratorStatus}: ${reporterForm.perpetratorName || 'Tidak Sebut Nama'} [Platform: ${reporterForm.perpetratorPlatform}] (${reporterForm.perpetratorFaculty || 'N/A'})`;

    const contactPersonInfo = reporterForm.contactPersonDetail
      ? `${reporterForm.contactPersonName || 'Kontak Person'} [${reporterForm.contactPersonChannel}]: ${reporterForm.contactPersonDetail}`
      : 'Tidak Dicantumkan';

    const newCase = {
      id: newId,
      campus: reporterForm.campus,
      category: reporterForm.category,
      victimAlias: alias,
      isAnonymous: reporterForm.isAnonymous,
      reporterInstitution: reporterForm.isAnonymous ? 'N/A (Sesi Anonim)' : (reporterForm.reporterInstitution || reporterForm.campus || 'Tidak Dicantumkan'),
      reporterContact: reporterForm.isAnonymous ? 'N/A (Anonim Sesi)' : reporterForm.reporterContact,
      contactPerson: contactPersonInfo,
      perpetratorInfo: perpDetails,
      priority: reporterForm.urgentCounseling ? 'Sangat Tinggi' : 'Tinggi',
      status: 'Terdaftar - Menunggu Verifikasi Satgas',
      date: new Date().toISOString().split('T')[0],
      threatDetail: reporterForm.threatDetail || 'Laporan Pengaduan Publik Siber Korban',
      evidenceCount: attachedEvidence.length,
      evidence: attachedEvidence
    };

    setCampusCases([newCase, ...campusCases]);
    setSubmittedTicket({ 
      id: newId, 
      alias: alias,
      isAnonymous: reporterForm.isAnonymous,
      perpetratorInfo: perpDetails,
      attachedEvidence: [...attachedEvidence]
    });
    setReporterForm({
      campus: 'Universitas Indonesia',
      category: 'Kekerasan Seksual Berbasis Siber (KSBS)',
      threatDetail: '',
      urgentCounseling: true,
      isAnonymous: true,
      reporterName: '',
      reporterNim: '',
      reporterFaculty: '',
      reporterInstitution: '',
      reporterContact: '',
      contactPersonName: '',
      contactPersonChannel: 'WhatsApp',
      contactPersonDetail: '',
      perpetratorStatus: 'Mahasiswa',
      perpetratorPlatform: 'Instagram',
      perpetratorName: '',
      perpetratorFaculty: ''
    });
    setAttachedEvidence([]);
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
    const nowTs = new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }) + ' WIB';
    const officer = ppksAuthSession?.officerName || 'Satgas PPKTPT Kampus';
    const newCase = {
      id: `PPKTPT-2026-00${campusCases.length + 1}`,
      campus: newCaseForm.campus,
      category: newCaseForm.category,
      victimAlias: newCaseForm.victimAlias,
      priority: newCaseForm.priority,
      status: 'Dalam Penanganan Satgas PPKTPT',
      date: new Date().toISOString().split('T')[0],
      assignedInvestigator: officer,
      investigationStartedAt: nowTs
    };
    setCampusCases([newCase, ...campusCases]);
    setShowNewCaseModal(false);
  };

  // Handle Investigator Status Change
  const handleUpdateStatus = (caseId, newStatus) => {
    const nowTs = new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }) + ' WIB';
    const officer = ppksAuthSession?.officerName || 'Satgas PPKTPT Kampus';
    setCampusCases(campusCases.map(item => {
      if (item.id === caseId) {
        return { 
          ...item, 
          status: newStatus,
          assignedInvestigator: officer,
          investigationStartedAt: item.investigationStartedAt || nowTs,
          lastUpdatedStatusAt: nowTs
        };
      }
      return item;
    }));
    if (selectedCaseForDetail && selectedCaseForDetail.id === caseId) {
      setSelectedCaseForDetail(prev => ({ 
        ...prev, 
        status: newStatus,
        assignedInvestigator: officer,
        investigationStartedAt: prev.investigationStartedAt || nowTs,
        lastUpdatedStatusAt: nowTs
      }));
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

  // Access control scoping: National Investigators see all campuses or filtered campus; Satgas PPKTPT Kampus see strictly their own campus.
  const filteredCasesForInvestigator = ppksAuthSession?.isNationalInvestigator
    ? (selectedCampusFilter === 'Semua' ? campusCases : campusCases.filter(c => c.campus === selectedCampusFilter))
    : campusCases.filter(c => c.campus === (ppksAuthSession?.campus || 'Universitas Indonesia'));

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
                Campus Privacy Center (Integrasi Satgas PPKTPT Perguruan Tinggi)
              </h2>
              <p style={{ color: '#475569', fontSize: '13.5px', marginTop: '4px' }}>
                Pusat penanganan kasus kekerasan siber & pelindungan data pribadi kampus. Memisahkan secara tegas antara Portal Pelapor Publik/Korban dan Portal Investigator Satgas PPKTPT.
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
        padding: '10px 16px',
        borderRadius: '14px',
        border: '1px solid #cbd5e1',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className={`btn ${activePortalTab === 'public' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => {
              setActivePortalTab('public');
              if (setUserRole) setUserRole('public');
            }}
            style={{ padding: '8px 18px', fontSize: '13.5px', borderRadius: '10px' }}
          >
            <UserCheck size={16} />
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
            <span>2. Portal Investigator Satgas PPKTPT (Internal)</span>
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
                  <span>Formulir Pelaporan Darurat Kasus PPKTPT & Siber</span>
                </h3>
                <span className="badge badge-purple">Enkripsi End-to-End</span>
              </div>

              {!submittedTicket ? (
                <form onSubmit={handlePublicSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <p style={{ fontSize: '13px', color: '#475569' }}>
                    Laporan ini akan langsung diteruskan ke <strong>Satgas PPKTPT Perguruan Tinggi</strong> terkait secara rahasia. Wajib melampirkan bukti digital konkret.
                  </p>

                  {/* Section 1: Detail Kampus & Insiden */}
                  <div style={{ background: '#eff6ff', padding: '8px 12px', borderRadius: '8px', fontSize: '12.5px', color: '#1d4ed8', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ background: '#2563eb', color: '#fff', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', flexShrink: 0 }}>1</span>
                    Detail Kampus & Insiden
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
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

                  <div className="form-group" style={{ marginBottom: 0 }}>
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

                  {/* Perpetrator Disclosure Fields (Pengungkapan Terduga Pelaku) */}
                  <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '14px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#991b1b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <ShieldAlert size={16} color="#dc2626" />
                      <span>Pengungkapan Terduga Pelaku (Perpetrator Disclosure)</span>
                    </div>

                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label" style={{ color: '#7f1d1d' }}>Status Terduga Pelaku</label>
                      <select 
                        className="form-select"
                        value={reporterForm.perpetratorStatus}
                        onChange={(e) => setReporterForm({ ...reporterForm, perpetratorStatus: e.target.value })}
                      >
                        <option>Mahasiswa (Satu Kampus)</option>
                        <option>Dosen / Tenaga Kependidikan</option>
                        <option>Pihak Luar Kampus / Akun Anonim Siber</option>
                        <option>Pengurus / Anggota Organisasi</option>
                        <option>Lainnya / Belum Pasti</option>
                      </select>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr 1fr', gap: '10px' }}>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label" style={{ color: '#7f1d1d' }}>Platform Medsos</label>
                        <select 
                          className="form-select" 
                          value={reporterForm.perpetratorPlatform}
                          onChange={(e) => setReporterForm({ ...reporterForm, perpetratorPlatform: e.target.value })}
                        >
                          <option value="Instagram">Instagram</option>
                          <option value="WhatsApp">WhatsApp</option>
                          <option value="Telegram">Telegram</option>
                          <option value="X (Twitter)">X (Twitter)</option>
                          <option value="TikTok">TikTok</option>
                          <option value="Facebook">Facebook</option>
                          <option value="LinkedIn">LinkedIn</option>
                          <option value="Discord">Discord</option>
                          <option value="Line">Line</option>
                          <option value="Darkweb / Forum Anonim">Darkweb / Forum Anonim</option>
                          <option value="Lainnya">Lainnya</option>
                        </select>
                      </div>

                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label" style={{ color: '#7f1d1d' }}>Nama / Akun Medsos Pelaku</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="Misal: Budi / @anon_user99" 
                          value={reporterForm.perpetratorName}
                          onChange={(e) => setReporterForm({ ...reporterForm, perpetratorName: e.target.value })}
                        />
                      </div>

                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label" style={{ color: '#7f1d1d' }}>Fakultas / Instansi Pelaku</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="Misal: Fakultas Teknik / Tidak Tahu" 
                          value={reporterForm.perpetratorFaculty}
                          onChange={(e) => setReporterForm({ ...reporterForm, perpetratorFaculty: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Ringkasan Ancaman & Kronologi Insiden</label>
                    <textarea 
                      className="form-input" 
                      rows={3}
                      placeholder="Jelaskan secara rinci kronologi insiden yang dialami..."
                      value={reporterForm.threatDetail}
                      onChange={(e) => setReporterForm({ ...reporterForm, threatDetail: e.target.value })}
                      style={{ resize: 'vertical' }}
                    />
                  </div>

                  {/* Section 2: Mandatory Concrete Evidence Upload */}
                  <div style={{ background: '#ecfdf5', padding: '8px 12px', borderRadius: '8px', fontSize: '12.5px', color: '#047857', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ background: '#059669', color: '#fff', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', flexShrink: 0 }}>2</span>
                    Lampiran Bukti Digital Konkret (Wajib)
                  </div>

                  <div style={{ border: evidenceError ? '2px solid #dc2626' : '2px dashed #a7f3d0', borderRadius: '12px', padding: '16px', textAlign: 'center', background: '#f0fdf4', cursor: 'pointer', position: 'relative' }}>
                    <input type="file" onChange={handleFileUpload} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0, cursor: 'pointer' }} />
                    <UploadCloud size={28} color="#059669" style={{ margin: '0 auto 6px' }} />
                    <h4 style={{ fontSize: '13.5px', fontWeight: 700, color: '#0f172a' }}>Unggah Bukti Digital (Screenshot Obrolan, Dokumen, Rekaman)</h4>
                    <p style={{ fontSize: '11px', color: '#475569', marginTop: '2px' }}>Hash SHA-256 dikalkulasi otomatis client-side untuk admisibilitas Satgas.</p>
                    {isHashing && <p style={{ marginTop: '6px', color: '#059669', fontWeight: 700, fontSize: '11.5px' }}>Mengalkulasi Hash SHA-256...</p>}
                  </div>

                  {evidenceError && (
                    <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '8px 12px', borderRadius: '8px', fontSize: '12px', color: '#dc2626', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <AlertCircle size={15} style={{ flexShrink: 0 }} />
                      <span>{evidenceError}</span>
                    </div>
                  )}

                  {attachedEvidence.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: '#047857' }}>
                        <Paperclip size={13} style={{ verticalAlign: 'middle' }} /> {attachedEvidence.length} bukti terlampir & terverifikasi:
                      </div>
                      {attachedEvidence.map(f => (
                        <div key={f.id} style={{ background: '#ffffff', border: '1px solid #a7f3d0', padding: '8px 10px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{f.name}</div>
                            <div style={{ fontSize: '10.5px', color: '#475569' }}>{f.size} • <span style={{ fontFamily: 'monospace', color: '#059669' }}>{f.sha256.substring(0, 12)}...</span></div>
                          </div>
                          <button type="button" onClick={() => handleRemoveEvidence(f.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8' }}><X size={15} /></button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Section 3: Anonymous Reporting Toggle & Identity Options */}
                  <div style={{ background: '#f3e8ff', padding: '8px 12px', borderRadius: '8px', fontSize: '12.5px', color: '#6d28d9', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ background: '#7c3aed', color: '#fff', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', flexShrink: 0 }}>3</span>
                    Mode Identitas Pelapor & Pendampingan
                  </div>

                  <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13px', color: '#334155' }}>
                      <input 
                        type="checkbox" 
                        checked={reporterForm.isAnonymous}
                        onChange={(e) => setReporterForm({ ...reporterForm, isAnonymous: e.target.checked })}
                      />
                      <span><strong>Mode Pelaporan Anonim (Sembunyikan Identitas Saya dari Pelaku)</strong></span>
                    </label>

                    {reporterForm.isAnonymous ? (
                      <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '10px 12px', borderRadius: '8px', fontSize: '12px', color: '#047857', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Lock size={16} style={{ flexShrink: 0 }} />
                        <span><strong>🛡️ Mode Anonim Aktif:</strong> Identitas disamarkan otomatis dengan Alias Kriptografis (contoh: <code>Korban-STUDENT-8921</code>).</span>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: '#ffffff', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                        <div style={{ fontSize: '12px', fontWeight: 700, color: '#1e293b' }}>Identitas Resmi Pelapor (Terverifikasi Kampus)</div>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                          <label className="form-label">Nama Lengkap Mahasiswa</label>
                          <input 
                            type="text" 
                            className="form-input" 
                            placeholder="Nama sesuai KTM" 
                            required={!reporterForm.isAnonymous}
                            value={reporterForm.reporterName} 
                            onChange={(e) => setReporterForm({ ...reporterForm, reporterName: e.target.value })} 
                          />
                        </div>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                          <label className="form-label">NIM / NIP Mahasiswa</label>
                          <input 
                            type="text" 
                            className="form-input" 
                            placeholder="2206..." 
                            required={!reporterForm.isAnonymous}
                            value={reporterForm.reporterNim} 
                            onChange={(e) => setReporterForm({ ...reporterForm, reporterNim: e.target.value })} 
                          />
                        </div>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                          <label className="form-label">Nama Perusahaan / Institusi / Perguruan Tinggi Pelapor</label>
                          <input 
                            type="text" 
                            className="form-input" 
                            placeholder="Misal: Universitas Indonesia / PT Telekomunikasi" 
                            value={reporterForm.reporterInstitution} 
                            onChange={(e) => setReporterForm({ ...reporterForm, reporterInstitution: e.target.value })} 
                          />
                        </div>
                      </div>
                    )}

                    {/* 1 Contact Person (WhatsApp / Social Media / Email) */}
                    <div style={{ background: '#ffffff', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span>Kontak Person Darurat Pelapor (Optional)</span>
                        <span className="badge badge-purple" style={{ fontSize: '10px' }}>WhatsApp / Medsos</span>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1.3fr', gap: '8px' }}>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                          <label className="form-label" style={{ fontSize: '11px' }}>Nama Kontak & Hubungan</label>
                          <input 
                            type="text" 
                            className="form-input" 
                            placeholder="Budi (Teman / Kerabat)" 
                            style={{ padding: '6px 10px', fontSize: '12px' }}
                            value={reporterForm.contactPersonName} 
                            onChange={(e) => setReporterForm({ ...reporterForm, contactPersonName: e.target.value })} 
                          />
                        </div>

                        <div className="form-group" style={{ marginBottom: 0 }}>
                          <label className="form-label" style={{ fontSize: '11px' }}>Saluran Kontak</label>
                          <select 
                            className="form-select"
                            style={{ padding: '6px 10px', fontSize: '12px' }}
                            value={reporterForm.contactPersonChannel}
                            onChange={(e) => setReporterForm({ ...reporterForm, contactPersonChannel: e.target.value })}
                          >
                            <option value="WhatsApp">WhatsApp</option>
                            <option value="Instagram">Instagram</option>
                            <option value="Telegram">Telegram</option>
                            <option value="X (Twitter)">X (Twitter)</option>
                            <option value="Email">Email</option>
                            <option value="Telepon Seluler">Telepon Seluler</option>
                          </select>
                        </div>

                        <div className="form-group" style={{ marginBottom: 0 }}>
                          <label className="form-label" style={{ fontSize: '11px' }}>Detail No. / Username</label>
                          <input 
                            type="text" 
                            className="form-input" 
                            placeholder="0812... / @username" 
                            style={{ padding: '6px 10px', fontSize: '12px' }}
                            value={reporterForm.contactPersonDetail} 
                            onChange={(e) => setReporterForm({ ...reporterForm, contactPersonDetail: e.target.value })} 
                          />
                        </div>
                      </div>
                    </div>

                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13px', color: '#334155' }}>
                      <input 
                        type="checkbox" 
                        checked={reporterForm.urgentCounseling}
                        onChange={(e) => setReporterForm({ ...reporterForm, urgentCounseling: e.target.checked })}
                      />
                      <span>Minta Pendampingan Legal & Psikologis Darurat dari Satgas PPKTPT 24/7</span>
                    </label>
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ padding: '12px' }}>
                    <ShieldCheck size={18} />
                    <span>Kirim Laporan Kasus & Bukti Ke Satgas PPKTPT</span>
                  </button>
                </form>
              ) : (
                <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '24px', borderRadius: '12px', textAlign: 'center' }}>
                  <CheckCircle2 size={42} color="#059669" style={{ margin: '0 auto 10px' }} />
                  <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#047857' }}>LAPORAN PPKTPT & BUKTI BERHASIL TERKIRIM</h4>
                  <p style={{ fontSize: '13px', color: '#475569', marginTop: '6px' }}>
                    Laporan beserta {submittedTicket.attachedEvidence.length} bukti digital telah terdaftar dan terenkripsi dalam sistem Satgas PPKTPT.
                  </p>

                  <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', padding: '14px', borderRadius: '8px', margin: '16px 0', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>Nomor Tiket Laporan Anda:</div>
                      <div style={{ fontSize: '20px', fontWeight: 800, color: '#2563eb', fontFamily: 'monospace' }}>{submittedTicket.id}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>Identitas Pelapor:</div>
                      <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#6d28d9' }}>{submittedTicket.alias}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: '#64748b' }}>Terduga Pelaku Terlaporkan:</div>
                      <div style={{ fontSize: '12.5px', color: '#991b1b', fontWeight: 700 }}>{submittedTicket.perpetratorInfo}</div>
                    </div>
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
                    placeholder="Masukkan Kode Tiket (Misal: PPKTPT-2026-001)..."
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
                        Kode Tiket tidak ditemukan dalam basis data Satgas PPKTPT. Pastikan format nomor tiket benar.
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
                    <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>Anda Anggota Satgas PPKTPT Kampus?</h4>
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
      {/* 2. INVESTIGATOR PORTAL INTERFACE (Satgas PPKTPT Kampus Internal) */}
      {/* ========================================================= */}
      {activePortalTab === 'investigator' && (
        <>
          {!ppksAuthSession || !ppksAuthSession.isAuthenticated ? (
            /* Locked Gate Screen if not authenticated */
            <div className="card" style={{ textAlign: 'center', padding: '48px 24px', background: '#f8fafc', border: '2px dashed #cbd5e1' }}>
              <Lock size={48} color="#7c3aed" style={{ margin: '0 auto 16px' }} />
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>
                Akses Terbatas: Satgas PPKTPT Investigator Command Desk
              </h3>
              <p style={{ fontSize: '13.5px', color: '#475569', maxWidth: '520px', margin: '8px auto 24px' }}>
                Portal ini hanya dapat diakses oleh Anggota Satgas PPKTPT Perguruan Tinggi terverifikasi berdasarkan Permendikbudristek No. 30/2021 & UU PDP No. 27/2022.
              </p>
              <button 
                className="btn" 
                style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', color: '#fff', padding: '12px 24px', fontSize: '14px' }}
                onClick={onRequestAuth}
              >
                <Key size={18} />
                <span>Verifikasi Identitas & Masuk Portal Satgas PPKTPT</span>
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
                    <div className="metric-lbl">Kasus PPKTPT Terenkripsi</div>
                  </div>
                </div>
              </div>

              {/* Tabel Direktori Kasus & Panel Manajemen Status */}
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">
                    <GraduationCap size={20} color="#7c3aed" />
                    <span>Direktori Kasus & Audit Satgas PPKTPT ({ppksAuthSession.campus})</span>
                  </h3>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '13px', color: '#475569', fontWeight: 600 }}>Wilayah Pengawasan:</span>
                    {ppksAuthSession?.isNationalInvestigator ? (
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
                    ) : (
                      <span className="badge badge-purple" style={{ fontSize: '12px' }}>
                        🔒 Satgas Internal {ppksAuthSession.campus}
                      </span>
                    )}
                  </div>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th>ID Registrasi PPKTPT</th>
                        <th>Perguruan Tinggi</th>
                        <th>Kategori Kasus Siber</th>
                        <th>Alias Kripto Korban</th>
                        <th>Penanggung Jawab (Satgas)</th>
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
                          <td style={{ fontSize: '12px', fontWeight: 600, color: '#0f172a' }}>
                            {ppksAuthSession?.isNationalInvestigator ? (
                              <>
                                <div>👤 {item.assignedInvestigator || 'Belum Ditugaskan'}</div>
                                {item.investigationStartedAt && (
                                  <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 400, marginTop: '2px' }}>
                                    ⏰ {item.investigationStartedAt}
                                  </div>
                                )}
                              </>
                            ) : (
                              <span className="badge badge-purple" style={{ fontSize: '11px' }}>
                                🔒 Terproteksi (Akses Investigator Nasional)
                              </span>
                            )}
                          </td>
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
                        <div><strong>Kontak Person Darurat Pelapor:</strong> {selectedCaseForDetail.contactPerson || 'Tidak Dicantumkan'}</div>
                        <div>
                          <strong>Investigator Penanggung Jawab:</strong>{' '}
                          {ppksAuthSession?.isNationalInvestigator ? (
                            <span style={{ fontWeight: 700, color: '#7c3aed' }}>👤 {selectedCaseForDetail.assignedInvestigator || 'Belum Ditugaskan'}</span>
                          ) : (
                            <span style={{ fontSize: '12px', color: '#64748b', fontStyle: 'italic' }}>🔒 Disembunyikan (Hanya Dapat Dilihat oleh Investigator Nasional)</span>
                          )}
                        </div>
                        <div><strong>Waktu Mulai Penanganan:</strong> ⏰ {selectedCaseForDetail.investigationStartedAt || selectedCaseForDetail.date}</div>
                        {selectedCaseForDetail.lastUpdatedStatusAt && (
                          <div><strong>Waktu Perubahan Status:</strong> ⏰ {selectedCaseForDetail.lastUpdatedStatusAt}</div>
                        )}
                      </div>

                      <div style={{ marginTop: '16px' }}>
                        <label className="form-label">Perbarui Status Penanganan Satgas:</label>
                        <select 
                          className="form-select"
                          value={selectedCaseForDetail.status}
                          onChange={(e) => handleUpdateStatus(selectedCaseForDetail.id, e.target.value)}
                        >
                          <option>Terdaftar - Menunggu Verifikasi Satgas</option>
                          <option>Dalam Penanganan Satgas PPKTPT</option>
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
              <span>Registrasi Penanganan Kasus Satgas PPKTPT Baru</span>
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
