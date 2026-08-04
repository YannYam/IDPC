import React, { useState } from 'react';
import { BookOpen, Award, CheckCircle2, HelpCircle, Play, FileCheck } from 'lucide-react';

export default function PrivacyLearningCenter({ modules }) {
  const [activeQuiz, setActiveQuiz] = useState(false);
  const [selectedModule, setSelectedModule] = useState(modules[0]);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizScore, setQuizScore] = useState(null);

  const quizQuestions = [
    {
      id: 1,
      question: "Apakah subjek data pribadi berhak mengakhiri pemrosesan & meminta penghapusan data pribadinya?",
      options: [
        "A. Tidak berhak, pengendali data memegang hak milik penuh.",
        "B. Berhak, sesuai Pasal 8 UU PDP No. 27/2022.",
        "C. Hanya berhak jika data berupa rekening bank.",
        "D. Berhak hanya jika diizinkan oleh pihak kepolisian."
      ],
      correct: 1
    },
    {
      id: 2,
      question: "Berapa lama batas waktu pemberitahuan resmi yang wajib disampaikan Pengendali Data kepada IDPC & publik saat terjadi kebocoran data?",
      options: [
        "A. Maksimal 3 x 24 jam (72 jam).",
        "B. Maksimal 30 hari kerja.",
        "C. Maksimal 1 tahun.",
        "D. Tidak ada batas waktu."
      ],
      correct: 0
    }
  ];

  const handleSelectAnswer = (qId, optionIdx) => {
    setUserAnswers({ ...userAnswers, [qId]: optionIdx });
  };

  const handleFinishQuiz = () => {
    let score = 0;
    quizQuestions.forEach(q => {
      if (userAnswers[q.id] === q.correct) score += 50;
    });
    setQuizScore(score);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Banner Learning */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #f3e8ff, #fae8ff)', border: '1px solid #ddd6fe' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ background: '#ffffff', padding: '16px', borderRadius: '16px', border: '1px solid #ddd6fe' }}>
              <BookOpen size={36} color="#7c3aed" />
            </div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a' }}>Privacy Learning Center (Pusat Edukasi & Sertifikasi Literasi Digital)</h2>
              <p style={{ color: '#475569', fontSize: '13.5px', marginTop: '4px' }}>
                Modul pembelajaran interaktif mengenai hak subjek data, tata kelola UU PDP, dan sertifikasi digital untuk masyarakat umum & DPO.
              </p>
            </div>
          </div>

          <span className="badge badge-purple" style={{ padding: '8px 16px', fontSize: '13px' }}>
            <Award size={16} /> Digital Literacy Certification
          </span>
        </div>
      </div>

      <div className="grid-2">
        {/* Modul Pembelajaran */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <BookOpen size={20} color="#7c3aed" />
              <span>Modul Pembelajaran UU PDP</span>
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {modules.map((mod) => (
              <div 
                key={mod.id}
                onClick={() => setSelectedModule(mod)}
                style={{
                  padding: '16px',
                  borderRadius: '12px',
                  background: selectedModule.id === mod.id ? '#f3e8ff' : '#f8fafc',
                  border: selectedModule.id === mod.id ? '1px solid #ddd6fe' : '1px solid #e2e8f0',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <h4 style={{ fontSize: '14.5px', fontWeight: 700, color: '#0f172a' }}>{mod.title}</h4>
                  <p style={{ fontSize: '12px', color: '#475569', marginTop: '4px' }}>
                    Durasi: {mod.duration} • Level: {mod.level} • {mod.lessons} Pelajaran Interaktif
                  </p>
                </div>
                <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }}>
                  <Play size={14} color="#7c3aed" />
                  <span>Pelajari</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quiz Interaktif & Sertifikasi Badge */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <HelpCircle size={20} color="#059669" />
              <span>Uji Pemahaman & Lencana Sertifikasi</span>
            </h3>
            <span className="badge badge-emerald">Syarat Kelulusan: {selectedModule.scoreNeeded}%</span>
          </div>

          {!activeQuiz ? (
            <div style={{ textAlign: 'center', padding: '24px 12px' }}>
              <Award size={48} color="#7c3aed" style={{ margin: '0 auto 12px' }} />
              <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>Ujian Sertifikasi: {selectedModule.title}</h4>
              <p style={{ fontSize: '13px', color: '#475569', margin: '8px 0 20px' }}>
                Selesaikan kuis interaktif 2 soal untuk menguji pemahaman Anda dan mengunduh Lencana Digital "IDPC+ Certified Privacy Subject".
              </p>
              <button className="btn btn-primary" onClick={() => setActiveQuiz(true)}>
                <span>Mulai Ujian Sertifikasi Kuis</span>
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {quizScore === null ? (
                <>
                  {quizQuestions.map((q) => (
                    <div key={q.id} style={{ background: '#f8fafc', padding: '14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                      <p style={{ fontSize: '13.5px', fontWeight: 700, marginBottom: '10px', color: '#0f172a' }}>{q.id}. {q.question}</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {q.options.map((opt, idx) => (
                          <label key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', cursor: 'pointer', padding: '6px', borderRadius: '6px', background: userAnswers[q.id] === idx ? '#eff6ff' : 'transparent', color: '#334155' }}>
                            <input 
                              type="radio" 
                              name={`q_${q.id}`} 
                              checked={userAnswers[q.id] === idx}
                              onChange={() => handleSelectAnswer(q.id, idx)}
                            />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}

                  <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleFinishQuiz}>
                    <span>Kirim & Hitung Skor Sertifikasi</span>
                  </button>
                </>
              ) : (
                <div style={{ textAlign: 'center', background: '#ecfdf5', padding: '24px', borderRadius: '12px', border: '1px solid #a7f3d0' }}>
                  <CheckCircle2 size={42} color="#059669" style={{ margin: '0 auto 10px' }} />
                  <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#047857' }}>SELAMAT! Skor Anda: {quizScore}/100</h4>
                  <p style={{ fontSize: '13px', color: '#475569', margin: '6px 0 16px' }}>
                    Anda telah resmi lulus Sertifikasi Literasi Data Pribadi IDPC+.
                  </p>
                  <button className="btn btn-primary" onClick={() => alert('Lencana Sertifikat Digital IDPC+ berhasil diunduh dalam format PNG Kualitas Tinggi!')}>
                    <Award size={16} />
                    <span>Unduh Badge Sertifikat Digital IDPC+</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
