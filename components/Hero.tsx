import React from 'react';

const Hero: React.FC = () => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-white pt-24 md:pt-20 pb-8">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,#F8FAFC_0%,transparent_70%)]"></div>
        <div className="absolute inset-0 bg-hero-pattern opacity-[0.03]"></div>

        {/* Animated Bubbles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute bottom-[-10%] rounded-full bg-[#2563EB]/10 animate-bubble"
              style={{
                left: `${5 + i * 10}%`,
                width: `${15 + (i % 3) * 25}px`,
                height: `${15 + (i % 3) * 25}px`,
                animationDelay: `${i * 1.2}s`,
                animationDuration: `${8 + i * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Floating Elements (Sharp Corners) - Resized and fixed paths */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden lg:block">
        <div className="absolute top-[30%] left-[5%] w-64 h-48 animate-float opacity-30 shadow-2xl border border-slate-100 rounded-xl overflow-hidden" style={{ animationDelay: '0s' }}>
          <img src="/Photo/Voiture.webp" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute top-[45%] right-[6%] w-64 h-64 animate-float opacity-30 shadow-2xl border border-slate-100 rounded-xl overflow-hidden" style={{ animationDelay: '2.5s' }}>
          <img src="/Photo/HeroCleaning.png" alt="" className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-6 py-2 bg-white text-[#001A72] border border-slate-200 rounded-lg text-[10px] md:text-xs font-black uppercase tracking-[0.25em] mb-8 animate-fade-in mx-auto shadow-sm">
          <span className="w-1.5 h-1.5 bg-[#001A72] rounded-full"></span>
          Detailwave Liège & Périphérie
        </div>

        {/* Main Title */}
        <h1 className="text-4xl md:text-8xl font-black text-[#001A72] mb-6 leading-[0.95] tracking-tight">
          Prenez soin de <br className="hidden md:block" /> <span className="text-[#2563EB]">votre santé.</span>
        </h1>

        <p className="max-w-2xl mx-auto text-base md:text-xl text-slate-500 font-medium leading-relaxed mb-10">
          Nettoyage expert par injection-extraction. Nous éliminons acariens, bactéries et taches pour un intérieur sain.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a
            href="#products"
            onClick={(e) => handleNavClick(e, 'products')}
            className="w-full sm:w-auto px-10 py-4 bg-[#001A72] text-white rounded-lg font-black uppercase tracking-[0.25em] text-[10px] hover:bg-[#2563EB] transition-all shadow-xl shadow-[#001A72]/10 active:scale-95 text-center"
          >
            Nos prestations
          </a>
          <a
            href="#about"
            onClick={(e) => handleNavClick(e, 'about')}
            className="w-full sm:w-auto px-10 py-4 border-2 border-[#001A72] text-[#001A72] rounded-lg font-black uppercase tracking-[0.25em] text-[10px] hover:bg-[#001A72] hover:text-white transition-all active:scale-95 text-center"
          >
            Notre ADN
          </a>
        </div>

        {/* Minimal Standards Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-4 pt-8 border-t border-slate-100 w-full">
          <div className="flex flex-col items-center gap-1">
            <span className="text-base md:text-2xl font-black text-[#001A72]">7j/7</span>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-center">Service continu</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-base md:text-2xl font-black text-[#2563EB]">Bio</span>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-center">Produits Sains</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-base md:text-2xl font-black text-[#001A72]">Liège</span>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-center">Zone Locale</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-base md:text-2xl font-black text-[#2563EB]">Offert</span>
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-center">Déplacement</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
