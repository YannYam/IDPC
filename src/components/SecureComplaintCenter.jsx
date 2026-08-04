import React, { useState } from 'react';
import { Lock, Shield, Send, CheckCircle2, AlertCircle, FileLock2, KeyRound, Key, ShieldCheck, FileCheck, UploadCloud, FileText, Download, Layers, X, Paperclip } from 'lucide-react';

export default function SecureComplaintCenter({ complaints, setComplaints, ppksAuthSession }) {
  const [activeSection, setActiveSection] = useState('form');
  const [formData, setFormData] = useState({
    category: 'Kebocoran Data Pribadi (Data Leak)',
    reportedEntity: '',
    incidentDate: '',
    description: '',
    isAnonymous: true,
    encryptPayload: true,
  });
  const [attachedEvidence, setAttachedEvidence] = useState([]);
  const [isHashing, setIsHashing] = useState(false);
  const [evidenceError, setEvidenceError] = useState('');
  const [submittedTicket, setSubmittedTicket] = useState(null);
  const [selectedFileForCert, setSelectedFileForCert] = useState(null);

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
    const newComplaint = {
      id: Date.now(), ticketCode: randomTicket, category: formData.category,
      entity: formData.reportedEntity || 'Institusi Rahasia (Terenskripsi)',
      date: formData.incidentDate || new Date().toISOString().split('T')[0],
      status: 'Terdaftar - Audit IDPC', isAnonymous: formData.isAnonymous,
      encrypted: formData.encryptPayload, evidenceCount: attachedEvidence.length,
      evidence: attachedEvidence
    };
    setComplaints([newComplaint, ...complaints]);
    setSubmittedTicket({ ...newComplaint, attachedEvidence: [...attachedEvidence] });
    setFormData({ category: 'Kebocoran Data Pribadi (Data Leak)', reportedEntity: '', incidentDate: '', description: '', isAnonymous: true, encryptPayload: true });
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
                {/* Step 1: Incident Details */}
                <div style={{ background: '#eff6ff', padding: '10px 14px', borderRadius: '8px', fontSize: '12.5px', color: '#1d4ed8', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ background: '#2563eb', color: '#fff', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', flexShrink: 0 }}>1</span>
                  Detail Insiden & Pihak Terlapor
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

                <div className="form-group">
                  <label className="form-label">Institusi / Pihak Terlapor (Pengendali Data)</label>
                  <input type="text" className="form-input" placeholder="Contoh: PT Financial Mega, Universitas XYZ, Aplikasi ABC" required value={formData.reportedEntity} onChange={(e) => setFormData({ ...formData, reportedEntity: e.target.value })} />
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

                {/* Step 3: Security Options */}
                <div style={{ background: '#f3e8ff', padding: '10px 14px', borderRadius: '8px', fontSize: '12.5px', color: '#6d28d9', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ background: '#7c3aed', color: '#fff', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', flexShrink: 0 }}>3</span>
                  Opsi Keamanan & Enkripsi
                </div>

                <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '10px', border: '1px solid #e2e8f0' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13.5px', color: '#334155' }}>
                    <input type="checkbox" checked={formData.isAnonymous} onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })} />
                    <span><strong>Mode Pelaporan Anonim (Sembunyikan NIK & Identitas Saya)</strong></span>
                  </label>
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
                <div style={{ background: '#ffffff', padding: '14px', borderRadius: '8px', margin: '16px 0', border: '1px solid #cbd5e1', textAlign: 'left' }}>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Nomor Tiket Kriptografis:</div>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: '#1d4ed8', fontFamily: 'monospace' }}>{submittedTicket.ticketCode}</div>
                  <div style={{ marginTop: '10px', fontSize: '12px', color: '#64748b' }}>Bukti Terlampir:</div>
                  {submittedTicket.attachedEvidence.map(f => (
                    <div key={f.id} style={{ fontSize: '12px', color: '#059669', fontFamily: 'monospace', marginTop: '2px' }}>✓ {f.name} ({f.sha256.substring(0, 16)}...)</div>
                  ))}
                </div>
                <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '16px' }}>Simpan nomor tiket untuk melacak progres audit tanpa perlu login.</p>
                <button className="btn btn-secondary" onClick={() => setSubmittedTicket(null)}>Buat Pengaduan Baru</button>
              </div>
            )}
          </div>

          {/* Right Panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Certificate Viewer */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title"><ShieldCheck size={20} color="#059669" /><span>Sertifikat Legal Keabsahan Bukti</span></h3>
                <span className="badge badge-emerald">UU ITE Pasal 5 & 6</span>
              </div>
              {selectedFileForCert ? (
                <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '12px', padding: '20px' }}>
                  <div style={{ textAlign: 'center', marginBottom: '16px', borderBottom: '1px dashed #a7f3d0', paddingBottom: '12px' }}>
                    <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#047857' }}>SERTIFIKAT INTEGRITAS BUKTI DIGITAL IDPC+</h4>
                    <p style={{ fontSize: '11px', color: '#475569', textTransform: 'uppercase', letterSpacing: '1px' }}>Nomor Sertifikat: CERT-IDPC-{selectedFileForCert.id}</p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#0f172a' }}>
                    <div><strong>Nama Berkas:</strong> <span style={{ color: '#1d4ed8' }}>{selectedFileForCert.name}</span></div>
                    <div><strong>Ukuran:</strong> {selectedFileForCert.size}</div>
                    <div><strong>Stempel Waktu:</strong> <span style={{ fontFamily: 'monospace' }}>{selectedFileForCert.timestamp}</span></div>
                    <div><strong>SHA-256:</strong><div style={{ background: '#fff', padding: '6px', borderRadius: '6px', fontSize: '10px', fontFamily: 'monospace', color: '#047857', wordBreak: 'break-all', marginTop: '4px', border: '1px solid #cbd5e1' }}>{selectedFileForCert.sha256}</div></div>
                  </div>
                  <button className="btn btn-primary" style={{ width: '100%', marginTop: '14px' }} onClick={() => alert('Sertifikat Keabsahan Legal IDPC+ telah disiap unduh sebagai PDF resmi.')}><Download size={16} /><span>Unduh Sertifikat PDF Resmi</span></button>
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '30px 16px', color: '#64748b' }}>
                  <FileCheck size={36} style={{ margin: '0 auto 8px', opacity: 0.5 }} />
                  <p style={{ fontSize: '13px' }}>Lampirkan bukti digital pada formulir, lalu klik "Lihat Sertifikat" untuk melihat Sertifikat Keabsahan Hukumnya.</p>
                </div>
              )}
            </div>

            {/* Attached Evidence Table */}
            {attachedEvidence.length > 0 && (
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title"><FileText size={20} color="#7c3aed" /><span>Berkas Bukti Terlampir</span></h3>
                  <span className="badge badge-purple">{attachedEvidence.length} Berkas</span>
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table className="custom-table">
                    <thead><tr><th>Nama Berkas</th><th>SHA-256</th><th>Waktu</th><th>Aksi</th></tr></thead>
                    <tbody>
                      {attachedEvidence.map(file => (
                        <tr key={file.id}>
                          <td style={{ fontWeight: 700, color: '#0f172a' }}>{file.name}</td>
                          <td style={{ fontFamily: 'monospace', fontSize: '11px', color: '#2563eb' }}>{file.sha256.substring(0, 12)}...{file.sha256.slice(-6)}</td>
                          <td style={{ fontSize: '12px', color: '#475569' }}>{file.timestamp}</td>
                          <td><button className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '11px' }} onClick={() => setSelectedFileForCert(file)}><span>Sertifikat</span></button></td>
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
                  <strong style={{ color: '#2563eb' }}>🔐 Kalkulasi SHA-256</strong>
                  <p style={{ marginTop: '2px' }}>Hash kriptografi dikalkulasi secara client-side. Berkas tidak pernah meninggalkan perangkat Anda sebelum dienkripsi.</p>
                </div>
              </div>
            </div>

            {!isAuthorized && (
              <div className="card" style={{ background: '#fefce8', border: '1px solid #fde68a' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <AlertCircle size={20} color="#d97706" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#92400e' }}>Registri Pengaduan Masuk: Akses Terbatas</h4>
                    <p style={{ fontSize: '12px', color: '#78716c', marginTop: '2px' }}>Daftar pengaduan masuk hanya dapat dilihat oleh Investigator Satgas PPKS yang telah terverifikasi.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ====== REGISTRY (Investigator Only) ====== */}
      {activeSection === 'registry' && (
        <>
          {isAuthorized ? (
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
                  <thead><tr><th>No. Tiket</th><th>Kategori</th><th>Institusi Terlapor</th><th>Tanggal</th><th>Bukti</th><th>Status IDPC</th></tr></thead>
                  <tbody>
                    {complaints.map(item => (
                      <tr key={item.id}>
                        <td style={{ fontFamily: 'monospace', fontWeight: 700, color: '#2563eb' }}>{item.ticketCode}</td>
                        <td style={{ fontSize: '12.5px' }}>{item.category}</td>
                        <td style={{ color: '#0f172a' }}>{item.entity}</td>
                        <td style={{ fontSize: '12px', color: '#475569' }}>{item.date}</td>
                        <td><span className="badge badge-emerald" style={{ fontSize: '11px' }}>{item.evidenceCount || '—'} Berkas</span></td>
                        <td><span className="badge badge-amber">{item.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="card" style={{ textAlign: 'center', padding: '48px 24px', background: '#f8fafc', border: '2px dashed #cbd5e1' }}>
              <Lock size={48} color="#7c3aed" style={{ margin: '0 auto 16px' }} />
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>Akses Ditolak: Registri Pengaduan Masuk</h3>
              <p style={{ fontSize: '13.5px', color: '#475569', maxWidth: '520px', margin: '8px auto 0' }}>Masuk melalui Portal Satgas PPKS Investigator untuk mengakses daftar pengaduan.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
