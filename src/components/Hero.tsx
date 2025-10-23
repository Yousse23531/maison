import React, { useEffect, useState } from 'react';

 

export function Hero() {
  const images = ['/1.jpg', '/2.jpg', '/3.jpg'];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section id="home" className="relative flex items-center justify-center overflow-hidden" style={{ height: '50vh' }}>

      
      <div className="absolute inset-0 z-0">
        {images.map((src, idx) => (
          <img
            key={src}
            src={src}
            alt="Maison Rustique"
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover bg-black transition-opacity duration-700 ${idx === currentIndex ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="relative max-w-2xl mx-auto">
          <div className="mt-8 flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="#reservation"
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg transition-colors text-xl font-medium"
            >
              Réserver maintenant
            </a>
            <a 
              href="#gallery"
              className="border-2 border-white text-white hover:bg-white hover:text-amber-800 px-8 py-4 rounded-lg transition-colors text-xl font-medium"
            >
              Découvrir la maison
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll arrow removed by request */}
    </section>
  );
}