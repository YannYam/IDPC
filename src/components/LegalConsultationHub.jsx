import React, { useState } from 'react';
import { MessageSquare, UserCheck, Calendar, Send, Shield, CheckCircle, Video } from 'lucide-react';

export default function LegalConsultationHub({ experts }) {
  const [selectedExpert, setSelectedExpert] = useState(experts[0]);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'expert', text: 'Halo! Saya siap membantu konsultasi hukum siber & hak pelindungan data pribadi Anda secara terenkripsi.', time: '10:00' },
    { id: 2, sender: 'user', text: 'Selamat pagi Pak, data NIK dan obrolan pribadi saya diancam disebarkan oleh seseorang. Langkah hukum apa yang bisa saya ambil?', time: '10:02' },
    { id: 3, sender: 'expert', text: 'Berdasarkan Pasal 65 UU PDP No. 27/2022, perbuatan mengungkapkan data pribadi yang bukan miliknya adalah tindak pidana. Pertama, amankan bukti di Digital Evidence Vault IDPC+ agar memiliki hash SHA-256 legal.', time: '10:03' }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: inputMsg,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages([...chatMessages, userMsg]);
    setInputMsg('');

    // Simulate Expert Auto Reply
    setTimeout(() => {
      const expertReply = {
        id: Date.now() + 1,
        sender: 'expert',
        text: `Catatan Pakar (${selectedExpert.name}): Bukti telah dicatat. Kami dapat membuatkan draft Surat Peringatan Hukum (Somasi PDP) resmi untuk pihak terkait.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages((prev) => [...prev, expertReply]);
    }, 1000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Banner Consultation */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #ecfeff, #cffafe)', border: '1px solid #a5f3fc' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ background: '#ffffff', padding: '16px', borderRadius: '16px', border: '1px solid #a5f3fc' }}>
            <MessageSquare size={36} color="#0891b2" />
          </div>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>Legal Consultation Hub (Konsultasi Pakar Hukum & Auditor Siber)</h2>
            <p style={{ color: '#475569', fontSize: '13.5px', marginTop: '4px' }}>
              Platform konsultasi daring menghubungkan korban & institusi dengan praktisi hukum siber, auditor siber sertifikasi, dan Klinik Hukum Kampus (LBH Kampus).
            </p>
          </div>
        </div>
      </div>

      <div className="grid-2">
        {/* Direktori Pakar */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <UserCheck size={20} color="#0891b2" />
              <span>Direktori Pakar & Klinik Hukum Terverifikasi</span>
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {experts.map((exp) => (
              <div 
                key={exp.id}
                onClick={() => setSelectedExpert(exp)}
                style={{
                  padding: '14px',
                  borderRadius: '12px',
                  background: selectedExpert.id === exp.id ? '#ecfeff' : '#f8fafc',
                  border: selectedExpert.id === exp.id ? '1px solid #a5f3fc' : '1px solid #e2e8f0',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <h4 style={{ fontSize: '14.5px', fontWeight: 700, color: '#0f172a' }}>{exp.name}</h4>
                  <p style={{ fontSize: '12.5px', color: '#0891b2', marginTop: '2px', fontWeight: 600 }}>{exp.role}</p>
                  <p style={{ fontSize: '11.5px', color: '#475569' }}>{exp.organization}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className="badge badge-emerald">★ {exp.rating}</span>
                  <p style={{ fontSize: '11px', color: '#047857', marginTop: '4px', fontWeight: 600 }}>{exp.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Space Konsultasi Realtime Chat */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '520px' }}>
          <div className="card-header" style={{ paddingBottom: '12px', borderBottom: '1px solid var(--border-color)', marginBottom: 0 }}>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>{selectedExpert.name}</h3>
              <p style={{ fontSize: '12px', color: '#475569' }}>Ruang Chat Konsultasi Terenkripsi (Zero Log)</p>
            </div>
            <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => alert('Memulai Sesi Video Call Konsultasi Legal Terenkripsi...')}>
              <Video size={15} />
              <span>Video Call Encrypted</span>
            </button>
          </div>

          {/* Chat Stream */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {chatMessages.map((msg) => (
              <div 
                key={msg.id}
                style={{
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '80%',
                  background: msg.sender === 'user' ? '#2563eb' : '#f1f5f9',
                  border: msg.sender === 'user' ? 'none' : '1px solid #e2e8f0',
                  color: msg.sender === 'user' ? '#ffffff' : '#0f172a',
                  padding: '10px 14px',
                  borderRadius: msg.sender === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                  fontSize: '13.5px'
                }}
              >
                <p>{msg.text}</p>
                <span style={{ fontSize: '10px', color: msg.sender === 'user' ? 'rgba(255, 255, 255, 0.8)' : '#64748b', display: 'block', textAlign: 'right', marginTop: '4px' }}>
                  {msg.time}
                </span>
              </div>
            ))}
          </div>

          {/* Form Input Chat */}
          <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '8px', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
            <input 
              type="text" 
              className="form-input" 
              placeholder="Tulis pertanyaan konsultasi legal Anda..."
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
