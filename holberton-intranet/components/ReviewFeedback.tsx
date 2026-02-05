
import React, { useState, useEffect } from 'react';
import { ApiService } from '../services/api';

interface Review {
  id: number;
  project: string;
  reviewer: string;
  date: string;
  avatar: string;
}

const ReviewFeedback: React.FC = () => {
  const [pendingReviews, setPendingReviews] = useState<Review[]>([
    { id: 1, project: 'Shell v1', reviewer: 'Aysel M.', date: 'Today', avatar: 'https://picsum.photos/40/40?random=1' },
    { id: 2, project: 'C - Hello World', reviewer: 'Murad T.', date: 'Yesterday', avatar: 'https://picsum.photos/40/40?random=2' },
    { id: 3, project: 'Python - Web Scraper', reviewer: 'Lala Q.', date: '2 days ago', avatar: 'https://picsum.photos/40/40?random=3' }
  ]);

  const [reputation, setReputation] = useState({ avg: 4.88, count: 48 });
  const [currentRatingId, setCurrentRatingId] = useState<number | null>(null);

  useEffect(() => {
    const load = async () => {
      const rep = await ApiService.getReputation();
      setReputation(rep);
    };
    load();
  }, []);

  const handleRate = async (reviewId: number, score: number) => {
    setCurrentRatingId(reviewId);
    
    const newRep = await ApiService.submitReviewRating(score);
    setReputation(newRep);

    setTimeout(() => {
      setPendingReviews(prev => prev.filter(r => r.id !== reviewId));
      setCurrentRatingId(null);
    }, 1200);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden min-h-[500px] flex flex-col">
      <div className="p-8 bg-gradient-to-r from-[#D00236] to-[#E53E3E] text-white flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Quality Assessments</h2>
          <p className="text-white/80 text-sm mt-1">Review the quality of peer feedback you've received.</p>
        </div>
        <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/30 text-right">
          <div className="text-[10px] uppercase font-bold text-white/70">Global Reputation</div>
          <div className="text-2xl font-black">{reputation.avg} <span className="text-sm font-normal text-white/60">/ 5.0</span></div>
        </div>
      </div>

      <div className="flex-1 p-8">
        {pendingReviews.length > 0 ? (
          <div className="grid gap-6">
            {pendingReviews.map((review) => (
              <div 
                key={review.id} 
                className={`p-6 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col md:flex-row gap-6 items-center relative transition-all duration-300 ${currentRatingId === review.id ? 'opacity-50 scale-95 blur-sm' : 'hover:shadow-md'}`}
              >
                {currentRatingId === review.id && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="bg-green-500 text-white px-6 py-2 rounded-full font-bold shadow-lg animate-bounce">Recorded!</div>
                  </div>
                )}
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
                    <img src={review.avatar} alt={review.reviewer} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-[#D00236] uppercase tracking-wider mb-1">Received {review.date}</div>
                    <h4 className="text-lg font-bold text-gray-800">{review.project}</h4>
                    <p className="text-sm text-gray-500 font-medium">By <span className="text-gray-700 font-bold">{review.reviewer}</span></p>
                  </div>
                </div>
                
                <div className="flex gap-2 w-full md:w-auto">
                  <button onClick={() => handleRate(review.id, 2)} className="flex-1 md:flex-none px-5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-500 hover:bg-gray-100 transition-colors">Superficial</button>
                  <button onClick={() => handleRate(review.id, 4)} className="flex-1 md:flex-none px-5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-500 hover:bg-gray-100 transition-colors">Helpful</button>
                  <button onClick={() => handleRate(review.id, 5)} className="flex-1 md:flex-none px-5 py-2.5 rounded-xl bg-[#D00236] text-xs font-bold text-white hover:bg-[#b0022e] shadow-lg shadow-[#D00236]/20 transition-all active:scale-95">Insightful</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center py-20 animate-in fade-in duration-700">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-gray-800">No pending assessments</h3>
            <p className="text-gray-500 max-w-xs mx-auto">You've rated all your reviewers. Great job helping the community maintain high standards!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewFeedback;
