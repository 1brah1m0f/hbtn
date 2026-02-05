
import React from 'react';
import { Home, MessageSquareQuote, Library } from 'lucide-react';

export type PageType = 'home' | 'reviews' | 'tools';

interface SidebarProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onPageChange }) => {
  return (
    <aside className="fixed left-0 top-0 h-full w-20 bg-[#2d2f3b] flex flex-col items-center py-6 z-40 border-r border-gray-800">
      <nav className="flex flex-col items-center w-full px-2 gap-4">
        {/* Home Button */}
        <button 
          onClick={() => onPageChange('home')}
          className={`p-3 rounded-xl transition-all duration-200 flex items-center justify-center ${
            currentPage === 'home' 
              ? 'bg-[#D00236] text-white shadow-lg' 
              : 'text-gray-400 hover:text-white hover:bg-[#3e4150]'
          }`}
          title="Home Dashboard"
        >
          <Home size={24} strokeWidth={2} />
        </button>

        {/* Reviews Page Button */}
        <button 
          onClick={() => onPageChange('reviews')}
          className={`p-3 rounded-xl transition-all duration-200 flex items-center justify-center ${
            currentPage === 'reviews' 
              ? 'bg-[#D00236] text-white shadow-lg' 
              : 'text-gray-400 hover:text-white hover:bg-[#3e4150]'
          }`}
          title="Review Management"
        >
          <MessageSquareQuote size={24} strokeWidth={2} />
        </button>

        {/* Tool Library Button */}
        <button 
          onClick={() => onPageChange('tools')}
          className={`p-3 rounded-xl transition-all duration-200 flex items-center justify-center ${
            currentPage === 'tools' 
              ? 'bg-[#D00236] text-white shadow-lg' 
              : 'text-gray-400 hover:text-white hover:bg-[#3e4150]'
          }`}
          title="Tool Library"
        >
          <Library size={24} strokeWidth={2} />
        </button>
      </nav>

      <div className="mt-auto pt-4 w-full flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-gray-600 border border-gray-500 overflow-hidden cursor-pointer hover:border-white transition-colors">
          <img src="https://picsum.photos/40/40?random=profile" alt="User" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
