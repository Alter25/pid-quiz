import { allCards } from '../data/cards'
import type { Palette } from '../theme'

const categories = [...new Set(allCards.map(c => c.category))]
const symbolCount = allCards.filter(c => c.type === 'symbol').length
const textCount = allCards.filter(c => c.type === 'text').length

type Props = {
  c: Palette
  onStart: (allMode: boolean) => void
  onToggleTheme: () => void
  themeIcon: string
}

export function StartScreen({ c, onStart, onToggleTheme, themeIcon }: Props) {
  return (
    <div style={{ width: '100%', maxWidth: 420, display: 'flex', flexDirection: 'column', gap: 18 }}>

      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
          fontSize: 15, color: c.textPrimary, letterSpacing: '0.02em',
        }}>
          P&ID Quiz
        </span>
        <button
          onClick={onToggleTheme}
          aria-label="Cambiar tema"
          style={{
            width: 32, height: 32, borderRadius: '50%',
            border: `1px solid ${c.cardBorder}`,
            background: c.chipBg, color: c.textPrimary,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', fontSize: 14, padding: 0,
          }}
        >
          {themeIcon}
        </button>
      </div>

      {/* Card */}
      <div style={{
        background: c.cardBg, border: `1px solid ${c.cardBorder}`,
        borderRadius: 24, padding: 24,
        boxShadow: c.shadow,
        display: 'flex', flexDirection: 'column', gap: 24,
      }}>

        {/* Title block */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: c.accent, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Simbología Industrial
          </span>
          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 28, fontWeight: 700, color: c.textPrimary,
            lineHeight: 1.2, margin: 0,
          }}>
            P&ID Quiz
          </h1>
          <p style={{ fontSize: 14, color: c.textSecondary, lineHeight: 1.5, marginTop: 2 }}>
            Repaso de equipos rotativos, válvulas y seguridad industrial
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
          {[
            { value: allCards.length, label: 'Preguntas' },
            { value: symbolCount, label: 'Símbolos' },
            { value: textCount, label: 'Conceptos' },
          ].map(stat => (
            <div key={stat.label} style={{
              background: c.imageBg, border: `1px solid ${c.cardBorder}`,
              borderRadius: 14, padding: '14px 10px', textAlign: 'center',
            }}>
              <p style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 24, fontWeight: 700, color: c.accent, margin: 0,
              }}>
                {stat.value}
              </p>
              <p style={{ fontSize: 11, fontWeight: 600, color: c.textMuted, marginTop: 2 }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Categories */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <p style={{
            fontSize: 11, fontWeight: 700, color: c.textMuted,
            letterSpacing: '0.07em', textTransform: 'uppercase', margin: 0,
          }}>
            Categorías
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {categories.map(cat => (
              <span key={cat} style={{
                fontSize: 12, fontWeight: 600, color: c.textSecondary,
                background: c.chipBg, border: `1px solid ${c.cardBorder}`,
                padding: '4px 10px', borderRadius: 999,
              }}>
                {cat}
              </span>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button
            onClick={() => onStart(true)}
            style={{
              width: '100%', height: 50, borderRadius: 14, border: 'none',
              fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 600,
              background: c.accent, color: c.accentText,
              boxShadow: `0 8px 24px -8px ${c.progressGlow}`,
              cursor: 'pointer', transition: 'all 0.2s ease',
            }}
          >
            Comenzar — Todo ({allCards.length} preguntas)
          </button>
          <button
            onClick={() => onStart(false)}
            style={{
              width: '100%', height: 44, borderRadius: 14, border: `1.5px solid ${c.cardBorder}`,
              fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600,
              background: c.optionBg, color: c.textSecondary,
              cursor: 'pointer', transition: 'all 0.2s ease',
            }}
          >
            Solo símbolos ({symbolCount} preguntas)
          </button>
        </div>
      </div>
    </div>
  )
}
