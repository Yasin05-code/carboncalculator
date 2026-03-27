import { 
  Trophy, Flame, Star, Leaf, LayoutDashboard, 
  TrendingDown, Calendar, ChevronRight, Zap
} from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import { DuoButton } from '../components/DuoButton';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, 
  PointElement, LineElement, Title, Tooltip, Legend, Filler 
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || { username: "Gezgin", points: 0, level: 1 });
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await API.get(`/user/emissions-history/${user.id}`);
        setHistory(res.data.reverse()); 
      } catch (err) {
        setHistory([
          { total_co2: 120, test_date: '10 Mart' },
          { total_co2: 95, test_date: '17 Mart' },
          { total_co2: 80, test_date: '24 Mart' }
        ]);
      }
    };
    fetchHistory();
  }, [user.id]);

  const chartData = {
    labels: history.map(h => h.test_date.split('T')[0]),
    datasets: [{
      label: 'CO2 Salınımı (KG)',
      data: history.map(h => h.total_co2),
      borderColor: '#58cc02',
      backgroundColor: 'rgba(88, 204, 2, 0.1)',
      borderWidth: 4,
      pointBackgroundColor: '#fff',
      pointBorderColor: '#58cc02',
      pointRadius: 6,
      tension: 0.4,
      fill: true,
    }]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { display: false },
      x: { grid: { display: false }, ticks: { font: { weight: 'bold' } } }
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      <div className="w-full md:w-64 border-r-2 border-gray-100 p-6 flex flex-col justify-between h-screen sticky top-0">
        <div>
          <div className="flex items-center gap-2 mb-10">
            <Leaf className="text-duo-green" fill="currentColor" />
            <h1 className="text-2xl font-black text-duo-green tracking-tighter uppercase">GreenQuest</h1>
          </div>
          <nav className="space-y-2">
  <div 
    onClick={() => navigate('/dashboard')}
    className="flex items-center gap-4 text-duo-blue font-black p-4 bg-blue-50 rounded-2xl border-2 border-duo-blue cursor-pointer"
  >
    <LayoutDashboard size={22} /> PANEL
  </div>

  <div 
    onClick={() => navigate('/leaderboard')}
    className="flex items-center gap-4 text-gray-400 font-black p-4 hover:bg-gray-50 rounded-2xl cursor-pointer transition-all"
  >
    <Trophy size={22} /> LİDERLER
  </div>
</nav>
        </div>
        <button onClick={() => { localStorage.clear(); navigate('/'); }} className="text-gray-300 font-bold text-sm hover:text-red-400 p-4 transition-colors">ÇIKIŞ YAP</button>
      </div>

      <div className="flex-1 p-6 md:p-12 max-w-5xl mx-auto w-full space-y-8">
        
        <div className="bg-duo-green rounded-[2.5rem] p-10 text-white flex flex-col md:flex-row items-center justify-between shadow-xl shadow-green-100 relative overflow-hidden">
          <div className="z-10">
            <h2 className="text-4xl font-black mb-2">Selam, {user.username}!</h2>
            <p className="text-green-100 font-bold text-lg">Haftalık hedefine ulaşmana çok az kaldı. ✨</p>
            <div className="mt-8 w-48">
              <button 
                onClick={() => navigate('/calculator')}
                className="bg-white text-duo-green w-full py-4 rounded-2xl font-black shadow-lg hover:scale-105 active:scale-95 transition-all uppercase tracking-widest text-sm"
              >
                TESTİ BAŞLAT
              </button>
            </div>
          </div>
          <div className="hidden md:block text-[12rem] opacity-20 absolute -right-4 -bottom-10 rotate-12">🌱</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2 border-2 border-b-8 border-gray-100 rounded-[2.5rem] p-8 bg-white">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-xl font-black text-gray-700">HAFTALIK TREND</h3>
                <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Karbon Ayak İzi Değişimi</p>
              </div>
              <div className="flex items-center gap-2 text-duo-green bg-green-50 px-4 py-2 rounded-full font-black text-sm">
                <TrendingDown size={18} /> %15 DÜŞÜŞ
              </div>
            </div>
            <div className="h-64">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>

          <div className="space-y-6">
            <div className="border-2 border-b-8 border-orange-100 rounded-4xl p-6 bg-white flex items-center gap-6">
              <div className="bg-orange-50 p-4 rounded-2xl text-duo-orange"><Flame fill="currentColor" size={32}/></div>
              <div>
                <p className="text-xs font-black text-gray-400 uppercase">SERİ (STREAK)</p>
                <p className="text-2xl font-black text-gray-700">5 GÜN</p>
              </div>
            </div>

            <div className="border-2 border-b-8 border-blue-100 rounded-4xl p-6 bg-white flex items-center gap-6">
              <div className="bg-blue-50 p-4 rounded-2xl text-duo-blue"><Star fill="currentColor" size={32}/></div>
              <div>
                <p className="text-xs font-black text-gray-400 uppercase">TOPLAM PUAN</p>
                <p className="text-2xl font-black text-gray-700">{user.points} XP</p>
              </div>
            </div>

            <div className="border-2 border-b-8 border-green-100 rounded-4xl p-6 bg-white flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Seviye İlerlemesi</p>
                <span className="text-duo-green font-black">LVL {user.level}</span>
              </div>
              <div className="w-full bg-gray-100 h-4 rounded-full overflow-hidden">
                <div className="bg-duo-green h-full w-[65%] transition-all"></div>
              </div>
            </div>
          </div>

        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-black text-gray-700 uppercase tracking-tight ml-2">Bugünkü Önerilerin</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <QuestItem title="Etsiz bir akşam yemeği planla" xp="30" icon={<Leaf size={20}/>} />
            <QuestItem title="Kısa mesafeleri yürüyerek git" xp="50" icon={<TrendingDown size={20}/>} />
          </div>
        </div>
      </div>
    </div>
  );
};

const QuestItem = ({ title, xp, icon }) => (
  <div className="border-2 border-b-4 border-gray-100 rounded-2xl p-5 flex items-center justify-between hover:bg-gray-50 cursor-pointer transition-all active:border-b-0 active:translate-y-1">
    <div className="flex items-center gap-4">
      <div className="bg-gray-100 p-3 rounded-xl text-gray-500">{icon}</div>
      <span className="font-black text-gray-600 text-sm uppercase">{title}</span>
    </div>
    <div className="flex items-center gap-1 font-black text-duo-orange">
      +{xp} XP <ChevronRight size={18} />
    </div>
  </div>
);

export default Dashboard;