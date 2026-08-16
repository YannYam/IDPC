import React, { useState } from 'react';
import { BarChart3, Building2, ShieldCheck, CheckCircle2, TrendingUp, Filter } from 'lucide-react';

export default function DataComplianceDashboard({ institutions }) {
  const [sectorFilter, setSectorFilter] = useState('Semua');

  const filtered = sectorFilter === 'Semua' 
    ? institutions 
    : institutions.filter(i => i.sector === sectorFilter);

  const avgCompliance = Math.round(
    filtered.reduce((acc, curr) => acc + curr.complianceScore, 0) / (filtered.length || 1)
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Banner Index National */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #eff6ff, #e0f2fe)', border: '1px solid #bfdbfe' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ background: '#ffffff', padding: '16px', borderRadius: '16px', border: '1px solid #bfdbfe' }}>
              <BarChart3 size={36} color="#2563eb" />
            </div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>National Data Compliance Dashboard (Indeks UU PDP Nasional)</h2>
              <p style={{ color: '#475569', fontSize: '13.5px', marginTop: '4px' }}>
                Dashboard pemantauan tingkat kepatuhan Undang-Undang Pelindungan Data Pribadi (UU PDP No. 27/2022) seluruh kementerian, perguruan tinggi, korporasi, & pemda di Indonesia.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="badge badge-emerald" style={{ padding: '8px 16px', fontSize: '14px' }}>
              <TrendingUp size={16} /> Indeks Kepatuhan Nasional: {avgCompliance}%
            </span>
          </div>
        </div>
      </div>

      {/* Ringkasan Per Sektor Metric Grid */}
      <div className="grid-4">
        <div className="metric-box">
          <div className="metric-icon" style={{ background: '#eff6ff', color: '#1d4ed8' }}>
            <Building2 size={24} />
          </div>
          <div>
            <div className="metric-val">88%</div>
            <div className="metric-lbl">Kementerian RI</div>
          </div>
        </div>

        <div className="metric-box">
          <div className="metric-icon" style={{ background: '#f3e8ff', color: '#6d28d9' }}>
            <Building2 size={24} />
          </div>
          <div>
            <div className="metric-val">84%</div>
            <div className="metric-lbl">Perguruan Tinggi</div>
          </div>
        </div>

        <div className="metric-box">
          <div className="metric-icon" style={{ background: '#ecfdf5', color: '#047857' }}>
            <Building2 size={24} />
          </div>
          <div>
            <div className="metric-val">93%</div>
            <div className="metric-lbl">BUMN & Perbankan</div>
          </div>
        </div>

        <div className="metric-box">
          <div className="metric-icon" style={{ background: '#fffbeb', color: '#b45309' }}>
            <Building2 size={24} />
          </div>
          <div>
            <div className="metric-val">76%</div>
            <div className="metric-lbl">Pemerintah Daerah (Pemda)</div>
          </div>
        </div>
      </div>

      {/* Analytics Visualization & Filter Table */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">
            <Filter size={20} color="#2563eb" />
            <span>Kepatuhan Berdasarkan Sektor & Registrasi DPO Resmi</span>
          </h3>

          <div style={{ display: 'flex', gap: '8px' }}>
            {['Semua', 'Kementerian', 'Universitas', 'BUMN', 'Pemda', 'Swasta'].map((sec) => (
              <button 
                key={sec}
                className={`btn ${sectorFilter === sec ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '6px 14px', fontSize: '12.5px' }}
                onClick={() => setSectorFilter(sec)}
              >
                {sec}
              </button>
            ))}
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="custom-table">
            <thead>
              <tr>
                <th>Nama Institusi / Pengendali Data</th>
                <th>Sektor</th>
                <th>Pejabat DPO Terdaftar</th>
                <th>Indeks PDP</th>
                <th>Rating Kepatuhan</th>
                <th>Status Audit</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inst) => (
                <tr key={inst.id}>
                  <td style={{ fontWeight: 700, color: '#0f172a' }}>{inst.name}</td>
                  <td>
                    <span className="badge badge-blue">{inst.sector}</span>
                  </td>
                  <td style={{ fontSize: '13px', color: '#475569' }}>{inst.dpo}</td>
                  <td style={{ fontFamily: 'monospace', fontWeight: 800 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ flex: 1, height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: `${inst.complianceScore}%`, height: '100%', background: inst.complianceScore > 85 ? '#059669' : inst.complianceScore > 75 ? '#2563eb' : '#d97706' }}></div>
                      </div>
                      <span style={{ color: '#0f172a' }}>{inst.complianceScore}%</span>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${inst.ratingLetter.includes('A') ? 'badge-emerald' : 'badge-amber'}`}>
                      {inst.ratingLetter}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-blue">{inst.status}</span>
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
