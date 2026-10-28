import { Link } from 'react-router-dom';
import { Award } from 'lucide-react';

export default function AppHeader() {
  return (
    <header className="bg-[#0d1b3e] border-b-2 border-[#c8971c] shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-[#c8971c] rounded-lg flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <span className="text-white font-cinzel font-black text-lg leading-none">M</span>
          </div>
          <div>
            <div className="text-white font-cinzel font-bold text-base tracking-widest leading-tight">
              MAXIM CODE
            </div>
            <div className="text-[#c8971c] text-[10px] tracking-[0.2em] font-medium leading-tight">
              Building Future Innovators
            </div>
          </div>
        </Link>

        {/* Right badge */}
        <div className="flex items-center gap-2 bg-[#c8971c]/10 border border-[#c8971c]/30 rounded-full px-4 py-1.5">
          <Award className="w-4 h-4 text-[#c8971c]" />
          <span className="text-white text-xs font-semibold tracking-wide">Certificate Portal</span>
        </div>
      </div>
    </header>
  );
}
