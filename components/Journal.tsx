import React from 'react';
import { JOURNAL_ARTICLES } from '../constants';
import { JournalArticle } from '../types';

interface JournalProps {
  onArticleClick: (article: JournalArticle) => void;
}

const GOOGLE_REVIEWS = [
  {
    id: 1,
    author: "Shirley Lambert",
    date: "Il y a un mois",
    rating: 5,
    text: "Travail effectué avec soin ! Incroyable la différence de mon canapé avant et après. Personnel très sympa 😊"
  },
  {
    id: 2,
    author: "Montana 667",
    date: "Il y a 2 jours",
    rating: 5,
    text: "Nous avons fait appel à Detailwave pour le nettoyage de fin de chantier de notre maison. Tout était impeccable après son passage ;)"
  },
  {
    id: 3,
    author: "Emmy Lurson",
    date: "Il y a 2 jours",
    rating: 5,
    text: "J'ai fait appel à Detailwave pour le nettoyage de mon matelas à la shampouineuse. Avant l'intervention, il m'a bien expliqué que certaines taches très anciennes risquaient de ne pas disparaître complètement, ce que j'ai beaucoup apprécié :)"
  }
];

const StarRating = () => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-amber-400">
        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
      </svg>
    ))}
  </div>
);

const Journal: React.FC<JournalProps> = ({ onArticleClick }) => {
  return (
    <section id="journal" className="bg-white pt-12 md:pt-16 pb-24 md:pb-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-20 gap-8 text-center md:text-left">
          <div className="space-y-4">
            <span className="inline-block text-[10px] font-black uppercase tracking-[0.4em] text-[#2563EB]">Expertise & Guides</span>
            <h2 className="text-4xl md:text-6xl font-black text-[#001A72] tracking-tight">Conseils d'experts.</h2>
          </div>
          <p className="md:max-w-xs text-slate-500 font-medium leading-relaxed">
            Apprenez à prolonger la vie de vos textiles avec nos méthodes professionnelles.
          </p>
        </div>

        {/* Google Reviews Section */}
        <div className="mb-24">
          <div className="bg-slate-50 rounded-[2.5rem] p-8 md:p-14 border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>

            <div className="relative flex flex-col lg:flex-row gap-12 items-center lg:items-start">
              {/* Summary */}
              <div className="lg:w-1/3 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-2xl shadow-sm border border-slate-100">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span className="text-sm font-black text-slate-900">Avis Google</span>
                </div>

                <div className="space-y-2">
                  <div className="text-6xl font-black text-[#001A72]">5.0</div>
                  <div className="flex justify-center lg:justify-start">
                    <StarRating />
                  </div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Basé sur nos derniers avis</p>
                </div>

                <a
                  href="https://www.google.com/search?q=Detailwave+Avis&lkt=LocalPoiReviews&arid=Ci9DQUlRQUNvZENodHljRjlvT2paUlN6aEdaRTVzTldOTFozQmxkR1ZwVTA5QmJXYxAB"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[.2em] text-[#2563EB] hover:gap-4 transition-all"
                >
                  Voir tous les avis
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3 h-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </div>

              {/* Reviews Grid */}
              <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
                {GOOGLE_REVIEWS.map((review) => (
                  <div key={review.id} className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="font-black text-[#001A72] text-sm">{review.author}</div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{review.date}</div>
                      </div>
                      <StarRating />
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed font-medium italic">
                      "{review.text}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
          {JOURNAL_ARTICLES.map((article) => (
            <div
              key={article.id}
              className="group cursor-pointer flex flex-col text-left bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500"
              onClick={() => onArticleClick(article)}
            >
              <div className="w-full aspect-video overflow-hidden bg-slate-50 relative">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#001A72]/5 group-hover:bg-transparent transition-colors"></div>
              </div>
              <div className="flex flex-col flex-1 p-10 md:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-1.5 h-1.5 bg-[#2563EB] rounded-full"></span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{article.date}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-[#001A72] mb-6 leading-tight group-hover:text-[#2563EB] transition-colors">{article.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed line-clamp-3 mb-8">{article.excerpt}</p>
                <div className="mt-auto flex items-center gap-4 text-[#001A72] font-black uppercase tracking-[0.2em] text-[10px]">
                  <span>Lire l'article</span>
                  <div className="w-10 h-10 rounded-xl bg-slate-50 text-[#001A72] flex items-center justify-center transition-all group-hover:bg-[#2563EB] group-hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Journal;