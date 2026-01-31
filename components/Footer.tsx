/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState } from 'react';

interface FooterProps {
  onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onLinkClick }) => {
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    if (!email) return;
    setSubscribeStatus('loading');
    setTimeout(() => {
      setSubscribeStatus('success');
      setEmail('');
    }, 1500);
  };

  return (
    <footer className="bg-slate-900 pt-24 pb-12 px-6 text-slate-400">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">

        <div className="md:col-span-4">
          <h4 className="text-2xl font-bold text-white mb-6 tracking-tight">DETAILWAVE</h4>
          <p className="max-w-xs font-light leading-relaxed mb-6">
            Spécialiste du nettoyage de textiles et véhicules à domicile à Liège.
            Propreté, hygiène et service écologique.
          </p>
          <div className="flex items-center gap-2 text-sm text-blue-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <span>Liège, Ans, Seraing & environs</span>
          </div>
        </div>

        <div className="md:col-span-2">
          <h4 className="font-bold text-white mb-6 tracking-wide text-sm uppercase">Services</h4>
          <ul className="space-y-4 font-medium text-sm">
            <li><a href="#products" onClick={(e) => onLinkClick(e, 'products')} className="hover:text-blue-400 transition-colors">Nettoyage Canapé</a></li>
            <li><a href="#products" onClick={(e) => onLinkClick(e, 'products')} className="hover:text-blue-400 transition-colors">Nettoyage Matelas</a></li>
            <li><a href="#products" onClick={(e) => onLinkClick(e, 'products')} className="hover:text-blue-400 transition-colors">Nettoyage Tapis</a></li>
            <li><a href="#products" onClick={(e) => onLinkClick(e, 'products')} className="hover:text-blue-400 transition-colors">Lavage Auto</a></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="font-bold text-white mb-6 tracking-wide text-sm uppercase">Société</h4>
          <ul className="space-y-4 font-medium text-sm">
            <li><a href="#about" onClick={(e) => onLinkClick(e, 'about')} className="hover:text-blue-400 transition-colors">À Propos</a></li>
            <li><a href="#about" onClick={(e) => onLinkClick(e, 'about')} className="hover:text-blue-400 transition-colors">Zone d'intervention</a></li>
            <li><a href="#journal" onClick={(e) => onLinkClick(e, 'journal')} className="hover:text-blue-400 transition-colors">Blog & Conseils</a></li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <h4 className="font-bold text-white mb-6 tracking-wide text-sm uppercase">Contact Rapide</h4>
          <div className="flex flex-col gap-4">
            <p className="text-sm">Besoin d'un devis urgent ?</p>
            <a href="tel:+32497363323" className="text-2xl font-bold text-white hover:text-blue-400 transition-colors">+32 497 36 33 23</a>
            <p className="text-xs text-slate-500">Du Lundi au Dimanche, 8h - 20h</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs uppercase tracking-widest opacity-60">
        <p>© 2025 DETAILWAVE Liège. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;