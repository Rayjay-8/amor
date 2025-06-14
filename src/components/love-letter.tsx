"use client"


import { motion } from "framer-motion"
import localFont from 'next/font/local'

const minhaFonte = localFont({
  src: '../../public/fonts/b.ttf',
  display: 'swap'
})

const minhaFonteassinatura = localFont({
  src: '../../public/fonts/a.ttf',
  display: 'swap'
})


interface LoveLetterProps {
  isOpen: boolean,
  onClick?: () => void
}

export default function LoveLetter({ isOpen, onClick }: LoveLetterProps) {
  return (
    <motion.div animate={isOpen ? { opacity: 1, y: 0, scale: 1, pointerEvents: `all`} : { opacity: 0, y: 0, scale: 1, pointerEvents:"none"}}
    className="fixed inset-0 z-50 bg-red-100 " onClick={() => onClick()}>
    <motion.div
      className="fixed inset-7 z-50 bg-white rounded-lg shadow-xl p-6 md:p-8 border-2 border-red-100 max-h-[80vh] overflow-auto"
      initial={{ opacity: 0, y: 0, scale: 1 }}
      animate={isOpen ? { opacity: 1, y: 0, scale: 1} : { opacity: 0, y: 0, scale: 1}}
      transition={{ duration: 1, delay: 0.2 }}
    >
      <div className={"prose prose-sm md:prose-lg max-w-none text-black text-4xl "+minhaFonte.className}>
        <h2 className="text-2xl md:text-3xl font-bold text-center text-red-600 mb-4 md:mb-6">Meu Amor</h2>

        <p className="mb-3 md:mb-4">
          Cada momento ao seu lado é como um sonho que se torna realidade. Desde o primeiro instante em que nossos
          olhares se cruzaram, soube que havia encontrado algo especial, algo raro, algo que mudaria minha vida para
          sempre.
        </p>

        <p className="mb-3 md:mb-4">
          Você trouxe luz para os meus dias mais escuros e calor para os meus invernos mais frios. Seu sorriso é o raio
          de sol que ilumina minha manhã, e seu abraço é o porto seguro onde encontro paz no fim do dia.
        </p>

        <p className="mb-3 md:mb-4">
          Amo cada detalhe seu: seu jeito de rir, a forma como seus olhos brilham quando está feliz, como você se
          preocupa com os outros, sua força diante dos desafios, e até mesmo suas pequenas manias que te fazem ser quem
          você é.
        </p>

        <p className="mb-3 md:mb-4">
          Juntos, construímos memórias que guardarei para sempre no coração. Cada risada compartilhada, cada lágrima
          enxugada, cada sonho realizado, cada obstáculo superado... Tudo isso nos trouxe até aqui e me faz ter certeza
          de que quero construir muito mais ao seu lado.
        </p>

        <p className="mb-3 md:mb-4">
          Neste Dia dos Namorados, quero renovar minha promessa de amor. Prometo estar ao seu lado nos momentos bons e
          ruins e celebrar nossas vitórias, apoiando você em cada passo.
        </p>

        <p className="mb-4 md:mb-6">
          Você é meu presente, meu futuro, meu sempre. Te amo mais a cada dia que passa, e esse amor só cresce, se
          fortalece e se renova.
        </p>

        <p className="text-right font-bold">
          De: <span className={"text-red-500 "+minhaFonteassinatura.className}>  Ray</span>
          <br />
            Para: 
          <span className="text-red-500">  Emanuely</span>
        </p>
      </div>
    </motion.div>
    </motion.div>
  )
}
