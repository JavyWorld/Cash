import { useState } from 'react';
import { PhotoIcon } from '@heroicons/react/24/outline';
import { portfolioItems } from '../data/portfolio.js';
import { reviews as defaultReviews } from '../data/reviews.js';
import { SectionTitle } from './SectionTitle.jsx';

export function PortfolioSection() {
  const [reviews, setReviews] = useState(defaultReviews);
  const [form, setForm] = useState({ name: '', event: '', comment: '', rating: 5 });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.name || !form.comment) return;
    const newReview = {
      id: `rv-${Date.now()}`,
      ...form,
      date: new Date().toLocaleDateString(undefined, { month: 'long', year: 'numeric' }),
    };
    setReviews((prev) => [newReview, ...prev]);
    setForm({ name: '', event: '', comment: '', rating: 5 });
  };

  return (
    <section id="portfolio" className="mx-auto mt-24 max-w-7xl space-y-16 px-6">
      <div className="space-y-8">
        <SectionTitle
          eyebrow="Portfolio"
          title="Moments we have brought to life"
          description="A peek into the immersive environments we craft for weddings, social milestones, corporate gatherings and everything in between."
          align="center"
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {portfolioItems.map((item) => (
            <article
              key={item.id}
              className="group relative overflow-hidden rounded-3xl border border-white/5 bg-white/5 shadow-2xl shadow-black/20"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="h-64 w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="space-y-3 p-6">
                <div className="flex flex-wrap gap-2 text-[0.65rem] uppercase tracking-[0.25em] text-brand-200">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-brand-500/40 bg-brand-500/10 px-3 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-display text-xl text-white">{item.title}</h3>
                <p className="text-sm text-slate-300">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div id="reviews" className="grid gap-12 lg:grid-cols-[1fr_minmax(0,1.2fr)]">
        <div className="space-y-6">
          <SectionTitle
            eyebrow="Reviews"
            title="Clients share their experiences"
            description="Hear from hosts and planners who trusted Celebration Cash to manage every detail of their event."
          />
          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-3xl border border-white/5 bg-white/5 p-6 backdrop-blur"
          >
            <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-300">Leave a review</h4>
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                type="text"
                required
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                placeholder="Your name"
                className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-400"
              />
              <input
                type="text"
                value={form.event}
                onChange={(event) => setForm((prev) => ({ ...prev, event: event.target.value }))}
                placeholder="Event type"
                className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-400"
              />
            </div>
            <div className="flex items-center gap-4">
              <label className="text-sm font-semibold text-slate-200">Rating</label>
              <input
                type="range"
                min="1"
                max="5"
                value={form.rating}
                onChange={(event) => setForm((prev) => ({ ...prev, rating: Number(event.target.value) }))}
              />
              <span className="text-sm text-brand-200">{form.rating} / 5</span>
            </div>
            <textarea
              required
              rows="4"
              value={form.comment}
              onChange={(event) => setForm((prev) => ({ ...prev, comment: event.target.value }))}
              placeholder="Share how we helped bring your celebration to life."
              className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-400"
            />
            <button
              type="submit"
              className="w-full rounded-full bg-gradient-to-r from-brand-500 to-brand-700 px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-white shadow-lg shadow-brand-500/30"
            >
              Publish review
            </button>
          </form>
        </div>
        <div className="space-y-4">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="rounded-3xl border border-white/5 bg-slate-950/60 p-6 shadow-xl shadow-black/20"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-500/20">
                  <PhotoIcon className="h-6 w-6 text-brand-200" />
                </div>
                <div>
                  <h4 className="text-white">{review.name}</h4>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    {review.event || 'Private event'} · {review.date}
                  </p>
                </div>
                <div className="ml-auto text-sm font-semibold text-brand-200">{'★'.repeat(review.rating)}</div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-200">{review.comment}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
