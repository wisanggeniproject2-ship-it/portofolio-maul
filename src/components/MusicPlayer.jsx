import { useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'
import { profile } from '../data/profile'
import { asset } from '../utils/asset'

// A small floating player. Browsers do not allow sound to start by itself, so the song only plays
// after a visitor presses the button. It loops, and it keeps playing while you scroll.
export default function MusicPlayer() {
  const { music } = profile
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [failed, setFailed] = useState(false)

  if (!music) return null

  const toggle = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (!audio.paused) {
      audio.pause()
      return
    }
    try {
      await audio.play()
    } catch (error) {
      // AbortError just means the button was pressed again very quickly
      if (error.name !== 'AbortError') setFailed(true)
    }
  }

  const label = `${music.title} by ${music.artist}`

  return (
    <div className="fixed bottom-[5.25rem] right-3 z-40 sm:bottom-5 sm:right-5">
      <audio
        ref={audioRef}
        src={asset(music.file)}
        preload="none"
        loop
        onPlay={() => {
          setPlaying(true)
          setFailed(false)
        }}
        onPause={() => setPlaying(false)}
        onError={() => {
          setFailed(true)
          setPlaying(false)
        }}
      />

      {failed && (
        <p
          role="status"
          className="absolute bottom-full right-0 mb-2 whitespace-nowrap rounded-xl border border-line bg-night/95 px-3 py-2 text-xs text-muted shadow-lg"
        >
          Lagu belum tersedia
        </p>
      )}

      <div className="flex items-center gap-3 rounded-full border border-line bg-night/85 p-1.5 shadow-2xl shadow-black/60 backdrop-blur-xl sm:pr-4">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? `Pause ${label}` : `Play ${label}`}
          aria-pressed={playing}
          className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary text-white transition-colors duration-200 hover:bg-[#b91c28]"
        >
          {playing && <span aria-hidden="true" className="pulse-ring absolute inset-0 rounded-full bg-primary/50" />}
          {playing ? <Pause size={18} aria-hidden="true" className="relative" /> : <Play size={18} aria-hidden="true" className="relative translate-x-px" />}
        </button>

        <div className="hidden min-w-0 sm:block">
          <p className="text-sm font-semibold leading-tight text-ink">{music.title}</p>
          <p className="text-xs leading-tight text-muted">{music.artist}</p>
        </div>

        <span aria-hidden="true" className="hidden h-5 items-end gap-0.5 sm:flex">
          {[0, 0.3, 0.15, 0.45].map((delay) => (
            <span
              key={delay}
              className={`h-full w-1 rounded-full bg-soft ${playing ? 'eq-bar' : 'scale-y-[0.25]'}`}
              style={playing ? { animationDelay: `${delay}s` } : undefined}
            />
          ))}
        </span>
      </div>
    </div>
  )
}
