import { 
  Car, Bike, Train, Beef, Salad, Lightbulb, Trash2, 
  CheckCircle2, X, AlertTriangle, Leaf, Award, 
  ShoppingBag, Droplets, Plane, Home, Zap, Mail
} from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import { DuoButton } from '../components/DuoButton';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Chart.js Kaydı
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);



const questions = [
  {
    id: 1,
    category: "ULAŞIM",
    question: "Günlük ulaşım tercihin genellikle hangisidir?",
    options: [
      { text: "Tek Başına Özel Araç (Fosil)", co2: 30, xp: 5, advice: "Yıllık 1 ton CO2 tasarrufu için aracını paylaşmayı dene.", icon: <Car /> },
      { text: "Motosiklet / Scooter (Benzinli)", co2: 15, xp: 30, advice: "Daha az yer kaplıyorsun ama emisyon hala yüksek.", icon: <Car size={18} className="opacity-60"/> },
      { text: "Toplu Taşıma (Otobüs/Metro)", co2: 6, xp: 60, advice: "Harika! Tek başına sürüşe göre %80 daha çevrecisin.", icon: <Train /> },
      { text: "Elektrikli Araç / Bisiklet / Yürüyüş", co2: 0, xp: 100, advice: "Mükemmel! Sıfır emisyon ile doğanın koruyucususun.", icon: <Bike /> }
    ]
  },
  {
    id: 2,
    category: "BESLENME",
    question: "Haftalık beslenme düzeninde protein kaynağın nedir?",
    options: [
      { text: "Ağırlıklı Kırmızı Et (Dana/Kuzu)", co2: 25, xp: 5, advice: "Kırmızı et üretimi en yüksek metan gazı kaynağıdır.", icon: <Beef /> },
      { text: "Beyaz Et (Tavuk/Balık)", co2: 12, xp: 40, advice: "Kırmızı ete göre karbon ayak izin %50 daha düşük.", icon: <Beef size={18} className="text-orange-400" /> },
      { text: "Vejetaryen (Yumurta/Süt)", co2: 6, xp: 70, advice: "Hayvansal gıdayı azaltarak su tüketimini ciddi oranda kestin.", icon: <Salad /> },
      { text: "Tamamen Bitki Temelli (Vegan)", co2: 2, xp: 100, advice: "Dünyaya en az yük bindiren diyet modelindesin!", icon: <Leaf /> }
    ]
  },
  {
    id: 3,
    category: "ENERJİ",
    question: "Evinizdeki aydınlatma ve ısı yönetimi nasıl?",
    options: [
      { text: "Klasik Ampuller ve Manuel Isı", co2: 18, xp: 5, advice: "LED'e geçerek enerji kaybını anında %90 azaltabilirsin.", icon: <Lightbulb /> },
      { text: "Sadece Tasarruflu LED'ler", co2: 8, xp: 50, advice: "Güzel! Akıllı termostat ile verimi daha da artırabilirsin.", icon: <Home /> },
      { text: "Akıllı Ev / Güneş Paneli", co2: 1, xp: 100, advice: "Kendi enerjini üretmek karbon bağımsızlığı demektir!", icon: <Zap /> },
      { text: "Isı Yalıtımlı / Verimli Cihazlar", co2: 5, xp: 80, advice: "Yalıtım, kışın ısı kaybını önleyerek büyük tasarruf sağlar.", icon: <Home className="text-duo-green" /> }
    ]
  },
  {
    id: 4,
    category: "SEYAHAT",
    question: "Uçakla seyahat sıklığınız nedir?",
    options: [
      { text: "Çok Sık (Ayda 1+ Uçuş)", co2: 50, xp: 0, advice: "Sık uçuşlar bireysel emisyonu devasa seviyelere taşır.", icon: <Plane /> },
      { text: "Yılda 2-3 Kez (Tatil Amaçlı)", co2: 25, xp: 20, advice: "Uçuşlarında karbon dengeleme projelerine destek olabilirsin.", icon: <Plane size={18} className="opacity-50" /> },
      { text: "Yılda 1 Kez veya Hiç", co2: 5, xp: 80, advice: "Yerel seyahatleri tercih ederek büyük fark yarattın.", icon: <Award /> },
      { text: "Sadece Tren / Otobüs Kullanırım", co2: 2, xp: 100, advice: "Kıtalar arası seyahatte en çevreci yol budur.", icon: <Train /> }
    ]
  },
  {
    id: 5,
    category: "MODA & TEKSTİL",
    question: "Kıyafet alışverişi yaparken tercihin hangisidir?",
    options: [
      { text: "Hızlı Moda (Popüler Markalar)", co2: 20, xp: 5, advice: "Tekstil sektörü dünyadaki atık suyun %20'sinden sorumlu.", icon: <ShoppingBag /> },
      { text: "Sadece İhtiyaç Anında Alırım", co2: 8, xp: 60, advice: "Az tüketim, en temiz tüketimdir.", icon: <ShoppingBag size={18} className="opacity-50" /> },
      { text: "Sürdürülebilir / Organik Markalar", co2: 4, xp: 90, advice: "Kimyasal boya içermeyen ürünler toprağı korur.", icon: <Droplets /> },
      { text: "İkinci El / Vintage Ürünler", co2: 1, xp: 100, advice: "Döngüsel ekonomiye katılarak atık oluşumunu engelledin.", icon: <Award className="text-duo-orange" /> }
    ]
  },
  {
    id: 6,
    category: "SU TÜKETİMİ",
    question: "Günlük su kullanım alışkanlığın nasıl?",
    options: [
      { text: "Uzun Duşlar (15+ dk) ve Musluk Açık", co2: 12, xp: 0, advice: "Duş süreni 5 dk'ya indirmek yıllık 20 bin litre tasarruf sağlar.", icon: <Droplets /> },
      { text: "Standart Duş ve Dikkatli Kullanım", co2: 6, xp: 50, advice: "Su tasarruflu başlık kullanarak verimi artırabilirsin.", icon: <Droplets size={18} className="opacity-50" /> },
      { text: "Bulaşık/Çamaşır Sadece Tam Doluyken", co2: 3, xp: 80, advice: "Makineyi tam doldurmak su ve elektrikten tasarruf sağlar.", icon: <CheckCircle2 /> },
      { text: "Geri Dönüştürülmiş / Yağmur Suyu", co2: 0, xp: 100, advice: "Su kaynağını korumak geleceği kurtarmaktır.", icon: <Droplets className="text-duo-blue" /> }
    ]
  },
  {
    id: 7,
    category: "ATIK YÖNETİMİ",
    question: "Çöplerini nasıl yönetiyorsun?",
    options: [
      { text: "Hepsini Tek Çöpe Atarım", co2: 15, xp: 0, advice: "Ayrıştırılmayan atıklar metan gazı salınımına yol açar.", icon: <Trash2 /> },
      { text: "Sadece Plastik ve Kağıdı Ayırırım", co2: 7, xp: 50, advice: "Güzel başlangıç! Cam ve metali de eklemelisin.", icon: <Trash2 size={18} className="opacity-60" /> },
      { text: "Sıfır Atık / Kompost Yapıyorum", co2: 0, xp: 100, advice: "Organik atıkları toprağa geri kazandırmak harika!", icon: <Leaf className="text-duo-green" /> },
      { text: "Geri Dönüşüm Merkezine Götürürüm", co2: 3, xp: 80, advice: "Zahmetli ama doğa için çok kıymetli bir adım.", icon: <Award /> }
    ]
  },
  {
    id: 8,
    category: "DİJİTAL AYAK İZİ",
    question: "Dijital veri kullanım alışkanlığın nasıl?",
    options: [
      { text: "Sürekli Video İzleme (Yüksek Kalite)", co2: 10, xp: 10, advice: "Veri merkezleri devasa enerji tüketir, kaliteyi düşürmeyi dene.", icon: <Zap /> },
      { text: "Gereksiz E-postaları Silmem", co2: 5, xp: 40, advice: "Dijital temizlik, sunucu yükünü ve karbonunu azaltır.", icon: <Mail /> },
      { text: "Cihazlarımı 4-5 Yıl Kullanırım", co2: 2, xp: 90, advice: "E-atık oluşumunu önlemek için en iyi yol uzun kullanımdır.", icon: <Zap className="text-duo-green" /> },
      { text: "Yenilenmiş (Refurbished) Cihaz Alırım", co2: 1, xp: 100, advice: "Yeni üretim emisyonunu tamamen engelledin.", icon: <Award /> }
    ]
  }
];

