import type { Kitten } from '@/funnel/kittens.ts'

export function CatMark({ kitten, className = '' }: { kitten: Kitten; className?: string }) {
  const light = kitten.fur === '#f7f1e8' || kitten.fur === '#c7bfb4'
  const ink = light ? '#241c16' : '#f6efe6'

  return (
    <svg viewBox="0 0 160 140" className={className} aria-hidden="true">
      <ellipse cx="80" cy="118" rx="46" ry="10" fill="#e6d3c2" />
      <path d="M48 58 38 22l28 18" fill={kitten.ear} />
      <path d="M112 58 122 22 94 40" fill={kitten.ear} />
      <circle cx="80" cy="72" r="42" fill={kitten.fur} />
      <ellipse cx="62" cy="74" rx="7" ry="8" fill={ink} />
      <ellipse cx="98" cy="74" rx="7" ry="8" fill={ink} />
      <ellipse cx="64" cy="72" rx="2" ry="2.4" fill={light ? '#fff8f1' : '#f3c98a'} />
      <ellipse cx="100" cy="72" rx="2" ry="2.4" fill={light ? '#fff8f1' : '#f3c98a'} />
      <path d="M80 82c4 4 4 8 0 10-4-2-4-6 0-10z" fill="#d4653a" />
      <path
        d="M80 90c-10 6-16 6-22 2M80 90c10 6 16 6 22 2"
        fill="none"
        stroke={ink}
        strokeWidth="2"
      />
      <path d="M28 78h18M114 78h18" stroke={ink} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
