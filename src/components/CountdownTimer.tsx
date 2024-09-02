'use client';

import { useEffect, useState } from 'react';

interface CountdownTimerProps {
  eventDate: Date; // O Date si ya la conviertes antes de pasarla
}

export const CountdownTimer = ({ eventDate }: CountdownTimerProps) => {
  const [timeRemaining, setTimeRemaining] = useState('');

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const eventTime = new Date(eventDate).getTime();
      const now = new Date().getTime();
      const difference = eventTime - now;

      if (difference <= 0) {
        setTimeRemaining('El evento ya ha comenzado o ha terminado.');
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeRemaining(
        `${days}d ${hours}h ${minutes}m ${seconds}s`
      );
    };

    // Actualiza la cuenta regresiva cada segundo
    const interval = setInterval(calculateTimeRemaining, 1000);

    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(interval);
  }, [eventDate]);

  return (
    <div className="bg-blue-50 rounded-lg p-6 text-center">
    <h2 className="text-2xl font-semibold text-blue-700 mb-2">Cuenta Regresiva</h2>
    <p className="text-xl font-mono text-blue-600">{timeRemaining}</p>
  </div>
  );
};

