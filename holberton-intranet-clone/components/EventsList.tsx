
import React, { useState } from 'react';
import { Clock, MapPin, MessageSquare, Copy, Check } from 'lucide-react';

interface TeamMember {
  name: string;
  discord: string;
  avatar: string;
}

interface EventItem {
  id: number;
  date: string;
  month: string;
  title: string;
  time: string;
  location: string;
  type: 'event' | 'pld' | 'team';
  team?: TeamMember[];
}

const events: EventItem[] = [
  {
    id: 1,
    date: '05',
    month: 'Feb',
    title: 'PLD - JavaScript DOM Manipulation',
    time: '09:00 AM',
    location: 'Zone 1 - Tables 4-6',
    type: 'pld',
    team: [
      { name: 'Aysel M.', discord: 'aysel_m#1234', avatar: 'https://picsum.photos/32/32?random=11' },
      { name: 'Murad T.', discord: 'murad_dev#8899', avatar: 'https://picsum.photos/32/32?random=12' },
      { name: 'You', discord: 'me#0001', avatar: 'https://picsum.photos/32/32?random=13' }
    ]
  },
  {
    id: 2,
    date: '05',
    month: 'Feb',
    title: 'Hack Learning Day 2 - Morning',
    time: '10:30 AM',
    location: 'Holberton Campus',
    type: 'event'
  },
  {
    id: 3,
    date: '06',
    month: 'Feb',
    title: 'Team Project: HBnB Evolution',
    time: '11:00 AM',
    location: 'Discord - Voice Channel 3',
    type: 'team',
    team: [
      { name: 'Lala Q.', discord: 'lala_q#4455', avatar: 'https://picsum.photos/32/32?random=14' },
      { name: 'Kamran S.', discord: 'ks_tech#5566', avatar: 'https://picsum.photos/32/32?random=15' }
    ]
  },
  {
    id: 4,
    date: '07',
    month: 'Feb',
    title: 'Tech Talk: Life at Google London',
    time: '7:00 PM',
    location: 'AIM Hall',
    type: 'event'
  }
];

const EventsList: React.FC = () => {
  const [copiedHandle, setCopiedHandle] = useState<string | null>(null);

  const copyToClipboard = (handle: string) => {
    navigator.clipboard.writeText(handle);
    setCopiedHandle(handle);
    setTimeout(() => setCopiedHandle(null), 2000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col">
      <div className="p-5 border-b border-gray-50 flex justify-between items-center">
        <span className="font-bold text-gray-700 uppercase tracking-wide text-sm">Upcoming events</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 max-h-[380px]">
        <div className="flex flex-col gap-5">
          {events.map((event) => (
            <div key={event.id} className="flex flex-col gap-3 group">
              <div className="flex gap-4">
                <div className="flex flex-col items-center bg-gray-50 rounded-lg p-2 min-w-[50px] group-hover:bg-[#D00236]/5 transition-colors">
                  <span className="text-[10px] uppercase font-bold text-[#D00236]">{event.month}</span>
                  <span className="text-lg font-bold text-gray-800">{event.date}</span>
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-1">
                     {event.type === 'pld' && <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[9px] font-black rounded uppercase">PLD</span>}
                     {event.type === 'team' && <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-[9px] font-black rounded uppercase">Team</span>}
                     <h3 className="text-sm font-semibold text-gray-800 leading-snug group-hover:text-[#D00236] transition-colors">
                        {event.title}
                     </h3>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-gray-500 font-medium">
                    <div className="flex items-center gap-1">
                      <Clock size={12} className="text-gray-400" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={12} className="text-gray-400" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Team Members Section */}
              {event.team && (
                <div className="ml-16 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="text-[10px] font-bold text-gray-400 uppercase mb-2">Team Members</div>
                  <div className="flex flex-col gap-2">
                    {event.team.map((member, idx) => (
                      <div key={idx} className="flex items-center justify-between group/member">
                        <div className="flex items-center gap-2">
                          <img src={member.avatar} alt={member.name} className="w-5 h-5 rounded-full ring-1 ring-white" />
                          <span className="text-[11px] font-bold text-gray-700">{member.name}</span>
                        </div>
                        <button 
                          onClick={() => copyToClipboard(member.discord)}
                          className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md border transition-all cursor-pointer ${
                            copiedHandle === member.discord 
                              ? 'bg-green-500 border-green-500 text-white' 
                              : 'bg-white border-gray-200 hover:border-[#5865F2] hover:bg-[#5865F2]/5 text-[#5865F2]'
                          }`}
                          title="Click to copy Discord handle"
                        >
                          {copiedHandle === member.discord ? <Check size={10} /> : <MessageSquare size={10} />}
                          <span className="text-[10px] font-medium">{copiedHandle === member.discord ? 'Copied!' : member.discord}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsList;
