
import React from 'react';

interface ProgressSectionProps {
  progress?: number;
}

const ProgressSection: React.FC<ProgressSectionProps> = ({ progress = 85 }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative overflow-hidden h-full">
      <div className="mb-8 flex justify-between items-center">
        <span className="font-bold text-gray-800 uppercase tracking-wide text-sm">Progress & Reputation</span>
        <div className="flex flex-col items-end">
          <span className="text-[10px] text-gray-400 font-bold uppercase">Consistency Score</span>
          <span className="text-sm font-bold text-green-500">Perfect Streak</span>
        </div>
      </div>

      <div className="relative flex flex-col md:flex-row items-center gap-12 pt-4 pb-4">
        <div className="flex-shrink-0 relative">
          <div className="w-40 h-40 bg-white rounded-3xl shadow-xl border border-gray-50 flex flex-col items-center justify-center p-4">
             <div className="relative mb-2">
                <svg className="w-24 h-24" viewBox="0 0 100 100">
                  <circle className="text-gray-100" strokeWidth="10" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50" />
                  <circle className="text-[#D00236] transition-all duration-1000" strokeWidth="10" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * progress / 100)} strokeLinecap="round" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-gray-800">{progress}%</div>
             </div>
             <span className="text-sm font-semibold text-gray-500">Path Mastery</span>
          </div>
        </div>

        <div className="flex-1 w-full relative h-48 flex items-center overflow-hidden">
            <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
               <path d="M0 80 Q 200 80, 400 40 T 800 40" fill="none" stroke="#e2e8f0" strokeWidth="4" strokeDasharray="8 8" />
            </svg>
            <div className="flex justify-around items-center w-full relative z-10 px-4">
                <div className="flex flex-col items-center">
                    <div className="mb-2 bg-white rounded-lg shadow-sm border border-gray-100 p-1 px-2 text-[10px] font-bold text-[#D00236]">Feb 01</div>
                    <div className="w-16 h-16 rounded-full bg-white border-2 border-green-500 flex items-center justify-center shadow-md text-green-500 font-bold">✓</div>
                    <span className="mt-4 text-[11px] font-bold text-gray-600">Shell Basics</span>
                </div>
                <div className="flex flex-col items-center">
                    <div className="mb-2 bg-white rounded-lg shadow-sm border border-gray-100 p-1 px-2 text-[10px] font-bold text-green-500">Today</div>
                    <div className="w-16 h-16 rounded-full bg-white border-2 border-[#D00236] flex items-center justify-center shadow-md text-[#D00236] font-bold animate-pulse">JS</div>
                    <span className="mt-4 text-[11px] font-bold text-gray-600">DOM Manipulation</span>
                </div>
                <div className="flex flex-col items-center opacity-40">
                    <div className="mb-2 bg-white rounded-lg shadow-sm border border-gray-100 p-1 px-2 text-[10px] font-bold text-gray-400">Feb 15</div>
                    <div className="w-16 h-16 rounded-full bg-gray-50 border-2 border-dashed border-gray-300 flex items-center justify-center">03</div>
                    <span className="mt-4 text-[11px] font-bold text-gray-400">Advanced Python</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressSection;