const Calculator = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [comparison, setComparison] = useState(null);
  const navigate = useNavigate();

  const handleSelect = (option) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      finishCalculator(newAnswers);
    }
  };

   const finishCalculator = async (finalAnswers) => {
    const totalXP = finalAnswers.reduce((sum, item) => sum + item.xp, 0);
    const totalCO2 = finalAnswers.reduce((sum, item) => sum + item.co2, 0);
    
    const user = JSON.parse(localStorage.getItem('user'));

    try {
        const res = await API.post('/user/update-emissions', { 
            userId: user.id,
            xp: totalXP, 
            co2: totalCO2 
        });
        setComparison(res.data.history);
        setShowResult(true);
    } catch (err) {
        console.error("Hata:", err);
    }
};

  if (showResult && comparison) {
    const currentCO2 = comparison[0].total_co2;
    const previousCO2 = comparison[1] ? comparison[1].total_co2 : currentCO2;
    const diff = previousCO2 - currentCO2;
    const totalXP = answers.reduce((sum, item) => sum + item.xp, 0);

    return (
      <div className="min-h-screen bg-white p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-black text-center mb-10 text-gray-800 uppercase tracking-widest">HAFTALIK ANALİZ RAPORUN</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="bg-gray-50 p-6 rounded-[2.5rem] border-2 border-gray-100 shadow-sm">
            <h3 className="font-black text-gray-400 text-xs mb-6 uppercase tracking-widest">Emisyon Değişimi</h3>
            <Line 
              data={{
                labels: ['Önceki Takip', 'Şu An'],
                datasets: [{
                  label: 'Karbon Ayak İzi (KG)',
                  data: [previousCO2, currentCO2],
                  borderColor: '#58cc02',
                  backgroundColor: 'rgba(88, 204, 2, 0.1)',
                  tension: 0.4,
                  fill: true,
                  pointBackgroundColor: '#58cc02',
                  pointRadius: 6
                }]
              }}
              options={{ responsive: true, plugins: { legend: { display: false } } }}
            />
          </div>

          <div className={`p-8 rounded-[2.5rem] flex flex-col justify-center text-white shadow-xl ${diff >= 0 ? 'bg-duo-green' : 'bg-red-500'}`}>
            {diff >= 0 ? (
              <>
                <Award size={48} className="mb-4" />
                <h2 className="text-2xl font-black mb-2 uppercase italic">Dünya Sana Teşekkür Ediyor!</h2>
                <p className="font-bold opacity-90 leading-relaxed">
                  Emisyonunu <span className="underline">{diff.toFixed(1)} KG</span> azalttın. Bu değişim, doğaya tam 
                  <span className="text-yellow-300"> {(diff * 0.5).toFixed(1)} adet ağaç </span> 
                  dikmekle aynı pozitif etkiye sahip.
                </p>
              </>
            ) : (
              <>
                <AlertTriangle size={48} className="mb-4" />
                <h2 className="text-2xl font-black mb-2 uppercase italic">Biraz Dikkat Etmeliyiz!</h2>
                <p className="font-bold opacity-90 leading-relaxed">
                  Emisyonun <span className="underline">{Math.abs(diff).toFixed(1)} KG</span> arttı. Bu fazlalık, atmosfere 
                  <span className="text-yellow-200 text-xl font-black italic"> {(Math.abs(diff) * 4).toFixed(0)} KM </span> 
                  yol yapan bir aracın egzoz dumanını salmak demek.
                </p>
              </>
            )}
          </div>
        </div>

        {/* Detaylı Tavsiyeler */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 text-left">
          {answers.map((ans, idx) => (
            <div key={idx} className="bg-white border-2 border-gray-100 p-5 rounded-3xl flex items-start gap-4 hover:border-duo-blue transition-all">
              <div className="bg-blue-50 p-3 rounded-2xl text-duo-blue">{ans.icon}</div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{questions[idx].category}</p>
                <p className="text-sm font-bold text-gray-600 mt-1 italic leading-snug">"{ans.advice}"</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center pb-10">
          <DuoButton color="bg-duo-green" onClick={() => navigate('/dashboard')}>GELİŞİMİ TAKİP ET</DuoButton>
        </div>
      </div>
    );
  }

  const q = questions[currentStep];
  const progress = ((currentStep) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-white p-6 max-w-xl mx-auto flex flex-col">
      <div className="flex items-center gap-4 mb-12">
        <button onClick={() => navigate('/dashboard')} className="hover:rotate-90 transition-all duration-300"><X className="text-gray-300" /></button>
        <div className="flex-1 bg-gray-100 h-4 rounded-full overflow-hidden shadow-inner">
          <div className="bg-duo-green h-full transition-all duration-700 ease-out" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      <div className="flex-1">
        <h2 className="text-xs font-black text-duo-blue mb-2 tracking-[0.3em] uppercase">{q.category}</h2>
        <h1 className="text-3xl font-black text-gray-700 leading-tight mb-10">{q.question}</h1>

        <div className="space-y-4">
          {q.options.map((opt, index) => (
            <button
              key={index}
              onClick={() => handleSelect(opt)}
              className="w-full border-2 border-b-4 border-gray-200 rounded-3xl p-5 flex items-center gap-5 hover:bg-blue-50 hover:border-duo-blue transition-all group active:border-b-0 active:translate-y-1"
            >
              <div className="bg-gray-50 p-4 rounded-2xl group-hover:bg-duo-blue group-hover:text-white transition-all">
                {opt.icon}
              </div>
              <span className="font-black text-gray-600 uppercase text-sm tracking-tight">{opt.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calculator;