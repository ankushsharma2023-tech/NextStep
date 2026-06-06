import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
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
  const expanded = normalized.length === 3
    ? normalized.split('').map((part) => `${part}${part}`).join('')
    : normalized;
  const red = Number.parseInt(expanded.slice(0, 2), 16);
  const green = Number.parseInt(expanded.slice(2, 4), 16);
  const blue = Number.parseInt(expanded.slice(4, 6), 16);
  return `${red}, ${green}, ${blue}`;
}

export default function Navbar() {
  const [theme, setTheme] = useState(() => localStorage.getItem('nextstep-theme') || 'dark');
  const [palette, setPalette] = useState(() => localStorage.getItem('nextstep-palette') || 'ocean');
  const [customCyan, setCustomCyan] = useState(() => localStorage.getItem('nextstep-custom-cyan') || '#00F2FE');
  const [customPurple, setCustomPurple] = useState(() => localStorage.getItem('nextstep-custom-purple') || '#4FACFE');
  
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const paletteMenuRef = useRef(null);

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

  // Close Palette Dropdown on click outside
  useEffect(() => {
    const handlePointerDown = (event) => {
      if (paletteMenuRef.current && !paletteMenuRef.current.contains(event.target)) {
        setPaletteOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, []);

  // Handle Mobile Menu Body Scroll Lock & Escape Key
  useEffect(() => {
    if (!mobileMenuOpen) return undefined;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [mobileMenuOpen]);

  const cycleTheme = () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  const setStudyTheme = () => setTheme('study');
  
  const applyPalette = (nextPalette) => {
    setPalette(nextPalette);
    setPaletteOpen(false);
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#050b14]/95 shadow-[0_12px_30px_rgba(0,0,0,0.24)] backdrop-blur-xl"
    >
      {/* Top Marquee */}
      <div className="overflow-hidden border-b border-white/10 bg-black/20">
        <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-white/65 sm:px-6 lg:px-8">
          <span>Study smart. Build projects. Review colleges. Plan your future.</span>
          <span aria-hidden="true">Study smart. Build projects. Review colleges. Plan your future.</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2 text-white font-bold text-lg hover:opacity-80 transition-opacity">
          <BrainCircuit className="h-6 w-6 text-neonCyan" />
          <span>NextStep</span>
        </Link>

        {/* Desktop Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Palette Dropdown */}
          <div className="relative hidden md:block" ref={paletteMenuRef}>
            <button
              type="button"
              onClick={() => setPaletteOpen((current) => !current)}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-white/25 hover:bg-white/5"
              aria-label="Choose color palette"
            >
              <Palette className="h-4 w-4" />
              Palette
            </button>

            {paletteOpen && (
              <div className="absolute right-0 top-full mt-3 w-64 rounded-2xl border border-white/10 bg-darkSurface/95 p-2 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                <div className="px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-gray-400">Color palette</div>
                {paletteOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => applyPalette(option.id)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-white/5 ${palette === option.id ? 'bg-white/5' : ''}`}
                  >
                    <span className="flex items-center gap-1">
                      {option.swatches.map((color) => (
                        <span key={color} className="h-4 w-4 rounded-full border border-white/20" style={{ backgroundColor: color }} />
                      ))}
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-white">{option.label}</span>
                      <span className="block text-xs text-gray-400">Preset accent colors</span>
                    </span>
                  </button>
                ))}

                <div className="mt-2 rounded-xl border border-white/10 bg-black/20 p-3">
                  <button
                    type="button"
                    onClick={() => applyPalette('custom')}
                    className={`mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] transition-colors ${palette === 'custom' ? 'border-neonCyan/40 bg-white/5 text-white' : 'border-white/10 text-gray-400 hover:text-white'}`}
                  >
                    <Palette className="h-3.5 w-3.5" />
                    Custom
                  </button>

                  <div className="grid gap-3">
                    <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                      Accent 1
                      <input
                        type="color"
                        value={customCyan}
                        onChange={(event) => {
                          setCustomCyan(event.target.value);
                          setPalette('custom');
                        }}
                        className="h-11 w-full cursor-pointer rounded-lg border border-white/10 bg-transparent p-1"
                      />
                    </label>
                    <label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                      Accent 2
                      <input
                        type="color"
                        value={customPurple}
                        onChange={(event) => {
                          setCustomPurple(event.target.value);
                          setPalette('custom');
                        }}
                        className="h-11 w-full cursor-pointer rounded-lg border border-white/10 bg-transparent p-1"
                      />
                    </label>
                    <p className="text-xs leading-5 text-gray-400">Pick your own two accent colors. The site updates instantly.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={cycleTheme}
            className="hidden items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-white/25 hover:bg-white/5 md:inline-flex"
            aria-label="Toggle light and study mode"
          >
            {theme === 'dark' ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
            {theme === 'dark' ? 'Light' : theme === 'light' ? 'Study' : 'Dark'}
          </button>

          <Link
            to="/login"
            className="hidden rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-white/25 hover:bg-white/5 md:inline-flex"
            onClick={closeMobileMenu}
          >
            Log in
          </Link>

          <button
            className="hidden rounded-full bg-gradient-to-r from-neonCyan to-neonPurple px-4 py-2 text-sm font-bold text-black transition-transform hover:scale-[1.02] md:inline-flex"
            style={{ boxShadow: '0 0 28px rgb(var(--accent-cyan) / 0.2)' }}
          >
            Sign Up
          </button>

          {/* Mobile Menu Open Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-sm font-medium text-white transition-colors hover:border-white/25 hover:bg-white/5 md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
            Menu
          </button>
        </div>
      </div>

      {/* MOBILE SIDEBAR MODAL */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-[59] h-screen w-screen bg-slate-950/70 backdrop-blur-[2px] md:hidden cursor-default"
            />

            {/* Sidebar Content Panel */}
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="fixed inset-y-0 right-0 z-[60] flex h-[100dvh] w-full max-w-sm flex-col overflow-y-auto overscroll-contain border-l border-emerald-200/15 bg-slate-950 p-4 text-white shadow-[0_30px_120px_rgba(0,0,0,0.85)] sm:max-w-md md:hidden"
            >
              <div className="flex shrink-0 items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neonCyan">Study Mode</p>
                  <p className="text-sm text-gray-400">Quick access menu</p>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-full border border-white/10 p-2 text-gray-300 transition hover:bg-white/5 hover:text-white"
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-4 shrink-0 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-neonCyan to-neonPurple text-black">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Study, plan, and improve</p>
                    <p className="text-xs text-gray-400">A calm drawer for learning tools and pages.</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-gray-200 transition hover:border-white/25 hover:bg-white/10 hover:text-white"
                  >
                    <item.icon className="h-4 w-4 text-neonCyan" />
                    {item.label}
                  </Link>
                ))}
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-gray-200 transition hover:border-white/25 hover:bg-white/10 hover:text-white"
                >
                  <MoonStar className="h-4 w-4 text-neonCyan" />
                  Log in
                </Link>
              </div>

              <div className="mt-5 shrink-0 rounded-3xl border border-white/10 bg-black/20 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">Theme</p>
                    <p className="text-sm text-gray-300">Light or dark mode</p>
                  </div>
                  <button
                    type="button"
                    onClick={cycleTheme}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-white/25 hover:bg-white/5"
                  >
                    {theme === 'dark' ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
                    {theme === 'dark' ? 'Light' : 'Dark'}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={setStudyTheme}
                  className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-200/20 bg-emerald-200/10 px-4 py-2 text-sm font-semibold text-emerald-100 transition-colors hover:border-emerald-200/40 hover:bg-emerald-200/15"
                >
                  <BookOpen className="h-4 w-4" />
                  Study theme
                </button>
              </div>

              <div className="mt-5 shrink-0 rounded-3xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">Study colors</p>
                <p className="mt-2 text-sm leading-6 text-gray-400">
                  Pick a reading-friendly color preset for notes, menus, and study screens.
                </p>
                <div className="mt-4 grid gap-2">
                  {paletteOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => {
                        applyPalette(option.id);
                        closeMobileMenu();
                      }}
                      className={`flex items-center gap-3 rounded-2xl border px-3 py-3 text-left transition-colors hover:bg-white/5 ${palette === option.id ? 'border-neonCyan/40 bg-white/5' : 'border-white/10 bg-white/5'}`}
                    >
                      <span className="flex items-center gap-1">
                        {option.swatches.map((color) => (
                          <span key={color} className="h-4 w-4 rounded-full border border-white/20" style={{ backgroundColor: color }} />
                        ))}
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-white">{option.label}</span>
                        <span className="block text-xs text-gray-400">Study-friendly accent</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-4 shrink-0" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}