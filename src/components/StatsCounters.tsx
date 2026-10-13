import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';

export interface Stat {
  value: string;
  label: string;
}

interface Props {
  items: Stat[];
  tone?: 'dark' | 'light';
}

function parseValue(value: string) {
  const match = value.match(/^(\D*)(\d[\d,]*)(.*)$/);
  if (!match) return { prefix: '', target: null as number | null, suffix: value };
  const target = Number(match[2].replace(/,/g, ''));
  return { prefix: match[1], target: Number.isFinite(target) ? target : null, suffix: match[3] };
}

function StatItem({
  stat,
  run,
  tone,
  delay,
}: {
  stat: Stat;
  run: boolean;
  tone: 'dark' | 'light';
  delay: number;
}) {
  const { prefix, target, suffix } = parseValue(stat.value);
  const [value, setValue] = useState(target ?? 0);
  const frame = useRef(0);

  useLayoutEffect(() => {
    if (!run || target === null) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target);
      return;
    }
    const duration = 1500;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setValue(target * (1 - Math.pow(1 - p, 4)));
      if (p < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [run, target]);

  const display = target === null ? stat.value : `${prefix}${Math.round(value)}${suffix}`;
  const labelTone = tone === 'light' ? 'text-cream/60' : 'text-muted';

  return (
    <div
      data-reveal
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
      className="flex flex-col gap-2"
    >
      <dt className="sr-only">{stat.label}</dt>
      <dd className="flex flex-col gap-2">
        <span className="text-gold-gradient font-display text-4xl leading-none tabular-nums md:text-5xl">
          {display}
        </span>
        <span className={`font-mono text-[0.68rem] uppercase tracking-[0.16em] ${labelTone}`}>
          {stat.label}
        </span>
      </dd>
    </div>
  );
}

export default function StatsCounters({ items, tone = 'dark' }: Props) {
  const ref = useRef<HTMLDListElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || run) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [run]);

  return (
    <dl ref={ref} className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
      {items.map((stat, i) => (
        <StatItem key={stat.label} stat={stat} run={run} tone={tone} delay={i * 90} />
      ))}
    </dl>
  );
}
