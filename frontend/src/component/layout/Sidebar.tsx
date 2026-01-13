import { LayoutDashboard, Users, Trophy, Settings, LogOut } from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export function Sidebar({ currentView, onNavigate }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'friends', label: 'Friends', icon: Users },
    { id: 'games', label: 'Games', icon: Trophy },
  ];

  return (
    <aside className="fixed left-0 top-0 z-20 h-screen w-64 bg-slate-900 text-white shadow-xl transition-transform duration-300 ease-in-out">
      {/* Brand Logo */}
      <div className="flex h-16 items-center border-b border-slate-800 px-6">
        <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
          GolfStats
        </h1>
      </div>

      {/* Navigation Menu */}
      <nav className="flex flex-col gap-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`group flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200
                ${isActive 
                  ? 'bg-emerald-500/10 text-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.1)]' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
            >
              <Icon size={20} className={isActive ? 'text-emerald-400' : 'text-slate-400 group-hover:text-white'} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="absolute bottom-0 w-full border-t border-slate-800 p-4">
        <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-400 transition-colors hover:bg-slate-800 hover:text-white">
          <Settings size={20} />
          Settings
        </button>
        <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-rose-400 transition-colors hover:bg-rose-500/10 hover:text-rose-300">
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}