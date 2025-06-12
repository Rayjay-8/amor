"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { X } from "lucide-react"
import Image from "next/image"
import { div } from "framer-motion/client"

// Dados de exemplo para as fotos
const photos = [
  { id: 1, src: `s1.jpeg`, title: "Hum : )", date: "06/10/2025" },
  { id: 27, src: `s27.jpeg`, title: "Loja da Alice", date: "17/04/2025" },
  { id: 2, src: `s2.jpeg`, title: "No Shopping", date: "06/10/2025" },
  { id: 3, src: `s3.jpeg`, title: "Roda gigante s2", date: "12/05/2025" },
  { id: 4, src: `s4.jpeg`, title: "Roda gigante Medo?", date: "12/05/2025" },
  { id: 5, src: `s5.jpeg`, title: "Expoingá S2", date: "12/05/2025" },
  { id: 6, src: `s6.jpeg`, title: "Linda", date: "17/04/2025" },
  { id: 7, src: `s7.jpeg`, title: "Gata", date: "17/04/2025" },
  { id: 8, src: `s8.jpeg`, title: "Docinho", date: "17/04/2025" },
  { id: 9, src: `s9.jpeg`, title: "Amo de mais", date: "17/04/2025" },
  { id: 10, src: `s10.jpeg`, title: "Fazendo nossa comida", date: "06/03/2025" },
  { id: 11, src: `s11.jpeg`, title: "Melhor dia", date: "22/02/2025" },
  { id: 12, src: `s12.jpeg`, title: "Noite com minha vida", date: "22/02/2025" },
  { id: 13, src: `s13.jpeg`, title: "meu amor gente", date: "22/02/2025" },
  { id: 14, src: `s14.jpeg`, title: "hahahhaha", date: "22/02/2025" },
  { id: 15, src: `s15.jpeg`, title: "Delicia...", date: "15/12/2024" },
  { id: 16, src: `s16.jpeg`, title: "Formatura do meu amor", date: "10/12/2024" },
  { id: 17, src: `s17.jpeg`, title: "Formatura da minha vida", date: "10/12/2024" },
  { id: 18, src: `s18.jpeg`, title: "Dia no parque", date: "25/11/2024" },
  { id: 19, src: `s19.jpeg`, title: "Ela", date: "06/11/2024" },
  { id: 20, src: `s20.jpeg`, title: "Eu", date: "06/11/2024" },
  { id: 21, src: `s21.jpeg`, title: "Melhor impossivel", date: "05/11/2024" },
  { id: 22, src: `s22.jpeg`, title: "Amo esse rostinho", date: "05/11/2024" },
  { id: 23, src: `s23.jpeg`, title: "hahaha", date: "05/11/2024" },
  { id: 24, src: `s24.jpeg`, title: "q vergonha gente", date: "05/11/2024" },
  { id: 25, src: `s25.jpeg`, title: "Almoço com a sogra", date: "27/10/2024" },
  { id: 26, src: `s26.jpeg`, title: "Primeira vez na casa dela", date: "27/10/2024" },
]

const videos = [
  { id: 100, src: `v1.mp4`, title: "Mêsversário", date: "16/05/2025" },
  { id: 200, src: `v2.mp4`, title: "Tempinho Juntos", date: "06/10/2025" },
  { id: 300, src: `v3.mp4`, title: "Parque", date: "25/11/2024" },
]

export default function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null)
  const [selectedPhotosrc, setSelectedPhotosrc] = useState<string | null>(null)
  const [selectedVideosrc, setSelectedVideosrc] = useState<string | null>(null)

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {videos.map((video) => (
        <motion.div
        key={video.id}
        layoutId={`photo-${video.id}`}
        onClick={() => {
          setSelectedVideo(video.id)
          setSelectedVideosrc(video.src)
        }}
        initial={{ opacity: 0, }}
        animate={{ opacity: 1,  }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="cursor-pointer"
      >
        <div className="bg-white p-2 shadow-lg rotate-0 hover:rotate-1 transition-transform duration-300">
          <div className="aspect-square bg-gray-100 mb-2 overflow-hidden">
            <video
              src={`/nos/${video.src}`}
              className="w-full h-full object-cover"
              muted
              autoPlay
              loop
            />
          </div>
          <div className="p-1 text-center">
            <p className="text-xs md:text-sm text-gray-500">{video.title}</p>
            <p className="text-xs md:text-sm text-gray-500">{video.date}</p>
          </div>
        </div>
      </motion.div>

      ))}
      {photos.map((photo) => (
        <motion.div
          key={photo.id}
          layoutId={`photo-${photo.id}`}
          onClick={() => {
            setSelectedPhoto(photo.id)
            setSelectedPhotosrc(photo.src)
          }}
          initial={{ opacity: 0, }}
          animate={{ opacity: 1,  }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="cursor-pointer"
        >
          <div className="bg-white p-2 shadow-lg rotate-0 hover:rotate-2 transition-transform duration-300">
            <div className="aspect-square bg-gray-100 mb-2 overflow-hidden">
              <img
                src={`/nos/${photo.src}`}
                alt={photo.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-1 text-center">
              <p className="text-xs md:text-sm text-gray-500">{photo.title}</p>
              <p className="text-xs md:text-sm text-gray-500">{photo.date}</p>
            </div>
          </div>
        </motion.div>
      ))}

      {/* {selectedVideo && (
        <motion.div
        layoutId={`photo-${selectedVideo}`}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80"
        onClick={() => setSelectedVideo(null)}
      >
        <motion.div
          className="bg-white p-4 rounded-lg shadow-2xl max-w-2xl relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 z-10"
            onClick={() => setSelectedVideo(null)}
          >
            <X size={24} />
          </button>

          <div className="aspect-video bg-gray-100 mb-4">
            <video
              src={`/nos/${selectedVideosrc}`}
              autoPlay
              loop
              
              muted
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-xl font-bold text-black">{photos.find((p) => p.id === selectedVideo)?.title}</h3>
          <p className="text-gray-500">{photos.find((p) => p.id === selectedVideo)?.date}</p>
        </motion.div>
      </motion.div>
      )} */}

      {selectedPhoto && (
        <motion.div
          layoutId={`photo-${selectedPhoto}`}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80"
          onClick={() => setSelectedPhoto(null)}
        >
          <motion.div
            className="bg-white p-4 rounded-lg shadow-2xl max-w-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 z-10"
              onClick={() => setSelectedPhoto(null)}
            >
              <X size={24} />
            </button>

            <div className="aspect-square bg-gray-100 mb-4">
              <img
                src={`/nos/${selectedPhotosrc}`}
                alt={photos.find((p) => p.id === selectedPhoto)?.title}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-bold text-black">{photos.find((p) => p.id === selectedPhoto)?.title}</h3>
            <p className="text-gray-500">{photos.find((p) => p.id === selectedPhoto)?.date}</p>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
