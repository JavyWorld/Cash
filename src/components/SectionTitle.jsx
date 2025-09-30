export function SectionTitle({ eyebrow, title, description, align = 'left' }) {
  return (
    <div className={`space-y-3 ${align === 'center' ? 'text-center max-w-3xl mx-auto' : ''}`}>
      {eyebrow && (
        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-400">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white drop-shadow">
        {title}
      </h2>
      {description && <p className="text-slate-300 text-lg leading-relaxed">{description}</p>}
    </div>
  );
}
