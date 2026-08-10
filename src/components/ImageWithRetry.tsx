import { useEffect, useState } from 'react'
import type { Palette } from '../theme'

const MAX_AUTO_RETRIES = 2

type Props = {
  src: string
  alt: string
  c: Palette
  style?: React.CSSProperties
}

export function ImageWithRetry({ src, alt, c, style }: Props) {
  const [attempt, setAttempt] = useState(0)
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading')

  useEffect(() => {
    setAttempt(0)
    setStatus('loading')
  }, [src])

  useEffect(() => {
    if (status !== 'error' || attempt >= MAX_AUTO_RETRIES) return
    const timer = setTimeout(() => {
      setAttempt(a => a + 1)
      setStatus('loading')
    }, 600)
    return () => clearTimeout(timer)
  }, [status, attempt])

  const failed = status === 'error' && attempt >= MAX_AUTO_RETRIES

  if (failed) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: 16 }}>
        <span style={{ fontSize: 13, textAlign: 'center', color: c.textMuted }}>
          No se pudo cargar el símbolo
        </span>
        <button
          onClick={() => { setAttempt(a => a + 1); setStatus('loading') }}
          style={{
            fontSize: 13, fontWeight: 600, padding: '8px 16px', borderRadius: 10,
            border: `1.5px solid ${c.cardBorder}`, background: c.optionBg,
            color: c.textSecondary, cursor: 'pointer',
          }}
        >
          Reintentar
        </button>
      </div>
    )
  }

  return (
    <img
      key={attempt}
      src={attempt ? `${src}?retry=${attempt}` : src}
      alt={alt}
      loading="eager"
      onLoad={() => setStatus('loaded')}
      onError={() => setStatus('error')}
      style={{ ...style, opacity: status === 'loaded' ? 1 : 0.35, transition: 'opacity 0.2s ease' }}
    />
  )
}
