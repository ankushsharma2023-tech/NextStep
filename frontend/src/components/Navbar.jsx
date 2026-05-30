import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BrainCircuit, ChevronDown, MoonStar, Palette, SunMedium } from 'lucide-react';

const paletteOptions = [
  {
    id: 'ocean',
    label: 'Ocean',
    swatches: ['#00F2FE', '#4FACFE'],
  },
  {
    id: 'aurora',
    label: 'Aurora',
    swatches: ['#2DD4BF', '#3B82F6'],
  },
  {
    id: 'sunset',
    label: 'Sunset',
    swatches: ['#FB923C', '#F472B6'],
  },
  {
    id: 'royal',
    label: 'Royal',
    swatches: ['#818CF8', '#A78BFA'],
  },
  {
    id: 'mint',
    label: 'Mint',
    swatches: ['#34D399', '#22C55E'],
  },
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
  const [counsellingOpen, setCounsellingOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const paletteMenuRef = useRef(null);

  useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem('nextstep-theme', theme);
  }, [theme]);

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

  const applyPalette = (nextPalette) => {
    setPalette(nextPalette);
    setPaletteOpen(false);
  };

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (paletteMenuRef.current && !paletteMenuRef.current.contains(event.target)) {
        setPaletteOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);

    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-darkSurface/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-neonCyan/30 bg-darkSurface text-neonCyan"
            style={{ boxShadow: '0 0 24px rgb(var(--accent-cyan) / 0.18)' }}
          >
            <BrainCircuit className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium tracking-[0.22em] text-gray-400 uppercase">
              NextStep
            </p>
            <p className="text-sm text-gray-400">AI Career Companion</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-gray-300 md:flex">
          <Link to="/roadmaps" className="transition-colors hover:text-white">
            Roadmaps
          </Link>
          <Link to="/analytics" className="transition-colors hover:text-white">
            Analytics
          </Link>
          <Link to="/college-reviews" className="transition-colors hover:text-white">
            Reviews
          </Link>
          <div className="relative">
            <button
              type="button"
              onClick={() => setCounsellingOpen((current) => !current)}
              className="inline-flex items-center gap-1 transition-colors hover:text-white"
            >
              Counselling
              <ChevronDown className="h-4 w-4" />
            </button>

            {counsellingOpen ? (
              <div className="absolute left-0 top-full mt-3 w-56 rounded-2xl border border-white/10 bg-darkSurface/95 p-2 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                <Link
                  to="/counselling#after-12th"
                  onClick={() => setCounsellingOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
                >
                  After 12th
                </Link>
                <Link
                  to="/counselling#college-guidance"
                  onClick={() => setCounsellingOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
                >
                  College Guidance
                </Link>
              </div>
            ) : null}
          </div>
        </nav>

        <div className="flex items-center gap-3">
          <div className="relative" ref={paletteMenuRef}>
            <button
              type="button"
              onClick={() => setPaletteOpen((current) => !current)}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-white/25 hover:bg-white/5"
              aria-label="Choose color palette"
            >
              <Palette className="h-4 w-4" />
              Palette
            </button>

            {paletteOpen ? (
              <div className="absolute right-0 top-full mt-3 w-64 rounded-2xl border border-white/10 bg-darkSurface/95 p-2 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                <div className="px-3 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-gray-400">
                  Color palette
                </div>
                {paletteOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => applyPalette(option.id)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-white/5 ${palette === option.id ? 'bg-white/5' : ''}`}
                  >
                    <span className="flex items-center gap-1">
                      {option.swatches.map((color) => (
                        <span
                          key={color}
                          className="h-4 w-4 rounded-full border border-white/20"
                          style={{ backgroundColor: color }}
                        />
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
                    <p className="text-xs leading-5 text-gray-400">
                      Pick your own two accent colors. The site updates instantly.
                    </p>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <button
            type="button"
            onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-white/25 hover:bg-white/5"
            aria-label="Toggle light and dark mode"
          >
            {theme === 'dark' ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </button>
          <Link
            to="/login"
            className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-white/25 hover:bg-white/5"
          >
            Log in
          </Link>
          <button
            className="rounded-full bg-gradient-to-r from-neonCyan to-neonPurple px-4 py-2 text-sm font-bold text-black transition-transform hover:scale-[1.02]"
            style={{ boxShadow: '0 0 28px rgb(var(--accent-cyan) / 0.2)' }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </motion.header>
  );
}