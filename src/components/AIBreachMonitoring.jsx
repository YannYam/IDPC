import React, { useState } from 'react';
import { Cpu, ShieldAlert, Search, AlertTriangle, BellRing, CheckCircle, RefreshCw } from 'lucide-react';

export default function AIBreachMonitoring({ threatList, setThreatList }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearchCheck = (e) => {
    e.preventDefault();
    if (!searchQuery) return;
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      if (searchQuery.includes('kemkes') || searchQuery.includes('3171') || searchQuery.includes('admin')) {
        setSearchResult({
          status: 'LEAK_FOUND',
          query: searchQuery,
          foundIn: ['RaidForums 2026 Leak', 'Exposed Pastebin Dump #91'],
          severity: 'Critical',
          recommendation: 'Lakukan perombakan kredensial & ajukan sertifikasi ulang PIA pada IDPC+.'
        });
      } else {
        setSearchResult({
          status: 'SAFE',
          query: searchQuery,
          foundIn: [],
          severity: 'Clean',
          recommendation: 'Data Anda/Institusi Anda tidak terdeteksi dalam radar intelijen AI IDPC+.'
        });
      }
    }, 800);
  };

  const triggerEarlyWarning = (id) => {
    setThreatList(threatList.map(item => {
      if (item.id === id) {
        return { ...item, status: 'NOTIFIKASI TERKIRIM KE INSTITUSI & USER' };
      }
      return item;
    }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Banner AI Engine */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)', border: '1px solid #a7f3d0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ background: '#ffffff', padding: '14px', borderRadius: '14px', border: '1px solid #a7f3d0' }}>
              <Cpu size={32} color="#059669" />
            </div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>AI Data Breach Early Warning System</h2>
              <p style={{ color: '#475569', fontSize: '13.5px', marginTop: '4px' }}>
                Mesin kecerdasan buatan IDPC+ memantau 24/7 darknet, forum peretasan, & repositori terbuka untuk mendeteksi potensi kebocoran data sebelum meluas.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="badge badge-emerald">AI Neural Model: v4.2 Active</span>
          </div>
        </div>
      </div>

      {/* Direct Breach Checker Tool */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">
            <Search size={20} color="#0891b2" />
            <span>Pemeriksa Kebocoran Data (Email / Domain / NIK Checker)</span>
          </h3>
          <span className="badge badge-blue">Instant Scanner</span>
        </div>

        <form onSubmit={handleSearchCheck} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <input 
            type="text" 
            className="form-input" 
            style={{ flex: 1, minWidth: '280px' }}
            placeholder="Masukkan Email, Domain Institusi, atau NIK untuk memeriksa kebocoran (Misal: kemkes.go.id)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="btn btn-primary" disabled={isSearching}>
            {isSearching ? <RefreshCw className="spin" size={18} /> : <Search size={18} />}
            <span>{isSearching ? 'Memindai Intelligence Base...' : 'Pindai Kebocoran'}</span>
          </button>
        </form>

        {searchResult && (
          <div style={{ marginTop: '20px', padding: '16px', borderRadius: '12px', background: searchResult.status === 'LEAK_FOUND' ? '#fff1f2' : '#ecfdf5', border: searchResult.status === 'LEAK_FOUND' ? '1px solid #fecdd3' : '1px solid #a7f3d0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {searchResult.status === 'LEAK_FOUND' ? (
                <AlertTriangle size={24} color="#e11d48" />
              ) : (
                <CheckCircle size={24} color="#059669" />
              )}
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 700, color: searchResult.status === 'LEAK_FOUND' ? '#be123c' : '#047857' }}>
                  {searchResult.status === 'LEAK_FOUND' ? `PERINGATAN: Target '${searchResult.query}' Terdeteksi dalam Database Kebocoran!` : `AMAN: Target '${searchResult.query}' Tidak Ditemukan dalam Incident Log.`}
                </h4>
                <p style={{ fontSize: '13px', color: '#475569', marginTop: '4px' }}>
                  Rekomendasi AI: {searchResult.recommendation}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* AI Threat Feed Table */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">
            <ShieldAlert size={20} color="#e11d48" />
            <span>Radar Deteksi Kebocoran Aktif (AI Live Stream Feed)</span>
          </h3>
          <span className="badge badge-rose">Real-Time Threat Intelligence</span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="custom-table">
            <thead>
              <tr>
                <th>Domain / Subjek Terpengaruh</th>
                <th>Sumber Intelijen Peretasan</th>
                <th>Estimasi Rekor Bocor</th>
                <th>Level Ancaman</th>
                <th>Waktu Deteksi AI</th>
                <th>Tindakan Notifikasi</th>
              </tr>
            </thead>
            <tbody>
              {threatList.map((threat) => (
                <tr key={threat.id}>
                  <td style={{ fontWeight: 700, color: '#0f172a' }}>{threat.domain}</td>
                  <td style={{ fontSize: '12.5px', color: '#475569' }}>{threat.source}</td>
                  <td style={{ fontFamily: 'monospace', fontWeight: 600, color: '#1e293b' }}>{threat.records}</td>
                  <td>
                    <span className={`badge ${threat.level === 'Critical' ? 'badge-rose' : threat.level === 'High' ? 'badge-amber' : 'badge-blue'}`}>
                      {threat.level}
                    </span>
                  </td>
                  <td style={{ fontSize: '12px', color: '#64748b' }}>{threat.detectedAt}</td>
                  <td>
                    <button 
                      className="btn btn-secondary" 
                      style={{ padding: '4px 10px', fontSize: '12px' }}
                      onClick={() => triggerEarlyWarning(threat.id)}
                    >
                      <BellRing size={13} color="#d97706" />
                      <span>{threat.status}</span>
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
