import { BarChart3, CheckCircle2, TrendingUp, Users } from 'lucide-react';
import PageShell from '../components/PageShell';

const stats = [
  { label: 'Active students', value: '12.8k', icon: Users },
  { label: 'Roadmap completion', value: '74%', icon: CheckCircle2 },
  { label: 'Placement lift', value: '+18%', icon: TrendingUp },
  { label: 'College reviews', value: '1.2k', icon: BarChart3 },
];

const insights = [
  'Students who complete the frontend roadmap get the highest interview callback rate.',
  'Colleges with above 4.5 ratings also show stronger internship conversion.',
  'Portfolio projects remain the strongest signal for analytics and product roles.',
];

export default function Analytics() {
  return (
    <PageShell
      theme="analytics"
      eyebrow="Analytics"
      title="Student analytics designed for placement decisions"
      subtitle="Track student progress, review trends, and placement-ready skills across the platform with a cooler blue theme."
    >
      <div className="grid gap-6 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between text-cyan-300">
                <Icon className="h-5 w-5" />
                <span className="text-3xl font-extrabold text-white">{stat.value}</span>
              </div>
              <p className="mt-6 text-sm uppercase tracking-[0.2em] text-gray-400">{stat.label}</p>
            </article>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-3xl border border-white/10 bg-black/20 p-6 backdrop-blur-xl">
          <h2 className="text-2xl font-bold text-white">Key insights</h2>
          <div className="mt-5 space-y-4 text-sm leading-7 text-gray-300">
            {insights.map((insight) => (
              <p key={insight} className="rounded-2xl border border-white/10 bg-white/5 p-4">{insight}</p>
            ))}
          </div>
        </article>

        <article className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <h2 className="text-2xl font-bold text-white">Analytics theme</h2>
          <p className="mt-4 text-sm leading-7 text-gray-300">
            This page intentionally uses a cooler visual language so metrics feel distinct from the roadmap and review pages.
          </p>
          <div className="mt-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-5 text-sm text-cyan-100">
            You can later connect this page to live dashboard data from MongoDB or your analytics service.
          </div>
        </article>
      </div>
    </PageShell>
  );
}