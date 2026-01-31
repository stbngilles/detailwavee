import React from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (index: number) => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onRemoveItem, onCheckout }) => {
  const total = items.reduce((sum, item) => {
    return sum + (item.selectedOption ? item.selectedOption.price : item.price);
  }, 0);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] transition-opacity duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-full md:w-[500px] bg-white z-[70] shadow-2xl transform transition-transform duration-500 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b border-slate-50">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Mon Panier</h2>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">{items.length} services sélectionnés</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all hover:rotate-90"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-60">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10 text-slate-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </div>
              <div className="space-y-2">
                <p className="font-bold text-slate-900">Votre panier est vide</p>
                <p className="text-sm text-slate-400">Découvrez nos services pour commencer.</p>
              </div>
              <button onClick={onClose} className="text-blue-600 font-bold text-sm uppercase tracking-widest border-b-2 border-blue-100 pb-1">Continuer la visite</button>
            </div>
          ) : (
            items.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="flex gap-6 group">
                <div className="w-24 h-24 bg-slate-50 rounded-2xl overflow-hidden flex-shrink-0 border border-slate-100">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg leading-tight mb-1">{item.name}</h3>
                      {item.selectedOption ? (
                        <span className="inline-block text-[10px] text-blue-600 font-bold uppercase tracking-wider bg-blue-50 px-2 py-1 rounded">
                          {item.selectedOption.label}
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                          {item.category}
                        </span>
                      )}
                    </div>
                    <span className="font-bold text-slate-900">
                      {item.selectedOption ? item.selectedOption.price : item.price}€
                    </span>
                  </div>
                  <button
                    onClick={() => onRemoveItem(idx)}
                    className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-slate-300 hover:text-red-500 transition-colors mt-auto"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                    Supprimer
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-8 space-y-6 border-t border-slate-50 bg-slate-50/50">
          <div className="space-y-4">
            <div className="flex justify-between items-center text-slate-500 uppercase tracking-widest font-bold text-[10px]">
              <span>Sous-total</span>
              <span>{total}€</span>
            </div>
            <div className="flex justify-between items-center text-slate-500 uppercase tracking-widest font-bold text-[10px]">
              <span>Déplacement</span>
              <span className="text-green-600">Offert</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-xl font-bold text-slate-900">Total estimé</span>
              <span className="text-3xl font-bold text-blue-600">{total}€</span>
            </div>
          </div>

          <button
            onClick={onCheckout}
            disabled={items.length === 0}
            className="group w-full py-5 bg-blue-600 text-white uppercase tracking-[0.2em] text-sm font-bold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3 active:scale-[0.98]"
          >
            Passer à l'étape suivante
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </button>
          <p className="text-[10px] text-slate-400 text-center font-medium leading-relaxed">
            Estimation gratuite et sans engagement. <br />
            Le règlement s'effectue après la réalisation de la prestation.
          </p>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;

