import React, { useState, useEffect } from 'react';
import { 
  Headphones, 
  Users, 
  Clock, 
  Send, 
  ShieldCheck, 
  CheckCircle2, 
  MessageSquare, 
  Plus, 
  FileText, 
  Star, 
  X, 
  Paperclip, 
  AlertTriangle, 
  RefreshCw, 
  UserCheck, 
  Sparkles,
  ArrowRight,
  ShieldAlert,
  PhoneCall
} from 'lucide-react';

export default function LegalConsultationHub({ experts }) {
  // Queue & CS State Management
  const [queueTicket, setQueueTicket] = useState(null); // { ticketNo: 'K-014', topic: '...', status: 'waiting' | 'in_consultation' | 'completed', pos: 2, estWaitMinutes: 5 }
  const [currentServingTicket, setCurrentServingTicket] = useState('K-012');
  const [totalWaitingCount, setTotalWaitingCount] = useState(3);
  const [showTakeQueueModal, setShowTakeQueueModal] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('Konsultasi Pelanggaran Privasi Data & UU PDP');
  const [userNotes, setUserNotes] = useState('');
  
  // Rating Modal State
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [starRating, setStarRating] = useState(5);
  const [ratingFeedback, setRatingFeedback] = useState('');
  const [ratingSubmitted, setRatingSubmitted] = useState(false);

  // Active CS Agent & Chat Messages State
  const [activeCSAgent, setActiveCSAgent] = useState({
    id: 1,
    name: 'Adv. Sarah Amalia, S.H., M.H.',
    title: 'Senior CS Legal Specialist & Auditor PDP',
    desk: 'Loket CS 01 (Layanan Umum & UU PDP)',
    rating: '4.9/5.0',
    status: 'Online - Live CS',
    avatarBg: '#eff6ff',
    avatarColor: '#2563eb'
  });

  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'agent',
      agentName: 'Adv. Sarah Amalia, S.H., M.H.',
      text: 'Selamat datang di Customer Service & Live Consultation Desk IDPC+! Saya Adv. Sarah Amalia. Ada yang dapat kami bantu terkait hak pelindungan data pribadi atau pendampingan kasus Anda?',
      time: '10:00 WIB'
    }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [isAgentTyping, setIsAgentTyping] = useState(false);

  // Simulated queue progression interval
  useEffect(() => {
    if (!queueTicket) return;
    
    // Auto-advance queue ticket status to 'in_consultation' when pos reaches 0
    if (queueTicket.status === 'waiting' && queueTicket.pos > 0) {
      const timer = setTimeout(() => {
        setQueueTicket(prev => {
          if (!prev) return null;
          const newPos = prev.pos - 1;
          if (newPos === 0) {
            return { ...prev, pos: 0, estWaitMinutes: 0, status: 'in_consultation' };
          }
          return { ...prev, pos: newPos, estWaitMinutes: newPos * 3 };
        });
        setCurrentServingTicket(prev => {
          const num = parseInt(prev.replace('K-0', ''), 10) + 1;
          return `K-0${num}`;
        });
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [queueTicket]);

  // Handle Taking a New CS Queue Ticket
  const handleTakeQueueTicket = (e) => {
    e.preventDefault();
    const newNum = 14 + Math.floor(Math.random() * 5);
    const newTicketCode = `K-0${newNum}`;
    const newPos = totalWaitingCount + 1;
    
    const newTicket = {
      ticketNo: newTicketCode,
      topic: selectedTopic,
      notes: userNotes,
      status: 'waiting', // 'waiting', 'in_consultation', 'completed'
      pos: newPos,
      estWaitMinutes: newPos * 3,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' WIB'
    };

    setQueueTicket(newTicket);
    setTotalWaitingCount(prev => prev + 1);
    setShowTakeQueueModal(false);
    setUserNotes('');

    // Reset chat with welcome greeting for new queue
    setChatMessages([
      {
        id: Date.now(),
        sender: 'agent',
        agentName: activeCSAgent.name,
        text: `Nomor Antrean Anda (${newTicketCode}) telah tercatat untuk topik "${selectedTopic}". Anda berada di urutan ke-${newPos}. Tim CS Legal kami akan segera terhubung secara otomatis saat giliran Anda tiba.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' WIB'
      }
    ]);
  };

  // Handle User Message Submission in CS Chat
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const userText = inputMsg.trim();
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' WIB';

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: userText,
      time: timeStr
    };

    setChatMessages(prev => [...prev, userMsg]);
    setInputMsg('');
    setIsAgentTyping(true);

    // Dynamic CS Agent AI / Simulated Response Logic
    setTimeout(() => {
      let replyText = `Terima kasih atas informasi Anda. Berdasarkan ketentuan Hukum Pelindungan Data Pribadi (UU No. 27 Tahun 2022), kasus ini dapat segera kami daftarkan ke Registri Pengaduan Resmi atau diekskalasi ke Satgas PPKS Kampus terkait.`;
      
      const lower = userText.toLowerCase();
      if (lower.includes('denda') || lower.includes('sanksi') || lower.includes('pidana')) {
        replyText = `Sesuai Pasal 67-68 UU PDP No. 27/2022, setiap orang/lembaga yang secara melawan hukum mengungkapkan atau menggunakan data pribadi dapat dikenakan sanksi pidana penjara hingga 5 tahun dan denda pidana maksimal Rp 5 Miliar s.d. Rp 60 Miliar.`;
      } else if (lower.includes('sebar') || lower.includes('foto') || lower.includes('ancam') || lower.includes('intim') || lower.includes('ksbs')) {
        replyText = `Ini merupakan ancaman kritis KSBS/NCII. Harap segera amankan bukti tangkapan layar di menu '1. Pengaduan & Bukti Digital' untuk mengunci hash SHA-256 legal. Tim CS IDPC+ juga dapat langsung menerbitkan Surat Somasi Peringatan Hukum Darurat untuk menghentikan penyebaran.`;
      } else if (lower.includes('satgas') || lower.includes('kampus') || lower.includes('identitas') || lower.includes('anonim')) {
        replyText = `Identitas Anda dilindungi penuh oleh undang-undang. Di bawah fitur 'Victim Shield Hub', identitas asli disamarkan menjadi Alias Kriptografis sehingga Satgas Internal Kampus tidak dapat mengakses nama asli Anda tanpa izin khusus.`;
      } else if (lower.includes('somasi') || lower.includes('surat') || lower.includes('draft')) {
        replyText = `Kami telah menyiapkan template resmi Draft Surat Somasi Peringatan Hukum IDPC+. Apakah Anda ingin CS menerbitkan draft surat ini sekarang berdasarkan bukti digital yang diunggah?`;
      }

      const agentMsg = {
        id: Date.now() + 1,
        sender: 'agent',
        agentName: activeCSAgent.name,
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' WIB'
      };

      setChatMessages(prev => [...prev, agentMsg]);
      setIsAgentTyping(false);
    }, 1200);
  };

  // Quick Action Reply Chip Handler
  const handleQuickChipClick = (chipText) => {
    setInputMsg(chipText);
  };

  // Handle Complete Consultation & Open Rating Modal
  const handleEndConsultation = () => {
    setShowRatingModal(true);
  };

  // Submit Rating & Finish Queue
  const handleSubmitRating = (e) => {
    e.preventDefault();
    setRatingSubmitted(true);
    setTimeout(() => {
      setShowRatingModal(false);
      setRatingSubmitted(false);
      setQueueTicket(prev => prev ? { ...prev, status: 'completed' } : null);
    }, 1500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header Banner Customer Service */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #0284c7, #0369a1)', color: '#ffffff', border: 'none', boxShadow: '0 4px 20px rgba(2, 132, 199, 0.25)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.2)', padding: '16px', borderRadius: '16px', backdropFilter: 'blur(8px)' }}>
              <Headphones size={36} color="#ffffff" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff' }}>
                  Legal Customer Service & Live Consultation Queue
                </h2>
                <span style={{ background: '#22c55e', color: '#ffffff', fontSize: '11px', fontWeight: 800, padding: '3px 10px', borderRadius: '20px', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  🟢 CS Desk Active 24/7
                </span>
              </div>
              <p style={{ color: '#e0f2fe', fontSize: '13.5px', marginTop: '6px', maxWidth: '720px', lineHeight: '1.5' }}>
                Layanan Customer Service & Konsultasi Hukum Siber real-time. Ambil nomor antrean daring untuk terhubung langsung dengan Konsultan CS Legal IDPC+ & Advokat Terverifikasi secara aman dan terenkripsi.
              </p>
            </div>
          </div>

          {!queueTicket && (
            <button 
              className="btn" 
              onClick={() => setShowTakeQueueModal(true)}
              style={{ background: '#ffffff', color: '#0369a1', fontWeight: 800, padding: '12px 20px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            >
              <Plus size={18} />
              <span>Ambil Nomor Antrean CS Konsultasi</span>
            </button>
          )}
        </div>
      </div>

      {/* CS Live Queue Counter & Ticket Status Cards Grid */}
      <div className="grid-3">
        {/* Card 1: Ticket Antrean Saya */}
        <div className="card" style={{ border: queueTicket?.status === 'in_consultation' ? '2px solid #22c55e' : '1px solid #e2e8f0', background: queueTicket?.status === 'in_consultation' ? '#f0fdf4' : '#ffffff' }}>
          <div className="card-header">
            <h3 className="card-title" style={{ fontSize: '14px', color: '#475569' }}>
              <MessageSquare size={16} color="#0284c7" />
              <span>Nomor Antrean Anda</span>
            </h3>
            {queueTicket ? (
              <span className={`badge ${queueTicket.status === 'in_consultation' ? 'badge-emerald' : queueTicket.status === 'completed' ? 'badge-purple' : 'badge-amber'}`}>
                {queueTicket.status === 'in_consultation' ? '🟢 CS Live Session' : queueTicket.status === 'completed' ? '✓ Selesai' : '⏳ Dalam Antrean'}
              </span>
            ) : (
              <span className="badge badge-purple">Belum Diambil</span>
            )}
          </div>

          {queueTicket ? (
            <div>
              <div style={{ fontSize: '32px', fontWeight: 900, color: queueTicket.status === 'in_consultation' ? '#16a34a' : '#0284c7', fontFamily: 'monospace', letterSpacing: '1px', marginBottom: '6px' }}>
                {queueTicket.ticketNo}
              </div>
              <div style={{ fontSize: '12.5px', color: '#475569', fontWeight: 600, marginBottom: '10px' }}>
                Topik: <span style={{ color: '#0f172a' }}>{queueTicket.topic}</span>
              </div>
              
              {queueTicket.status === 'waiting' && (
                <div style={{ background: '#fef3c7', border: '1px solid #fde68a', padding: '10px 12px', borderRadius: '8px', fontSize: '12px', color: '#92400e', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Urutan Antrean: <strong>Ke-{queueTicket.pos}</strong></span>
                  <span>Estimasi: <strong>~{queueTicket.estWaitMinutes} Min</strong></span>
                </div>
              )}

              {queueTicket.status === 'in_consultation' && (
                <div style={{ background: '#dcfce7', border: '1px solid #86efac', padding: '10px 12px', borderRadius: '8px', fontSize: '12px', color: '#166534', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={16} color="#16a34a" />
                  <span>Giliran Anda Tiba! CS Sedang Melayani Anda.</span>
                </div>
              )}

              <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
                {queueTicket.status !== 'completed' && (
                  <button 
                    className="btn btn-secondary" 
                    style={{ flex: 1, fontSize: '12px', padding: '6px', color: '#dc2626', borderColor: '#fecaca' }}
                    onClick={() => {
                      if (window.confirm('Apakah Anda yakin ingin membatalkan nomor antrean konsultasi ini?')) {
                        setQueueTicket(null);
                        setTotalWaitingCount(prev => Math.max(0, prev - 1));
                      }
                    }}
                  >
                    Batalkan Antrean
                  </button>
                )}
                {queueTicket.status === 'in_consultation' && (
                  <button 
                    className="btn" 
                    style={{ flex: 1, fontSize: '12px', padding: '6px', background: '#059669', color: '#ffffff' }}
                    onClick={handleEndConsultation}
                  >
                    Selesaikan Konsultasi
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '16px 8px' }}>
              <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '12px' }}>
                Anda belum mengambil tiket antrean konsultasi CS hari ini.
              </p>
              <button 
                className="btn btn-primary" 
                style={{ width: '100%', fontSize: '12.5px', padding: '8px' }}
                onClick={() => setShowTakeQueueModal(true)}
              >
                <Plus size={14} />
                <span>Ambil Nomor Antrean CS</span>
              </button>
            </div>
          )}
        </div>

        {/* Card 2: Loket Antrean CS Saat Ini */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title" style={{ fontSize: '14px', color: '#475569' }}>
              <Clock size={16} color="#7c3aed" />
              <span>Loket CS Diproses Saat Ini</span>
            </h3>
            <span className="badge badge-emerald">Live Updates</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div>
              <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Nomor Sedang Dilayani</div>
              <div style={{ fontSize: '28px', fontWeight: 900, color: '#7c3aed', fontFamily: 'monospace' }}>
                {currentServingTicket}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Loket Aktif</div>
              <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0f172a' }}>Loket 01 - CS PDP</div>
            </div>
          </div>

          <div style={{ background: '#f8fafc', padding: '10px 12px', borderRadius: '8px', fontSize: '12px', color: '#475569', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Total Antrean Daring:</span>
              <strong style={{ color: '#0f172a' }}>{totalWaitingCount} Orang</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Rata-rata Durasi CS:</span>
              <strong style={{ color: '#0f172a' }}>~6 Menit / Sesi</strong>
            </div>
          </div>
        </div>

        {/* Card 3: Petugas CS On-Duty */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title" style={{ fontSize: '14px', color: '#475569' }}>
              <Users size={16} color="#059669" />
              <span>Petugas CS & Pakar On-Duty</span>
            </h3>
            <span className="badge badge-emerald">4 CS Online</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: activeCSAgent.avatarBg, color: activeCSAgent.avatarColor, width: '42px', height: '42px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '16px' }}>
              SA
            </div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {activeCSAgent.name}
              </div>
              <div style={{ fontSize: '11.5px', color: '#0284c7', fontWeight: 600 }}>
                {activeCSAgent.title}
              </div>
              <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                ⭐ {activeCSAgent.rating} • {activeCSAgent.desk}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Customer Service Interactive Live Chat Interface */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '560px', padding: 0, overflow: 'hidden', border: '1px solid #cbd5e1' }}>
        {/* Chat Room Header */}
        <div style={{ background: '#f8fafc', padding: '14px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ position: 'relative' }}>
              <div style={{ background: activeCSAgent.avatarBg, color: activeCSAgent.avatarColor, width: '38px', height: '38px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '14px' }}>
                CS
              </div>
              <span style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '10px', height: '10px', background: '#22c55e', border: '2px solid #ffffff', borderRadius: '50%' }}></span>
            </div>
            <div>
              <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>{activeCSAgent.name}</span>
                <span className="badge badge-emerald" style={{ fontSize: '10px', padding: '2px 8px' }}>CS Senior IDPC+</span>
              </div>
              <div style={{ fontSize: '11.5px', color: '#64748b' }}>
                🔒 Encrypted CS Session Token: <span style={{ fontFamily: 'monospace', color: '#0284c7', fontWeight: 700 }}>CS-KEY-9842-256BIT</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button 
              className="btn btn-secondary" 
              style={{ padding: '6px 12px', fontSize: '12px' }}
              onClick={() => alert(`Sesi konsultasi live diproteksi dengan enkripsi TLS 1.3 & SHA-256 audit log.`)}
            >
              <ShieldCheck size={14} color="#059669" />
              <span>Sesi Terenskripsi</span>
            </button>

            {queueTicket?.status === 'in_consultation' && (
              <button 
                className="btn" 
                style={{ padding: '6px 12px', fontSize: '12px', background: '#059669', color: '#ffffff' }}
                onClick={handleEndConsultation}
              >
                <span>Selesaikan & Rating</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Action Suggestion Chips Bar */}
        <div style={{ background: '#f1f5f9', padding: '8px 16px', borderBottom: '1px solid #e2e8f0', display: 'flex', gap: '8px', overflowX: 'auto', alignItems: 'center' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Sparkles size={12} color="#0284c7" /> Pertanyaan Cepat:
          </span>
          {[
            '❓ Berapa denda pidana UU PDP No. 27/2022?',
            '🛡️ Bagaimana jika pelaku mengancam sebar data hari ini?',
            '📋 Minta template Draft Surat Somasi Legal resmi',
            '🎓 Apakah identitas saya terjamin anonim dari Kampus?'
          ].map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleQuickChipClick(chip)}
              style={{
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '16px',
                padding: '4px 10px',
                fontSize: '11.5px',
                color: '#334155',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontWeight: 500
              }}
              onMouseOver={(e) => e.currentTarget.style.borderColor = '#0284c7'}
              onMouseOut={(e) => e.currentTarget.style.borderColor = '#cbd5e1'}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Chat Messages Body Display */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '14px', background: '#ffffff' }}>
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              style={{
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '75%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start'
              }}
            >
              <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '3px', fontWeight: 600 }}>
                {msg.sender === 'user' ? 'Anda (Pelapor)' : msg.agentName} • {msg.time}
              </div>
              <div
                style={{
                  padding: '12px 16px',
                  borderRadius: msg.sender === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  background: msg.sender === 'user' ? 'linear-gradient(135deg, #0284c7, #0369a1)' : '#f1f5f9',
                  color: msg.sender === 'user' ? '#ffffff' : '#0f172a',
                  fontSize: '13.5px',
                  lineHeight: '1.5',
                  boxShadow: msg.sender === 'user' ? '0 2px 8px rgba(2, 132, 199, 0.2)' : 'none',
                  border: msg.sender === 'user' ? 'none' : '1px solid #e2e8f0'
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isAgentTyping && (
            <div style={{ alignSelf: 'flex-start', background: '#f1f5f9', padding: '10px 14px', borderRadius: '12px', fontSize: '12px', color: '#64748b', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <RefreshCw size={12} className="spin" />
              <span>Petugas CS {activeCSAgent.name} sedang mengetik tanggapan hukum...</span>
            </div>
          )}
        </div>

        {/* Input Chat Control Box */}
        <form onSubmit={handleSendMessage} style={{ background: '#f8fafc', padding: '12px 16px', borderTop: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button 
            type="button" 
            className="btn btn-secondary" 
            style={{ padding: '10px' }}
            onClick={() => alert(`Lampiran berkas bukti digital dapat diunggah melalui menu '1. Pengaduan & Bukti Digital' untuk validasi hash SHA-256.`)}
            title="Lampirkan Berkas Bukti"
          >
            <Paperclip size={18} color="#64748b" />
          </button>

          <input 
            type="text" 
            className="form-input" 
            placeholder="Tulis pesan pertanyaan atau konsultasi CS Hukum Anda di sini..."
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            style={{ flex: 1, padding: '10px 14px', borderRadius: '10px', fontSize: '13.5px' }}
          />

          <button 
            type="submit" 
            className="btn" 
            style={{ background: '#0284c7', color: '#ffffff', padding: '10px 18px', borderRadius: '10px' }}
          >
            <Send size={16} />
            <span>Kirim</span>
          </button>
        </form>
      </div>

      {/* Modal Ambil Nomor Antrean CS Konsultasi Baru */}
      {showTakeQueueModal && (
        <div className="modal-overlay" style={{ zIndex: 1100 }}>
          <div className="modal-card" style={{ maxWidth: '520px', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Headphones size={20} color="#0284c7" />
                <span>Registrasi Tiket Antrean CS Konsultasi</span>
              </h3>
              <button className="btn btn-secondary" style={{ padding: '4px 8px' }} onClick={() => setShowTakeQueueModal(false)}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleTakeQueueTicket} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="form-group">
                <label className="form-label">Pilih Kategori Topik Konsultasi CS</label>
                <select 
                  className="form-select"
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                >
                  <option>Konsultasi Pelanggaran Privasi Data & UU PDP</option>
                  <option>Bantuan Darurat KSBS & Ancaman Intim (NCII)</option>
                  <option>Penyusunan Draft Surat Somasi Legal & Peringatan</option>
                  <option>Eskalasi Laporan ke Satgas PPKS Kampus Internal</option>
                  <option>Prosedur Audit Keamanan Data & Sertifikasi Compliance</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Catatan Singkat / Ringkasan Masalah (Opsional)</label>
                <textarea 
                  className="form-textarea"
                  rows={3}
                  placeholder="Jelaskan ringkas permasalahan atau pertanyaan hukum Anda..."
                  value={userNotes}
                  onChange={(e) => setUserNotes(e.target.value)}
                />
              </div>

              <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', padding: '12px', borderRadius: '8px', fontSize: '12px', color: '#1e40af', lineHeight: '1.5' }}>
                ℹ️ <strong>Informasi Antrean:</strong> Nomor antrean akan diterbitkan otomatis. Saat giliran Anda tiba, sesi live chat dengan Petugas CS Legal akan langsung aktif.
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setShowTakeQueueModal(false)}>
                  Batal
                </button>
                <button type="submit" className="btn" style={{ flex: 1, background: '#0284c7', color: '#ffffff', fontWeight: 700 }}>
                  Terbitkan Tiket Antrean
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Rating Sesi CS Konsultasi */}
      {showRatingModal && (
        <div className="modal-overlay" style={{ zIndex: 1200 }}>
          <div className="modal-card" style={{ maxWidth: '440px', padding: '24px', textAlign: 'center' }}>
            {!ratingSubmitted ? (
              <form onSubmit={handleSubmitRating} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ background: '#f0fdf4', padding: '16px', borderRadius: '50%', width: '60px', height: '60px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CheckCircle2 size={32} color="#16a34a" />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>
                  Selesaikan Sesi CS Konsultasi
                </h3>
                <p style={{ fontSize: '13px', color: '#64748b', marginTop: '-8px' }}>
                  Bagaimana kualitas layanan Customer Service Legal Adv. Sarah Amalia hari ini?
                </p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', margin: '8px 0' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setStarRating(star)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                    >
                      <Star size={28} color={star <= starRating ? '#f59e0b' : '#cbd5e1'} fill={star <= starRating ? '#f59e0b' : 'none'} />
                    </button>
                  ))}
                </div>

                <div className="form-group" style={{ textAlign: 'left' }}>
                  <label className="form-label">Ulasan / Masukan CS (Opsional)</label>
                  <input 
                    type="text"
                    className="form-input"
                    placeholder="Pelayanan sangat ramah, cepat, dan responsif..."
                    value={ratingFeedback}
                    onChange={(e) => setRatingFeedback(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn" style={{ background: '#059669', color: '#ffffff', width: '100%', padding: '10px' }}>
                  Kirim Ulasan & Tutup Sesi
                </button>
              </form>
            ) : (
              <div style={{ padding: '20px 0' }}>
                <CheckCircle2 size={48} color="#16a34a" style={{ margin: '0 auto 12px' }} />
                <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#047857' }}>Terima Kasih Atas Ulasan Anda!</h4>
                <p style={{ fontSize: '13px', color: '#475569', marginTop: '4px' }}>
                  Ulasan Anda membantu kami meningkatkan kualitas layanan CS Legal IDPC+.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
