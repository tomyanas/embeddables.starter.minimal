import { useEmbeddables } from '@embeddables/core/react'
import { useForm, useFormField } from '@embeddables/forms/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import { usePageView } from '@/usePageView.ts'
import {
  clearAnswers,
  readAnswers,
  saveCompania,
  saveEnergia,
  saveHogar,
} from '@/funnel/answers.ts'
import { CatMark } from '@/funnel/CatMark.tsx'
import { chosenKitten } from '@/funnel/kittens.ts'
import { Choice, Frame, NextLink } from '@/funnel/Shell.tsx'

const CONTACT_FORM_ID = '00000000-0000-4000-8000-000000000001'

export function WelcomePage() {
  usePageView({ pageKey: 'bienvenida' })

  return (
    <Frame
      eyebrow="Cuatro pasos"
      title="Un gatito, no un catálogo."
      lede="Contestá tres preguntas y te presentamos al que mejor encaja con tu casa. El mail queda para el final."
    >
      <NextLink to="/quiz/energia">Empezar</NextLink>
    </Frame>
  )
}

export function EnergiaPage() {
  const navigate = useNavigate()
  usePageView({ pageKey: 'energia' })

  return (
    <Frame step={1} eyebrow="La casa" title="¿Cómo se siente un martes a la noche?">
      <Choice
        title="Calma"
        detail="Un libro, una lámpara, y nadie corre por el pasillo."
        onClick={() => {
          saveEnergia('calma')
          navigate('/quiz/hogar')
        }}
      />
      <Choice
        title="Juego"
        detail="Siempre hay alguien persiguiendo algo, aunque sea una tapa."
        onClick={() => {
          saveEnergia('juego')
          navigate('/quiz/hogar')
        }}
      />
    </Frame>
  )
}

export function HogarPage() {
  const navigate = useNavigate()
  usePageView({ pageKey: 'hogar' })

  return (
    <Frame step={2} eyebrow="El lugar" title="¿Dónde va a dormir la siesta?">
      <Choice
        title="Departamento"
        detail="Una ventana, un sillón, y el sol de las tres."
        onClick={() => {
          saveHogar('depto')
          navigate('/quiz/compania')
        }}
      />
      <Choice
        title="Casa"
        detail="Patio, macetas, y una puerta que se abre."
        onClick={() => {
          saveHogar('casa')
          navigate('/quiz/compania')
        }}
      />
    </Frame>
  )
}

export function CompaniaPage() {
  const navigate = useNavigate()
  usePageView({ pageKey: 'compania' })

  return (
    <Frame step={3} eyebrow="Vos" title="¿Qué querés que haga cuando llegás?">
      <Choice
        title="Que se suba y se quede"
        detail="Compañía de siesta. Poco teatro."
        onClick={() => {
          saveCompania('siesta')
          navigate('/quiz/descanso')
        }}
      />
      <Choice
        title="Que traiga un problema divertido"
        detail="Una hoja, un cordón, una carrera hasta la cocina."
        onClick={() => {
          saveCompania('travesura')
          navigate('/quiz/descanso')
        }}
      />
    </Frame>
  )
}

const REST_AD_LOAD_MS = 900

