import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Code, BrainCircuit, Building2, Sparkles } from 'lucide-react';

export default function Landing() {
  const features = [
    {
      icon: Building2,
      color: 'text-neonCyan',
      title: 'College Analytics',
      desc: 'Cross-reference placement data, fees, and campus metrics in real-time.',
    },
    {
      icon: BrainCircuit,
      color: 'text-neonPurple',
      title: 'Neural Roadmaps',
      desc: 'Dynamic learning paths that adapt to your pace and chosen tech stack.',
    },
    {
      icon: Code,
      color: 'text-neonCyan',
      title: 'Daily Algorithms',
      desc: 'Maintain your coding streak with ATS-vetted DSA challenges.',
    },
  ];

  const highlights = [
    { label: 'Analytics', to: '/analytics', desc: 'Placement insights and student progress' },
    { label: 'Roadmaps', to: '/roadmaps', desc: 'Role-based learning tracks' },
    { label: 'Reviews', to: '/college-reviews', desc: 'Student college feedback' },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-darkBg text-white">
      <div className="relative isolate min-h-screen pt-24">
        <div className="absolute inset-0 bg-grid-pattern opacity-60" />

        <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-neonCyan/15 blur-3xl" />
        <div className="absolute right-16 top-48 h-80 w-80 rounded-full bg-neonPurple/10 blur-3xl" />
        <div className="absolute left-10 bottom-10 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

        <section className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-4 pb-20 pt-16 text-center sm:px-6 lg:px-8 lg:pt-24">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-darkSurface px-4 py-2 text-sm font-semibold text-neonCyan"
            style={{ boxShadow: '0 0 24px rgba(var(--accent-cyan), 0.12)' }}
          >
            <Sparkles className="h-4 w-4" />
            Welcome to NextStep 1.0
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="max-w-5xl text-5xl font-extrabold leading-tight text-transparent md:text-7xl bg-clip-text bg-gradient-to-r from-neonCyan via-white to-neonPurple"
          >
            Your AI Career &amp; College Guide
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-6 max-w-2xl text-lg text-gray-400 md:text-xl"
          >
            Navigate your future with AI-driven roadmaps, intelligent college comparisons, and curated internship placements.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <Link
              to="/analytics"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-neonCyan to-neonPurple px-8 py-3 font-bold text-black transition-transform hover:scale-[1.02]"
              style={{ boxShadow: '0 0 28px rgba(var(--accent-cyan), 0.2)' }}
            >
              Get Started
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link to="/roadmaps" className="rounded-lg border border-white/10 bg-darkSurface px-8 py-3 font-semibold text-white transition-colors hover:border-neonCyan/50 hover:bg-white/5">
              Explore Roadmaps
            </Link>
          </motion.div>
        </section>

        <section className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-3">
          {highlights.map((item) => (
            <Link key={item.label} to={item.to} className="rounded-2xl border border-white/10 bg-darkSurface/90 p-5 text-left transition-transform hover:-translate-y-1 hover:border-neonCyan/30">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neonCyan">{item.label}</p>
              <h2 className="mt-3 text-xl font-bold text-white">{item.desc}</h2>
              <p className="mt-2 text-sm text-gray-400">Open the dedicated themed page.</p>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}