
import React from 'react';

interface ProjectCardProps {
  progress: number;
  onUpdate: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ progress, onUpdate }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 h-full flex flex-col items-center justify-between text-center">
      <div className="relative mb-6">
        <div className="w-32 h-32 rounded-full border-8 border-gray-100 flex items-center justify-center transition-all duration-700" style={{
          background: `conic-gradient(#38bdf8 ${progress}%, #f1f5f9 ${progress}%)`
        }}>
          <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-inner">
             <div className="flex items-center justify-center p-3 border-4 border-[#38bdf8] rounded-full bg-white">
                <span className="text-2xl font-black text-[#38bdf8]">JS</span>
             </div>
          </div>
        </div>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full border border-gray-200 shadow-sm">
          <span className="text-[#D00236] font-bold text-sm">{progress}%</span>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#1E293B] mb-2 leading-tight">
          JavaScript DOM<br />manipulation
        </h2>
        <p className="text-xs text-gray-400 font-medium">Sprint 2 • Due in 3 days</p>
      </div>

      <button 
        onClick={onUpdate}
        className="w-full bg-[#D00236] hover:bg-[#b0022e] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95"
      >
        {progress === 100 ? 'Review project' : 'Update progress'}
      </button>
    </div>
  );
};

export default ProjectCard;
