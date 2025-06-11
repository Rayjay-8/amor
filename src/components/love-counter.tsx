"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface LoveCounterProps {
  startDate: string
}

export default function LoveCounter({ startDate }: { startDate: string }) {
  const [time, setTime] = useState(getTimeDifference(startDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeDifference(startDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [startDate]);

  return (
    <div className="text-center">
      <p className="text-xl md:text-2xl text-red-600 mb-6">Eu te amo há</p>

      <div className="flex flex-wrap justify-center gap-3 md:gap-4">
        <CounterBox value={time.days} label="Dias" />
        <CounterBox value={time.hours} label="Horas" />
        <CounterBox value={time.minutes} label="Minutos" />
        <CounterBox value={time.seconds} label="Segundos" />
      </div>
    </div>
  );
}

function getTimeDifference(startDate: string) {
  const start = new Date(startDate).getTime();
  const now = new Date();
  const diff = now.getTime() - start;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  // const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  // const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  // const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  return { days, hours, minutes, seconds };
}

function CounterBox({ value, label }: { value: number; label: string }) {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg p-3 md:p-4 w-20 md:w-28"
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        key={value}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-2xl md:text-3xl font-bold text-red-600"
      >
        {value.toString().padStart(2, '0')}
      </motion.div>
      <div className="text-xs md:text-sm text-gray-500">{label}</div>
    </motion.div>
  );
}
