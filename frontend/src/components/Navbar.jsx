import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, BrainCircuit, Clock3, GraduationCap, Menu, MoonStar, Palette, SquareLibrary, SunMedium, X } from 'lucide-react';

const paletteOptions = [
  { id: 'ocean', label: 'Ocean', swatches: ['#00F2FE', '#4FACFE'] },
  { id: 'aurora', label: 'Aurora', swatches: ['#2DD4BF', '#3B82F6'] },
  { id: 'sunset', label: 'Sunset', swatches: ['#FB923C', '#F472B6'] },
  { id: 'royal', label: 'Royal', swatches: ['#818CF8', '#A78BFA'] },
  { id: 'mint', label: 'Mint', swatches: ['#34D399', '#22C55E'] },
];

const menuItems = [
  { to: '/roadmaps', label: 'Roadmaps', icon: SquareLibrary },
  { to: '/analytics', label: 'Analytics', icon: Clock3 },
  { to: '/college-reviews', label: 'Reviews', icon: GraduationCap },
  { to: '/counselling', label: 'Counselling', icon: BookOpen },
];

function hexToRgb(hex) {
  const normalized = hex.replace('#', '');
  const expanded = normalized.length === 3 ? normalized.split('').map((part) => `${part}${part}`).join('') : normalized;
  const red = Number.parseInt(expanded.slice(0, 2), 16);
  const green = Number.parseInt(expanded.slice(2, 4), 16);
  const blue = Number.parseInt(expanded.slice(4, 6), 16);
  return `${red}, ${green}, ${blue}`;
}

