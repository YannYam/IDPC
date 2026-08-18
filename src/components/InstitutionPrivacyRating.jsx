import React, { useState } from 'react';
import { Award, CheckCircle, AlertTriangle, ShieldCheck, ArrowRight, Lightbulb } from 'lucide-react';

export default function InstitutionPrivacyRating({ institutions }) {
  const [selectedInst, setSelectedInst] = useState(institutions[0]);

  const getRecommendations = (score) => {
    if (score >= 90) {
      return [
        'Pertahankan pengujian penetrasi (Pentest) berkala setiap 6 bulan.',
        'Lakukan pembaruan rutin pada modul pelatihan privasi internal pegawai.',
        'Tingkatkan redundansi enkripsi brankas data cadangan (Backup Storage).'
      ];
    } else if (score >= 80) {
      return [
        'Segera selesaikan dokumen Evaluasi Dampak Pelindungan Data Pribadi (PIA/DPIA).',
        'Tingkatkan kecepatan tanggap darurat insiden (Incident Response SLA) menjadi di bawah 2 jam.',
        'Tinjau ulang perjanjian kerja sama pihak ketiga (Vendor Data Processing Agreement).'
      ];
    } else {
      return [
        'WAJIB: Tunjuk Pejabat Pelindung Data Pribadi (DPO) resmi terdaftar di IDPC.',
        'WAJIB: Terapkan Enkripsi End-to-End pada seluruh basis data pelanggan / mahasiswa.',
        'Lakukan audit kepatuhan menyeluruh dalam kurun waktu 30 hari ke depan.'
      ];
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Banner Header */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #f3e8ff, #fae8ff)', border: '1px solid #ddd6fe' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ background: '#ffffff', padding: '16px', borderRadius: '16px', border: '1px solid #ddd6fe' }}>
            <Award size={36} color="#7c3aed" />
          </div>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>Institution Privacy Rating (Sistem Rating Kepatuhan Privasi)</h2>
            <p style={{ color: '#475569', fontSize: '13.5px', marginTop: '4px' }}>
              Sistem akreditasi & pemeringkatan kepatuhan data pribadi resmi lembaga. Dilengkapi dengan rekomendasi tindakan nyata untuk perbaikan tata kelola data.
            </p>
          </div>
        </div>
      </div>

      <div className="grid-2">
        {/* Pilih Institusi */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <ShieldCheck size={20} color="#7c3aed" />
              <span>Daftar Rating Lembaga Terakreditasi IDPC</span>
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '420px', overflowY: 'auto', paddingRight: '4px' }}>
            {institutions.map((inst) => (
              <div 
                key={inst.id}
                onClick={() => setSelectedInst(inst)}
                style={{
                  padding: '14px',
                  borderRadius: '12px',
                  background: selectedInst.id === inst.id ? '#f3e8ff' : '#f8fafc',
                  border: selectedInst.id === inst.id ? '1px solid #ddd6fe' : '1px solid #e2e8f0',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.2s ease'
                }}
              >
                <div>
                  <h4 style={{ fontSize: '14.5px', fontWeight: 700, color: '#0f172a' }}>{inst.name}</h4>
                  <p style={{ fontSize: '12px', color: '#475569' }}>Sektor: {inst.sector} • DPO: {inst.dpo}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span className="badge badge-purple" style={{ fontSize: '15px', fontWeight: 800 }}>{inst.ratingLetter}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scorecard Detail & Rekomendasi Actionable */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <Award size={20} color="#059669" />
              <span>Detail Kartu Kepatuhan (Compliance Scorecard)</span>
            </h3>
            <span className="badge badge-emerald">Grade {selectedInst.ratingLetter}</span>
          </div>

          <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #e2e8f0' }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>{selectedInst.name}</h3>
              <p style={{ fontSize: '13px', color: '#475569', marginTop: '2px' }}>Pejabat DPO: {selectedInst.dpo}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '32px', fontWeight: 800, color: '#059669', lineHeight: 1 }}>{selectedInst.complianceScore}%</div>
              <span style={{ fontSize: '11px', color: '#64748b' }}>Skor Total IDPC</span>
            </div>
          </div>

          {/* Breakdown Aspek Audit */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            <h4 style={{ fontSize: '13.5px', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>Breakdown 4 Aspek Audit Utama:</h4>
            
            <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #e2e8f0' }}>
              <span style={{ color: '#0f172a' }}>1. Tata Kelola & Kebijakan Data Privasi</span>
              <span style={{ fontWeight: 700, color: '#2563eb' }}>95/100</span>
            </div>
            <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #e2e8f0' }}>
              <span style={{ color: '#0f172a' }}>2. Enkripsi Teknikal & Keamanan Siber</span>
              <span style={{ fontWeight: 700, color: '#059669' }}>{selectedInst.complianceScore}/100</span>
            </div>
            <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #e2e8f0' }}>
              <span style={{ color: '#0f172a' }}>3. Kecepatan Penanganan Insiden (SLA)</span>
              <span style={{ fontWeight: 700, color: '#b45309' }}>82/100</span>
            </div>
            <div style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #e2e8f0' }}>
              <span style={{ color: '#0f172a' }}>4. Evaluasi Dampak Privasi (PIA/DPIA)</span>
              <span style={{ fontWeight: 700, color: '#6d28d9' }}>88/100</span>
            </div>
          </div>

          {/* Actionable Recommendations */}
          <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '12px', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <Lightbulb size={20} color="#d97706" />
              <h4 style={{ fontSize: '14.5px', fontWeight: 700, color: '#b45309' }}>Rekomendasi Perbaikan Khusus (Actionable Items):</h4>
            </div>

            <ul style={{ paddingLeft: '18px', fontSize: '13px', color: '#475569', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {getRecommendations(selectedInst.complianceScore).map((rec, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <ArrowRight size={15} color="#d97706" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
