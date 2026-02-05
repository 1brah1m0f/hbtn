
import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const data = [
  { subject: 'JavaScript', A: 40, fullMark: 100 },
  { subject: 'Main Block', A: 30, fullMark: 100 },
  { subject: 'Python', A: 20, fullMark: 100 },
  { subject: 'SQL', A: 60, fullMark: 100 },
  { subject: 'Frontend', A: 50, fullMark: 100 },
];

const LevelChart: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col">
      <div className="p-5 border-b border-gray-50">
        <span className="font-bold text-gray-700 uppercase tracking-wide text-sm">Your level</span>
      </div>

      <div className="flex-1 min-h-[300px] p-4 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="#e2e8f0" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
            />
            <PolarRadiusAxis 
              angle={30} 
              domain={[0, 100]} 
              tick={false} 
              axisLine={false}
            />
            <Radar
              name="Student"
              dataKey="A"
              stroke="#D00236"
              fill="#D00236"
              fillOpacity={0.7}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LevelChart;