export function RestPage() {
  const navigate = useNavigate()
  usePageView({ pageKey: 'descanso' })
  const [adReady, setAdReady] = useState(false)
  const [continuing, setContinuing] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setAdReady(true), REST_AD_LOAD_MS)
    return () => window.clearTimeout(timer)
  }, [])

  // * Validation: the rest step sits between the quiz and the match, so it needs the quiz answers.
  const answers = readAnswers()
  if (answers.energia == null || answers.hogar == null || answers.compania == null) {
    return (
      <Frame
        eyebrow="Un momento"
        title="Faltan tus respuestas."
        lede="Para mostrarte a tu gatito necesitamos las tres respuestas del quiz."
      >
        <p role="alert" className="text-sm text-red-800">
          No encontramos tus respuestas guardadas.
        </p>
        <NextLink to="/quiz/energia">Volver al quiz</NextLink>
      </Frame>
    )
  }

  return (
    <Frame
      eyebrow="Un respiro"
      title="Tomate un segundo."
      lede="Estamos buscando al gatito que mejor encaja con tus respuestas."
    >
      <div
        data-slot="rest-ad-placeholder"
        role="status"
        aria-busy={!adReady}
        aria-label="Espacio publicitario"
        className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-[2rem] border border-dashed border-[#d9c6b2] bg-[#f6e6d6] sm:aspect-[16/9]"
      >
        {adReady ? (
          <div className="px-6 text-center">
            <p className="text-xs font-medium tracking-[0.14em] text-[#8a7564] uppercase">
              Publicidad
            </p>
            <p className="mt-2 text-base text-[#5c4d42]">Espacio reservado para el anuncio</p>
            <p className="mt-1 text-sm text-[#8a7564]">300 × 250 · placeholder</p>
          </div>
        ) : (
          <div className="absolute inset-0 animate-pulse bg-[#efdcc8]" />
        )}
      </div>
      <button
        type="button"
        disabled={continuing}
        className="w-full rounded-full bg-[#241c16] px-5 py-3 text-sm font-medium text-[#f7f1e8] hover:bg-[#3a2e24] disabled:cursor-not-allowed disabled:opacity-60 sm:w-fit"
        onClick={() => {
          if (continuing) return
          setContinuing(true)
          navigate('/match')
        }}
      >
        {continuing ? 'Preparando tu match…' : 'Ver a mi gatito'}
      </button>
    </Frame>
  )
}

export function MatchPage() {
  usePageView({ pageKey: 'match' })
  const kitten = chosenKitten(readAnswers())

  return (
    <Frame step={4} eyebrow="Tu match" title={`${kitten.name} te está esperando.`}>
      <article className="overflow-hidden rounded-[2rem] border border-[#eadccc] bg-[#fff8f1]">
        <div className="flex justify-center bg-[#f6e6d6] pt-4">
          <CatMark kitten={kitten} className="h-40 w-44" />
        </div>
        <div className="space-y-3 px-5 py-5">
          <p className="text-lg leading-snug">{kitten.line}</p>
          <p className="text-sm leading-relaxed text-[#5c4d42]">{kitten.story}</p>
          <p className="text-sm text-[#8a7564]">
            {kitten.coat} · {kitten.age}
          </p>
        </div>
      </article>
      <NextLink to="/reserva">Reservar una visita con {kitten.name}</NextLink>
    </Frame>
  )
}

export function ReservaPage() {
  const embeddables = useEmbeddables()
  const kitten = chosenKitten(readAnswers())
  usePageView({ pageKey: 'reserva' })
  const initError =
    embeddables?.isError && embeddables.error instanceof Error
      ? embeddables.error.message
      : embeddables?.isError
        ? 'Embeddables no pudo iniciar.'
        : null

  return (
    <Frame
      eyebrow={kitten.name}
      title="Dejá un nombre y un mail."
      lede={`Te escribimos para coordinar la visita. ${kitten.name} no contesta mensajes, así que lo hacemos nosotros.`}
    >
      {initError ? (
        <p className="text-sm text-red-800">{initError}</p>
      ) : embeddables == null ? (
        <p className="text-sm text-[#6d5b4d]">Cargando…</p>
      ) : (
        <VisitForm />
      )}
    </Frame>
  )
}

function VisitForm() {
  const navigate = useNavigate()
  const { form } = useForm({ formId: CONTACT_FORM_ID })
  const name = useFormField({ form, key: 'name' })
  const email = useFormField({ form, key: 'email' })
  const [submitError, setSubmitError] = useState<string | null>(null)

  return (
    <form
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault()
        setSubmitError(null)
        void form?.submit().then((result) => {
          if (result.ok) {
            navigate('/gracias')
            return
          }
          setSubmitError('Revisá el nombre y el mail.')
        })
      }}
    >
      <Field
        label="Nombre"
        value={(name.value as string | undefined) ?? ''}
        error={name.error?.[0]}
        onChange={(value) => name.setValue(value)}
        onBlur={() => void name.onBlur()}
      />
      <Field
        label="Mail"
        type="email"
        value={(email.value as string | undefined) ?? ''}
        error={email.error?.[0]}
        onChange={(value) => email.setValue(value)}
        onBlur={() => void email.onBlur()}
      />
      {submitError ? <p className="text-sm text-red-800">{submitError}</p> : null}
      <button
        type="submit"
        className="rounded-full bg-[#241c16] px-5 py-3 text-sm font-medium text-[#f7f1e8] hover:bg-[#3a2e24]"
      >
        Quiero la visita
      </button>
    </form>
  )
}

