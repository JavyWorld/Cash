import { SectionTitle } from './SectionTitle.jsx';

const pillars = [
  {
    title: 'End-to-end production',
    description:
      'From our first discovery call to the final sweep of confetti, Celebration Cash handles design, rentals, catering, staffing and logistics in-house.',
  },
  {
    title: 'Curated rental inventory',
    description:
      'Premium lounge groupings, luxury dining sets, linens, installations and custom décor elements ready to be tailored to your event vision.',
  },
  {
    title: 'Culinary experiences',
    description:
      'Chef-driven menus spanning plated dinners, interactive stations, cocktail hours and late-night bites crafted to wow every guest.',
  },
];

export function AboutSection() {
  return (
    <section id="about" className="mx-auto mt-24 max-w-7xl px-6">
      <div className="rounded-3xl border border-white/5 bg-white/5 p-8 backdrop-blur">
        <SectionTitle
          eyebrow="About us"
          title="We are Celebration Cash Party Rentals"
          description="A team of stylists, producers, chefs and logisticians dedicated to crafting seamless celebrations across the region."
        />
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <article
              key={pillar.title}
              className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-lg shadow-black/20"
            >
              <h3 className="font-display text-xl text-white">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{pillar.description}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-[0.65fr_1fr]">
          <div className="rounded-3xl border border-brand-500/40 bg-brand-500/10 p-6 text-brand-50">
            <h4 className="font-display text-2xl">Our promise</h4>
            <p className="mt-3 text-sm leading-relaxed">
              We combine creative artistry with logistical precision. That means your décor is breathtaking, your catering is
              on-time and delicious, and your guests experience hospitality at every turn.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
              <p className="text-4xl font-semibold text-white">12+</p>
              <p className="mt-2 text-sm uppercase tracking-[0.3em] text-slate-400">Years orchestrating events</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
              <p className="text-4xl font-semibold text-white">450+</p>
              <p className="mt-2 text-sm uppercase tracking-[0.3em] text-slate-400">Celebrations styled annually</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
              <p className="text-4xl font-semibold text-white">98%</p>
              <p className="mt-2 text-sm uppercase tracking-[0.3em] text-slate-400">Client satisfaction rating</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6">
              <p className="text-4xl font-semibold text-white">24/7</p>
              <p className="mt-2 text-sm uppercase tracking-[0.3em] text-slate-400">Support during your event</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
