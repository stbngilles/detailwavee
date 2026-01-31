import React, { useEffect, useRef, useState } from 'react';

const About: React.FC = () => {
  const [isVisible1, setIsVisible1] = useState(false);
  const imageRef1 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === imageRef1.current) setIsVisible1(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (imageRef1.current) observer.observe(imageRef1.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="bg-white overflow-hidden pb-8 md:pb-12">

      {/* Introduction */}
      <div className="py-8 md:py-20 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20 text-center md:text-left">
        <div className="md:w-1/2 space-y-6 md:space-y-8">
          <div className="inline-flex items-center gap-2 px-5 py-1.5 bg-slate-50 text-[#001A72] rounded-lg text-[10px] md:text-xs font-black uppercase tracking-[0.2em] border border-slate-200 mx-auto md:mx-0">
            Notre Expertise
          </div>
          <h2 className="text-3xl md:text-7xl font-black text-[#001A72] leading-[1] tracking-tight">
            Votre intérieur mérite <br className="hidden md:block" /> <span className="text-[#2563EB]">une hygiène absolue.</span>
          </h2>
          <p className="text-base md:text-xl text-slate-500 font-medium leading-relaxed max-w-xl mx-auto md:mx-0">
            DetailWave apporte une solution professionnelle à domicile. Grâce à l'injection-extraction, nous éliminons la saleté incrustée pour un foyer sain.
          </p>
        </div>

        <div className="md:w-1/2 w-full">
          <div className="bg-[#001A72] rounded-2xl p-8 md:p-14 text-white shadow-2xl relative overflow-hidden group text-left">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#2563EB]/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>

            <h3 className="text-xl font-black mb-10 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white text-[#001A72] flex items-center justify-center shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              Zone d'Intervention
            </h3>
            <ul className="grid grid-cols-2 gap-y-4 gap-x-6 text-[10px] md:text-sm font-black text-slate-300">
              {['Liège Centre', 'Ans', 'Seraing', 'Herstal', 'Saint-Nicolas', 'Grâce-Hollogne', 'Chaudfontaine', 'Flémalle', 'Awans', 'Esneux'].map((city) => (
                <li key={city} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                  {city}
                </li>
              ))}
            </ul>
            <div className="mt-10 pt-6 border-t border-white/10">
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/50">Déplacement Offert sur toute la zone</p>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Blocks */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-8 md:space-y-12 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
          <div
            ref={imageRef1}
            className={`relative h-64 md:h-96 lg:h-auto aspect-[16/10] lg:aspect-auto rounded-2xl overflow-hidden group transition-all duration-1000 ease-out transform ${isVisible1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
          >
            <img
              src="/Photo/shampouineuse%20vs%20nettoyeur%20vapeur.jpg"
              alt="Cleaning Process"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-[#001A72]/10 group-hover:bg-transparent transition-colors"></div>
          </div>
          <div className="bg-slate-50 rounded-2xl p-10 lg:p-16 flex flex-col justify-center border border-slate-100 text-center md:text-left">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#2563EB] mb-4">Technologie</span>
            <h3 className="text-3xl md:text-5xl font-black mb-6 text-[#001A72] leading-[1.1]">
              Injection-Extraction.
            </h3>
            <p className="text-base md:text-lg text-slate-500 font-medium leading-relaxed">
              Notre méthode propulse une solution nettoyante au cœur de la fibre puis l'aspire immédiatement pour un résultat profond.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
          <div className="bg-[#001A72] rounded-2xl p-10 lg:p-16 flex flex-col justify-center text-white relative overflow-hidden shadow-2xl text-center md:text-left">
            <div className="absolute top-0 left-0 w-64 h-64 bg-[#2563EB]/5 blur-[100px] rounded-full -translate-y-1/2 -translate-x-1/2"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#2563EB] mb-4 relative">Engagement</span>
            <h3 className="text-3xl md:text-5xl font-black mb-6 text-white leading-[1.1] relative">
              Sain pour vous,<br className="hidden md:block" /> et la planète.
            </h3>
            <p className="text-base md:text-lg text-slate-300 font-medium leading-relaxed relative">
              Nous utilisons exclusivement des produits biodégradables, garantis sans danger pour votre famille.
            </p>
          </div>
          <div className="relative h-64 md:h-96 lg:h-auto aspect-[16/10] lg:aspect-auto rounded-2xl overflow-hidden group">
            <img
              src="/Photo/ExpertCleaning.jpg"
              alt="Expertise Nettoyage"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