export default function Navbar() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(() => localStorage.getItem('nextstep-theme') || 'dark');
  const [palette, setPalette] = useState(() => localStorage.getItem('nextstep-palette') || 'ocean');
  const [customCyan, setCustomCyan] = useState(() => localStorage.getItem('nextstep-custom-cyan') || '#00F2FE');
  const [customPurple, setCustomPurple] = useState(() => localStorage.getItem('nextstep-custom-purple') || '#4FACFE');
  
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const paletteMenuRef = useRef(null);

  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  // Apply Theme
  useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem('nextstep-theme', theme);
  }, [theme]);

  // Apply Palette
  useEffect(() => {
    localStorage.setItem('nextstep-palette', palette);
    if (palette === 'custom') {
      document.body.dataset.palette = 'custom';
      document.body.style.setProperty('--accent-cyan', hexToRgb(customCyan));
      document.body.style.setProperty('--accent-purple', hexToRgb(customPurple));
      localStorage.setItem('nextstep-custom-cyan', customCyan);
      localStorage.setItem('nextstep-custom-purple', customPurple);
      return;
    }

    document.body.dataset.palette = palette;
    document.body.style.removeProperty('--accent-cyan');
    document.body.style.removeProperty('--accent-purple');
  }, [customCyan, customPurple, palette]);

  // Close Palette Dropdown
  useEffect(() => {
    const handlePointerDown = (event) => {
      if (paletteMenuRef.current && !paletteMenuRef.current.contains(event.target)) {
        setPaletteOpen(false);
      }
    };
    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, []);

  // Handle Mobile Menu Body Scroll Lock
  useEffect(() => {
    if (!mobileMenuOpen) return undefined;
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const handleEscape = (event) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [mobileMenuOpen]);

  const cycleTheme = () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  const applyPalette = (nextPalette) => {
    setPalette(nextPalette);
    setPaletteOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#050b14]/95 shadow-[0_12px_30px_rgba(0,0,0,0.24)] backdrop-blur-xl"
      >
        <div className="overflow-hidden border-b border-white/10 bg-black/20">
          <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-white/65 sm:px-6 lg:px-8">
            <span>Study smart. Build projects. Review colleges. Plan your future.</span>
            <span aria-hidden="true">Study smart. Build projects. Review colleges. Plan your future.</span>
          </div>
        </div>

        <div className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          
          {/* LEFT SIDE: Logo & Desktop Links */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 text-white font-bold text-lg hover:opacity-80 transition-opacity">
              <BrainCircuit className="h-6 w-6 text-neonCyan" />
              <span>NextStep</span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-6">
              {menuItems.map((item) => (
                <Link 
                  key={item.to} 
                  to={item.to} 
                  className="text-sm font-medium text-gray-300 hover:text-neonCyan transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* RIGHT SIDE: Controls & Authentication */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Palette Dropdown */}
            <div className="relative hidden md:block" ref={paletteMenuRef}>
              <button
                type="button"
                onClick={() => setPaletteOpen((current) => !current)}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-white/25 hover:bg-white/5"
              >
                <Palette className="h-4 w-4" /> Palette
              </button>
              {paletteOpen && (
                <div className="absolute right-0 top-full mt-3 w-64 rounded-2xl border border-white/10 bg-darkSurface/95 p-2 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                   <div className="px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-gray-400">Color palette</div>
                   {paletteOptions.map((option) => (
                      <button key={option.id} onClick={() => applyPalette(option.id)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-white/5 ${palette === option.id ? 'bg-white/5' : ''}`}>
                        <span className="flex items-center gap-1">{option.swatches.map((color) => (<span key={color} className="h-4 w-4 rounded-full border border-white/20" style={{ backgroundColor: color }} />))}</span>
                        <span><span className="block text-sm font-semibold text-white">{option.label}</span><span className="block text-xs text-gray-400">Preset accent colors</span></span>
                      </button>
                    ))}
                    <div className="mt-2 rounded-xl border border-white/10 bg-black/20 p-3">
                      <button onClick={() => applyPalette('custom')} className={`mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] transition-colors ${palette === 'custom' ? 'border-neonCyan/40 bg-white/5 text-white' : 'border-white/10 text-gray-400 hover:text-white'}`}><Palette className="h-3.5 w-3.5" />Custom</button>
                      <div className="grid gap-3">
                        <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">Accent 1<input type="color" value={customCyan} onChange={(e) => {setCustomCyan(e.target.value); setPalette('custom');}} className="h-11 w-full cursor-pointer rounded-lg border border-white/10 bg-transparent p-1" /></label>
                        <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">Accent 2<input type="color" value={customPurple} onChange={(e) => {setCustomPurple(e.target.value); setPalette('custom');}} className="h-11 w-full cursor-pointer rounded-lg border border-white/10 bg-transparent p-1" /></label>
                      </div>
                    </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={cycleTheme}
              className="hidden items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-white/25 hover:bg-white/5 md:inline-flex"
            >
              {theme === 'dark' ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
              {theme === 'dark' ? 'Light' : theme === 'light' ? 'Study' : 'Dark'}
            </button>

            {/* Conditional Auth Buttons */}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="hidden rounded-full border border-red-500/30 px-4 py-2 text-sm font-medium text-red-400 transition-colors hover:border-red-500/60 hover:bg-red-500/10 md:inline-flex"
              >
                Log out
              </button>
            ) : (
              <>
                <Link to="/login" className="hidden rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-white/25 hover:bg-white/5 md:inline-flex">
                  Log in
                </Link>
                <Link to="/signup" className="hidden rounded-full bg-gradient-to-r from-neonCyan to-neonPurple px-4 py-2 text-sm font-bold text-black transition-transform hover:scale-[1.02] md:inline-flex">
                  Sign Up
                </Link>
              </>
            )}

            {/* Mobile Menu Open Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-sm font-medium text-white transition-colors hover:border-white/25 hover:bg-white/5 md:hidden"
            >
              <Menu className="h-4 w-4" />
              Menu
            </button>
          </div>
        </div>
      </motion.header>

      {/* THE MISSING PIECE: Mobile Menu Overlay & Sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm md:hidden"
            />
            
            {/* Sliding Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-sm flex-col border-l border-white/10 bg-[#050b14] p-6 shadow-2xl md:hidden"
            >
              {/* Sidebar Header */}
              <div className="mb-8 flex items-center justify-between">
                <span className="flex items-center gap-2 text-lg font-bold text-white">
                  <BrainCircuit className="h-6 w-6 text-neonCyan" />
                  NextStep
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-full border border-white/10 p-2 text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Sidebar Links */}
              <div className="flex flex-1 flex-col gap-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium text-gray-300 transition-colors hover:bg-white/5 hover:text-neonCyan"
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Sidebar Login/Logout Footer */}
              <div className="mt-auto flex flex-col gap-3 border-t border-white/10 pt-6">
                {isLoggedIn ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-400 transition-colors hover:bg-red-500/20"
                  >
                    Log out
                  </button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
                    >
                      Log in
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-neonCyan to-neonPurple px-4 py-3 text-sm font-bold text-black transition-transform hover:scale-[1.02]"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}