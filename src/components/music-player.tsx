"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Volume2, VolumeX, Play, Pause } from "lucide-react"

interface Song {
  title: string
  artist: string
  url: string
  cover: string
}

interface MusicPlayerProps {
  songs: Song[]
}

export default function MusicPlayer({ songs }: MusicPlayerProps) {
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const currentSong = songs[currentSongIndex]

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleEnded = () => {
      // Próxima música
      setCurrentSongIndex((prev) => (prev + 1) % songs.length)
    }

    const handleCanPlay = () => {
      // Tenta tocar automaticamente quando a música carrega
      audio.play().catch(() => {
        // Se o autoplay falhar, não faz nada (usuário precisa interagir primeiro)
        console.log("Autoplay bloqueado pelo navegador")
      })
    }

    audio.addEventListener("ended", handleEnded)
    audio.addEventListener("canplay", handleCanPlay)

    return () => {
      audio.removeEventListener("ended", handleEnded)
      audio.removeEventListener("canplay", handleCanPlay)
    }
  }, [songs.length])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.play().catch(() => {
        setIsPlaying(false)
      })
    } else {
      audio.pause()
    }
  }, [isPlaying, currentSongIndex])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.muted = isMuted
  }, [isMuted])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleAudioPlay = () => {
    setIsPlaying(true)
  }

  const handleAudioPause = () => {
    setIsPlaying(false)
  }

  // Tenta iniciar o áudio quando o usuário interage com a página
  useEffect(() => {
    const startAudio = () => {
      const audio = audioRef.current
      if (audio && !isPlaying) {
        audio
          .play()
          .then(() => {
            setIsPlaying(true)
          })
          .catch(() => {
            // Falhou, mas não faz nada
          })
      }
    }

    // Adiciona listeners para primeira interação do usuário
    document.addEventListener("click", startAudio, { once: true })
    document.addEventListener("keydown", startAudio, { once: true })
    document.addEventListener("touchstart", startAudio, { once: true })

    return () => {
      document.removeEventListener("click", startAudio)
      document.removeEventListener("keydown", startAudio)
      document.removeEventListener("touchstart", startAudio)
    }
  }, [isPlaying])

  return (
    <motion.div
      className="fixed bottom-16 right-4 z-40"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 }}
    >
      <audio ref={audioRef} src={currentSong.url} onPlay={handleAudioPlay} onPause={handleAudioPause} preload="auto" />

      <motion.div
        className={`bg-white rounded-lg shadow-lg border-2 border-red-200 overflow-hidden transition-all duration-300 ${
          isMinimized ? "w-16 h-16" : "w-64 h-20"
        }`}
        whileHover={{ scale: 1.02 }}
      >
        {isMinimized ? (
          // Versão minimizada - apenas disco
          <div
            className="w-full h-full flex items-center justify-center cursor-pointer"
            onClick={() => setIsMinimized(false)}
          >
            <div className="relative">
              <motion.div
                className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center"
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ duration: 3, repeat: isPlaying ? Number.POSITIVE_INFINITY : 0, ease: "linear" }}
              >
                <div className="w-2 h-2 bg-red-600 rounded-full" />
              </motion.div>
            </div>
          </div>
        ) : (
          // Versão expandida
          <div className="flex items-center p-2 gap-3">
            {/* Disco Vinil */}
            <div className="relative flex-shrink-0">
              <motion.div
                className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center relative overflow-hidden"
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ duration: 17, repeat: isPlaying ? Number.POSITIVE_INFINITY : 0, ease: "linear" }}
              >
                {/* Sulcos do vinil */}
                <div className="absolute inset-1 rounded-full border border-gray-600 opacity-30" />
                <div className="absolute inset-2 rounded-full border border-gray-600 opacity-20" />
                <div className="absolute inset-3 rounded-full border border-gray-600 opacity-10" />

                {/* Centro do disco */}
                <div className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center">
                  <div className="w-1 h-1 bg-white rounded-full" />
                </div>

                {/* Capa do CD sobreposta */}
                <div className="absolute inset-1 rounded-full overflow-hidden">
                  <img
                    src={currentSong.cover || "/placeholder.svg"}
                    alt={`Capa de ${currentSong.title}`}
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>
              </motion.div>
            </div>

            {/* Informações da música */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-gray-800 truncate">{currentSong.title}</h4>
              <p className="text-xs text-gray-600 truncate">{currentSong.artist}</p>

              {/* Indicador de progresso */}
              <div className="flex items-center gap-1 mt-1">
                {songs.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 flex-1 rounded ${index === currentSongIndex ? "bg-red-600" : "bg-gray-300"}`}
                  />
                ))}
              </div>
            </div>

            {/* Controles */}
            <div className="flex flex-col gap-1">
              <button
                onClick={togglePlay}
                className="text-red-600 hover:text-red-700 transition-colors"
                aria-label={isPlaying ? "Pausar" : "Tocar"}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>

              <button
                onClick={toggleMute}
                className="text-red-600 hover:text-red-700 transition-colors"
                aria-label={isMuted ? "Ativar som" : "Silenciar"}
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
            </div>

            {/* Botão minimizar */}
            {/* <button
              onClick={() => setIsMinimized(true)}
              className="text-gray-400 hover:text-gray-600 transition-colors ml-1"
              aria-label="Minimizar player"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                <path d="M2 6h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button> */}
          </div>
        )}
      </motion.div>

      {/* Indicador de que está tocando */}
      {isPlaying && (
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
        />
      )}
    </motion.div>
  )
}
