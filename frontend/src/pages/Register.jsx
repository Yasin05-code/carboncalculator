import React, { useState } from 'react';
import API from '../api';
import { DuoButton } from '../components/DuoButton';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Mail, Lock, Smile } from 'lucide-react';

const Register = () => {
    const [form, setForm] = useState({ 
        username: '', 
        email: '', 
        password: '', 
        age: '' 
    });
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await API.post('/auth/register', form);
            alert("Harika! Hesabın oluşturuldu. Şimdi giriş yapabilirsin. 🌿");
            navigate('/');
        } catch (err) {
            console.error("Kayıt hatası:", err);
            const errorMsg = err.response?.data?.error || "Kayıt sırasında bir ağ hatası oluştu.";
            alert(errorMsg);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-md">
                {}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-black text-duo-green tracking-tighter uppercase mb-2">
                        Profilini Oluştur
                    </h1>
                    <p className="text-gray-400 font-bold text-sm tracking-wide">
                        YEŞİL BİR DÜNYA İÇİN YOLCULUĞA BAŞLA
                    </p>
                </div>

                 <form onSubmit={handleRegister} className="space-y-4">
                   
                    <div className="relative">
                        <UserPlus className="absolute left-4 top-4 text-gray-300" size={20} />
                        <input 
                            className="w-full border-2 border-gray-200 p-4 pl-12 rounded-2xl focus:border-duo-green outline-none transition-all font-bold text-gray-600 placeholder:text-gray-300" 
                            placeholder="KULLANICI ADI" 
                            autoComplete="off"
                            onChange={e => setForm({...form, username: e.target.value})}
                            required
                        />
                    </div>

                    <div className="relative">
                        <Mail className="absolute left-4 top-4 text-gray-300" size={20} />
                        <input 
                            className="w-full border-2 border-gray-200 p-4 pl-12 rounded-2xl focus:border-duo-green outline-none transition-all font-bold text-gray-600 placeholder:text-gray-300" 
                            type="email"
                            placeholder="E-POSTA ADRESİ" 
                            onChange={e => setForm({...form, email: e.target.value})}
                            required
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-4 top-4 text-gray-300" size={20} />
                        <input 
                            className="w-full border-2 border-gray-200 p-4 pl-12 rounded-2xl focus:border-duo-green outline-none transition-all font-bold text-gray-600 placeholder:text-gray-300" 
                            type="password" 
                            placeholder="ŞİFRE" 
                            onChange={e => setForm({...form, password: e.target.value})}
                            required
                        />
                    </div>

                    <div className="relative">
                        <Smile className="absolute left-4 top-4 text-gray-300" size={20} />
                        <input 
                            className="w-full border-2 border-gray-200 p-4 pl-12 rounded-2xl focus:border-duo-green outline-none transition-all font-bold text-gray-600 placeholder:text-gray-300" 
                            type="number" 
                            placeholder="YAŞINIZ" 
                            onChange={e => setForm({...form, age: e.target.value})}
                            required
                        />
                    </div>

                    <div className="pt-6">
                        <DuoButton color="bg-duo-green">HESABIMI OLUŞTUR</DuoButton>
                    </div>
                </form>

                <div className="mt-8 text-center border-t-2 border-gray-100 pt-6">
                    <p className="text-gray-400 font-bold mb-2 text-xs uppercase tracking-widest">
                        Zaten bir hesabın var mı?
                    </p>
                    <Link to="/" className="text-duo-blue font-black hover:underline transition-all">
                        GİRİŞ YAP VE DEVAM ET
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;