'use client'
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion"
import { Heart, ChevronRight, ChevronLeft } from "lucide-react"
import PhotoGallery from "@/components/photo-gallery"
import LoveCounter from "@/components/love-counter"
import Envelope from "@/components/envelope"
import LoveLetter from "@/components/love-letter"
import MusicPlayer from "@/components/music-player"

const songs = [
  {
    title: "Until I Found You",
    artist: "Stephen Sanchez & Em Beihold",
    url: "d.m4a",
    cover: "/hq720.jpg",
  },
 
  {
    title: "Always",
    artist: "Daniel Caesar",
    url: "b.m4a",
    cover: "/1900x1900-000000-80-0-0.jpg",
  },
 
  
  {
    title: "Lose Control",
    artist: "Teddy Swims & Freak Freely",
    url: "e.m4a",
    cover: "/1200x630bf-60.jpg",
  },
  {
    title: "Promise",
    artist: "Laufey",
    url: "c.m4a",
    cover: "/0x1900-000000-80-0-0.jpg",
  },
]

export default function Home() {

  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlay = () => {
    audioRef.current?.play();
  };


  const [showHeartRain, setShowHeartRain] = useState(false)

  const [currentCard, setCurrentCard] = useState(0)
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false)
  


  const cards = [
    { id: "envelope", title: "Para o Amor da Minha Vida" },
    { id: "photos", title: "Nossos Momentos Especiais" },
    { id: "counter", title: "Nosso Amor em Números" },
  ]

  const nextCard = () => {
    if (currentCard < cards.length - 1) {
      setCurrentCard(currentCard + 1)
    }
  }

  const prevCard = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1)
    }
  }

  const handleEnvelopeClick = () => {
    if (!isEnvelopeOpen) {
      setIsEnvelopeOpen(true)
      // handlePlay()
    }
  }

  const triggerHeartRain = () => {
    if(!showHeartRain){
      setShowHeartRain(true)
      setTimeout(() => setShowHeartRain(false), 6400) // Para a chuva após 5 segundos
    }
    
  }


  return (
    <main className="h-screen w-screen overflow-hidden bg-gradient-to-b from-pink-50 to-red-100 flex flex-col">
      {/* <audio ref={audioRef} src={"/c.m4a"} autoPlay loop></audio> */}
      <MusicPlayer songs={songs} />
{/* Navegação */}
<div className="flex justify-center items-center gap-2 py-4">
        {cards.map((card, index) => (
          <button
            key={card.id}
            onClick={() => setCurrentCard(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentCard === index ? "bg-red-600 scale-125" : "bg-red-300"
            }`}
            aria-label={`Ir para ${card.title}`}
          />
        ))}
      </div>

      {/* Cartões */}
      <div className="flex-1 relative">
        <AnimatePresence mode="wait">
          {/* Cartão 1: Envelope e Carta */}
          {currentCard === 0 && (
            <motion.div
              key="envelope-card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-4"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-red-500 mb-8 text-center">
                Para o Amor da Minha Vida
              </h2>


              <motion.div
                initial={{ opacity: 0  }}
                animate={{ opacity: 1 }}
                transition={{ ease: "easeOut", duration: 5 }}
              >
                <h1 className="text-5xl md:text-6xl font-bold text-red-600 mb-8 text-center">Manu</h1>

                </motion.div>

              <div className="relative w-full max-w-lg mx-auto" >
                <Envelope isOpen={isEnvelopeOpen} >
                  <LoveLetter isOpen={isEnvelopeOpen} onClick={() => setIsEnvelopeOpen(false)}/>
                </Envelope>

                {!isEnvelopeOpen && (
                  <div onClick={() => setIsEnvelopeOpen(true)}>
                  <motion.div
                    className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-80 px-4 py-2 rounded-full text-red-600 font-medium shadow-md cursor-pointer z-30"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                    
                  >
                    Clique para abrir
                  </motion.div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Cartão 2: Fotos */}
          {currentCard === 1 && (
            <motion.div
              key="photos-card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center p-4 overflow-auto"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-red-600 mb-6 text-center">
                Nossos Momentos Especiais
              </h2>
              <div className="w-full max-w-6xl mx-auto  flex-1 pb-4">
                <PhotoGallery />
              </div>
            </motion.div>
          )}

          {/* Cartão 3: Contador */}
          {currentCard === 2 && (
            <motion.div
              key="counter-card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-4"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-red-600 mb-8 text-center">Nosso Amor em Números</h2>

              <div className="w-full max-w-3xl mx-auto">
                <LoveCounter startDate="2024-10-12" />

                <div className="mt-12 text-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={triggerHeartRain}
                    className="bg-red-600 text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg hover:bg-red-700 transition-colors"
                  >
                    Te Amo Para Sempre ❤️
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Botões de navegação */}
      <div className="flex justify-between px-6 py-4">
        <button
          onClick={prevCard}
          disabled={currentCard === 0}
          className={`rounded-full p-3 ${
            currentCard === 0 ? "text-red-300 cursor-not-allowed" : "text-red-600 hover:bg-red-100"
          }`}
          aria-label="Cartão anterior"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={nextCard}
          disabled={currentCard === cards.length - 1}
          className={`rounded-full p-3 ${
            currentCard === cards.length - 1 ? "text-red-300 cursor-not-allowed" : "text-red-600 hover:bg-red-100"
          }`}
          aria-label="Próximo cartão"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Chuva de Corações */}
      {showHeartRain && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-red-500"
              initial={{
                x: Math.random() * window.innerWidth,
                y: -50,
                scale: Math.random() * 0.5 + 0.5,
                rotate: Math.random() * 360,
              }}
              animate={{
                y: window.innerHeight + 50,
                rotate: Math.random() * 360 + 360,
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                delay: Math.random() * 2,
                ease: "linear",
              }}
            >
              <Heart className="w-8 h-8 fill-current" />
            </motion.div>
          ))}
        </div>
      )}
    </main>  
  );
}
