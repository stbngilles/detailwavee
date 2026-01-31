
import React, { useState, useEffect } from 'react';
import { Product, PricingOption } from '../types';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, option?: PricingOption) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack, onAddToCart }) => {
  const [selectedOption, setSelectedOption] = useState<PricingOption | undefined>(undefined);

  useEffect(() => {
    if (product.priceList && product.priceList.length > 0) {
      setSelectedOption(product.priceList[0]);
    } else {
      setSelectedOption(undefined);
    }
  }, [product]);

  return (
    <div className="pt-32 min-h-screen bg-white animate-fade-in pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        <button
          onClick={onBack}
          className="group flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-blue-600 transition-all mb-12"
        >
          <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-blue-200 group-hover:bg-blue-50 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </div>
          Retour aux prestations
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

          {/* Left: Images */}
          <div className="lg:col-span-7 space-y-6">
            <div className="w-full aspect-square md:aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl bg-slate-50 border border-slate-100">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.gallery && product.gallery.length > 1 && (
              <div className="grid grid-cols-2 gap-6">
                {product.gallery.slice(1).map((img, idx) => (
                  <div key={idx} className="rounded-3xl overflow-hidden aspect-video bg-slate-50 border border-slate-100">
                    <img src={img} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details */}
          <div className="lg:col-span-5 flex flex-col pt-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold uppercase tracking-widest w-fit mb-6 border border-blue-100">
              <span className="w-1 h-1 bg-blue-600 rounded-full animate-pulse"></span>
              {product.category}
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-8 leading-[1.1] tracking-tight">{product.name}</h1>

            <p className="text-slate-500 leading-relaxed text-lg mb-10 font-light">
              {product.longDescription || product.description}
            </p>

            {/* Pricing Selection */}
            <div className="bg-slate-50/50 p-8 rounded-[2rem] border border-slate-100 shadow-sm mb-10">
              <h3 className="text-sm font-bold text-slate-900 mb-6 flex items-center gap-3 uppercase tracking-widest">
                Options de service
              </h3>

              {product.priceList ? (
                <div className="space-y-4">
                  {product.priceList.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedOption(item)}
                      className={`flex justify-between items-center p-5 rounded-2xl cursor-pointer transition-all border-2 ${selectedOption === item
                          ? 'border-blue-600 bg-white shadow-lg'
                          : 'border-transparent bg-white/50 hover:bg-white hover:border-slate-200'
                        }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${selectedOption === item ? 'border-blue-600' : 'border-slate-200'}`}>
                          {selectedOption === item && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full"></div>}
                        </div>
                        <span className={`font-bold text-sm ${selectedOption === item ? 'text-slate-900' : 'text-slate-500'}`}>
                          {item.label}
                        </span>
                      </div>
                      <span className={`font-bold text-lg ${selectedOption === item ? 'text-blue-600' : 'text-slate-900'}`}>{item.price}€</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex justify-between items-center p-6 bg-white rounded-2xl border border-slate-100">
                  <span className="text-slate-500 font-bold text-sm uppercase tracking-widest">Tarif fixe</span>
                  <span className="text-2xl font-bold text-slate-900">{product.price}€</span>
                </div>
              )}
            </div>

            <div className="mt-auto space-y-6">
              <div className="flex items-end justify-between px-2">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Prix total</span>
                  <p className="text-4xl font-bold text-slate-900">
                    {selectedOption ? selectedOption.price : product.price}€
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-green-600 font-bold text-xs uppercase tracking-widest">Déplacement Offert</span>
                </div>
              </div>

              <button
                onClick={() => onAddToCart(product, selectedOption)}
                className="w-full py-5 bg-blue-600 text-white rounded-2xl uppercase tracking-[0.2em] text-sm font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3 active:scale-[0.98]"
              >
                Ajouter au devis
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>

              <div className="pt-8 border-t border-slate-100">
                <h4 className="font-bold text-slate-900 mb-6 text-sm uppercase tracking-widest">Ce qui est inclus :</h4>
                <ul className="grid grid-cols-1 gap-4">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-4 text-sm text-slate-500 font-light">
                      <div className="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-2.5 h-2.5 text-blue-600">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

