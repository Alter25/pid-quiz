import type { QuizCard } from './data/cards'

const THEME_KEY = 'pid-quiz-theme'
const PROGRESS_KEY = 'pid-quiz-progress-v1'

export type Theme = 'dark' | 'light'
export type Phase = 'start' | 'quiz' | 'results'

export type Progress = {
  phase: Phase
  deckIds: string[]
  index: number
  correct: number
}

export function loadTheme(): Theme {
  try {
    return localStorage.getItem(THEME_KEY) === 'light' ? 'light' : 'dark'
  } catch {
    return 'dark'
  }
}

export function saveTheme(theme: Theme) {
  try {
    localStorage.setItem(THEME_KEY, theme)
  } catch {
    // localStorage unavailable (private mode, quota, etc.) — theme just won't persist
  }
}

export function loadProgress(): Progress | null {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (
      !parsed ||
      (parsed.phase !== 'quiz' && parsed.phase !== 'results') ||
      !Array.isArray(parsed.deckIds) ||
      typeof parsed.index !== 'number' ||
      typeof parsed.correct !== 'number'
    ) {
      return null
    }
    return parsed as Progress
  } catch {
    return null
  }
}

export function saveProgress(progress: Progress) {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress))
  } catch {
    // localStorage unavailable — progress just won't persist
  }
}

export function clearProgress() {
  try {
    localStorage.removeItem(PROGRESS_KEY)
  } catch {
    // ignore
  }
}

/** Rebuilds a deck from stored ids; returns [] if any id no longer exists in cards.ts. */
export function resolveDeck(deckIds: string[], allCards: QuizCard[]): QuizCard[] {
  const byId = new Map(allCards.map(card => [card.id, card]))
  const deck: QuizCard[] = []
  for (const id of deckIds) {
    const card = byId.get(id)
    if (!card) return []
    deck.push(card)
  }
  return deck
}
