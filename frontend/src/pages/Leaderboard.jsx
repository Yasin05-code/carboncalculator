import { Trophy, Medal, Star, ArrowLeft, Crown } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';


const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const userRaw = localStorage.getItem('user');
  const navigate = useNavigate();
  const currentUser = userRaw ? JSON.parse(userRaw) : { username: "Misafir", points: 0 };
useEffect(() => {
  const fetchLeaders = async () => {
    try {
      const res = await API.get('/user/leaderboard');
      console.log("Gelen Veri:", res.data);
      setLeaders(res.data);
    } catch (err) {
      console.error("Backend Bağlantı Hatası:", err);
      setLeaders([]);
    }
  };
  fetchLeaders();
}, []);
    


  return (
    <div className="min-h-screen bg-white p-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-gray-100 rounded-full transition-all">
          <ArrowLeft size={24} className="text-gray-400" />
        </button>
        <h1 className="text-2xl font-black text-gray-700 uppercase tracking-tighter">LİDERLİK TABLOSU</h1>
        <div className="w-10"></div> 
      </div>

<div className="flex justify-center items-end gap-4 mb-12 mt-10 h-48">
  {leaders.length > 1 ? (
    <PodiumRank user={leaders[1]} rank={2} height="h-32" color="bg-gray-100" />
  ) : <div className="w-24 h-32 bg-gray-50 rounded-t-2xl border-2 border-dashed border-gray-100" />}

  {leaders.length > 0 ? (
    <PodiumRank user={leaders[0]} rank={1} height="h-40" color="bg-yellow-100" isWinner />
  ) : <div className="w-24 h-40 bg-gray-50 rounded-t-2xl border-2 border-dashed border-gray-100" />}

  {leaders.length > 2 ? (
    <PodiumRank user={leaders[2]} rank={3} height="h-28" color="bg-orange-50" />
  ) : <div className="w-24 h-28 bg-gray-50 rounded-t-2xl border-2 border-dashed border-gray-100" />}
</div>

      <div className="space-y-3">
        {leaders.map((leader, index) => (
          <div 
            key={index} 
            className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
              leader.username === currentUser.username 
              ? 'border-duo-blue bg-blue-50 shadow-sm' 
              : 'border-gray-100 hover:border-gray-200'
            }`}
          >
            <div className="flex items-center gap-4">
              <span className={`w-8 font-black text-lg ${index < 3 ? 'text-duo-green' : 'text-gray-300'}`}>
                {index + 1}
              </span>
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-black text-gray-500 text-sm uppercase">
                {leader.username[0]}
              </div>
              <div>
                <p className="font-black text-gray-700 uppercase text-sm">
                  {leader.username} {leader.username === currentUser.username && "(SEN)"}
                </p>
                <p className="text-[10px] font-black text-gray-400 uppercase">Seviye {leader.level}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 font-black text-duo-blue">
              <Star size={16} fill="currentColor" /> {leader.points} XP
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PodiumRank = ({ user, rank, height, color, isWinner }) => (
  <div className="flex flex-col items-center gap-2 w-24">
    {isWinner && <Crown className="text-yellow-500 animate-bounce" fill="currentColor" size={24} />}
    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center font-black text-gray-600 border-2 border-white shadow-sm">
      {user.username[0]}
    </div>
    <div className={`${color} ${height} w-full rounded-t-2xl flex flex-col items-center justify-start pt-4 shadow-sm`}>
      <span className="font-black text-gray-700 text-xl">{rank}</span>
      <p className="text-[10px] font-black text-gray-500 uppercase truncate px-2 w-full text-center">
        {user.username}
      </p>
    </div>
  </div>
);

export default Leaderboard;