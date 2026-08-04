import React, { useState } from 'react';
import { MapPin, ShieldAlert, PieChart, Filter, BarChart, Layers, FileSpreadsheet } from 'lucide-react';

export default function NationalDataIncidentMap({ mapPoints = [] }) {
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [sectorFilter, setSectorFilter] = useState('Semua');

  const safeMapPoints = Array.isArray(mapPoints) ? mapPoints : [];
  const filteredPoints = sectorFilter === 'Semua' 
    ? safeMapPoints 
    : safeMapPoints.filter(p => p && p.sector && p.sector.includes(sectorFilter));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Banner Header Map */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #fff1f2, #ffe4e6)', border: '1px solid #fecdd3' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ background: '#ffffff', padding: '16px', borderRadius: '16px', border: '1px solid #fecdd3' }}>
              <MapPin size={36} color="#e11d48" />
            </div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>National Data Incident Map (Peta Sebaran Insiden Siber Nasional)</h2>
              <p style={{ color: '#475569', fontSize: '13.5px', marginTop: '4px' }}>
                Visualisasi geografis sebaran insiden kebocoran data pribadi berdasarkan wilayah & sektor industri sebagai basis empiris evaluasi kebijakan nasional.
              </p>
            </div>
          </div>

          <span className="badge badge-rose" style={{ padding: '8px 16px', fontSize: '13px' }}>
            <Layers size={16} /> Real-Time Geographic Threat Engine
          </span>
        </div>
      </div>

      <div className="grid-2">
        {/* Interactive Simulated Map Canvas / Layout */}
        <div className="card" style={{ background: '#ffffff', border: '1px solid #e2e8f0', position: 'relative', overflow: 'hidden' }}>
          <div className="card-header">
            <h3 className="card-title">
              <MapPin size={20} color="#e11d48" />
              <span>Peta Sebaran Wilayah Indonesia</span>
            </h3>
            <div style={{ display: 'flex', gap: '6px' }}>
              {['Semua', 'Keuangan', 'Pemerintahan', 'Edukasi'].map((sec) => (
                <button 
                  key={sec}
                  className={`btn ${sectorFilter === sec ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ padding: '4px 10px', fontSize: '11.5px' }}
                  onClick={() => setSectorFilter(sec)}
                >
                  {sec}
                </button>
              ))}
            </div>
          </div>

          {/* Graphical Representation of Indonesian Archipelago */}
          <div style={{
            height: '360px',
            background: '#f8fafc',
            borderRadius: '12px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #e2e8f0'
          }}>
            {/* SVG Grid Overlay */}
            <svg style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.4 }}>
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#cbd5e1" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Simulated Geographic Interactive Pin Hotspots */}
            <div style={{ position: 'relative', width: '90%', height: '80%' }}>
              {filteredPoints.map((pt, idx) => {
                // Map approximate relative coordinates for visualization
                const leftPos = `${15 + (idx * 15)}%`;
                const topPos = `${30 + ((idx % 3) * 20)}%`;
                return (
                  <div 
                    key={pt.id}
                    onClick={() => setSelectedProvince(pt)}
                    style={{
                      position: 'absolute',
                      left: leftPos,
                      top: topPos,
                      transform: 'translate(-50%, -50%)',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      zIndex: 10
                    }}
                  >
                    <div style={{
                      width: pt.risk === 'Tinggi' ? '28px' : '20px',
                      height: pt.risk === 'Tinggi' ? '28px' : '20px',
                      borderRadius: '50%',
                      background: pt.risk === 'Tinggi' ? 'rgba(225, 29, 72, 0.15)' : 'rgba(217, 119, 6, 0.15)',
                      border: pt.risk === 'Tinggi' ? '2px solid #e11d48' : '2px solid #d97706',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: pt.risk === 'Tinggi' ? '#be123c' : '#b45309',
                      fontWeight: 800,
                      fontSize: '11px',
                      boxShadow: pt.risk === 'Tinggi' ? '0 0 10px rgba(225, 29, 72, 0.3)' : '0 0 8px rgba(217, 119, 6, 0.3)',
                      animation: pt.risk === 'Tinggi' ? 'pulse 2s infinite' : 'none'
                    }}>
                      {pt.count}
                    </div>
                    <span style={{ fontSize: '10px', background: 'rgba(255, 255, 255, 0.95)', padding: '2px 6px', borderRadius: '4px', marginTop: '4px', whiteSpace: 'nowrap', border: '1px solid #cbd5e1', color: '#0f172a', fontWeight: 600 }}>
                      {pt.province}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Policy Evaluation Insights Panel */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <PieChart size={20} color="#e11d48" />
              <span>Evaluasi Empiris Kebijakan Privasi</span>
            </h3>
            <span className="badge badge-rose">Policy Insights</span>
          </div>

          {selectedProvince ? (
            <div style={{ background: '#fff1f2', padding: '16px', borderRadius: '12px', border: '1px solid #fecdd3' }}>
              <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#be123c' }}>{selectedProvince.province} ({selectedProvince.city})</h4>
              <p style={{ fontSize: '13px', color: '#475569', marginTop: '4px' }}>
                Total Insiden Terdeteksi: <strong>{selectedProvince.count} Kasus</strong> • Sektor Utama: <strong>{selectedProvince.sector}</strong>
              </p>

              <div style={{ marginTop: '16px', background: '#ffffff', padding: '14px', borderRadius: '8px', fontSize: '12.5px', border: '1px solid #cbd5e1' }}>
                <strong style={{ color: '#2563eb' }}>📊 Rekomendasi Kebijakan Regulator IDPC:</strong>
                <p style={{ marginTop: '4px', color: '#475569' }}>
                  Diperlukan pembentukan Gugus Tugas Audit Khusus pada sektor {selectedProvince.sector} wilayah {selectedProvince.province} guna mempercepat sanksi administratif Pasal 57 UU PDP.
                </p>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '30px 12px', color: '#64748b' }}>
              <FileSpreadsheet size={40} style={{ margin: '0 auto 10px', opacity: 0.5 }} />
              <p>Klik titik insiden di peta wilayah untuk melihat detail rekomendasi evaluasi kebijakan daerah.</p>
            </div>
          )}

          <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 700, color: '#475569' }}>Distribusi Insiden per Sektor Industri:</h4>
            
            <div style={{ fontSize: '12.5px', display: 'flex', justifyContent: 'space-between', color: '#0f172a' }}>
              <span>1. Sektor Keuangan & Perbankan (Fintech)</span>
              <span style={{ fontWeight: 700, color: '#be123c' }}>41% Insiden</span>
            </div>
            <div style={{ fontSize: '12.5px', display: 'flex', justifyContent: 'space-between', color: '#0f172a' }}>
              <span>2. Perguruan Tinggi & Pendidikan</span>
              <span style={{ fontWeight: 700, color: '#b45309' }}>27% Insiden</span>
            </div>
            <div style={{ fontSize: '12.5px', display: 'flex', justifyContent: 'space-between', color: '#0f172a' }}>
              <span>3. Layanan Kesehatan (Health Data)</span>
              <span style={{ fontWeight: 700, color: '#0891b2' }}>18% Insiden</span>
            </div>
            <div style={{ fontSize: '12.5px', display: 'flex', justifyContent: 'space-between', color: '#0f172a' }}>
              <span>4. Pemerintahan & BUMN</span>
              <span style={{ fontWeight: 700, color: '#047857' }}>14% Insiden</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
