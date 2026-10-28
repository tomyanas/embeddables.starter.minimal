import type { Answers, Compania, Energia, Hogar } from '@/funnel/kittens.ts'

const STORAGE_KEY = 'casa-mishi-answers'

export function readAnswers(): Answers {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (raw == null) return {}
    const parsed: unknown = JSON.parse(raw)
    if (parsed == null || typeof parsed !== 'object') return {}
    return parsed as Answers
  } catch {
    return {}
  }
}

function writeAnswers(answers: Answers) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(answers))
}

export function saveEnergia(value: Energia) {
  writeAnswers({ ...readAnswers(), energia: value })
}

export function saveHogar(value: Hogar) {
  writeAnswers({ ...readAnswers(), hogar: value })
}

export function saveCompania(value: Compania) {
  writeAnswers({ ...readAnswers(), compania: value })
}

export function clearAnswers() {
  sessionStorage.removeItem(STORAGE_KEY)
}
