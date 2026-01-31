import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  solid?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onNavClick, cartCount, onOpenCart, solid = false }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavClick(e, targetId);
  };

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onOpenCart();
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${scrolled || solid
          ? 'bg-white/95 backdrop-blur-xl border-b border-slate-100 py-4 shadow-sm'
          : 'bg-transparent py-7 md:py-9'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <a
            href="#"
            onClick={(e) => handleLinkClick(e, '')}
            className="text-xl md:text-2xl font-black tracking-tighter text-[#001A72] transition-transform active:scale-95"
          >
            DETAIL<span className="text-[#2563EB]">WAVE</span>
          </a>

          <div className="hidden md:flex items-center gap-10 text-[10px] font-black tracking-[0.25em] uppercase text-[#001A72]/60">
            <a href="#products" onClick={(e) => handleLinkClick(e, 'products')} className="hover:text-[#2563EB] transition-colors">Services</a>
            <a href="#about" onClick={(e) => handleLinkClick(e, 'about')} className="hover:text-[#2563EB] transition-colors">ADN</a>
            <a href="#journal" onClick={(e) => handleLinkClick(e, 'journal')} className="hover:text-[#2563EB] transition-colors">Expertise</a>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleCartClick}
              className="relative group bg-[#001A72] text-white px-6 md:px-8 py-3 rounded-xl transition-all active:scale-95 flex items-center gap-3 shadow-lg shadow-[#001A72]/10"
            >
              <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">Ma Demande</span>
              <span className="text-xs font-black">
                {cartCount}
              </span>
            </button>

            <button
              className="block md:hidden text-[#001A72] focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-7 h-7">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <div className={`fixed inset-0 bg-white z-[45] flex flex-col justify-center items-center transition-all duration-500 ease-in-out ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}>
        <div className="flex flex-col items-center space-y-10 text-4xl font-black text-[#001A72] uppercase tracking-tighter">
          <a href="#products" onClick={(e) => handleLinkClick(e, 'products')} className="hover:text-[#2563EB] transition-all">Prestations</a>
          <a href="#about" onClick={(e) => handleLinkClick(e, 'about')} className="hover:text-[#2563EB] transition-all">Notre ADN</a>
          <a href="#journal" onClick={(e) => handleLinkClick(e, 'journal')} className="hover:text-[#2563EB] transition-all">Expertise</a>
        </div>

        <div className="absolute bottom-12 flex flex-col items-center gap-4">
          <div className="w-12 h-1 bg-[#2563EB] rounded-full"></div>
          <p className="text-[10px] font-black text-[#001A72]/20 uppercase tracking-[0.5em]">Detailwave Liège</p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
