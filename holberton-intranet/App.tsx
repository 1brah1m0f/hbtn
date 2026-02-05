
import React, { useState, useEffect } from 'react';
import Sidebar, { PageType } from './components/Sidebar';
import Header from './components/Header';
import ProjectCard from './components/ProjectCard';
import LevelChart from './components/LevelChart';
import EventsList from './components/EventsList';
import ProgressSection from './components/ProgressSection';
import ReviewFeedback from './components/ReviewFeedback';
import ToolLibrary from './components/ToolLibrary';
import HelpChatbot from './components/HelpChatbot';
import { ApiService } from './services/api';

const App: React.FC = () => {
  const [activePath, setActivePath] = useState('Full Stack Bak - Part 1');
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [projectProgress, setProjectProgress] = useState(0);

  useEffect(() => {
    const init = async () => {
      const p = await ApiService.getProgress();
      setProjectProgress(p);
    };
    init();
  }, []);

  const handleUpdateProgress = async () => {
    const newVal = await ApiService.updateProgress(5);
    setProjectProgress(newVal);
  };

  const paths = [
    'Holberton Basics',
    'Full Stack Bak - Part 1',
    'HBnB v2'
  ];

  const renderHome = () => (
    <>
      <Header />
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 mb-6 flex flex-wrap gap-2">
        {paths.map(path => (
          <button
            key={path}
            onClick={() => setActivePath(path)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activePath === path
                ? 'bg-[#D00236] text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {path}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        <div className="lg:col-span-4">
          <ProjectCard progress={projectProgress} onUpdate={handleUpdateProgress} />
        </div>
        <div className="lg:col-span-4">
          <LevelChart />
        </div>
        <div className="lg:col-span-4">
          <EventsList />
        </div>
      </div>

      <div className="w-full">
         <ProgressSection progress={projectProgress} />
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-[#f3f4f6]">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      
      <main className="flex-1 ml-20 p-8 overflow-y-auto pb-24">
        {currentPage === 'home' && renderHome()}
        {currentPage === 'reviews' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-[#1E293B]">Review Management</h1>
              <p className="text-gray-500 mt-2">Maintain the quality of the peer-learning ecosystem through detailed feedback.</p>
            </header>
            <div className="max-w-4xl mx-auto">
              <ReviewFeedback />
            </div>
          </div>
        )}
        {currentPage === 'tools' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <ToolLibrary />
          </div>
        )}
      </main>

      <HelpChatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      <button 
        onClick={() => setIsChatOpen(!isChatOpen)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-all active:scale-95 z-50 ${isChatOpen ? 'bg-gray-800' : 'bg-[#D00236]'}`}
      >
        {isChatOpen ? <span className="text-white text-xl">×</span> : <span className="text-white font-bold">?</span>}
      </button>
    </div>
  );
};

export default App;