function Field({
  label,
  value,
  error,
  onChange,
  onBlur,
  type = 'text',
  autoComplete,
  disabled,
}: {
  label: string
  value: string
  error?: string
  onChange: (value: string) => void
  onBlur: () => void
  type?: string
  autoComplete?: string
  disabled?: boolean
}) {
  return (
    <label className="block space-y-1">
      <span className="text-sm font-medium">{label}</span>
      <input
        className="w-full rounded-2xl border border-[#eadccc] bg-white px-3 py-3 text-base outline-none focus:border-[#d4653a] disabled:opacity-60"
        type={type}
        value={value}
        autoComplete={autoComplete}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
      />
      {error ? <p className="text-sm text-red-800">{error}</p> : null}
    </label>
  )
}

export function GraciasPage() {
  const kitten = chosenKitten(readAnswers())
  usePageView({ pageKey: 'gracias' })

  return (
    <Frame
      eyebrow="Listo"
      title={`${kitten.name} ya tiene tu nombre.`}
      lede="Te escribimos para elegir un día. Si las respuestas no eran las tuyas, podés empezar de nuevo."
    >
      <button
        type="button"
        className="w-fit text-sm font-medium text-[#d4653a] underline-offset-4 hover:underline"
        onClick={() => {
          clearAnswers()
          window.location.assign('/')
        }}
      >
        Empezar de nuevo
      </button>
    </Frame>
  )
}

// * "Adopta" funnel: cold traffic -> short quiz -> match -> lead capture -> /gracias.
const ADOPTA_PATHS = {
  energia: '/adopta/energia',
  hogar: '/adopta/hogar',
  match: '/adopta/match',
  contacto: '/adopta/contacto',
} as const

const ADOPTA_PROOF_POINTS = [
  'Menos de un minuto',
  'Gatitos con historia real',
  'El mail queda para el final',
] as const

export function AdoptaLandingPage() {
  usePageView({ pageKey: 'adopta' })

  return (
    <Frame
      eyebrow="Adoptar con calma"
      title="Encontrá al gatito que encaja con tu casa."
      lede="Dos preguntas, un match y una visita. Sin catálogos eternos y sin compromiso."
    >
      <ul className="grid gap-3 sm:grid-cols-3">
        {ADOPTA_PROOF_POINTS.map((point) => (
          <li
            key={point}
            className="rounded-2xl border border-[#eadccc] bg-[#fff8f1] px-4 py-3 text-sm text-[#5c4d42]"
          >
            {point}
          </li>
        ))}
      </ul>
      <NextLink to={ADOPTA_PATHS.energia}>Encontrar mi match</NextLink>
    </Frame>
  )
}

export function AdoptaEnergiaPage() {
  const navigate = useNavigate()
  usePageView({ pageKey: 'adopta-energia' })

  return (
    <Frame step={1} eyebrow="La casa" title="¿Cómo se siente un martes a la noche?">
      <div className="grid gap-3 sm:grid-cols-2">
        <Choice
          title="Calma"
          detail="Un libro, una lámpara, y nadie corre por el pasillo."
          onClick={() => {
            saveEnergia('calma')
            navigate(ADOPTA_PATHS.hogar)
          }}
        />
        <Choice
          title="Juego"
          detail="Siempre hay alguien persiguiendo algo, aunque sea una tapa."
          onClick={() => {
            saveEnergia('juego')
            navigate(ADOPTA_PATHS.hogar)
          }}
        />
      </div>
    </Frame>
  )
}

export function AdoptaHogarPage() {
  const navigate = useNavigate()
  usePageView({ pageKey: 'adopta-hogar' })

  return (
    <Frame step={2} eyebrow="El lugar" title="¿Dónde va a dormir la siesta?">
      <div className="grid gap-3 sm:grid-cols-2">
        <Choice
          title="Departamento"
          detail="Una ventana, un sillón, y el sol de las tres."
          onClick={() => {
            saveHogar('depto')
            navigate(ADOPTA_PATHS.match)
          }}
        />
        <Choice
          title="Casa"
          detail="Patio, macetas, y una puerta que se abre."
          onClick={() => {
            saveHogar('casa')
            navigate(ADOPTA_PATHS.match)
          }}
        />
      </div>
    </Frame>
  )
}

