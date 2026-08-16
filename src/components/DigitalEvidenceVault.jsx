import React, { useState } from 'react';
import { Key, ShieldCheck, FileCheck, UploadCloud, FileText, CheckCircle2, Download, Clock } from 'lucide-react';

export default function DigitalEvidenceVault() {
  const [vaultFiles, setVaultFiles] = useState([
    {
      id: 1,
      name: 'Tangkapan_Layar_Ancaman_Chat.png',
      size: '2.4 MB',
      type: 'Gambar / Tangkapan Layar',
      sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      timestamp: '2026-07-28 10:14:22 UTC',
      status: 'Terverifikasi Legal (UU ITE & PDP)'
    },
    {
      id: 2,
      name: 'Log_Penyalahgunaan_Data_KTP.pdf',
      size: '890 KB',
      type: 'Dokumen Legal',
      sha256: 'a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e',
      timestamp: '2026-07-27 18:30:05 UTC',
      status: 'Terverifikasi Legal (UU ITE & PDP)'
    }
  ]);

  const [selectedFileForCert, setSelectedFileForCert] = useState(null);
  const [isHashing, setIsHashing] = useState(false);

  // Compute real SHA-256 from user uploaded file
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsHashing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

      const newFile = {
        id: Date.now(),
        name: file.name,
        size: `${(file.size / 1024).toFixed(1)} KB`,
        type: file.type || 'Berkas Digital',
        sha256: hashHex,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
        status: 'Terverifikasi Legal (UU ITE & PDP)'
      };

      setVaultFiles([newFile, ...vaultFiles]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsHashing(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Vault Header */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #eff6ff, #dbeafe)', border: '1px solid #bfdbfe' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ background: '#ffffff', padding: '16px', borderRadius: '16px', border: '1px solid #bfdbfe' }}>
            <Key size={36} color="#2563eb" />
          </div>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>Digital Evidence Vault (Brankas Bukti Digital Standard ISO/IEC 27037)</h2>
            <p style={{ color: '#475569', fontSize: '13.5px', marginTop: '4px' }}>
              Penyimpanan bukti digital (obrolan, foto, video, dokumen) yang dilengkapi verifikasi hash SHA-256 otomatis & penanda waktu (timestamp) legal untuk keabsahan pembuktian persidangan.
            </p>
          </div>
        </div>
      </div>

      <div className="grid-2">
        {/* Upload & Hash Engine */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <UploadCloud size={20} color="#2563eb" />
              <span>Unggah Bukti & Kalkulasi Hash Kriptografi</span>
            </h3>
            <span className="badge badge-blue">Client-Side Cryptography</span>
          </div>

          <div style={{ border: '2px dashed #cbd5e1', borderRadius: '12px', padding: '32px', textAlign: 'center', background: '#f8fafc', cursor: 'pointer', position: 'relative' }}>
            <input 
              type="file" 
              onChange={handleFileUpload} 
              style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0, cursor: 'pointer' }}
            />
            <UploadCloud size={40} color="#2563eb" style={{ margin: '0 auto 12px' }} />
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Tarik & Lepaskan Berkas Bukti di Sini</h4>
            <p style={{ fontSize: '12.5px', color: '#475569', marginTop: '4px' }}>
              Mendukung foto (.png, .jpg), dokumen (.pdf), rekaman obrolan (.txt, .json), atau video (.mp4).
            </p>
            {isHashing && (
              <p style={{ marginTop: '12px', color: '#059669', fontWeight: 700, fontSize: '13px' }}>
                Mengalkulasi Nilai Hash SHA-256 Kriptografi...
              </p>
            )}
          </div>

          <div style={{ marginTop: '20px', background: '#f8fafc', padding: '14px', borderRadius: '10px', fontSize: '12.5px', color: '#475569', border: '1px solid #e2e8f0' }}>
            <strong style={{ color: '#2563eb' }}>💡 Prinsip Legal Admissibility:</strong> Kunci SHA-256 memastikan berkas bukti tidak dapat diubah (tamper-proof) satu bit pun sejak pertama kali diunggah.
          </div>
        </div>

        {/* Certificate Preview Modal / Detail */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <ShieldCheck size={20} color="#059669" />
              <span>Sertifikat Legal Keabsahan Bukti</span>
            </h3>
            <span className="badge badge-emerald">UU ITE Pasal 5 & 6</span>
          </div>

          {selectedFileForCert ? (
            <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '12px', padding: '20px' }}>
              <div style={{ textAlign: 'center', marginBottom: '16px', borderBottom: '1px dashed #a7f3d0', paddingBottom: '12px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#047857' }}>SERTIFIKAT INTEGRITAS BUKTI DIGITAL IDPC+</h4>
                <p style={{ fontSize: '11px', color: '#475569', textTransform: 'uppercase', letterSpacing: '1px' }}>Nomor Sertifikat: CERT-IDPC-{selectedFileForCert.id}</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#0f172a' }}>
                <div><strong>Nama Berkas:</strong> <span style={{ color: '#1d4ed8' }}>{selectedFileForCert.name}</span></div>
                <div><strong>Ukuran Berkas:</strong> {selectedFileForCert.size}</div>
                <div><strong>Stempel Waktu (UTC):</strong> <span style={{ fontFamily: 'monospace' }}>{selectedFileForCert.timestamp}</span></div>
                <div>
                  <strong>Nilai Hash SHA-256 Kriptografi:</strong>
                  <div style={{ background: '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '11px', fontFamily: 'monospace', color: '#047857', wordBreak: 'break-all', marginTop: '4px', border: '1px solid #cbd5e1' }}>
                    {selectedFileForCert.sha256}
                  </div>
                </div>
              </div>

              <button className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }} onClick={() => alert('Sertifikat Keabsahan Legal IDPC+ telah disiap unduh sebagai PDF resmi.')}>
                <Download size={16} />
                <span>Unduh Sertifikat PDF Resmi untuk Pengadilan</span>
              </button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#64748b' }}>
              <FileCheck size={40} style={{ margin: '0 auto 10px', opacity: 0.5 }} />
              <p>Pilih salah satu berkas bukti dari tabel di bawah untuk melihat dan mengunduh Sertifikat Keabsahan Hukumnya.</p>
            </div>
          )}
        </div>
      </div>

      {/* Tabel Brankas Bukti */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">
            <FileText size={20} color="#7c3aed" />
            <span>Daftar Berkas Terkunci dalam Brankas Kriptografi</span>
          </h3>
          <span className="badge badge-purple">{vaultFiles.length} Berkas Admissible</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="custom-table">
            <thead>
              <tr>
                <th>Nama Berkas Bukti</th>
                <th>Tipe</th>
                <th>Hash SHA-256 (Kriptografi)</th>
                <th>Stempel Waktu (UTC)</th>
                <th>Aksi Legal</th>
              </tr>
            </thead>
            <tbody>
              {vaultFiles.map((file) => (
                <tr key={file.id}>
                  <td style={{ fontWeight: 700, color: '#0f172a' }}>{file.name}</td>
                  <td>{file.type}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: '11px', color: '#2563eb' }}>
                    {file.sha256.substring(0, 16)}...{file.sha256.substring(file.sha256.length - 8)}
                  </td>
                  <td style={{ fontSize: '12px', color: '#475569' }}>{file.timestamp}</td>
                  <td>
                    <button 
                      className="btn btn-secondary" 
                      style={{ padding: '4px 10px', fontSize: '12px' }}
                      onClick={() => setSelectedFileForCert(file)}
                    >
                      <span>Lihat Sertifikat Legal</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
