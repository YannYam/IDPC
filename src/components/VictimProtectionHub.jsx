import React, { useState } from 'react';
import { UserCheck, HeartHandshake, Lock, ShieldAlert, FileKey, Check, PhoneCall, ArrowRight, AlertTriangle, Zap, Clock, Send } from 'lucide-react';

export default function VictimProtectionHub({ setActiveTab }) {
  const [victimAlias, setVictimAlias] = useState('');
  const [shieldActive, setShieldActive] = useState(false);
  const [reportedCase, setReportedCase] = useState({
    category: 'Kekerasan Seksual Berbasis Siber (KSBS)',
    threatType: 'Ancaman Penyebaran Konten Intim Tanpa Konsen (NCII)',
    urgentCounseling: true,
  });

  // Emergency Escalation State
  const [showEmergencyPanel, setShowEmergencyPanel] = useState(false);
  const [emergencyForm, setEmergencyForm] = useState({
    threatLevel: 'Kritis — Ancaman Akan Dilaksanakan dalam 24 Jam',
    contactChannel: 'WhatsApp Terenkripsi (Signal)',
    description: ''
  });
  const [emergencySubmitted, setEmergencySubmitted] = useState(false);

  const handleActivateShield = (e) => {
    e.preventDefault();
    const generated = `SHIELD-VICTIM-${Math.floor(10000 + Math.random() * 90000)}`;
    setVictimAlias(generated);
    setShieldActive(true);
  };

  const handleEmergencySubmit = (e) => {
    e.preventDefault();
    setEmergencySubmitted(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Banner Utama Header */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #f3e8ff, #fae8ff)', border: '1px solid #ddd6fe' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ background: '#ffffff', padding: '16px', borderRadius: '16px', border: '1px solid #ddd6fe' }}>
              <UserCheck size={36} color="#7c3aed" />
            </div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>Victim Protection Hub (Perlindungan Korban Siber & KSBS)</h2>
              <p style={{ color: '#475569', fontSize: '13.5px', marginTop: '4px' }}>
                Layanan khusus perlindungan identitas korban kekerasan berbasis siber & kekerasan seksual. Kerahasiaan identitas dijamin penuh undang-undang dengan inskripsi kriptografi alias.
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <span className="badge badge-purple" style={{ padding: '8px 16px', fontSize: '13px' }}>
              <Lock size={14} /> Encrypted Identity Protection
            </span>
          </div>
        </div>
      </div>

      <div className="grid-2">
        {/* Aktivasi Shield Identitas Korban */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <FileKey size={20} color="#7c3aed" />
              <span>Aktivasi Perisai Identitas Korban (Cryptographic Shield)</span>
            </h3>
            <span className="badge badge-purple">High Priority</span>
          </div>

          {!shieldActive ? (
            <form onSubmit={handleActivateShield} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p style={{ fontSize: '13.5px', color: '#475569' }}>
                Sistem IDPC+ akan secara otomatis menyamarkan data pribadi Anda (NIK, Nama Lengkap, Foto, Alamat) dengan <strong>Alias Kriptografis</strong> sebelum data diproses oleh tim hukum atau satgas.
              </p>

              <div className="form-group">
                <label className="form-label">Kategori Perlindungan Kasus</label>
                <select 
                  className="form-select"
                  value={reportedCase.category}
                  onChange={(e) => setReportedCase({ ...reportedCase, category: e.target.value })}
                >
                  <option>Kekerasan Seksual Berbasis Siber (KSBS)</option>
                  <option>Ancaman Penyebaran Foto / Video Intim (NCII)</option>
                  <option>Doxxing & Pengancaman Pembocoran Data Pribadi</option>
                  <option>Pelecehan & Cyberstalking Berkelanjutan</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Jenis Ancaman Utama</label>
                <input 
                  type="text" 
                  className="form-input"
                  value={reportedCase.threatType}
                  onChange={(e) => setReportedCase({ ...reportedCase, threatType: e.target.value })}
                  placeholder="Misal: Pelaku mengancam menyebarkan obrolan pribadi ke publik"
                />
              </div>

              <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13.5px', color: '#334155' }}>
                  <input 
                    type="checkbox" 
                    checked={reportedCase.urgentCounseling}
                    onChange={(e) => setReportedCase({ ...reportedCase, urgentCounseling: e.target.checked })}
                  />
                  <span>Aktifkan Pendampingan Psikologis & Legal Emergency 24/7</span>
                </label>
              </div>

              <button type="submit" className="btn" style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', color: '#fff', padding: '12px' }}>
                <UserCheck size={18} />
                <span>Generasi Perisai Identitas Korban (Aktivasi Shield)</span>
              </button>
            </form>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
                <Check size={36} color="#059669" style={{ margin: '0 auto 10px' }} />
                <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#047857' }}>Perisai Identitas Korban AKTIF</h4>
                <p style={{ fontSize: '13px', color: '#475569', marginTop: '4px' }}>Identitas asli Anda telah disubstitusi menjadi Alias Rahasia IDPC:</p>
                
                <div style={{ background: '#ffffff', margin: '14px 0', padding: '12px', borderRadius: '8px', fontSize: '20px', fontWeight: 800, color: '#6d28d9', letterSpacing: '2px', fontFamily: 'monospace', border: '1px solid #ddd6fe' }}>
                  {victimAlias}
                </div>

                <p style={{ fontSize: '12px', color: '#64748b' }}>
                  Seluruh bukti digital yang diunggah akan secara otomatis menggunakan Alias ini.
                </p>
              </div>

              {/* Emergency Next Escalation CTA */}
              {!showEmergencyPanel && (
                <button 
                  className="btn"
                  onClick={() => setShowEmergencyPanel(true)}
                  style={{ 
                    background: 'linear-gradient(135deg, #dc2626, #b91c1c)', 
                    color: '#fff', 
                    padding: '14px', 
                    fontSize: '14px',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)',
                    animation: 'pulse 2s infinite'
                  }}
                >
                  <Zap size={20} />
                  <span>Selanjutnya: Laporan Darurat & Eskalasi Percepatan →</span>
                </button>
              )}

              <button 
                className="btn btn-secondary"
                onClick={() => { setShieldActive(false); setShowEmergencyPanel(false); setEmergencySubmitted(false); }}
              >
                Buat Sesi Protection Baru
              </button>
            </div>
          )}
        </div>

        {/* Layanan Kontak Darurat & Counseling */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="card" style={{ border: '1px solid #fecdd3' }}>
            <div className="card-header">
              <h3 className="card-title" style={{ color: '#be123c' }}>
                <PhoneCall size={20} color="#e11d48" />
                <span>Saluran Bantuan Darurat Korban 24/7</span>
              </h3>
              <span className="badge badge-rose">Bantuan Langsung</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #e2e8f0' }}>
                <div>
                  <h5 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Hotline Satgas PPKS Kemendikbudristek</h5>
                  <p style={{ fontSize: '12px', color: '#475569' }}>Layanan pengaduan kekerasan seksual perguruan tinggi</p>
                </div>
                <span className="badge badge-emerald" style={{ fontFamily: 'monospace', fontSize: '13px' }}>177 / 0811-9769-000</span>
              </div>

              <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #e2e8f0' }}>
                <div>
                  <h5 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>IDPC Victim Protection Desk</h5>
                  <p style={{ fontSize: '12px', color: '#475569' }}>Proteksi darurat kebocoran data korban</p>
                </div>
                <span className="badge badge-blue" style={{ fontFamily: 'monospace', fontSize: '13px' }}>0800-110-IDPC (4372)</span>
              </div>

              <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #e2e8f0' }}>
                <div>
                  <h5 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>LBH Apik & Mitra Psikologis</h5>
                  <p style={{ fontSize: '12px', color: '#475569' }}>Pendampingan hukum & trauma healing siber</p>
                </div>
                <span className="badge badge-purple" style={{ fontFamily: 'monospace', fontSize: '13px' }}>0813-8882-2669</span>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                <HeartHandshake size={20} color="#059669" />
                <span>Hak Korban Berdasarkan Pasal 44 UU PDP</span>
              </h3>
            </div>
            <ul style={{ paddingLeft: '18px', fontSize: '13px', color: '#475569', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>Hak atas penghentian pemrosesan & penghapusan data pribadi yang disebarkan ilegal.</li>
              <li>Hak mendapatkan ganti rugi atas pelanggaran pelindungan data pribadi.</li>
              <li>Hak perlindungan identitas dalam seluruh proses hukum & audit IDPC.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ====================== */}
      {/* EMERGENCY ESCALATION PANEL (Visible After "Next" Button Click) */}
      {/* ====================== */}
      {showEmergencyPanel && shieldActive && (
        <div className="card" style={{ border: '2px solid #dc2626', background: '#fff5f5' }}>
          <div className="card-header">
            <h3 className="card-title" style={{ color: '#b91c1c' }}>
              <AlertTriangle size={22} color="#dc2626" />
              <span>Protokol Eskalasi Percepatan Darurat (Emergency Fast-Track)</span>
            </h3>
            <span className="badge badge-rose" style={{ padding: '6px 14px', fontSize: '12px' }}>
              <Zap size={14} /> SLA: Respon Maks 2 Jam
            </span>
          </div>

          {!emergencySubmitted ? (
            <div className="grid-2">
              <div>
                <div style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '14px', borderRadius: '10px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <AlertTriangle size={18} color="#dc2626" />
                    <strong style={{ color: '#991b1b', fontSize: '14px' }}>Protokol Penanganan Percepatan</strong>
                  </div>
                  <ul style={{ paddingLeft: '18px', fontSize: '12.5px', color: '#7f1d1d', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <li>Bypass antrian reguler — langsung ditugaskan ke <strong>Tim Respons Kritis IDPC</strong></li>
                    <li>Notifikasi real-time ke Satgas PPKS Kampus & Unit Investigasi Siber</li>
                    <li>SLA Respons Maksimal <strong>2 jam</strong> (vs. 72 jam standar reguler)</li>
                    <li>Aktivasi takedown request otomatis ke platform digital terkait</li>
                  </ul>
                </div>

                <form onSubmit={handleEmergencySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div className="form-group">
                    <label className="form-label" style={{ color: '#991b1b' }}>Tingkat Urgensi Ancaman</label>
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

                  <div className="form-group">
                    <label className="form-label" style={{ color: '#991b1b' }}>Saluran Kontak Aman untuk Respons Darurat</label>
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

                  <div className="form-group">
                    <label className="form-label" style={{ color: '#991b1b' }}>Informasi Tambahan Darurat (Opsional)</label>
                    <textarea 
                      className="form-input"
                      rows={3}
                      placeholder="Jelaskan detail urgensi situasi Anda saat ini..."
                      value={emergencyForm.description}
                      onChange={(e) => setEmergencyForm({ ...emergencyForm, description: e.target.value })}
                      style={{ resize: 'vertical' }}
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn" 
                    style={{ background: 'linear-gradient(135deg, #dc2626, #991b1b)', color: '#fff', padding: '14px', width: '100%', fontSize: '14px' }}
                  >
                    <Send size={18} />
                    <span>Kirim Laporan Eskalasi Darurat Sekarang</span>
                  </button>
                </form>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '16px', borderRadius: '12px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>Perbedaan Jalur Penanganan:</h4>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
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
                        <strong style={{ fontSize: '13px', color: '#991b1b' }}>Jalur Darurat (Fast-Track) ←</strong>
                      </div>
                      <ul style={{ fontSize: '12px', color: '#7f1d1d', paddingLeft: '16px', margin: 0 }}>
                        <li>SLA Respons: <strong>Maks 2 jam</strong></li>
                        <li>Bypass antrian — langsung ke Tim Kritis</li>
                        <li>Auto-trigger takedown & blokir konten</li>
                        <li>Notifikasi real-time ke Satgas PPKS</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '14px', borderRadius: '10px', fontSize: '12.5px', color: '#475569' }}>
                  <strong style={{ color: '#2563eb' }}>📋 Identitas Pelapor Terlindungi:</strong>
                  <p style={{ marginTop: '4px' }}>
                    Laporan darurat ini akan dikaitkan dengan alias kriptografis <strong style={{ color: '#6d28d9', fontFamily: 'monospace' }}>{victimAlias}</strong> tanpa mengungkap identitas asli Anda kepada siapapun termasuk petugas Satgas.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '32px 20px' }}>
              <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '24px', borderRadius: '14px', display: 'inline-block' }}>
                <Check size={42} color="#059669" style={{ margin: '0 auto 10px' }} />
                <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#047857' }}>ESKALASI DARURAT BERHASIL DIKIRIM</h4>
                <p style={{ fontSize: '13px', color: '#475569', marginTop: '6px', maxWidth: '460px' }}>
                  Laporan Anda telah dimasukkan ke jalur penanganan percepatan (fast-track). Tim Respons Kritis IDPC akan menghubungi Anda dalam <strong style={{ color: '#dc2626' }}>maks 2 jam</strong> melalui saluran aman yang Anda pilih.
                </p>

                <div style={{ background: '#ffffff', padding: '12px', borderRadius: '8px', margin: '16px 0', border: '1px solid #cbd5e1', textAlign: 'left' }}>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Kode Eskalasi Darurat:</div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#dc2626', fontFamily: 'monospace' }}>EMER-FAST-{Math.floor(10000 + Math.random() * 90000)}</div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>Alias Terlindungi:</div>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#6d28d9', fontFamily: 'monospace' }}>{victimAlias}</div>
                </div>

                <button 
                  className="btn btn-secondary" 
                  onClick={() => { setShowEmergencyPanel(false); setEmergencySubmitted(false); }}
                >
                  Kembali ke Victim Protection Hub
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
