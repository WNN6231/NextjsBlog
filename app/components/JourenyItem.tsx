'use client';

export function JourenyItem({ year, title, subtitle, location }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-2 md:gap-4 group">
      <div className="text-zinc-400 dark:text-zinc-500 text-sm tabular-nums">{year}</div>
      <div>
        <div className="font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-black dark:group-hover:text-white transition-colors">
          {title}
        </div>
        {subtitle && (
          <div className="text-zinc-500 dark:text-zinc-500 text-sm mt-1">
            {subtitle}
          </div>
        )}
        <div className="text-zinc-400 dark:text-zinc-600 text-[13px] mt-1 italic">
          {location}
        </div>
      </div>
    </div>
  );
}
