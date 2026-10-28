import { useEmbeddables } from '@embeddables/core/react'
import { useForm, useFormField } from '@embeddables/forms/react'
import { useState } from 'react'
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
          navigate('/match')
        }}
      />
      <Choice
        title="Que traiga un problema divertido"
        detail="Una hoja, un cordón, una carrera hasta la cocina."
        onClick={() => {
          saveCompania('travesura')
          navigate('/match')
        }}
      />
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
}: {
  label: string
  value: string
  error?: string
  onChange: (value: string) => void
  onBlur: () => void
  type?: string
}) {
  return (
    <label className="block space-y-1">
      <span className="text-sm font-medium">{label}</span>
      <input
        className="w-full rounded-2xl border border-[#eadccc] bg-white px-3 py-3 text-base outline-none focus:border-[#d4653a]"
        type={type}
        value={value}
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
