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
      className="group cursor-pointer bg-white rounded-xl p-4 border border-slate-100 shadow-sm hover:shadow-xl hover:border-[#2563EB]/10 transition-all duration-500 flex flex-col h-full active:scale-[0.98] outline-none"
    >
      <div className="relative aspect-[4/5] rounded-lg overflow-hidden mb-6 bg-slate-50">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-[#001A72]/0 group-hover:bg-[#001A72]/5 transition-colors duration-500"></div>

        <div className="absolute top-4 left-4">
          <span className="px-4 py-1.5 bg-white rounded-lg text-[10px] font-black uppercase tracking-widest text-[#001A72] border border-slate-100 shadow-sm">
            {product.category}
          </span>
        </div>
      </div>

      <div className="flex-1 flex flex-col px-2 pb-2">
        <div className="flex justify-between items-start mb-3 gap-4">
          <h3 className="text-xl font-black text-[#001A72] leading-tight tracking-tight group-hover:text-[#2563EB] transition-colors">{product.name}</h3>
          <span className="text-lg font-black text-[#2563EB]">
            {product.price}€
          </span>
        </div>

        <p className="text-slate-400 text-sm leading-relaxed mb-8 font-medium line-clamp-2">
          {product.tagline || product.description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-5 border-t border-slate-50">
          <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#001A72]">
            Découvrir
          </span>
          <div className="w-10 h-10 rounded-lg bg-slate-50 text-[#001A72] flex items-center justify-center group-hover:bg-[#2563EB] group-hover:text-white transition-all shadow-inner">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;