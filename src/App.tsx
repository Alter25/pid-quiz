import { useState, useCallback, useEffect } from 'react'
import { allCards, shuffleCards } from './data/cards'
import type { QuizCard } from './data/cards'
import { QuizCard as QuizCardComponent } from './components/QuizCard'
import { ResultsScreen } from './components/ResultsScreen'
import { StartScreen } from './components/StartScreen'
import { PALETTES } from './theme'
import { loadTheme, saveTheme, loadProgress, saveProgress, clearProgress, resolveDeck } from './storage'
import type { Phase } from './storage'

export type Mode = 'all' | 'symbol' | 'text'

const restoredProgress = loadProgress()
const restoredDeck = restoredProgress ? resolveDeck(restoredProgress.deckIds, allCards) : []
const canRestore =
  restoredProgress !== null &&
  restoredDeck.length === restoredProgress.deckIds.length &&
  (restoredProgress.phase !== 'quiz' || restoredProgress.index < restoredDeck.length)

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(loadTheme)
  const [phase, setPhase] = useState<Phase>(canRestore ? restoredProgress!.phase : 'start')
  const [deck, setDeck] = useState<QuizCard[]>(canRestore ? restoredDeck : [])
  const [index, setIndex] = useState(canRestore ? restoredProgress!.index : 0)
  const [correct, setCorrect] = useState(canRestore ? restoredProgress!.correct : 0)

  const c = PALETTES[theme]
  const themeIcon = theme === 'dark' ? '☀' : '☾'
  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  function startGame(mode: Mode) {
    const cards = mode === 'all' ? allCards : allCards.filter(card => card.type === mode)
    setDeck(shuffleCards(cards))
    setIndex(0)
    setCorrect(0)
    setPhase('quiz')
  }

  const handleAnswer = useCallback((wasCorrect: boolean) => {
    if (wasCorrect) setCorrect(c => c + 1)
  }, [])

  const handleNext = useCallback(() => {
    if (index + 1 >= deck.length) setPhase('results')
    else setIndex(i => i + 1)
  }, [index, deck.length])

  function restart() {
    setPhase('start')
    setDeck([])
    setIndex(0)
    setCorrect(0)
  }

  useEffect(() => { saveTheme(theme) }, [theme])

  useEffect(() => {
    if (phase === 'start') {
      clearProgress()
      return
    }
    saveProgress({ phase, deckIds: deck.map(card => card.id), index, correct })
  }, [phase, deck, index, correct])

  return (
    <div style={{
      minHeight: '100vh', width: '100%',
      display: 'flex', justifyContent: 'center',
      padding: '48px 20px',
      background: c.pageBg,
      fontFamily: "'Manrope', sans-serif",
      transition: 'background 0.3s ease',
    }}>
      {phase === 'start' && (
        <StartScreen c={c} onStart={startGame} onToggleTheme={toggleTheme} themeIcon={themeIcon} />
      )}
      {phase === 'quiz' && deck.length > 0 && (
        <QuizCardComponent
          key={`${index}-${deck[index].id}`}
          card={deck[index]}
          cardNumber={index + 1}
          total={deck.length}
          c={c}
          onAnswer={handleAnswer}
          onNext={handleNext}
        />
      )}
      {phase === 'results' && (
        <ResultsScreen
          correct={correct}
          total={deck.length}
          c={c}
          onRestart={restart}
          onToggleTheme={toggleTheme}
          themeIcon={themeIcon}
        />
      )}
    </div>
  )
}
