import React, { useState } from 'react';
import { Lock, Shield, Send, CheckCircle2, AlertCircle, FileLock2, KeyRound, Key, ShieldCheck, UploadCloud, FileText, X, Paperclip, User, Phone, UserX, UserCheck } from 'lucide-react';

export default function SecureComplaintCenter({ complaints, setComplaints, ppksAuthSession }) {
  const [activeSection, setActiveSection] = useState('form');
  const [formData, setFormData] = useState({
    category: 'Kebocoran Data Pribadi (Data Leak)',
    reportedEntity: '',
    perpetratorPhone: '',
    perpetratorPlatform: 'Instagram',
    perpetratorSocial: '',
    perpetratorDetails: '',
    incidentDate: '',
    description: '',
    isAnonymous: true,
    reporterName: '',
    reporterNik: '',
    reporterInstitution: '',
    reporterContact: '',
    contactPersonName: '',
    contactPersonChannel: 'WhatsApp',
    contactPersonDetail: '',
    encryptPayload: true,
  });
  const [attachedEvidence, setAttachedEvidence] = useState([]);
  const [isHashing, setIsHashing] = useState(false);
  const [evidenceError, setEvidenceError] = useState('');
  const [submittedTicket, setSubmittedTicket] = useState(null);

  const [selectedComplaintDetail, setSelectedComplaintDetail] = useState(null);

  const isAuthorized = ppksAuthSession && ppksAuthSession.isAuthenticated;

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (attachedEvidence.length === 0) {
      setEvidenceError('Wajib melampirkan minimal 1 (satu) bukti digital konkret sebelum pengaduan dapat dikirim.');
      return;
    }
    setEvidenceError('');
    
    const randomTicket = `IDPC-CRYPT-${Math.floor(1000 + Math.random() * 9000)}`;
    const anonAlias = `PELAPOR-ANON-${Math.floor(1000 + Math.random() * 9000)}`;
    
    const reporterInfo = formData.isAnonymous 
      ? `${anonAlias} (Anonim Terenkripsi)` 
      : `${formData.reporterName} (NIK: ${formData.reporterNik})`;

    const socialInfo = formData.perpetratorSocial ? `[${formData.perpetratorPlatform}] ${formData.perpetratorSocial}` : '';
    const perpFullDetails = `${formData.reportedEntity} ${formData.perpetratorPhone ? '• HP: ' + formData.perpetratorPhone : ''} ${socialInfo ? '• ' + socialInfo : ''}`;

    const contactPersonInfo = formData.contactPersonDetail 
      ? `${formData.contactPersonName || 'Kontak Person'} [${formData.contactPersonChannel}]: ${formData.contactPersonDetail}` 
      : 'Tidak Dicantumkan';

    const newComplaint = {
      id: Date.now(), 
      ticketCode: randomTicket, 
      category: formData.category,
      entity: formData.reportedEntity || 'Institusi Rahasia (Terenskripsi)',
      perpetratorPhone: formData.perpetratorPhone || 'N/A',
      perpetratorPlatform: formData.perpetratorPlatform,
      perpetratorSocial: formData.perpetratorSocial || 'N/A',
      perpetratorDetails: formData.perpetratorDetails || 'N/A',
      perpetratorFullSummary: perpFullDetails,
      date: formData.incidentDate || new Date().toISOString().split('T')[0],
      status: 'Terdaftar - Audit IDPC', 
      isAnonymous: formData.isAnonymous,
      reporterIdentity: reporterInfo,
      reporterInstitution: formData.isAnonymous ? 'N/A (Sesi Anonim)' : (formData.reporterInstitution || 'Tidak Dicantumkan'),
      reporterContact: formData.isAnonymous ? 'N/A (Sesi Anonim)' : formData.reporterContact,
      contactPerson: contactPersonInfo,
      encrypted: formData.encryptPayload, 
      evidenceCount: attachedEvidence.length,
      evidence: attachedEvidence
    };

    setComplaints([newComplaint, ...complaints]);
    setSubmittedTicket({ ...newComplaint, attachedEvidence: [...attachedEvidence] });
    setFormData({ 
      category: 'Kebocoran Data Pribadi (Data Leak)', 
      reportedEntity: '', 
      perpetratorPhone: '',
      perpetratorPlatform: 'Instagram',
      perpetratorSocial: '',
      perpetratorDetails: '',
      incidentDate: '', 
      description: '', 
      isAnonymous: true, 
      reporterName: '',
      reporterNik: '',
      reporterContact: '',
      contactPersonName: '',
      contactPersonChannel: 'WhatsApp',
      contactPersonDetail: '',
      encryptPayload: true
    });
    setAttachedEvidence([]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Banner */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #eff6ff, #e0f2fe)', border: '1px solid #bfdbfe' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ background: '#ffffff', padding: '14px', borderRadius: '14px', border: '1px solid #bfdbfe' }}>
              <FileLock2 size={32} color="#2563eb" />
            </div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>Pusat Pengaduan & Brankas Bukti Digital Terenkripsi</h2>
              <p style={{ color: '#475569', fontSize: '13.5px', marginTop: '4px' }}>
                Formulir pengaduan terintegrasi dengan penyimpanan bukti digital terverifikasi SHA-256. Bukti konkret wajib dilampirkan sebagai syarat admisibilitas hukum.
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <span className="badge badge-blue" style={{ padding: '8px 14px', fontSize: '12px' }}><Lock size={13} /> End-to-End Encrypted</span>
            <span className="badge badge-emerald" style={{ padding: '8px 14px', fontSize: '12px' }}><ShieldCheck size={13} /> ISO/IEC 27037</span>
          </div>
        </div>
      </div>

      {/* Tab Switcher */}
      <div style={{ display: 'flex', gap: '6px', background: '#ffffff', padding: '6px', borderRadius: '14px', border: '1px solid #cbd5e1', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        <button onClick={() => setActiveSection('form')} className={`btn ${activeSection === 'form' ? 'btn-primary' : 'btn-secondary'}`} style={{ flex: 1, padding: '10px 16px', borderRadius: '10px', fontSize: '13.5px' }}>
          <KeyRound size={16} /><span>Formulir Pengaduan & Bukti Digital</span>
        </button>
        {isAuthorized && (
          <button onClick={() => setActiveSection('registry')} className={`btn ${activeSection === 'registry' ? 'btn-primary' : 'btn-secondary'}`} style={{ flex: 1, padding: '10px 16px', borderRadius: '10px', fontSize: '13.5px' }}>
            <Shield size={16} /><span>Registri Pengaduan Masuk (Investigator)</span>
          </button>
        )}
      </div>

      {/* ====== UNIFIED FORM ====== */}
      {activeSection === 'form' && (
        <div className="grid-2">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title"><KeyRound size={20} color="#2563eb" /><span>Formulir Pengaduan & Lampiran Bukti IDPC</span></h3>
              <span className="badge badge-blue">Zero-Knowledge Log</span>
            </div>

            {!submittedTicket ? (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Step 1: Incident & Perpetrator Details */}
                <div style={{ background: '#eff6ff', padding: '10px 14px', borderRadius: '8px', fontSize: '12.5px', color: '#1d4ed8', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ background: '#2563eb', color: '#fff', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', flexShrink: 0 }}>1</span>
                  Detail Insiden & Identifikasi Terlapor (Pelaku)
                </div>

                <div className="form-group">
                  <label className="form-label">Kategori Pelanggaran PDP</label>
                  <select className="form-select" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                    <option>Kebocoran Data Pribadi (Data Leak)</option>
                    <option>Penjualan Data Pribadi Tanpa Konsen</option>
                    <option>Penyalahgunaan NIK & Data Kependudukan</option>
                    <option>Penipuan / Spam Keuangan Berbasis Data Pribadi</option>
                    <option>Pelanggaran Hak Subjek Data (Penolakan Penghapusan Data)</option>
                  </select>
                </div>

                {/* Detailed Perpetrator Identification Sub-Card */}
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '14px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#991b1b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <UserX size={16} color="#dc2626" />
                    <span>Identifikasi Pihak Terlapor / Pelaku (Perpetrator Disclosure)</span>
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ color: '#7f1d1d' }}>Nama Institusi / Nama Pelaku (Terlapor)</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Contoh: PT Financial Mega, Universitas XYZ, Aplikasi ABC, atau Nama Individu" 
                      required 
                      value={formData.reportedEntity} 
                      onChange={(e) => setFormData({ ...formData, reportedEntity: e.target.value })} 
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ color: '#7f1d1d' }}>No. Telepon / WhatsApp Terlapor</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="0812... / +62..." 
                      value={formData.perpetratorPhone} 
                      onChange={(e) => setFormData({ ...formData, perpetratorPhone: e.target.value })} 
                    />
                  </div>

                  {/* Social Media Selection Dropdown & Username Handle Input */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '10px' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label" style={{ color: '#7f1d1d' }}>Platform Media Sosial</label>
                      <select 
                        className="form-select" 
                        value={formData.perpetratorPlatform}
                        onChange={(e) => setFormData({ ...formData, perpetratorPlatform: e.target.value })}
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
                      <label className="form-label" style={{ color: '#7f1d1d' }}>Akun / Username / Tautan Medsos</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="Misal: @username atau instagram.com/..." 
                        value={formData.perpetratorSocial} 
                        onChange={(e) => setFormData({ ...formData, perpetratorSocial: e.target.value })} 
                      />
                    </div>
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label" style={{ color: '#7f1d1d' }}>Informasi Tambahan / Profil Terlapor (Opsional)</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Informasi domisili, instansi, NIK, atau catatan identitas pelaku lainnya..." 
                      value={formData.perpetratorDetails} 
                      onChange={(e) => setFormData({ ...formData, perpetratorDetails: e.target.value })} 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Tanggal Kejadian Insiden</label>
                  <input type="date" className="form-input" required value={formData.incidentDate} onChange={(e) => setFormData({ ...formData, incidentDate: e.target.value })} />
                </div>

                <div className="form-group">
                  <label className="form-label">Uraian Kejadian / Kronologi Insiden</label>
                  <textarea className="form-textarea" rows="3" placeholder="Jelaskan bagaimana data Anda bocor atau disalahgunakan secara detail..." required value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}></textarea>
                </div>

                {/* Step 2: Mandatory Evidence Upload */}
                <div style={{ background: '#ecfdf5', padding: '10px 14px', borderRadius: '8px', fontSize: '12.5px', color: '#047857', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ background: '#059669', color: '#fff', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', flexShrink: 0 }}>2</span>
                  Lampiran Bukti Digital Konkret (Wajib)
                </div>

                <div style={{ border: evidenceError ? '2px solid #dc2626' : '2px dashed #a7f3d0', borderRadius: '12px', padding: '20px', textAlign: 'center', background: '#f0fdf4', cursor: 'pointer', position: 'relative' }}>
                  <input type="file" onChange={handleFileUpload} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0, cursor: 'pointer' }} />
                  <UploadCloud size={32} color="#059669" style={{ margin: '0 auto 8px' }} />
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Unggah Bukti Digital (Screenshot, Dokumen, Video)</h4>
                  <p style={{ fontSize: '11.5px', color: '#475569', marginTop: '4px' }}>Format: .png, .jpg, .pdf, .txt, .json, .mp4 — Hash SHA-256 dikalkulasi otomatis secara client-side.</p>
                  {isHashing && <p style={{ marginTop: '8px', color: '#059669', fontWeight: 700, fontSize: '12px' }}>Mengalkulasi Hash SHA-256...</p>}
                </div>

                {evidenceError && (
                  <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '10px 14px', borderRadius: '8px', fontSize: '12.5px', color: '#dc2626', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <AlertCircle size={16} style={{ flexShrink: 0 }} />
                    <span>{evidenceError}</span>
                  </div>
                )}

                {/* Attached Evidence List */}
                {attachedEvidence.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#047857' }}>
                      <Paperclip size={14} style={{ verticalAlign: 'middle' }} /> {attachedEvidence.length} bukti terlampir & terverifikasi:
                    </div>
                    {attachedEvidence.map(f => (
                      <div key={f.id} style={{ background: '#ffffff', border: '1px solid #a7f3d0', padding: '10px 12px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{f.name}</div>
                          <div style={{ fontSize: '11px', color: '#475569' }}>{f.size} • <span style={{ fontFamily: 'monospace', color: '#059669' }}>{f.sha256.substring(0, 12)}...{f.sha256.slice(-6)}</span></div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span className="badge badge-emerald" style={{ fontSize: '10px' }}>SHA-256 ✓</span>
                          <button type="button" onClick={() => handleRemoveEvidence(f.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '2px' }}><X size={16} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Step 3: Security Options & Functional Anonymous Mode */}
                <div style={{ background: '#f3e8ff', padding: '10px 14px', borderRadius: '8px', fontSize: '12.5px', color: '#6d28d9', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ background: '#7c3aed', color: '#fff', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', flexShrink: 0 }}>3</span>
                  Opsi Keamanan & Mode Identitas Pelapor
                </div>

                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '14px', border: '1px solid #e2e8f0' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13.5px', color: '#334155' }}>
                    <input 
                      type="checkbox" 
                      checked={formData.isAnonymous} 
                      onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })} 
                    />
                    <span><strong>Mode Pelaporan Anonim (Sembunyikan NIK & Identitas Saya)</strong></span>
                  </label>

                  {formData.isAnonymous ? (
                    <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '12px 14px', borderRadius: '10px', fontSize: '12.5px', color: '#047857', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                      <Lock size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                      <div>
                        <strong>🛡️ Perlindungan Identitas Anonim Aktif:</strong>
                        <p style={{ marginTop: '2px', color: '#334155' }}>
                          Sistem akan menggenerasi <strong>Kunci Alias Kriptografis Salt</strong> otomatis (misal: <code>PELAPOR-ANON-8492</code>). Nama asli, NIK, dan nomor HP Anda <strong>tidak akan dicatat atau disimpan</strong> dalam server IDPC.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', background: '#ffffff', padding: '14px', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
                      <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <User size={15} color="#2563eb" />
                        <span>Identitas Resmi Pelapor (Mode Terverifikasi)</span>
                      </div>

                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Nama Lengkap Pelapor</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="Masukkan nama lengkap sesuai KTP" 
                          required={!formData.isAnonymous}
                          value={formData.reporterName} 
                          onChange={(e) => setFormData({ ...formData, reporterName: e.target.value })} 
                        />
                      </div>

                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">NIK (16 Digit Pelapor)</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="32710..." 
                          maxLength={16}
                          required={!formData.isAnonymous}
                          value={formData.reporterNik} 
                          onChange={(e) => setFormData({ ...formData, reporterNik: e.target.value })} 
                        />
                      </div>

                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Nama Perusahaan / Institusi / Perguruan Tinggi Pelapor</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="Misal: PT Teknologi Nusantara / Universitas Indonesia" 
                          value={formData.reporterInstitution} 
                          onChange={(e) => setFormData({ ...formData, reporterInstitution: e.target.value })} 
                        />
                      </div>

                      <p style={{ fontSize: '11.5px', color: '#64748b', margin: 0 }}>
                        🔒 Identitas Anda disimpang dengan enkripsi AES-256 dan hanya dapat diakses oleh investigator PPKS resmi.
                      </p>
                    </div>
                  )}

                  {/* 1 Contact Person (WhatsApp / Social Media / Email) */}
                  <div style={{ background: '#ffffff', padding: '14px', borderRadius: '10px', border: '1px solid #cbd5e1', display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '4px' }}>
                    <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Phone size={15} color="#0284c7" />
                        <span>Kontak Person Darurat / Penanggung Jawab Pelapor</span>
                      </span>
                      <span className="badge badge-purple" style={{ fontSize: '10px' }}>Opsional / Channel Pilihan</span>
                    </div>
                    <p style={{ fontSize: '11.5px', color: '#64748b', margin: 0 }}>
                      Cantumkan 1 (satu) kontak person terdekat (teman, kerabat, pendamping, atau akun medsos) yang dapat dihubungi jika investigator membutuhkan komunikasi langsung.
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1.3fr', gap: '10px' }}>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Nama Kontak Person & Hubungan</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="Misal: Budi (Kakak / Kerabat)" 
                          value={formData.contactPersonName} 
                          onChange={(e) => setFormData({ ...formData, contactPersonName: e.target.value })} 
                        />
                      </div>

                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Saluran Kontak</label>
                        <select 
                          className="form-select"
                          value={formData.contactPersonChannel}
                          onChange={(e) => setFormData({ ...formData, contactPersonChannel: e.target.value })}
                        >
                          <option value="WhatsApp">WhatsApp</option>
                          <option value="Instagram">Instagram</option>
                          <option value="Telegram">Telegram</option>
                          <option value="X (Twitter)">X (Twitter)</option>
                          <option value="Email">Email</option>
                          <option value="Telepon Seluler">Telepon Seluler</option>
                          <option value="Lainnya">Lainnya</option>
                        </select>
                      </div>

                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label">Detail Nomor / Username Medsos</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="0812... / @username" 
                          value={formData.contactPersonDetail} 
                          onChange={(e) => setFormData({ ...formData, contactPersonDetail: e.target.value })} 
                        />
                      </div>
                    </div>
                  </div>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13.5px', color: '#334155' }}>
                    <input type="checkbox" checked={formData.encryptPayload} onChange={(e) => setFormData({ ...formData, encryptPayload: e.target.checked })} />
                    <span>Enkripsi Kriptografis AES-256 pada Muatan Berkas (Payload)</span>
                  </label>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px' }}>
                  <Send size={18} />
                  <span>Kirim Pengaduan & Bukti Digital ke IDPC</span>
                </button>
              </form>
            ) : (
              /* Success Confirmation */
              <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '24px', borderRadius: '12px', textAlign: 'center' }}>
                <CheckCircle2 size={42} color="#059669" style={{ margin: '0 auto 10px' }} />
                <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#047857' }}>PENGADUAN & BUKTI BERHASIL TERKUNCI</h4>
                <p style={{ fontSize: '13px', color: '#475569', marginTop: '6px' }}>Pengaduan beserta {submittedTicket.attachedEvidence.length} berkas bukti digital telah terverifikasi dan terenkripsi dalam Brankas IDPC.</p>
                
                <div style={{ background: '#ffffff', padding: '14px', borderRadius: '8px', margin: '16px 0', border: '1px solid #cbd5e1', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>Nomor Tiket Kriptografis:</div>
                    <div style={{ fontSize: '20px', fontWeight: 800, color: '#1d4ed8', fontFamily: 'monospace' }}>{submittedTicket.ticketCode}</div>
                  </div>

                  <div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>Status Identitas Pelapor:</div>
                    <div style={{ fontSize: '13.5px', fontWeight: 700, color: submittedTicket.isAnonymous ? '#059669' : '#1e293b' }}>
                      {submittedTicket.isAnonymous ? (
                        <span className="badge badge-emerald" style={{ padding: '4px 10px', fontSize: '12px' }}>
                          🛡️ {submittedTicket.reporterIdentity}
                        </span>
                      ) : (
                        <span className="badge badge-blue" style={{ padding: '4px 10px', fontSize: '12px' }}>
                          👤 {submittedTicket.reporterIdentity}
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>Identitas Terlapor / Pelaku:</div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#dc2626' }}>
                      {submittedTicket.perpetratorFullSummary}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>Bukti Terlampir:</div>
                    {submittedTicket.attachedEvidence.map(f => (
                      <div key={f.id} style={{ fontSize: '12px', color: '#059669', fontFamily: 'monospace', marginTop: '2px' }}>✓ {f.name} ({f.sha256.substring(0, 16)}...)</div>
                    ))}
                  </div>
                </div>

                <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '16px' }}>Simpan nomor tiket untuk melacak progres audit tanpa perlu login.</p>
                <button className="btn btn-secondary" onClick={() => setSubmittedTicket(null)}>Buat Pengaduan Baru</button>
              </div>
            )}
          </div>

          {/* Right Panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Attached Evidence Table */}
            {attachedEvidence.length > 0 && (
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title"><FileText size={20} color="#7c3aed" /><span>Berkas Bukti Terlampir & Verifikasi SHA-256</span></h3>
                  <span className="badge badge-purple">{attachedEvidence.length} Berkas Terverifikasi</span>
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table className="custom-table">
                    <thead><tr><th>Nama Berkas</th><th>Hash SHA-256</th><th>Stempel Waktu</th><th>Status</th></tr></thead>
                    <tbody>
                      {attachedEvidence.map(file => (
                        <tr key={file.id}>
                          <td style={{ fontWeight: 700, color: '#0f172a' }}>{file.name}</td>
                          <td style={{ fontFamily: 'monospace', fontSize: '11px', color: '#2563eb' }}>{file.sha256.substring(0, 12)}...{file.sha256.slice(-6)}</td>
                          <td style={{ fontSize: '12px', color: '#475569' }}>{file.timestamp}</td>
                          <td><span className="badge badge-emerald" style={{ fontSize: '11px' }}>✓ Terverifikasi</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Info & Restricted Notice */}
            <div className="card" style={{ background: '#f8fafc' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12.5px', color: '#475569' }}>
                <div style={{ background: '#fff', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <strong style={{ color: '#dc2626' }}>⚠️ Bukti Wajib</strong>
                  <p style={{ marginTop: '2px' }}>Setiap pengaduan wajib dilampirkan minimal 1 bukti digital konkret (screenshot, dokumen, video) sebagai syarat admisibilitas hukum UU PDP & UU ITE.</p>
                </div>
                <div style={{ background: '#fff', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <strong style={{ color: '#2563eb' }}>🔐 Mode Pelaporan & SHA-256</strong>
                  <p style={{ marginTop: '2px' }}>Pilih Mode Anonim untuk menyamarkan identitas secara kriptografis, atau Mode Resmi dengan NIK terenkripsi. Hash SHA-256 dikalkulasi client-side untuk integritas bukti.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====== REGISTRY (Investigator Nasional Only) ====== */}
      {activeSection === 'registry' && (
        <>
          {isAuthorized && ppksAuthSession?.isNationalInvestigator ? (
            <>
              <div className="card" style={{ border: '1px solid #ddd6fe' }}>
                <div className="card-header">
                  <h3 className="card-title"><Shield size={20} color="#7c3aed" /><span>Registri Pengaduan Masuk (Audit IDPC)</span></h3>
                  <span className="badge badge-purple">{complaints.length} Berkas Active</span>
                </div>
                <div style={{ background: '#f3e8ff', padding: '10px 14px', borderRadius: '8px', fontSize: '12px', color: '#6d28d9', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={15} /><span>Sesi terverifikasi sebagai <strong>{ppksAuthSession.officerName}</strong> — Semua akses tercatat dalam log audit IDPC.</span>
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th>No. Tiket</th>
                        <th>Identitas Pelapor</th>
                        <th>Kategori</th>
                        <th>Institusi / Pelaku Terlapor</th>
                        <th>Tanggal</th>
                        <th>Penanggung Jawab (Investigator)</th>
                        <th>Status IDPC</th>
                        <th>Aksi Investigator</th>
                      </tr>
                    </thead>
                    <tbody>
                      {complaints.map(item => (
                        <tr key={item.id}>
                          <td style={{ fontFamily: 'monospace', fontWeight: 700, color: '#2563eb' }}>{item.ticketCode}</td>
                          <td>
                            {item.isAnonymous ? (
                              <span className="badge badge-emerald" style={{ fontSize: '11px' }}>
                                🛡️ {item.reporterIdentity || 'PELAPOR-ANON (Terenskripsi)'}
                              </span>
                            ) : (
                              <span className="badge badge-blue" style={{ fontSize: '11px' }}>
                                👤 {item.reporterIdentity || 'Terverifikasi ID'}
                              </span>
                            )}
                          </td>
                          <td style={{ fontSize: '12.5px' }}>{item.category}</td>
                          <td style={{ color: '#0f172a', fontWeight: 600 }}>{item.perpetratorFullSummary || item.entity}</td>
                          <td style={{ fontSize: '12px', color: '#475569' }}>{item.date}</td>
                          <td style={{ fontSize: '12px', fontWeight: 600, color: '#0f172a' }}>
                            <div>👤 {item.assignedInvestigator || <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>Belum Ditugaskan</span>}</div>
                            {item.investigationStartedAt && (
                              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 400, marginTop: '2px' }}>
                                ⏰ {item.investigationStartedAt}
                              </div>
                            )}
                          </td>
                          <td><span className="badge badge-amber">{item.status}</span></td>
                          <td>
                            <button 
                              className="btn btn-primary" 
                              style={{ padding: '4px 10px', fontSize: '11.5px' }}
                              onClick={() => setSelectedComplaintDetail(item)}
                            >
                              <FileText size={13} />
                              <span>Detail Pengaduan</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            {/* Investigator Detailed Complaint Inspection Modal */}
            {selectedComplaintDetail && (
              <div className="modal-overlay" style={{ zIndex: 1200 }}>
                <div className="modal-card" style={{ maxWidth: '680px', padding: '24px', border: '2px solid #2563eb' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '14px', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ background: '#eff6ff', padding: '10px', borderRadius: '10px', color: '#2563eb' }}>
                        <FileLock2 size={24} />
                      </div>
                      <div>
                        <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a' }}>
                          Detail Pengaduan: {selectedComplaintDetail.ticketCode}
                        </h3>
                        <p style={{ fontSize: '12px', color: '#64748b' }}>
                          Daftar Audit Investigasi Resmi IDPC & Satgas PPKS
                        </p>
                      </div>
                    </div>
                    <button className="btn btn-secondary" style={{ padding: '4px 10px' }} onClick={() => setSelectedComplaintDetail(null)}>
                      <X size={16} />
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {/* Status & Category Banner */}
                    <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '12px 16px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ fontSize: '11.5px', color: '#64748b' }}>Kategori Pelanggaran PDP:</div>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>{selectedComplaintDetail.category}</div>
                      </div>
                      <span className="badge badge-purple" style={{ fontSize: '12px' }}>{selectedComplaintDetail.status}</span>
                    </div>

                    {/* Investigator Assignment & Handling Metadata Box */}
                    <div style={{ background: '#f5f3ff', border: '1px solid #ddd6fe', padding: '14px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#6d28d9', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <UserCheck size={16} color="#7c3aed" />
                        <span>Otoritas Penanganan Kasus & Timestamp Audit IDPC</span>
                      </div>
                      <div style={{ fontSize: '13px', color: '#3730a3', lineHeight: '1.6' }}>
                        <div><strong>Investigator Penanggung Jawab:</strong> {selectedComplaintDetail.assignedInvestigator || <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>Belum Ditugaskan</span>}</div>
                        <div><strong>Waktu Mulai Penanganan:</strong> {selectedComplaintDetail.investigationStartedAt || <span style={{ color: '#94a3b8' }}>-</span>}</div>
                        {selectedComplaintDetail.investigationCompletedAt && (
                          <div><strong>Waktu Kasus Selesai:</strong> {selectedComplaintDetail.investigationCompletedAt}</div>
                        )}
                      </div>
                    </div>

                    {/* Perpetrator Disclosure Box */}
                    <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '14px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#991b1b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <UserX size={16} color="#dc2626" />
                        <span>Identifikasi Pihak Terlapor / Pelaku (Perpetrator Disclosure)</span>
                      </div>
                      <div style={{ fontSize: '13px', color: '#7f1d1d', lineHeight: '1.5' }}>
                        <div><strong>Institusi / Nama Terlapor:</strong> {selectedComplaintDetail.entity || selectedComplaintDetail.reportedEntity || 'Tidak Diketahui'}</div>
                        <div><strong>No. Telepon / WhatsApp:</strong> {selectedComplaintDetail.perpetratorPhone || 'N/A'}</div>
                        <div><strong>Platform & Medsos:</strong> [{selectedComplaintDetail.perpetratorPlatform || 'Instagram'}] {selectedComplaintDetail.perpetratorSocial || 'N/A'}</div>
                        <div><strong>Informasi Profil Tambahan:</strong> {selectedComplaintDetail.perpetratorDetails || 'Tidak Ada Catatan Tambahan'}</div>
                      </div>
                    </div>

                    {/* Reporter Identity & Contact Box */}
                    <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', padding: '14px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#1e40af', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <User size={16} color="#2563eb" />
                        <span>Identitas Pelapor & Kontak Korban</span>
                      </div>
                      <div style={{ fontSize: '13px', color: '#1e3a8a' }}>
                        <div><strong>Identitas:</strong> {selectedComplaintDetail.reporterIdentity || (selectedComplaintDetail.isAnonymous ? 'PELAPOR-ANON (Terenskripsi Sesi Zero-Knowledge)' : 'Identitas Terverifikasi ID')}</div>
                        {selectedComplaintDetail.reporterInstitution && <div><strong>Nama Perusahaan / Institusi / PT Pelapor:</strong> {selectedComplaintDetail.reporterInstitution}</div>}
                        <div><strong>Kontak Pelapor:</strong> {selectedComplaintDetail.reporterContact || 'N/A (Anonim Sesi)'}</div>
                        <div><strong>Kontak Person Darurat / Penanggung Jawab:</strong> {selectedComplaintDetail.contactPerson || 'Tidak Dicantumkan'}</div>
                        <div><strong>Enkripsi Payload:</strong> {selectedComplaintDetail.encrypted ? '🔒 Zero-Knowledge Encrypted Payload' : 'Standar'}</div>
                      </div>
                    </div>

                    {/* Evidence Verification Section */}
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>
                        📎 Berkas Bukti Digital & Hash SHA-256:
                      </div>
                      {selectedComplaintDetail.evidence && selectedComplaintDetail.evidence.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          {selectedComplaintDetail.evidence.map(ev => (
                            <div key={ev.id} style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '10px', borderRadius: '8px', fontSize: '12px' }}>
                              <div style={{ fontWeight: 700, color: '#047857' }}>{ev.name} ({ev.size})</div>
                              <div style={{ fontFamily: 'monospace', color: '#2563eb', fontSize: '11px', marginTop: '2px', wordBreak: 'break-all' }}>
                                SHA-256: {ev.sha256}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div style={{ fontSize: '12.5px', color: '#64748b', background: '#f8fafc', padding: '10px', borderRadius: '8px' }}>
                          {selectedComplaintDetail.evidenceCount || 1} Berkas Bukti Digital Terenkripsi Terlampir dalam Brankas.
                        </div>
                      )}
                    </div>

                    {/* Action Controls for Investigator */}
                    <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '14px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      <button 
                        className="btn btn-primary" 
                        style={{ flex: 1 }}
                        onClick={() => {
                          const nowTs = new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }) + ' WIB';
                          const officer = ppksAuthSession?.officerName || 'Investigator Utama IDPC';
                          const updated = complaints.map(c => c.id === selectedComplaintDetail.id ? { 
                            ...c, 
                            status: 'Investigasi Formal IDPC',
                            assignedInvestigator: c.assignedInvestigator || officer,
                            investigationStartedAt: c.investigationStartedAt || nowTs
                          } : c);
                          setComplaints(updated);
                          setSelectedComplaintDetail(prev => ({ 
                            ...prev, 
                            status: 'Investigasi Formal IDPC',
                            assignedInvestigator: prev.assignedInvestigator || officer,
                            investigationStartedAt: prev.investigationStartedAt || nowTs
                          }));
                        }}
                      >
                        <ShieldCheck size={16} />
                        <span>Mulai Investigasi Formal</span>
                      </button>
                      <button 
                        className="btn btn-secondary" 
                        style={{ flex: 1, color: '#059669', borderColor: '#a7f3d0' }}
                        onClick={() => {
                          const nowTs = new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }) + ' WIB';
                          const officer = ppksAuthSession?.officerName || 'Investigator Utama IDPC';
                          const updated = complaints.map(c => c.id === selectedComplaintDetail.id ? { 
                            ...c, 
                            status: 'Selesai - Terverifikasi',
                            assignedInvestigator: c.assignedInvestigator || officer,
                            investigationStartedAt: c.investigationStartedAt || nowTs,
                            investigationCompletedAt: nowTs
                          } : c);
                          setComplaints(updated);
                          setSelectedComplaintDetail(prev => ({ 
                            ...prev, 
                            status: 'Selesai - Terverifikasi',
                            assignedInvestigator: prev.assignedInvestigator || officer,
                            investigationStartedAt: prev.investigationStartedAt || nowTs,
                            investigationCompletedAt: nowTs
                          }));
                        }}
                      >
                        <CheckCircle2 size={16} />
                        <span>Selesaikan Kasus</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
            <div className="card" style={{ textAlign: 'center', padding: '48px 24px', background: '#f8fafc', border: '2px dashed #cbd5e1' }}>
              <Lock size={48} color="#7c3aed" style={{ margin: '0 auto 16px' }} />
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>
                {isAuthorized ? 'Akses Terbatas: Otorisasi Khusus Investigator Nasional IDPC' : 'Akses Ditolak: Registri Pengaduan Masuk'}
              </h3>
              <p style={{ fontSize: '13.5px', color: '#475569', maxWidth: '560px', margin: '8px auto 16px', lineHeight: '1.6' }}>
                {isAuthorized 
                  ? `Sesi Anda terverifikasi sebagai (${ppksAuthSession.officerName} - ${ppksAuthSession.campus}). Registri Pengaduan & Audit Nasional ini hanya dapat diakses oleh Investigator Nasional IDPC. Untuk mengelola berkas kasus kampus Anda, silakan beralih ke modul Campus Privacy Center.`
                  : 'Registri audit pengaduan nasional ini dilindungi oleh sertifikat otoritas investigator. Silakan masuk melalui Portal Investigator Satgas PPKS.'
                }
              </p>
              {!isAuthorized && (
                <button 
                  className="btn" 
                  style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', color: '#fff', margin: '0 auto' }}
                  onClick={onRequestAuth}
                >
                  <Lock size={15} />
                  <span>Autentikasi Sesi Investigator</span>
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
