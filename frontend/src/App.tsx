import { useState } from 'react';
import { MainLayout } from './component/layout/MainLayout';


function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-2 text-lg font-medium text-slate-800">Welcome Back!</h3>
            <p className="text-slate-500">Here is your golf performance overview.</p>
          </div>
        );
      case 'friends':
        return <div className="text-center p-10">Friends List Component Placeholder</div>;
      case 'games':
        return <div className="text-center p-10">Recent Games Component Placeholder</div>;
      default:
        return <div>Page Not Found</div>;
    }
  };

  return (
    <MainLayout currentView={currentView} onNavigate={setCurrentView}>
      {renderContent()}
    </MainLayout>
  );
}

export default App;