import { Reveal } from './reveal';

export function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <Reveal className="mb-8 relative z-10">
      <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-center tracking-tight">
        <span className="gradient-text">{title}</span>
      </h2>
      {subtitle && (
        <p className="text-white/60 text-center mt-4 max-w-2xl mx-auto text-base md:text-lg px-4">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
