import React, { useState } from 'react';
import API from '../api';
import { DuoButton } from '../components/DuoButton';
import { useNavigate, Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';

const Login = () => {
    const [form, setForm] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post('/auth/login', form);
            
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('token', data.token);
            
            navigate('/dashboard'); 
        } catch (err) {
            alert("Giriş başarısız! Lütfen bilgilerini kontrol et.");
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
            <div className="mb-8 flex flex-col items-center">
                <div className="bg-duo-green p-4 rounded-3xl shadow-lg mb-4">
                    <Leaf size={60} color="white" />
                </div>
                <h1 className="text-4xl font-black text-duo-green tracking-tighter uppercase">
                    GreenQuest
                </h1>
                <p className="text-gray-400 font-bold mt-2">DÜNYAYI KURTARMAYA HAZIR MISIN?</p>
            </div>

            <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
                <input 
                    className="w-full border-2 border-gray-200 p-4 rounded-2xl focus:border-duo-blue outline-none transition-all font-bold text-gray-600 placeholder:text-gray-300" 
                    placeholder="KULLANICI ADI" 
                    onChange={e => setForm({...form, username: e.target.value})}
                    required
                />
                <input 
                    className="w-full border-2 border-gray-200 p-4 rounded-2xl focus:border-duo-blue outline-none transition-all font-bold text-gray-600 placeholder:text-gray-300" 
                    type="password" 
                    placeholder="ŞİFRE" 
                    onChange={e => setForm({...form, password: e.target.value})}
                    required
                />
                
                <div className="pt-4">
                    <DuoButton color="bg-[#1cb0f6]">GİRİŞ YAP</DuoButton>
                </div>
            </form>

            <div className="mt-8">
                <p className="text-gray-400 font-bold mb-2 uppercase text-xs tracking-widest">Hesabın yok mu?</p>
                <Link to="/register" className="text-duo-green font-black hover:text-[#46a302] transition-colors">
                    Hemen Kayıt Ol ve Puan Kazan!
                </Link>
            </div>
        </div>
    );
};

export default Login;