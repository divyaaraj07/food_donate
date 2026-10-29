import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Toast } from './components/Toast';
import { PartialQuantityModal } from './components/PartialQuantityModal';
import { MessageModal } from './components/MessageModal';
import { CallModal } from './components/CallModal';
import { CustomAlertModal, ViewDocModal } from './components/ExtraModals';

// Pages
import { HomePage } from './pages/HomePage';
import { BrowsePage } from './pages/BrowsePage';
import { ListingDetailsPage } from './pages/ListingDetailsPage';
import { DonatePage } from './pages/DonatePage';
import { ReviewsPage } from './pages/ReviewsPage';
import { DashboardPage } from './pages/DashboardPage';
import { ActivityPage } from './pages/ActivityPage';
import { AdminPage } from './pages/AdminPage';
import { AuthPage } from './pages/AuthPage';

const MainContent: React.FC = () => {
  const { page } = useApp();

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <HomePage />;
      case 'browse':
        return <BrowsePage />;
      case 'details':
        return <ListingDetailsPage />;
      case 'donate':
        return <DonatePage />;
      case 'reviews':
        return <ReviewsPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'activity':
        return <ActivityPage />;
      case 'admin':
        return <AdminPage />;
      case 'auth':
        return <AuthPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f2fcf4] text-[#151d19]">
      <Header />
      <main className="flex-1 w-full pt-18 sm:pt-20 px-4 pb-20 md:pb-12 max-w-6xl mx-auto">
        {renderPage()}
      </main>
      <BottomNav />
      <Toast />
      <PartialQuantityModal />
      <MessageModal />
      <CallModal />
      <CustomAlertModal />
      <ViewDocModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
