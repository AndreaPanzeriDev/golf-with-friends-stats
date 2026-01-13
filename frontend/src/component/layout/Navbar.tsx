import { User, Bell } from 'lucide-react';

interface NavbarProps {
    title: string;
}

export function Navbar({ title }: NavbarProps) {
  return (
    <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/70 px-6 backdrop-blur-md">
      <h2 className="text-xl font-semibold text-slate-800 capitalize">
        {title}
      </h2>

      <div className="flex items-center gap-4">
        <button className="relative rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700">
          <Bell size={20} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
        </button>
        
        <div className="h-8 w-px bg-slate-200"></div>

        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 ring-2 ring-emerald-50">
            <User size={20} />
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-slate-700">Il Panzer</p>
            <p className="text-xs text-slate-500">Pro Golfer</p>
          </div>
        </div>
      </div>
    </header>
  );
}