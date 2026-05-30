import { useState } from 'react';
import { ArrowDown, BookOpen, Code2, Database, Rocket } from 'lucide-react';
import PageShell from '../components/PageShell';

const roadmaps = [
  {
    title: 'Frontend Engineer',
    rating: 4.8,
    placement: '92% placement',
    duration: '6-8 months',
    icon: Rocket,
    summary: 'Build user interfaces from zero to production-ready React applications.',
    learningPath: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js'],
  },
  {
    title: 'Data Analyst',
    rating: 4.6,
    placement: '88% placement',
    duration: '5-7 months',
    icon: Database,
    summary: 'Move from spreadsheet basics to analytics dashboards and reporting.',
    learningPath: ['Excel', 'SQL', 'Python', 'Pandas', 'Power BI'],
  },
  {
    title: 'AI/ML Engineer',
    rating: 4.9,
    placement: '95% placement',
    duration: '9-12 months',
    icon: Code2,
    summary: 'Learn the math and tooling needed to build machine learning systems.',
    learningPath: ['Python', 'Math & Stats', 'NumPy', 'Pandas', 'Machine Learning', 'Deep Learning', 'NLP'],
  },
];

export default function Roadmaps() {
  const [activeRoadmap, setActiveRoadmap] = useState(roadmaps[0]);

  return (
    <PageShell
      theme="roadmaps"
      eyebrow="Roadmaps"
      title="Roadmaps with rating and placement positioning"
      subtitle="Each roadmap is presented as a themed track with practical skills, timeline, and placement strength."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {roadmaps.map((roadmap) => {
          const Icon = roadmap.icon;
          const isActive = activeRoadmap.title === roadmap.title;

          return (
            <button
              key={roadmap.title}
              type="button"
              onClick={() => setActiveRoadmap(roadmap)}
              className={`rounded-3xl border p-6 text-left shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-transform hover:-translate-y-1 ${isActive ? 'border-neonCyan/50 bg-white/10' : 'border-white/10 bg-darkSurface/90'}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-neonCyan">
                    <Icon className="h-3.5 w-3.5" />
                    ROADMAP
                  </div>
                  <h3 className="mt-3 text-xl font-bold text-white">{roadmap.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-400">{roadmap.summary}</p>
                </div>
                <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-sm font-semibold text-neonCyan">
                  {roadmap.rating}
                </span>
              </div>

              <div className="mt-6 grid gap-3 text-sm text-gray-300">
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                  <span>Placement positioning</span>
                  <span className="font-semibold text-white">{roadmap.placement}</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                  <span>Duration</span>
                  <span className="font-semibold text-white">{roadmap.duration}</span>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {roadmap.learningPath.slice(0, 4).map((skill) => (
                  <span key={skill} className="rounded-full border border-neonCyan/20 bg-neonCyan/10 px-3 py-1 text-xs font-medium text-neonCyan">
                    {skill}
                  </span>
                ))}
              </div>

              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                Click to view learning graph
              </p>
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-3xl border border-white/10 bg-black/20 p-6 backdrop-blur-xl">
          <div className="flex items-center gap-2 text-neonCyan">
            <BookOpen className="h-5 w-5" />
            <span className="text-sm font-semibold uppercase tracking-[0.18em]">Roadmap tips</span>
          </div>
          <p className="mt-4 text-sm leading-7 text-gray-300">
            Use this page to guide students based on career goals, expected placement outcomes, and the skills they need to master next.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-darkSurface/90 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-neonCyan">Learning graph</p>
              <h2 className="mt-3 text-2xl font-bold text-white">{activeRoadmap.title}</h2>
              <p className="mt-2 text-sm text-gray-400">Start from the first language or tool and move downward in order.</p>
            </div>
            <ArrowDown className="h-5 w-5 text-neonCyan" />
          </div>

          <div className="mt-6 space-y-3">
            {activeRoadmap.learningPath.map((step, index) => (
              <div key={step} className="flex items-center gap-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full border ${index === 0 ? 'border-neonCyan/40 bg-neonCyan/15 text-neonCyan' : 'border-white/10 bg-black/20 text-gray-300'}`}>
                  {index + 1}
                </div>
                <div className="flex-1 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm font-medium text-white">
                  {step}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-neonCyan/20 bg-neonCyan/10 p-4 text-sm text-cyan-100">
            The first item is what you should learn first, then continue in order to build the full roadmap.
          </div>
        </div>
      </div>
    </PageShell>
  );
}