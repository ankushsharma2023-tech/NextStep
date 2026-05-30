import { motion } from 'framer-motion';

const themeMap = {
  analytics: {
    accent: 'from-cyan-400 via-sky-500 to-blue-600',
    chip: 'text-cyan-300',
    backdrop: 'bg-[radial-gradient(circle_at_top_left,_rgba(var(--accent-cyan),0.18),_transparent_42%),radial-gradient(circle_at_bottom_right,_rgba(var(--accent-purple),0.14),_transparent_35%)]',
  },
  roadmaps: {
    accent: 'from-neonCyan via-white to-neonPurple',
    chip: 'text-neonCyan',
    backdrop: 'bg-[radial-gradient(circle_at_top_left,_rgba(var(--accent-cyan),0.18),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(var(--accent-purple),0.14),_transparent_35%)]',
  },
  reviews: {
    accent: 'from-rose-400 via-fuchsia-500 to-violet-600',
    chip: 'text-rose-300',
    backdrop: 'bg-[radial-gradient(circle_at_top_left,_rgba(var(--accent-cyan),0.16),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(var(--accent-purple),0.14),_transparent_35%)]',
  },
};

export default function PageShell({ theme, eyebrow, title, subtitle, children }) {
  const currentTheme = themeMap[theme] || themeMap.roadmaps;

  return (
    <main className="min-h-screen overflow-hidden bg-darkBg text-white">
      <div className={`relative isolate min-h-screen pt-28 ${currentTheme.backdrop}`}>
        <div className="absolute inset-0 bg-grid-pattern opacity-45" />
        <section className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mx-auto max-w-4xl text-center"
          >
            <p className={`text-sm font-semibold uppercase tracking-[0.24em] ${currentTheme.chip}`}>{eyebrow}</p>
            <h1 className={`mt-4 text-4xl font-extrabold tracking-tight md:text-6xl bg-gradient-to-r ${currentTheme.accent} bg-clip-text text-transparent`}>
              {title}
            </h1>
            <p className="mt-5 text-lg leading-8 text-gray-300">{subtitle}</p>
          </motion.div>

          <div className="mt-12">{children}</div>
        </section>
      </div>
    </main>
  );
}