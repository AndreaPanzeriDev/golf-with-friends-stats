import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';

interface MainLayoutProps {
  children: ReactNode;
  currentView: string;
  onNavigate: (view: string) => void;
}

export function MainLayout({ children, currentView, onNavigate }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Sidebar currentView={currentView} onNavigate={onNavigate} />

      {/* Main Content Wrapper - Pushed right by 16rem (w-64) to accommodate fixed sidebar */}
      <div className="ml-64 flex min-h-screen flex-col">
        <Navbar title={currentView} />

        <main className="flex-1 p-8">
          <div className="mx-auto max-w-6xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}