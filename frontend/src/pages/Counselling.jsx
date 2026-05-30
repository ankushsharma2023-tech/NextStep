import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, GraduationCap, School, ShieldCheck, Sparkles } from 'lucide-react';
import PageShell from '../components/PageShell';

const counsellingOptions = [
  {
    id: 'after-12th',
    title: 'After 12th',
    description: 'Get help choosing courses, entrance routes, and career directions after school.',
    icon: GraduationCap,
    points: ['Choose stream-wise career paths', 'Understand admission and entrance exams', 'Plan skill-building for the first year'],
    to: '/counselling#after-12th',
  },
  {
    id: 'college-guidance',
    title: 'College Guidance',
    description: 'Get advice on course selection, campus fit, placements, and what to improve before admissions or transfers.',
    icon: School,
    points: ['Compare colleges by placement and rating', 'Check branch fit and campus environment', 'Plan internships and career readiness'],
    to: '/counselling#college-guidance',
  },
];

export default function Counselling() {
  const premiumPlans = [
    {
      name: 'Counselling Premium',
      price: '₹49',
      subtitle: 'For after 12th guidance and basic counselling support',
      accent: 'from-cyan-400 to-blue-600',
      features: ['After 12th guidance', 'Career direction support', 'Quick recommendations', 'One-time premium access'],
    },
    {
      name: 'College Counselling Premium',
      price: '₹100',
      subtitle: 'For detailed college guidance and college fit analysis',
      accent: 'from-rose-400 to-fuchsia-600',
      features: ['College comparison help', 'Branch and placement guidance', 'Review-based suggestions', 'Priority counselling access'],
    },
  ];

  return (
    <PageShell
      theme="analytics"
      eyebrow="Counselling"
      title="Choose the counselling track you need"
      subtitle="Pick one of the two options below to get focused guidance for your next education step."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {counsellingOptions.map((option) => {
          const Icon = option.icon;

          return (
            <section
              key={option.id}
              id={option.id}
              className="rounded-3xl border border-white/10 bg-black/20 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
                    <Icon className="h-3.5 w-3.5" />
                    Option
                  </div>
                  <h2 className="mt-3 text-2xl font-bold text-white">{option.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-gray-300">{option.description}</p>
                </div>
              </div>

              <ul className="mt-6 space-y-3 text-sm text-gray-300">
                {option.points.map((point) => (
                  <li key={point} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    {point}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-center justify-between gap-4">
                <Link
                  to={option.to}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-neonCyan to-neonPurple px-5 py-3 text-sm font-bold text-black transition-transform hover:scale-[1.01]"
                >
                  Open {option.title}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </section>
          );
        })}
      </div>

      <div className="mt-10 rounded-3xl border border-white/10 bg-black/20 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-neonCyan">
              <ShieldCheck className="h-3.5 w-3.5" />
              Premium Features
            </div>
            <h2 className="mt-3 text-2xl font-bold text-white">Unlock guided support with one-time subscription plans</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-300">
              Choose the premium option that matches your stage. These plans can later be connected to a payment gateway for live checkout.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-neonCyan/20 bg-neonCyan/10 px-4 py-2 text-sm font-medium text-cyan-100">
            <Sparkles className="h-4 w-4" />
            Simple one-time pricing
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {premiumPlans.map((plan) => (
            <article key={plan.name} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  <p className="mt-2 text-sm text-gray-300">{plan.subtitle}</p>
                </div>
                <span className={`rounded-full bg-gradient-to-r ${plan.accent} px-4 py-2 text-lg font-extrabold text-black`}>
                  {plan.price}
                </span>
              </div>

              <ul className="mt-6 space-y-3 text-sm text-gray-300">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                    <CheckCircle2 className="h-4 w-4 text-neonCyan" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-neonCyan to-neonPurple px-5 py-3 text-sm font-bold text-black transition-transform hover:scale-[1.01]"
              >
                Subscribe now
                <ArrowRight className="h-4 w-4" />
              </button>
            </article>
          ))}
        </div>
      </div>
    </PageShell>
  );
}