import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div
      onClick={() => onClick(product)}
      className="group cursor-pointer bg-white rounded-3xl p-5 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:border-blue-100 transition-all duration-500 flex flex-col h-full active:scale-[0.98] outline-none"
    >
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-8 bg-slate-50">
        <img
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors duration-500"></div>

        <div className="absolute top-4 left-4">
          <span className="px-5 py-2 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-[#001A72] border border-white/20 shadow-sm">
            {product.category}
          </span>
        </div>
      </div>

      <div className="flex-1 flex flex-col px-3 pb-3">
        <div className="flex flex-col mb-4 gap-2">
          <h3 className="text-2xl font-black text-slate-900 leading-tight tracking-tight group-hover:text-blue-600 transition-colors">{product.name}</h3>
          <span className="text-xl font-bold text-blue-600">
            {product.priceLabel || `${product.price}€`}
          </span>
        </div>

        <p className="text-slate-500 text-sm leading-relaxed mb-8 font-light line-clamp-2">
          {product.tagline || product.description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-50">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 group-hover:text-blue-600 transition-colors">
            En savoir plus
          </span>
          <div className="w-12 h-12 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-0.5 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;