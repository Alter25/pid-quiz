import type { Palette } from '../theme'

type Props = {
  correct: number
  total: number
  c: Palette
  onRestart: () => void
  onToggleTheme: () => void
  themeIcon: string
}

export function ResultsScreen({ correct, total, c, onRestart, onToggleTheme, themeIcon }: Props) {
  const pct = Math.round((correct / total) * 100)
  const rating =
    pct >= 90 ? 'Excelente'
    : pct >= 70 ? 'Bien'
    : pct >= 50 ? 'Regular'
    : 'Necesitas repasar'

  const circumference = 2 * Math.PI * 48
  const offset = circumference * (1 - pct / 100)

  return (
    <div style={{ width: '100%', maxWidth: 420, display: 'flex', flexDirection: 'column', gap: 18 }}>

      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
          fontSize: 15, color: c.textPrimary,
        }}>
          Resultados
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
        alignItems: 'center',
      }}>

        {/* Circular score */}
        <div style={{ position: 'relative', width: 140, height: 140 }}>
          <svg style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }} viewBox="0 0 110 110">
            <circle cx="55" cy="55" r="48" fill="none" stroke={c.progressTrack} strokeWidth="9" />
            <circle
              cx="55" cy="55" r="48" fill="none"
              stroke={c.accent} strokeWidth="9" strokeLinecap="round"
              strokeDasharray={circumference} strokeDashoffset={offset}
              style={{ transition: 'stroke-dashoffset 1s cubic-bezier(.4,0,.2,1)', filter: `drop-shadow(0 0 8px ${c.progressGlow})` }}
            />
          </svg>
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 30, fontWeight: 700, color: c.textPrimary, lineHeight: 1 }}>
              {pct}%
            </span>
            <span style={{ fontSize: 12, color: c.textMuted, marginTop: 2 }}>{correct}/{total}</span>
          </div>
        </div>

        <span style={{
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
          fontSize: 13, color: c.accent,
          background: c.accentBgSoft,
          padding: '6px 16px', borderRadius: 999,
          letterSpacing: '0.04em', textTransform: 'uppercase',
        }}>
          {rating}
        </span>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, width: '100%' }}>
          <div style={{
            background: c.correctBg, border: `1px solid ${c.correctBorder}`,
            borderRadius: 14, padding: '18px 10px', textAlign: 'center',
          }}>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 30, fontWeight: 700, color: c.correctText, margin: 0 }}>{correct}</p>
            <p style={{ fontSize: 12, fontWeight: 600, color: c.correctText, opacity: 0.7, marginTop: 2 }}>Correctas</p>
          </div>
          <div style={{
            background: c.incorrectBg, border: `1px solid ${c.incorrectBorder}`,
            borderRadius: 14, padding: '18px 10px', textAlign: 'center',
          }}>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 30, fontWeight: 700, color: c.incorrectText, margin: 0 }}>{total - correct}</p>
            <p style={{ fontSize: 12, fontWeight: 600, color: c.incorrectText, opacity: 0.7, marginTop: 2 }}>Incorrectas</p>
          </div>
        </div>

        <button
          onClick={onRestart}
          style={{
            width: '100%', height: 50, borderRadius: 14, border: 'none',
            fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 600,
            background: c.accent, color: c.accentText,
            boxShadow: `0 8px 24px -8px ${c.progressGlow}`,
            cursor: 'pointer', transition: 'all 0.2s ease',
          }}
        >
          Volver a intentarlo
        </button>
      </div>
    </div>
  )
}
