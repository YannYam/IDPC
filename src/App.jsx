import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import PPKSAuthModal from './components/PPKSAuthModal';

import SecureComplaintCenter from './components/SecureComplaintCenter';
import VictimProtectionHub from './components/VictimProtectionHub';
import AIBreachMonitoring from './components/AIBreachMonitoring';
import DigitalEvidenceVault from './components/DigitalEvidenceVault';
import CampusPrivacyCenter from './components/CampusPrivacyCenter';
import DataComplianceDashboard from './components/DataComplianceDashboard';
import InstitutionPrivacyRating from './components/InstitutionPrivacyRating';
import LegalConsultationHub from './components/LegalConsultationHub';
import PrivacyLearningCenter from './components/PrivacyLearningCenter';
import NationalDataIncidentMap from './components/NationalDataIncidentMap';

import { 
  mockInstitutions, 
  mockAIBreachThreats, 
  mockCampusPPKSCases, 
  mockIncidentMapPoints, 
  mockLegalExperts, 
  mockLearningModules 
} from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('complaint');
  const [userRole, setUserRole] = useState('public');

  // Authenticated Satgas Session State
  const [ppksAuthSession, setPpksAuthSession] = useState({
    isAuthenticated: false,
    officerName: '',
    officerId: '',
    campus: '',
    roleTitle: '',
    token: ''
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Shared State across modules
  const [complaints, setComplaints] = useState([
    { id: 1, ticketCode: 'IDPC-CRYPT-8942', category: 'Kebocoran Data Pribadi (Data Leak)', entity: 'PT Ecommerce Megastore Indo', date: '2026-07-27', status: 'Investigasi Formal IDPC', isAnonymous: true, encrypted: true },
    { id: 2, ticketCode: 'IDPC-CRYPT-4120', category: 'Penyalahgunaan NIK & KTP', entity: 'Pinjol Ilegal Megah', date: '2026-07-26', status: 'Audit Kepatuhan', isAnonymous: true, encrypted: true }
  ]);

  const [threatList, setThreatList] = useState(mockAIBreachThreats);
  const [campusCases, setCampusCases] = useState(mockCampusPPKSCases);
  const [institutions, setInstitutions] = useState(mockInstitutions);

  const handleRequestInvestigatorMode = () => {
    if (!ppksAuthSession.isAuthenticated) {
      setIsAuthModalOpen(true);
    } else {
      setUserRole('investigator');
      if (activeTab !== 'campus') {
        setActiveTab('campus');
      }
    }
  };

  const handleAuthenticateSession = (sessionData) => {
    setPpksAuthSession(sessionData);
    setUserRole('investigator');
    setIsAuthModalOpen(false);
    setActiveTab('campus');
  };

  const handleLogoutSatgas = () => {
    setPpksAuthSession({
      isAuthenticated: false,
      officerName: '',
      officerId: '',
      campus: '',
      roleTitle: '',
      token: ''
    });
    setUserRole('public');
  };

  const renderActiveModule = () => {
    switch (activeTab) {
      case 'complaint':
        return <SecureComplaintCenter complaints={complaints} setComplaints={setComplaints} />;
      case 'victim':
        return <VictimProtectionHub />;
      case 'breach':
        return <AIBreachMonitoring threatList={threatList} setThreatList={setThreatList} />;
      case 'vault':
        return <DigitalEvidenceVault />;
      case 'campus':
        return (
          <CampusPrivacyCenter 
            campusCases={campusCases} 
            setCampusCases={setCampusCases}
            userRole={userRole}
            setUserRole={setUserRole}
            ppksAuthSession={ppksAuthSession}
            onRequestAuth={() => setIsAuthModalOpen(true)}
            onLogoutSatgas={handleLogoutSatgas}
          />
        );
      case 'dashboard':
        return <DataComplianceDashboard institutions={institutions} />;
      case 'rating':
        return <InstitutionPrivacyRating institutions={institutions} />;
      case 'consultation':
        return <LegalConsultationHub experts={mockLegalExperts} />;
      case 'learning':
        return <PrivacyLearningCenter modules={mockLearningModules} />;
      case 'map':
        return <NationalDataIncidentMap mapPoints={mockIncidentMapPoints} />;
      default:
        return <SecureComplaintCenter complaints={complaints} setComplaints={setComplaints} />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} userRole={userRole} />
      <div className="main-content">
        <Header 
          activeTab={activeTab} 
          threatCount={threatList.filter(t => t.level === 'Critical').length}
          userRole={userRole}
          setUserRole={setUserRole}
          setActiveTab={setActiveTab}
          ppksAuthSession={ppksAuthSession}
          onRequestAuth={handleRequestInvestigatorMode}
          onLogoutSatgas={handleLogoutSatgas}
        />
        <main className="page-wrapper">
          {renderActiveModule()}
        </main>
      </div>

      {/* Satgas Authentication & Verification Modal */}
      <PPKSAuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthenticate={handleAuthenticateSession}
      />
    </div>
  );
}
