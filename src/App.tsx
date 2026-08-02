import { useState, useCallback } from 'react'
import { allCards, shuffleCards } from './data/cards'
import type { QuizCard } from './data/cards'
import { QuizCard as QuizCardComponent } from './components/QuizCard'
import { ResultsScreen } from './components/ResultsScreen'
import { StartScreen } from './components/StartScreen'
import { PALETTES } from './theme'

type Phase = 'start' | 'quiz' | 'results'

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [phase, setPhase] = useState<Phase>('start')
  const [deck, setDeck] = useState<QuizCard[]>([])
  const [index, setIndex] = useState(0)
  const [correct, setCorrect] = useState(0)

  const c = PALETTES[theme]
  const themeIcon = theme === 'dark' ? '☀' : '☾'
  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  function startGame(allMode: boolean) {
    const cards = allMode ? allCards : allCards.filter(c => c.type === 'symbol')
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
          onRestart={() => setPhase('start')}
          onToggleTheme={toggleTheme}
          themeIcon={themeIcon}
        />
      )}
    </div>
  )
}
