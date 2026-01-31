import React from 'react';
import { PRODUCTS } from '../constants';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  onProductClick: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ onProductClick }) => {
  return (
    <section id="products" className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Header Area */}
        <div className="flex flex-col items-center text-center mb-16 space-y-6">
          <span className="text-blue-600 font-bold uppercase tracking-widest text-sm">Nos Prestations</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">Services de Nettoyage</h2>
          <p className="max-w-2xl text-slate-600 text-lg">
            Choisissez le service adapté à vos besoins. Prix transparents, déplacement inclus sur Liège.
          </p>
        </div>

        {/* Large Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
          {PRODUCTS.map(product => (
            <ProductCard key={product.id} product={product} onClick={onProductClick} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;