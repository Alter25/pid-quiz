import { useState } from 'react'
import type { QuizCard as QuizCardType } from '../data/cards'
import type { Palette } from '../theme'
import { ImageWithRetry } from './ImageWithRetry'

type Props = {
  card: QuizCardType
  cardNumber: number
  total: number
  c: Palette
  onAnswer: (correct: boolean) => void
  onNext: () => void
}

export function QuizCard({ card, cardNumber, total, c, onAnswer, onNext }: Props) {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [answered, setAnswered] = useState(false)
  const [skipped, setSkipped] = useState(false)

  const correctIds = new Set(card.options.filter(o => o.correct).map(o => o.id))
  const isMultiple = card.options.filter(o => o.correct).length > 1
  const isCorrect = answered && !skipped &&
    selected.size === correctIds.size &&
    [...selected].every(id => correctIds.has(id))

  function select(id: string) {
    if (answered) return
    setSelected(prev => {
      const next = isMultiple ? new Set(prev) : new Set<string>()
      if (isMultiple && next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function confirm() {
    if (selected.size === 0) return
    const correct = selected.size === correctIds.size && [...selected].every(id => correctIds.has(id))
    setAnswered(true)
    setSkipped(false)
    onAnswer(correct)
  }

  function handleDontKnow() {
    setAnswered(true)
    setSkipped(true)
    onAnswer(false)
  }

  function optionStyle(id: string, isCorrectOpt: boolean): React.CSSProperties {
    const isSelected = selected.has(id)
    if (answered) {
      if (isCorrectOpt) return { background: c.correctBg, borderColor: c.correctBorder, color: c.correctText }
      if (isSelected)  return { background: c.incorrectBg, borderColor: c.incorrectBorder, color: c.incorrectText }
      return { background: c.optionBg, borderColor: c.optionBorder, color: c.textMuted }
    }
    if (isSelected) return { background: c.accentBgSoft, borderColor: c.accent, color: c.textPrimary }
    return { background: c.optionBg, borderColor: c.optionBorder, color: c.textPrimary }
  }

  function trailingGlyph(id: string, isCorrectOpt: boolean) {
    if (!answered) return null
    if (isCorrectOpt) return <span style={{ color: c.correctBorder, fontWeight: 700, fontSize: 15 }}>✓</span>
    if (selected.has(id)) return <span style={{ color: c.incorrectBorder, fontWeight: 700, fontSize: 15 }}>✕</span>
    return null
  }

  const primaryEnabled = answered || selected.size > 0
  const primaryBg = primaryEnabled ? c.accent : c.optionBg
  const primaryColor = primaryEnabled ? c.accentText : c.textMuted
  const primaryShadow = primaryEnabled ? `0 8px 24px -8px ${c.progressGlow}` : 'none'

  return (
    <div style={{ width: '100%', maxWidth: 420, display: 'flex', flexDirection: 'column', gap: 18 }}>

      {/* Progress row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 15, color: c.textPrimary, letterSpacing: '0.02em' }}>
            {cardNumber}
          </span>
          <span style={{ fontSize: 13, color: c.textMuted }}>/ {total}</span>
        </div>
        <span style={{
          fontSize: 12, fontWeight: 600, color: c.accent,
          background: c.chipBg, padding: '5px 12px',
          borderRadius: 999, letterSpacing: '0.03em', textTransform: 'uppercase',
        }}>
          {card.category}
        </span>
      </div>

      {/* Progress bar */}
      <div style={{ height: 6, width: '100%', borderRadius: 999, background: c.progressTrack, overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${(cardNumber / total) * 100}%`,
          borderRadius: 999, background: c.accent,
          boxShadow: `0 0 12px ${c.progressGlow}`,
          transition: 'width 0.4s ease',
        }} />
      </div>

      {/* Card */}
      <div style={{
        background: c.cardBg, border: `1px solid ${c.cardBorder}`,
        borderRadius: 24, padding: 18,
        boxShadow: c.shadow,
        display: 'flex', flexDirection: 'column', gap: 18,
        transition: 'background 0.3s ease, border-color 0.3s ease',
      }}>

        {/* Image zone */}
        {card.svgFile && (
          <div style={{
            width: '100%', aspectRatio: '4/3',
            borderRadius: 16, overflow: 'hidden',
            background: c.imageBg, border: `1px solid ${c.cardBorder}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <ImageWithRetry
              src={`/svgs/${card.svgFile}`}
              alt="Símbolo P&ID"
              c={c}
              style={{ maxWidth: '60%', maxHeight: '60%', objectFit: 'contain' }}
            />
          </div>
        )}

        {/* Question + options + explanation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 19, fontWeight: 600,
              color: c.textPrimary, lineHeight: 1.3, margin: 0,
            }}>
              {card.question}
            </h2>
            {isMultiple && (
              <p style={{ fontSize: 12, color: c.textMuted, marginTop: 4 }}>
                Selecciona todas las correctas
              </p>
            )}
          </div>

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {card.options.map(opt => (
              <div
                key={opt.id}
                onClick={() => select(opt.id)}
                className="animate-pop"
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '13px 14px', borderRadius: 14,
                  border: '1.5px solid',
                  cursor: answered ? 'default' : 'pointer',
                  transition: 'background 0.2s ease, border-color 0.2s ease',
                  ...optionStyle(opt.id, opt.correct),
                }}
              >
                <span style={{ flex: 1, fontSize: 15, fontWeight: 500 }}>{opt.text}</span>
                {trailingGlyph(opt.id, opt.correct)}
              </div>
            ))}
          </div>

          {/* Explanation */}
          {answered && (
            <div className="animate-fade-in" style={{
              display: 'flex', gap: 10, padding: 14,
              borderRadius: 14,
              background: c.explanationBg, border: `1px solid ${c.explanationBorder}`,
            }}>
              <span style={{
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 14,
                color: skipped ? c.textMuted : isCorrect ? c.correctBorder : c.incorrectBorder,
                flexShrink: 0,
              }}>
                {skipped ? 'i' : isCorrect ? '✓' : '✕'}
              </span>
              <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.5, color: c.textSecondary }}>
                {card.explanation}
              </p>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <button
            onClick={answered ? onNext : confirm}
            disabled={!primaryEnabled}
            style={{
              width: '100%', height: 50, borderRadius: 14, border: 'none',
              fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 600,
              cursor: primaryEnabled ? 'pointer' : 'not-allowed',
              background: primaryBg, color: primaryColor,
              boxShadow: primaryShadow,
              transition: 'all 0.2s ease',
            }}
          >
            {answered ? 'Siguiente' : 'Confirmar'}
          </button>
          {!answered && (
            <button
              onClick={handleDontKnow}
              style={{
                width: '100%', height: 44, borderRadius: 14, border: 'none',
                background: 'transparent', fontSize: 14, fontWeight: 500,
                color: c.textMuted, cursor: 'pointer',
              }}
            >
              No sé
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
