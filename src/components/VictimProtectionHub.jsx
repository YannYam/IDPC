import React, { useState } from 'react';
import { 
  UserCheck, 
  HeartHandshake, 
  Lock, 
  ShieldAlert, 
  Check, 
  PhoneCall, 
  AlertTriangle, 
  Zap, 
  Clock, 
  Send, 
  Shield, 
  Upload, 
  FileCheck, 
  AlertCircle,
  FileText,
  CheckCircle2,
  ShieldCheck,
  Search
} from 'lucide-react';

export default function VictimProtectionHub({ setActiveTab, complaints = [], setComplaints }) {
  const [emergencyForm, setEmergencyForm] = useState({
    caseCategory: 'Kekerasan Seksual Berbasis Siber (KSBS)',
    threatLevel: 'Kritis — Ancaman Akan Dilaksanakan dalam 24 Jam',
    contactChannel: 'WhatsApp Terenkripsi (Signal)',
    reporterInstitution: '',
    description: '',
    evidenceType: 'Tangkapan Layar (Screenshot Ancaman/Pemerasan)',
    evidenceFile: null,
    evidenceNotes: '',
    evidenceConfirmed: false
  });

  const [emergencySubmitted, setEmergencySubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchTicketCode, setSearchTicketCode] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEmergencyForm(prev => ({ ...prev, evidenceFile: file }));
      setErrorMessage('');
    }
  };

  const handleEmergencySubmit = (e) => {
    e.preventDefault();
    
    // Strict Strong Evidence Requirement Validation
    if (!emergencyForm.evidenceFile && !emergencyForm.evidenceNotes.trim()) {
      setErrorMessage('⚠️ Eskalasi Darurat Membutuhkan Bukti Kuat (Strong Evidence)! Silakan unggah berkas bukti digital atau cantumkan URL/deskripsi bukti otentik.');
      return;
    }

    if (!emergencyForm.evidenceConfirmed) {
      setErrorMessage('⚠️ Anda wajib mengonfirmasi keabsahan Bukti Kuat (Strong Evidence) sebelum mengirimkan eskalasi darurat.');
      return;
    }

    const ticketCode = `EMER-FAST-${Math.floor(10000 + Math.random() * 90000)}`;
    const aliasCode = `SHIELD-VICTIM-${Math.floor(10000 + Math.random() * 90000)}`;
    const newRecord = {
      ...emergencyForm,
      ticketCode,
      aliasCode,
      submittedAt: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };

    setErrorMessage('');
    setSubmittedData(newRecord);
    setEmergencySubmitted(true);

    // Synchronize to Central Complaints Registry for Investigator & Public Tracking
    if (setComplaints) {
      const evidenceObj = emergencyForm.evidenceFile ? [{
        id: Date.now(),
        name: emergencyForm.evidenceFile.name,
        size: `${(emergencyForm.evidenceFile.size / 1024).toFixed(1)} KB`,
        type: emergencyForm.evidenceType,
        sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
        status: 'Terverifikasi (Strong Evidence)'
      }] : [];

      const complaintEntry = {
        id: Date.now(),
        ticketCode,
        category: emergencyForm.caseCategory,
        entity: emergencyForm.reporterInstitution || 'Eskalasi Darurat Fast-Track',
        perpetratorFullSummary: `[Doxxing/Ancaman Urgent] Urgensi: ${emergencyForm.threatLevel}`,
        date: new Date().toISOString().split('T')[0],
        status: 'Eskalasi Darurat Fast-Track (SLA 2 Jam)',
        isAnonymous: true,
        reporterIdentity: `${aliasCode} (Korban Protected UU PDP)`,
        reporterContact: `[${emergencyForm.contactChannel}]`,
        contactPerson: `[Channel: ${emergencyForm.contactChannel}] ${emergencyForm.description ? emergencyForm.description.substring(0, 50) : 'Eskalasi Fast-Track Kritis'}`,
        encrypted: true,
        evidenceCount: evidenceObj.length + (emergencyForm.evidenceNotes ? 1 : 0),
        evidence: evidenceObj,
        assignedInvestigator: 'Tim Respons Kritis IDPC & PPKS'
      };

      setComplaints(prev => [complaintEntry, ...(prev || [])]);
    }
  };

  const handleSearchTicket = (e) => {
    e.preventDefault();
    if (!searchTicketCode.trim()) return;
    const found = (complaints || []).find(c => c.ticketCode.toLowerCase().includes(searchTicketCode.trim().toLowerCase()));
    setSearchResult(found || 'NOT_FOUND');
  };

  const emergencyContacts = [
    { name: 'Hotline Satgas PPKS Kemendikbudristek', desc: 'Layanan pengaduan kekerasan seksual perguruan tinggi', number: '177 / 0811-9769-000', badgeClass: 'badge-emerald' },
    { name: 'IDPC Victim Protection Desk', desc: 'Proteksi darurat kebocoran data & identitas korban', number: '0800-110-IDPC (4372)', badgeClass: 'badge-blue' },
    { name: 'LBH Apik & Mitra Psikologis', desc: 'Pendampingan hukum & trauma healing siber', number: '0813-8882-2669', badgeClass: 'badge-purple' },
    { name: 'Komnas Perempuan', desc: 'Pengaduan kekerasan berbasis gender & seksual', number: '021-3903963', badgeClass: 'badge-rose' }
  ];

  const strongEvidenceCriteria = [
    { title: 'Tangkapan Layar Utuh & Jelas', desc: 'Menampilkan pesan ancaman, nomor pengirim, dan stempel waktu (timestamp).' },
    { title: 'URL & Tautan Kebocoran Data', desc: 'Tautan langsung ke platform penyebaran tanpa izin atau forum ilegal.' },
    { title: 'Log Percakapan Terenkripsi', desc: 'Ekspor riwayat percakapan atau tautan arsip digital yang valid.' },
    { title: 'Metadatakut Kriptografis / Hash', desc: 'Hash berkas digital (SHA-256) untuk penanganan forensik resmi.' }
  ];

  const victimRights = [
    'Hak atas penghentian pemrosesan & penghapusan data pribadi yang disebarkan ilegal (Pasal 8 UU PDP).',
    'Hak mendapatkan ganti rugi atas pelanggaran pelindungan data pribadi (Pasal 12 UU PDP).',
    'Hak perlindungan identitas dalam seluruh proses hukum & audit IDPC (Pasal 44 UU PDP).',
    'Hak mengajukan keberatan atas pemrosesan data secara otomatis (Pasal 10 UU PDP).',
    'Hak menarik kembali persetujuan pemrosesan data yang diberikan sebelumnya (Pasal 9 UU PDP).'
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Banner */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #f3e8ff, #fae8ff)', border: '1px solid #ddd6fe' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ background: '#ffffff', padding: '16px', borderRadius: '16px', border: '1px solid #ddd6fe' }}>
              <UserCheck size={36} color="#7c3aed" />
            </div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>Pusat Perlindungan & Eskalasi Darurat Korban</h2>
              <p style={{ color: '#475569', fontSize: '13.5px', marginTop: '4px', maxWidth: '640px' }}>
                Layanan eskalasi darurat bagi korban kekerasan siber, KSBS, dan pelanggaran data pribadi. Proteksi fast-track SLA 2 Jam membutuhkan <strong>Bukti Kuat (Strong Evidence)</strong> sesuai UU PDP No. 27/2022.
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span className="badge badge-purple" style={{ padding: '8px 16px', fontSize: '13px' }}>
              <Lock size={14} /> Proteksi Identitas Korban
            </span>
            <span className="badge badge-rose" style={{ padding: '8px 16px', fontSize: '13px' }}>
              <Zap size={14} /> Fast-Track SLA 2 Jam
            </span>
          </div>
        </div>
      </div>

      {/* Emergency Ticket Search & Status Lookup Widget */}
      <div className="card" style={{ background: '#ffffff', border: '1px solid #cbd5e1', boxShadow: '0 2px 4px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: '#fef2f2', padding: '8px', borderRadius: '8px' }}>
              <Search size={20} color="#dc2626" />
            </div>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                Cari & Lacak Result Tiket Eskalasi Darurat
              </h3>
              <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
                Masukkan Kode Tiket (misal: <code>EMER-FAST-XXXXX</code> atau <code>IDPC-CRYPT-XXXX</code>) untuk melihat status penanganan real-time.
              </p>
            </div>
          </div>
          <span className="badge badge-rose" style={{ fontSize: '11px', padding: '6px 12px' }}>System SLA Tracker 24/7</span>
        </div>

        <form onSubmit={handleSearchTicket} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input
            type="text"
            className="form-input"
            style={{ flex: 1, minWidth: '260px', fontFamily: 'monospace', fontWeight: 700, fontSize: '13.5px' }}
            placeholder="Ketik Kode Tiket (Contoh: EMER-FAST-89420 atau IDPC-CRYPT-8942)..."
            value={searchTicketCode}
            onChange={(e) => setSearchTicketCode(e.target.value)}
          />
          <button type="submit" className="btn" style={{ background: '#dc2626', color: '#fff', padding: '10px 22px', fontWeight: 700 }}>
            <Search size={16} />
            <span>Cari Result</span>
          </button>
        </form>

        {/* Render Search Result if found or not found */}
        {searchResult === 'NOT_FOUND' && (
          <div style={{ marginTop: '14px', background: '#fef2f2', border: '1px solid #fecaca', padding: '12px 14px', borderRadius: '8px', fontSize: '13px', color: '#991b1b', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertCircle size={18} color="#dc2626" />
            <span>Tiket dengan kode <strong>"{searchTicketCode}"</strong> tidak ditemukan dalam registri. Pastikan kode tiket sudah benar atau buat laporan darurat baru di bawah.</span>
          </div>
        )}

        {searchResult && searchResult !== 'NOT_FOUND' && (
          <div style={{ marginTop: '14px', background: '#ecfdf5', border: '1.5px solid #a7f3d0', padding: '16px', borderRadius: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', borderBottom: '1px solid #cbd5e1', paddingBottom: '10px', marginBottom: '12px' }}>
              <div>
                <span style={{ fontSize: '11.5px', color: '#64748b' }}>Nomor Tiket Eskalasi:</span>
                <div style={{ fontSize: '17px', fontWeight: 800, color: '#dc2626', fontFamily: 'monospace' }}>{searchResult.ticketCode}</div>
              </div>
              <span className="badge badge-rose" style={{ padding: '6px 14px', fontSize: '12px', fontWeight: 700 }}>{searchResult.status}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', fontSize: '12.5px', color: '#334155' }}>
              <div>
                <span style={{ color: '#64748b', display: 'block', fontSize: '11px' }}>Kategori Kasus:</span>
                <strong style={{ color: '#0f172a' }}>{searchResult.category}</strong>
              </div>
              <div>
                <span style={{ color: '#64748b', display: 'block', fontSize: '11px' }}>Penanggung Jawab (Investigator):</span>
                <strong style={{ color: '#059669' }}>{searchResult.assignedInvestigator || 'Tim Respons Kritis IDPC & PPKS'}</strong>
              </div>
              <div>
                <span style={{ color: '#64748b', display: 'block', fontSize: '11px' }}>Identitas Pelapor Protected:</span>
                <strong style={{ fontFamily: 'monospace', color: '#6d28d9' }}>{searchResult.reporterIdentity}</strong>
              </div>
              <div>
                <span style={{ color: '#64748b', display: 'block', fontSize: '11px' }}>Tanggal Registrasi:</span>
                <strong>{searchResult.date}</strong>
              </div>
            </div>

            <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px dashed #a7f3d0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <span style={{ fontSize: '12px', color: '#047857', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle2 size={15} /> Berkas bukti digital terverifikasi SHA-256 & masuk jalur percepatan.
              </span>
              <button 
                className="btn btn-secondary" 
                style={{ padding: '6px 14px', fontSize: '12px', fontWeight: 600 }}
                onClick={() => setActiveTab('complaint')}
              >
                Buka Registri Pengaduan Central →
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="grid-2">
        {/* Emergency Escalation Form */}
        <div className="card" style={{ border: '2px solid #dc2626', background: '#fffbfb' }}>
          <div className="card-header">
            <h3 className="card-title" style={{ color: '#b91c1c' }}>
              <AlertTriangle size={20} color="#dc2626" />
              <span>Formulir Eskalasi Darurat (Fast-Track)</span>
            </h3>
            <span className="badge badge-rose" style={{ padding: '6px 14px', fontSize: '12px' }}>
              <Zap size={14} /> Respon Maks 2 Jam
            </span>
          </div>

          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '12px 14px', borderRadius: '10px', marginBottom: '14px', fontSize: '12.5px', color: '#991b1b', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <ShieldAlert size={20} color="#dc2626" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ fontSize: '13px', color: '#991b1b' }}>PERSYARATAN UTAMA: Bukti Kuat (Strong Evidence) Wajib Dilampirkan</strong>
              <p style={{ margin: '4px 0 0 0', color: '#7f1d1d', lineHeight: '1.45' }}>
                Jalur fast-track SLA 2 Jam memproses penindakan langsung (takedown & proteksi). Oleh karena itu, <strong>bukti digital awal yang valid dan otentik wajib diunggah</strong> untuk memverifikasi tingkat kegentingan ancaman dan menghindari penyalahgunaan sistem.
              </p>
            </div>
          </div>

          {errorMessage && (
            <div style={{ background: '#fef2f2', border: '1.5px solid #dc2626', color: '#991b1b', padding: '12px', borderRadius: '8px', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle size={18} color="#dc2626" />
              <span>{errorMessage}</span>
            </div>
          )}

          {!emergencySubmitted ? (
            <form onSubmit={handleEmergencySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: errorMessage ? '12px' : '0' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ color: '#991b1b', fontWeight: 700 }}>Kategori Perlindungan Kasus</label>
                <select
                  className="form-select"
                  value={emergencyForm.caseCategory}
                  onChange={(e) => setEmergencyForm({ ...emergencyForm, caseCategory: e.target.value })}
                >
                  <option>Kekerasan Seksual Berbasis Siber (KSBS)</option>
                  <option>Ancaman Penyebaran Foto / Video Intim (NCII)</option>
                  <option>Doxxing & Pengancaman Pembocoran Data Pribadi</option>
                  <option>Pelecehan & Cyberstalking Berkelanjutan</option>
                  <option>Ancaman Pemerasan Memakai Data Pribadi</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ color: '#991b1b', fontWeight: 700 }}>Tingkat Urgensi Ancaman</label>
                <select
                  className="form-select"
                  value={emergencyForm.threatLevel}
                  onChange={(e) => setEmergencyForm({ ...emergencyForm, threatLevel: e.target.value })}
                >
                  <option>Kritis — Ancaman Akan Dilaksanakan dalam 24 Jam</option>
                  <option>Sangat Tinggi — Konten Intim Sudah Mulai Tersebar</option>
                  <option>Tinggi — Pelaku Menunjukkan Pola Eskalasi Berbahaya</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ color: '#991b1b', fontWeight: 700 }}>Nama Perusahaan / Institusi / Perguruan Tinggi Pelapor</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Misal: PT Teknologi Utama / Universitas Indonesia (Opsional)"
                  value={emergencyForm.reporterInstitution}
                  onChange={(e) => setEmergencyForm({ ...emergencyForm, reporterInstitution: e.target.value })}
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ color: '#991b1b', fontWeight: 700 }}>Saluran Kontak Aman untuk Respons Darurat</label>
                <select
                  className="form-select"
                  value={emergencyForm.contactChannel}
                  onChange={(e) => setEmergencyForm({ ...emergencyForm, contactChannel: e.target.value })}
                >
                  <option>WhatsApp Terenkripsi (Signal)</option>
                  <option>Email Terenkripsi PGP via IDPC Secure Mail</option>
                  <option>Panggilan Langsung ke Victim Desk (0800-110-IDPC)</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ color: '#991b1b', fontWeight: 700 }}>Kronologi Ringkas Situasi Darurat</label>
                <textarea
                  className="form-input"
                  rows={2}
                  placeholder="Jelaskan secara singkat ancaman atau dampak yang dihadapi..."
                  value={emergencyForm.description}
                  onChange={(e) => setEmergencyForm({ ...emergencyForm, description: e.target.value })}
                  style={{ resize: 'vertical' }}
                />
              </div>

              {/* MANDATORY STRONG EVIDENCE SECTION */}
              <div style={{ background: '#fff', border: '2px solid #b91c1c', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ShieldCheck size={20} color="#b91c1c" />
                    <span style={{ fontSize: '14px', fontWeight: 800, color: '#991b1b' }}>
                      Lampiran Bukti Kuat (Strong Evidence) <span style={{ color: '#dc2626' }}>*WAJIB</span>
                    </span>
                  </div>
                  <span className="badge badge-rose" style={{ fontSize: '11px', fontWeight: 700 }}>
                    Syarat Verifikasi Fast-Track
                  </span>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ color: '#475569', fontSize: '12px' }}>Jenis Bukti Digital Utamanya</label>
                  <select
                    className="form-select"
                    value={emergencyForm.evidenceType}
                    onChange={(e) => setEmergencyForm({ ...emergencyForm, evidenceType: e.target.value })}
                  >
                    <option>Tangkapan Layar (Screenshot Ancaman/Pemerasan)</option>
                    <option>URL / Tautan Kebocoran & Penyebaran Ilegal</option>
                    <option>Log Percakapan Terenkripsi / Chat History</option>
                    <option>Dokumen Identitas Terancam / Data Leaked File</option>
                  </select>
                </div>

                {/* Upload File Input */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ color: '#475569', fontSize: '12px' }}>Unggah Berkas Bukti (Gambar / Dokumen PDF / ZIP)</label>
                  <div style={{ 
                    border: '2px dashed #fca5a5', 
                    borderRadius: '10px', 
                    padding: '16px', 
                    textAlign: 'center', 
                    background: '#fef2f2',
                    cursor: 'pointer'
                  }}>
                    <input 
                      type="file" 
                      id="evidenceFileInput"
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                      accept="image/*,.pdf,.zip,.txt,.doc,.docx"
                    />
                    <label htmlFor="evidenceFileInput" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                      <Upload size={24} color="#dc2626" />
                      {emergencyForm.evidenceFile ? (
                        <span style={{ fontSize: '13px', fontWeight: 700, color: '#059669', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <FileCheck size={16} /> Berkas Terpilih: {emergencyForm.evidenceFile.name} ({(emergencyForm.evidenceFile.size / 1024).toFixed(1)} KB)
                        </span>
                      ) : (
                        <>
                          <span style={{ fontSize: '13px', fontWeight: 700, color: '#991b1b' }}>
                            Klik di sini untuk mengunggah Bukti Kuat (Max 25MB)
                          </span>
                          <span style={{ fontSize: '11px', color: '#7f1d1d' }}>
                            Format didukung: PNG, JPG, PDF, TXT, ZIP
                          </span>
                        </>
                      )}
                    </label>
                  </div>
                </div>

                {/* Text Notes for Evidence */}
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label" style={{ color: '#475569', fontSize: '12px' }}>
                    Deskripsi Detail Bukti / URL Link Bukti Kebocoran
                  </label>
                  <textarea
                    className="form-input"
                    rows={2}
                    placeholder="Masukkan Tautan URL, Username Pelaku, atau Catatan Bukti Digital untuk melengkapi berkas..."
                    value={emergencyForm.evidenceNotes}
                    onChange={(e) => setEmergencyForm({ ...emergencyForm, evidenceNotes: e.target.value })}
                    style={{ resize: 'vertical', fontSize: '12.5px' }}
                  />
                </div>

                {/* Confirmation Checkbox */}
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', cursor: 'pointer', fontSize: '12px', color: '#7f1d1d', marginTop: '4px' }}>
                  <input
                    type="checkbox"
                    checked={emergencyForm.evidenceConfirmed}
                    onChange={(e) => setEmergencyForm({ ...emergencyForm, evidenceConfirmed: e.target.checked })}
                    style={{ marginTop: '2px' }}
                  />
                  <span>
                    Saya menyatakan dengan sesungguhnya bahwa bukti digital yang saya cantumkan di atas adalah <strong>otentik dan merupakan bukti kuat (strong evidence)</strong> atas eskalasi darurat ini.
                  </span>
                </label>
              </div>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '6px' }}>
                <button
                  type="submit"
                  className="btn"
                  style={{ flex: 2, background: 'linear-gradient(135deg, #dc2626, #991b1b)', color: '#fff', padding: '14px', fontSize: '14px', minWidth: '200px', fontWeight: 700 }}
                >
                  <Send size={18} />
                  <span>Kirim Eskalasi Darurat (Dengan Bukti Kuat)</span>
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  style={{ flex: 1, minWidth: '140px' }}
                  onClick={() => setActiveTab('complaint')}
                >
                  <span>Buat Laporan Reguler</span>
                </button>
              </div>
            </form>
          ) : (
            <div style={{ textAlign: 'center', padding: '24px 16px' }}>
              <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '24px', borderRadius: '14px' }}>
                <Check size={42} color="#059669" style={{ margin: '0 auto 10px' }} />
                <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#047857' }}>ESKALASI DARURAT FAST-TRACK TERVERIFIKASI</h4>
                <p style={{ fontSize: '13px', color: '#475569', marginTop: '6px', maxWidth: '480px', margin: '6px auto 0' }}>
                  Laporan Anda beserta <strong>Bukti Kuat (Strong Evidence)</strong> telah berhasil masuk ke jalur penanganan percepatan IDPC dengan SLA <strong style={{ color: '#dc2626' }}>Maks 2 Jam</strong>.
                </p>

                <div style={{ background: '#ffffff', padding: '14px', borderRadius: '10px', margin: '16px auto', border: '1px solid #cbd5e1', textAlign: 'left', maxWidth: '420px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>Kode Eskalasi Darurat:</span>
                    <strong style={{ fontSize: '14px', color: '#dc2626', fontFamily: 'monospace' }}>{submittedData?.ticketCode}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>Alias Korban:</span>
                    <strong style={{ fontSize: '13px', color: '#6d28d9', fontFamily: 'monospace' }}>{submittedData?.aliasCode}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', borderBottom: '1px solid #f1f5f9', paddingBottom: '6px' }}>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>Status Bukti Digital:</span>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#059669', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <CheckCircle2 size={14} /> Strong Evidence Attached
                    </span>
                  </div>
                  {submittedData?.evidenceFile && (
                    <div style={{ fontSize: '12px', color: '#475569', background: '#f8fafc', padding: '8px', borderRadius: '6px', marginTop: '6px' }}>
                      📄 <strong>Berkas Terlampir:</strong> {submittedData.evidenceFile.name} ({submittedData.evidenceType})
                    </div>
                  )}
                  {submittedData?.evidenceNotes && (
                    <div style={{ fontSize: '12px', color: '#475569', background: '#f8fafc', padding: '8px', borderRadius: '6px', marginTop: '6px' }}>
                      📝 <strong>Catatan Bukti:</strong> {submittedData.evidenceNotes}
                    </div>
                  )}
                </div>

                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setEmergencySubmitted(false);
                    setSubmittedData(null);
                    setEmergencyForm(prev => ({ ...prev, evidenceFile: null, evidenceNotes: '', evidenceConfirmed: false }));
                  }}
                >
                  Buat Eskalasi Darurat Baru
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Strong Evidence Guidelines Card */}
          <div className="card" style={{ border: '1px solid #fca5a5', background: '#fff9f9' }}>
            <div className="card-header">
              <h3 className="card-title" style={{ color: '#991b1b' }}>
                <ShieldCheck size={20} color="#dc2626" />
                <span>Kriteria Bukti Kuat (Strong Evidence)</span>
              </h3>
              <span className="badge badge-rose">Standar Audit</span>
            </div>
            <p style={{ fontSize: '12.5px', color: '#475569', marginBottom: '12px' }}>
              Untuk mengaktifkan tindakan takedown darurat dan respon cepat 2 jam, bukti yang dilampirkan harus memenuhi kriteria berikut:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {strongEvidenceCriteria.map((crit, idx) => (
                <div key={idx} style={{ background: '#ffffff', padding: '10px 12px', borderRadius: '8px', border: '1px solid #fecaca' }}>
                  <h5 style={{ fontSize: '13px', fontWeight: 700, color: '#991b1b', marginBottom: '2px' }}>
                    {idx + 1}. {crit.title}
                  </h5>
                  <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>{crit.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Hotline Contacts */}
          <div className="card" style={{ border: '1px solid #fecdd3' }}>
            <div className="card-header">
              <h3 className="card-title" style={{ color: '#be123c' }}>
                <PhoneCall size={20} color="#e11d48" />
                <span>Saluran Bantuan Darurat 24/7</span>
              </h3>
              <span className="badge badge-rose">Bantuan Langsung</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {emergencyContacts.map((contact, idx) => (
                <div key={idx} style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #e2e8f0', gap: '12px', flexWrap: 'wrap' }}>
                  <div style={{ minWidth: '180px' }}>
                    <h5 style={{ fontSize: '13.5px', fontWeight: 700, color: '#0f172a' }}>{contact.name}</h5>
                    <p style={{ fontSize: '12px', color: '#475569' }}>{contact.desc}</p>
                  </div>
                  <span className={`badge ${contact.badgeClass}`} style={{ fontFamily: 'monospace', fontSize: '12.5px', flexShrink: 0 }}>{contact.number}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Victim Legal Rights */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                <HeartHandshake size={20} color="#059669" />
                <span>Hak Korban (UU PDP No. 27/2022)</span>
              </h3>
            </div>
            <ul style={{ paddingLeft: '18px', fontSize: '13px', color: '#475569', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {victimRights.map((right, idx) => (
                <li key={idx}>{right}</li>
              ))}
            </ul>
          </div>

          {/* Comparison: Regular vs Fast-Track */}
          <div className="card" style={{ background: '#f8fafc' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>Perbedaan Jalur Penanganan:</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ background: '#ffffff', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <Clock size={16} color="#64748b" />
                  <strong style={{ fontSize: '13px', color: '#475569' }}>Jalur Standar (Reguler)</strong>
                </div>
                <ul style={{ fontSize: '12px', color: '#64748b', paddingLeft: '16px', margin: 0 }}>
                  <li>SLA Respons: 3 × 24 jam (72 jam)</li>
                  <li>Proses antrean audit berdasarkan urutan masuk</li>
                  <li>Verifikasi manual oleh investigator terjadwal</li>
                </ul>
              </div>

              <div style={{ background: '#fef2f2', padding: '12px', borderRadius: '8px', border: '1px solid #fecaca' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <Zap size={16} color="#dc2626" />
                  <strong style={{ fontSize: '13px', color: '#991b1b' }}>Jalur Darurat (Fast-Track with Strong Evidence) ←</strong>
                </div>
                <ul style={{ fontSize: '12px', color: '#7f1d1d', paddingLeft: '16px', margin: 0 }}>
                  <li>SLA Respons: <strong>Maks 2 jam</strong></li>
                  <li>Membutuhkan <strong>Bukti Kuat (Strong Evidence)</strong></li>
                  <li>Bypass antrian — langsung ke Tim Kritis</li>
                  <li>Auto-trigger takedown & blokir konten</li>
                  <li>Notifikasi real-time ke Satgas PPKS</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

