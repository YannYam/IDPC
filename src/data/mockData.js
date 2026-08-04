export const mockInstitutions = [
  { id: 1, name: "Kementerian Komunikasi dan Informatika", sector: "Kementerian", complianceScore: 92, ratingLetter: "AAA", dpo: "Dr. Pratama Persadha", status: "Terverifikasi" },
  { id: 2, name: "Kementerian Kesehatan RI", sector: "Kementerian", complianceScore: 84, ratingLetter: "AA", dpo: "Ir. Setiaji, S.T., M.Si", status: "Terverifikasi" },
  { id: 3, name: "Universitas Indonesia (UI)", sector: "Universitas", complianceScore: 88, ratingLetter: "AA", dpo: "Prof. Dr. Ir. Riri Fitri Sari", status: "Terverifikasi" },
  { id: 4, name: "Universitas Gadjah Mada (UGM)", sector: "Universitas", complianceScore: 91, ratingLetter: "AAA", dpo: "Dr. Wing Wahyu Winarno", status: "Terverifikasi" },
  { id: 5, name: "PT Bank Rakyat Indonesia (Persero) Tbk", sector: "BUMN", complianceScore: 96, ratingLetter: "AAA", dpo: "Arga M. Nugraha", status: "Terverifikasi" },
  { id: 6, name: "PT Telkom Indonesia Tbk", sector: "BUMN", complianceScore: 90, ratingLetter: "AAA", dpo: "Fajrin Rasyid", status: "Terverifikasi" },
  { id: 7, name: "Pemerintah Provinsi DKI Jakarta", sector: "Pemda", complianceScore: 78, ratingLetter: "A", dpo: "Budi Arie Setiadi", status: "Audit Berkala" },
  { id: 8, name: "Pemerintah Kota Surabaya", sector: "Pemda", complianceScore: 82, ratingLetter: "AA", dpo: "M. Fikser", status: "Terverifikasi" },
  { id: 9, name: "PT Ecommerce Megastore Indo", sector: "Swasta", complianceScore: 65, ratingLetter: "B", dpo: "Andi Wijaya", status: "Peringatan Dini" },
  { id: 10, name: "Universitas Mataram (UNRAM)", sector: "Universitas", complianceScore: 85, ratingLetter: "AA", dpo: "Dr. Ahmad Zaini", status: "Terverifikasi" }
];

export const mockAIBreachThreats = [
  { id: 101, domain: "kemkes.go.id", source: "RaidForums Darknet Post", records: "1.2 Million Patients", level: "Critical", detectedAt: "2026-07-28 09:12 UTC", status: "Early Warning Dispatched" },
  { id: 102, domain: "univ-xyz.ac.id", source: "Exposed S3 Bucket Index", records: "45,000 Student Records", level: "High", detectedAt: "2026-07-27 22:45 UTC", status: "Institution Notified" },
  { id: 103, domain: "fintech-pay.co.id", source: "Telegram Leaked DB Channel", records: "280,000 KTP Scan Passwords", level: "Critical", detectedAt: "2026-07-27 16:30 UTC", status: "Direct Escalation" },
  { id: 104, domain: "pemda-barat.go.id", source: "Public Pastebin Config Dump", records: "12,000 Staff Credentials", level: "Medium", detectedAt: "2026-07-26 11:20 UTC", status: "Mitigated" }
];

export const mockCampusPPKSCases = [
  { id: "PPKS-2026-001", campus: "Universitas Indonesia", category: "Doxxing & Penyebaran Konten Tanpa Konsen", victimAlias: "Korban-A92", priority: "Sangat Tinggi", status: "Penyelidikan Satgas", date: "2026-07-25" },
  { id: "PPKS-2026-002", campus: "Universitas Gadjah Mada", category: "Pelecehan Seksual Berbasis Siber (KSBS)", victimAlias: "Korban-B44", priority: "Tinggi", status: "Pendampingan Hukum", date: "2026-07-22" },
  { id: "PPKS-2026-003", campus: "Universitas Mataram", category: "Pengancaman Pembocoran Data Pribadi", victimAlias: "Korban-C11", priority: "Sangat Tinggi", status: "Proteksi Identitas Aktif", date: "2026-07-20" }
];

export const mockIncidentMapPoints = [
  { id: 1, province: "DKI Jakarta", city: "Jakarta Selatan", sector: "Keuangan & BUMN", count: 42, lat: -6.2088, lng: 106.8456, risk: "Tinggi" },
  { id: 2, province: "Jawa Barat", city: "Bandung", sector: "Perguruan Tinggi", count: 28, lat: -6.9175, lng: 107.6191, risk: "Sedang" },
  { id: 3, province: "Jawa Timur", city: "Surabaya", sector: "Pemerintahan Daerah", count: 35, lat: -7.2575, lng: 112.7521, risk: "Tinggi" },
  { id: 4, province: "Nusa Tenggara Barat", city: "Mataram / Lombok", sector: "Pariwisata & Edukasi", count: 14, lat: -8.5833, lng: 116.1167, risk: "Rendah" },
  { id: 5, province: "Sulawesi Selatan", city: "Makassar", sector: "Layanan Kesehatan", count: 21, lat: -5.1477, lng: 119.4327, risk: "Sedang" },
  { id: 6, province: "Sumatera Utara", city: "Medan", sector: "Korporasi Swasta", count: 30, lat: 3.5952, lng: 98.6722, risk: "Tinggi" }
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