export function AdoptaMatchPage() {
  usePageView({ pageKey: 'adopta-match' })
  const kitten = chosenKitten(readAnswers())

  return (
    <Frame step={3} eyebrow="Tu match" title={`${kitten.name} te está esperando.`}>
      <article className="overflow-hidden rounded-[2rem] border border-[#eadccc] bg-[#fff8f1]">
        <div className="flex justify-center bg-[#f6e6d6] pt-4">
          <CatMark kitten={kitten} className="h-40 w-44" />
        </div>
        <div className="space-y-3 px-5 py-5">
          <p className="text-lg leading-snug">{kitten.line}</p>
          <p className="text-sm leading-relaxed text-[#5c4d42]">{kitten.story}</p>
          <p className="text-sm text-[#8a7564]">
            {kitten.coat} · {kitten.age}
          </p>
        </div>
      </article>
      <NextLink to={ADOPTA_PATHS.contacto}>Quiero conocer a {kitten.name}</NextLink>
    </Frame>
  )
}

export function AdoptaContactoPage() {
  const embeddables = useEmbeddables()
  const kitten = chosenKitten(readAnswers())
  usePageView({ pageKey: 'adopta-contacto' })
  const initError =
    embeddables?.isError && embeddables.error instanceof Error
      ? embeddables.error.message
      : embeddables?.isError
        ? 'Embeddables no pudo iniciar.'
        : null

  return (
    <Frame
      step={4}
      eyebrow={kitten.name}
      title="¿A dónde te escribimos?"
      lede={`Dejá tu nombre y tu mail y te contamos cómo conocer a ${kitten.name}.`}
    >
      {initError ? (
        <p role="alert" className="text-sm text-red-800">
          {initError}
        </p>
      ) : embeddables == null ? (
        <p role="status" className="text-sm text-[#6d5b4d]">
          Cargando…
        </p>
      ) : (
        <AdoptaLeadForm />
      )}
    </Frame>
  )
}

function AdoptaLeadForm() {
  const navigate = useNavigate()
  const { form } = useForm({ formId: CONTACT_FORM_ID })
  const name = useFormField({ form, key: 'name' })
  const email = useFormField({ form, key: 'email' })
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  return (
    <form
      className="space-y-4"
      noValidate
      aria-busy={submitting}
      onSubmit={(event) => {
        event.preventDefault()
        if (form == null || submitting) return
        setSubmitError(null)
        setSubmitting(true)
        void form
          .submit()
          .then((result) => {
            if (result.ok) {
              navigate('/gracias')
              return
            }
            setSubmitError('Revisá el nombre y el mail.')
          })
          .catch(() => {
            setSubmitError('No pudimos enviar tus datos. Probá de nuevo en un momento.')
          })
          .finally(() => {
            setSubmitting(false)
          })
      }}
    >
      <Field
        label="Nombre"
        autoComplete="name"
        disabled={submitting}
        value={(name.value as string | undefined) ?? ''}
        error={name.error?.[0]}
        onChange={(value) => name.setValue(value)}
        onBlur={() => void name.onBlur()}
      />
      <Field
        label="Mail"
        type="email"
        autoComplete="email"
        disabled={submitting}
        value={(email.value as string | undefined) ?? ''}
        error={email.error?.[0]}
        onChange={(value) => email.setValue(value)}
        onBlur={() => void email.onBlur()}
      />
      {submitError ? (
        <p role="alert" className="text-sm text-red-800">
          {submitError}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={form == null || submitting}
        className="w-full rounded-full bg-[#241c16] px-5 py-3 text-sm font-medium text-[#f7f1e8] hover:bg-[#3a2e24] disabled:cursor-not-allowed disabled:opacity-60 sm:w-fit"
      >
        {submitting ? 'Enviando…' : 'Quiero conocerlo'}
      </button>
    </form>
  )
}
