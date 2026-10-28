import type { ReactNode } from 'react'
import { Link } from 'react-router'

export function Frame({
  step,
  eyebrow,
  title,
  lede,
  children,
}: {
  step?: number
  eyebrow: string
  title: string
  lede?: string
  children: ReactNode
}) {
  return (
    <main className="mx-auto flex min-h-svh w-full max-w-xl flex-col px-5 py-8 sm:px-8">
      <header className="flex items-center justify-between gap-4">
        <p className="text-sm font-medium tracking-[0.14em] uppercase">Casa Mishi</p>
        {step != null ? <p className="text-sm text-[#8a7564]">{step} de 4</p> : <span />}
      </header>
      <div className="flex flex-1 flex-col justify-center py-10">
        <p className="text-sm font-medium text-[#d4653a]">{eyebrow}</p>
        <h1 className="mt-3 text-4xl leading-[1.05] font-medium tracking-tight sm:text-5xl">
          {title}
        </h1>
        {lede ? (
          <p className="mt-4 max-w-md text-lg leading-relaxed text-[#5c4d42]">{lede}</p>
        ) : null}
        <div className="mt-8 flex flex-col gap-3">{children}</div>
      </div>
    </main>
  )
}

export function Choice({
  title,
  detail,
  onClick,
}: {
  title: string
  detail: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-3xl border border-[#eadccc] bg-[#fff8f1] px-5 py-4 text-left transition hover:-translate-y-0.5 hover:border-[#d4653a]"
    >
      <span className="block text-lg font-medium">{title}</span>
      <span className="mt-1 block text-sm leading-relaxed text-[#6d5b4d]">{detail}</span>
    </button>
  )
}

export function NextLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="inline-flex w-fit rounded-full bg-[#241c16] px-5 py-3 text-sm font-medium text-[#f7f1e8] hover:bg-[#3a2e24]"
    >
      {children}
    </Link>
  )
}
