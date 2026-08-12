import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import PPKSAuthModal from './components/PPKSAuthModal';

import SecureComplaintCenter from './components/SecureComplaintCenter';
import VictimProtectionHub from './components/VictimProtectionHub';
import AIBreachMonitoring from './components/AIBreachMonitoring';
import CampusPrivacyCenter from './components/CampusPrivacyCenter';
import LegalConsultationHub from './components/LegalConsultationHub';
import PrivacyLearningCenter from './components/PrivacyLearningCenter';

import { 
  mockAIBreachThreats, 
  mockCampusPPKSCases, 
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
    { id: 1, ticketCode: 'IDPC-CRYPT-8942', category: 'Kebocoran Data Pribadi (Data Leak)', entity: 'PT Ecommerce Megastore Indo', date: '2026-07-27', status: 'Investigasi Formal IDPC', isAnonymous: true, encrypted: true, assignedInvestigator: 'Dr. H. Bambang Soetopo, S.H., M.H.', investigationStartedAt: '27 Jul 2026, 10:15 WIB', contactPerson: 'Budi (Kakak) [WhatsApp]: 08123456789' },
    { id: 2, ticketCode: 'IDPC-CRYPT-4120', category: 'Penyalahgunaan NIK & KTP', entity: 'Pinjol Ilegal Megah', date: '2026-07-26', status: 'Audit Kepatuhan', isAnonymous: true, encrypted: true, assignedInvestigator: 'Dr. H. Bambang Soetopo, S.H., M.H.', investigationStartedAt: '26 Jul 2026, 16:40 WIB', contactPerson: '@dina_ig (Instagram Kerabat)' }
  ]);

  const [threatList, setThreatList] = useState(mockAIBreachThreats);
  const [campusCases, setCampusCases] = useState(mockCampusPPKSCases);

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
        return (
          <SecureComplaintCenter 
            complaints={complaints} 
            setComplaints={setComplaints}
            ppksAuthSession={ppksAuthSession}
          />
        );
      case 'victim':
        return (
          <VictimProtectionHub 
            setActiveTab={setActiveTab}
            complaints={complaints}
            setComplaints={setComplaints}
          />
        );
      case 'breach':
        return <AIBreachMonitoring threatList={threatList} setThreatList={setThreatList} />;
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
      case 'consultation':
        return (
          <LegalConsultationHub 
            experts={mockLegalExperts} 
            userRole={userRole}
            ppksAuthSession={ppksAuthSession}
          />
        );
      case 'learning':
        return <PrivacyLearningCenter modules={mockLearningModules} />;
      default:
        return (
          <SecureComplaintCenter 
            complaints={complaints} 
            setComplaints={setComplaints}
            ppksAuthSession={ppksAuthSession}
          />
        );
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
