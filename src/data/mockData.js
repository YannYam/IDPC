export const mockAIBreachThreats = [
  { id: 101, domain: "kemkes.go.id", source: "RaidForums Darknet Post", records: "1.2 Million Patients", level: "Critical", detectedAt: "2026-07-28 09:12 UTC", status: "Early Warning Dispatched" },
  { id: 102, domain: "univ-xyz.ac.id", source: "Exposed S3 Bucket Index", records: "45,000 Student Records", level: "High", detectedAt: "2026-07-27 22:45 UTC", status: "Institution Notified" },
  { id: 103, domain: "fintech-pay.co.id", source: "Telegram Leaked DB Channel", records: "280,000 KTP Scan Passwords", level: "Critical", detectedAt: "2026-07-27 16:30 UTC", status: "Direct Escalation" },
  { id: 104, domain: "pemda-barat.go.id", source: "Public Pastebin Config Dump", records: "12,000 Staff Credentials", level: "Medium", detectedAt: "2026-07-26 11:20 UTC", status: "Mitigated" }
];

export const mockCampusPPKSCases = [
  { id: "PPKS-2026-001", campus: "Universitas Indonesia", category: "Doxxing & Penyebaran Konten Tanpa Konsen", victimAlias: "Korban-A92", priority: "Sangat Tinggi", status: "Penyelidikan Satgas", date: "2026-07-25", assignedInvestigator: "Dr. Rina Wijaya, S.H., M.H.", investigationStartedAt: "25 Jul 2026, 09:30 WIB" },
  { id: "PPKS-2026-002", campus: "Universitas Gadjah Mada", category: "Pelecehan Seksual Berbasis Siber (KSBS)", victimAlias: "Korban-B44", priority: "Tinggi", status: "Pendampingan Hukum", date: "2026-07-22", assignedInvestigator: "Prof. Dr. Hendra K., M.Si.", investigationStartedAt: "22 Jul 2026, 14:15 WIB" },
  { id: "PPKS-2026-003", campus: "Universitas Mataram", category: "Pengancaman Pembocoran Data Pribadi", victimAlias: "Korban-C11", priority: "Sangat Tinggi", status: "Proteksi Identitas Aktif", date: "2026-07-20", assignedInvestigator: "Dr. Ahmad Zaini, S.H.", investigationStartedAt: "20 Jul 2026, 11:00 WIB" }
];

export const mockLegalExperts = [
  { id: 1, name: "Adv. Budi Santoso, S.H., M.H.", role: "Pakar Hukum Siber & PDP", organization: "LBH Proteksi Data Indonesia", rating: 4.9, status: "Online" },
  { id: 2, name: "Dr. Siti Aminah, S.H., LL.M.", role: "Ketua Klinik Hukum Kampus UI", organization: "Satgas PPKS & Klinik Legal UI", rating: 5.0, status: "Busy" },
  { id: 3, name: "Ir. Hendra Gunawan, CISA, CISSP", role: "Auditor Keamanan & Forensik Digital", organization: "Cyber Defense Alliance", rating: 4.8, status: "Online" }
];

export const mockLearningModules = [
  { id: 1, title: "Hak Subjek Data Menurut UU PDP No. 27/2022", duration: "15 Menit", level: "Dasar", lessons: 4, scoreNeeded: 80 },
  { id: 2, title: "Proteksi Data Korban Kekerasan Seksual & Siber", duration: "25 Menit", level: "Menengah", lessons: 6, scoreNeeded: 85 },
  { id: 3, title: "Prosedur Legal Admissibility Bukti Digital (ITE & PDP)", duration: "30 Menit", level: "Lanjutan", lessons: 5, scoreNeeded: 85 }
];
