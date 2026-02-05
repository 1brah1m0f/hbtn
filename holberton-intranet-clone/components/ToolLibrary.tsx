
import React, { useState, useEffect } from 'react';
import { ThumbsUp, Youtube, BookOpen, ExternalLink, Plus, Search, X } from 'lucide-react';
import { ApiService, Resource } from '../services/api';

const ToolLibrary: React.FC = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newRes, setNewRes] = useState({ title: '', type: 'video' as any, url: '', tags: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await ApiService.getResources();
      setResources(data);
      setLoading(false);
    };
    load();
  }, []);

  const handleLike = async (id: number) => {
    await ApiService.likeResource(id);
    const updated = await ApiService.getResources();
    setResources(updated);
  };

  const handleAddResource = async () => {
    if (!newRes.title || !newRes.url) return;
    const formatted = {
      title: newRes.title,
      type: newRes.type,
      url: newRes.url.startsWith('http') ? newRes.url : `https://${newRes.url}`,
      tags: newRes.tags.split(',').map(t => t.trim()).filter(t => t !== '')
    };
    await ApiService.saveResource(formatted);
    const updated = await ApiService.getResources();
    setResources(updated);
    setShowAddModal(false);
    setNewRes({ title: '', type: 'video', url: '', tags: '' });
  };

  const filteredResources = resources.filter(res => 
    res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    res.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const openLink = (url: string) => {
    if (url && url !== '#') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D00236]"></div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-[#1E293B]">Community Tool Library</h1>
          <p className="text-gray-500 mt-2">A shared database of the best resources found by Holberton students.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-[#D00236] hover:bg-[#b0022e] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-[#D00236]/20 transition-all active:scale-95"
        >
          <Plus size={20} /> Share Resource
        </button>
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8 flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search resources by name or tag (e.g. 'Pointers', 'React')..."
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:border-[#D00236] focus:bg-white outline-none transition-all text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredResources.map((res) => (
          <div key={res.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 rounded-xl bg-gray-50 group-hover:bg-[#D00236]/5">
                {res.type === 'video' ? <Youtube className="text-red-500" /> : res.type === 'article' ? <BookOpen className="text-blue-500" /> : <ExternalLink className="text-emerald-500" />}
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); handleLike(res.id); }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 hover:bg-[#D00236]/10 text-gray-500 hover:text-[#D00236] transition-all border border-transparent hover:border-[#D00236]/20"
              >
                <ThumbsUp size={14} />
                <span className="text-xs font-bold">{res.likes}</span>
              </button>
            </div>
            <h3 className="text-lg font-bold text-gray-800 leading-tight mb-2 group-hover:text-[#D00236] transition-colors cursor-pointer" onClick={() => openLink(res.url)}>{res.title}</h3>
            <p className="text-xs text-gray-400 font-medium mb-4">Shared by <span className="text-gray-600 font-bold">{res.author}</span></p>
            <div className="mt-auto pt-4 flex flex-wrap gap-2">
              {res.tags.map(tag => <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-50 px-2 py-1 rounded-md">#{tag}</span>)}
            </div>
            <button 
              onClick={() => openLink(res.url)}
              className="mt-4 flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-gray-100 text-xs font-bold text-gray-500 hover:bg-[#D00236] hover:text-white transition-all"
            >
              View Source <ExternalLink size={12} />
            </button>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Share Tool</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600"><X /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Title</label>
                <input value={newRes.title} onChange={e => setNewRes({...newRes, title: e.target.value})} type="text" className="w-full bg-gray-50 rounded-xl px-4 py-3 border-none outline-none focus:ring-2 ring-[#D00236]/20" placeholder="e.g. Master C Memory" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Type</label>
                <select value={newRes.type} onChange={e => setNewRes({...newRes, type: e.target.value as any})} className="w-full bg-gray-50 rounded-xl px-4 py-3 border-none outline-none">
                  <option value="video">YouTube Video</option>
                  <option value="article">Article/Blog</option>
                  <option value="documentation">Official Docs</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">URL</label>
                <input value={newRes.url} onChange={e => setNewRes({...newRes, url: e.target.value})} type="text" className="w-full bg-gray-50 rounded-xl px-4 py-3 border-none outline-none focus:ring-2 ring-[#D00236]/20" placeholder="https://..." />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Tags (comma separated)</label>
                <input value={newRes.tags} onChange={e => setNewRes({...newRes, tags: e.target.value})} type="text" className="w-full bg-gray-50 rounded-xl px-4 py-3 border-none outline-none focus:ring-2 ring-[#D00236]/20" placeholder="C, Memory, Linux" />
              </div>
              <button onClick={handleAddResource} className="w-full bg-[#D00236] text-white py-4 rounded-xl font-bold hover:bg-[#b0022e] transition-all">Submit Resource</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolLibrary;
