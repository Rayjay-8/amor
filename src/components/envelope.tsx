"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface EnvelopeProps {
  isOpen: boolean
  children?: ReactNode
  onClick?: () => void
}

export default function Envelope({ isOpen, children, onClick }: EnvelopeProps) {
  return (
    <div
      className="relative w-full max-w-lg mx-auto aspect-[4/3]"
      onClick={onClick}
      style={{ cursor: isOpen ? "default" : "pointer" }}
    >
 
      <div className="absolute inset-0 bg-red-300 rounded-lg shadow-lg overflow-hidden border-4 border-red-400">

        {/* <div className="absolute inset-0 bg-red-200" /> */}

      
        {/* <div className="absolute bottom-0 left-0 w-full h-1/2 bg-red-300 border-t-4 border-red-400" /> */}

        {/* <motion.div
          className="absolute top-0 left-0 w-1/2 h-full origin-right bg-red-400"
          initial={{ rotateY: 0 }}
          animate={{ rotateY: isOpen ? -30 : 0 }}
          transition={{ duration: 1, delay: isOpen ? 0 : 1 }}
          style={{ transformStyle: "preserve-3d", zIndex: 20 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-400" />
        </motion.div>

        <motion.div
          className="absolute top-0 right-0 w-1/2 h-full origin-left bg-red-400"
          initial={{ rotateY: 0 }}
          animate={{ rotateY: isOpen ? 30 : 0 }}
          transition={{ duration: 1, delay: isOpen ? 0 : 1 }}
          style={{ transformStyle: "preserve-3d", zIndex: 20 }}
        >
          <div className="absolute inset-0 bg-gradient-to-l from-red-500 to-red-400" />
        </motion.div> */}


        <motion.div
          className="absolute top-0 left-0 w-full h-1/2 origin-bottom bg-red-400 z-30"
          initial={{ rotateX: 0 }}
          animate={{ rotateX: isOpen ? -180 : 0 }}
          transition={{ duration: 1.5, delay: isOpen ? 0.5 : 0 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-red-500 to-red-400 rounded-t-lg" />

    
          <motion.div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-40"
            initial={{ scale: 1 }}
            animate={{ scale: isOpen ? 0 : 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="#ef4444"
                stroke="#ef4444"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </div>
          </motion.div>
        </motion.div>


        <div className="absolute inset-0 bg-red-100 -z-10" />
      </div>

      {/* Carta (children) */}
      <div className="absolute inset-x-0 top-1/4 z-1000 px-4">{children}</div>
    </div>
  )
}
