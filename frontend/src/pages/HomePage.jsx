import React from 'react';
import { Link } from 'react-router-dom';
import { DuoButton } from '../components/DuoButton';
import { Globe, Leaf, Zap, Trophy, Heart } from 'lucide-react';

const HomePage = () => {
    return (
        <div className="min-h-screen bg-white font-sans text-gray-700">
            {/* Navbar */}
            <nav className="border-b-2 border-gray-100 p-5 sticky top-0 bg-white z-50">
                <div className="max-w-5xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Leaf className="text-duo-green" fill="currentColor" size={28} />
                        <h1 className="text-2xl font-black text-duo-green tracking-tighter uppercase">
                            GreenQuest
                        </h1>
                    </div>
                    <div className="flex gap-8 items-center">
                        <Link to="/login" className="hidden md:block text-gray-400 font-black hover:text-duo-green transition-all uppercase text-sm tracking-widest">
                            GİRİŞ YAP
                        </Link>
                        <Link to="/register">
                            <button className="bg-duo-blue border-b-4 border-blue-600 text-white px-6 py-2 rounded-xl font-black text-sm hover:brightness-110 active:border-b-0 active:translate-y-1 transition-all uppercase">
                                KAYIT OL
                            </button>
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="max-w-5xl mx-auto px-6 py-16 md:py-24 flex flex-col md:flex-row items-center gap-16">
                <div className="flex-1 text-center md:text-left">
                    <h2 className="text-4xl md:text-6xl font-black text-gray-800 leading-[1.1] mb-8">
                        Dünyayı kurtarmak hiç bu kadar <span className="text-duo-green italic">eğlenceli</span> olmamıştı.
                    </h2>
                    <p className="text-gray-400 text-xl font-bold mb-10 leading-relaxed max-w-lg">
                        Karbon ayak izini takip et, günlük görevleri tamamla ve liglerde yükselerek doğa kahramanı ol!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto md:mx-0">
                        <Link to="/register" className="flex-1">
                            <DuoButton color="bg-duo-green">HEMEN BAŞLA</DuoButton>
                        </Link>
                    </div>
                </div>

                <div className="flex-1 flex justify-center relative">
                    <div className="w-64 h-64 md:w-80 md:h-80 bg-green-50 rounded-full flex items-center justify-center animate-bounce-slow">
                        <Globe size={180} className="text-duo-green opacity-80" strokeWidth={1.5} />
                    </div>
                    <div className="absolute top-0 right-10 bg-white p-4 shadow-xl rounded-2xl animate-pulse">
                        <Zap className="text-duo-orange" fill="currentColor" />
                    </div>
                    <div className="absolute bottom-10 left-5 bg-white p-4 shadow-xl rounded-2xl animate-bounce">
                        <Heart className="text-red-400" fill="currentColor" />
                    </div>
                </div>
            </main>

            <section className="bg-gray-50 border-y-2 border-gray-100 py-12">
                <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
                    <Feature icon={<Zap className="text-duo-orange" />} title="ANLIK TAKİP" desc="Her adımının doğaya etkisini saniyeler içinde gör." />
                    <Feature icon={<Trophy className="text-duo-blue" />} title="YARIŞMA" desc="Arkadaşlarınla yarış, liglerde zirveye oyna." />
                    <Feature icon={<Leaf className="text-duo-green" />} title="ÜCRETSİZ" desc="Herkes için, her zaman tamamen ücretsiz." />
                </div>
            </section>
        </div>
    );
};

const Feature = ({ icon, title, desc }) => (
    <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3">
        <div className="p-4 bg-white rounded-2xl shadow-sm border-2 border-b-4 border-gray-200">{icon}</div>
        <h3 className="font-black text-gray-700 uppercase tracking-tight">{title}</h3>
        <p className="text-gray-400 font-bold text-sm leading-snug">{desc}</p>
    </div>
);

export default HomePage;