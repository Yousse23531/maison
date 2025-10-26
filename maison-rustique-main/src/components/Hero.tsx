import React, { useEffect, useState } from 'react';

 

export function Hero() {
  const images = ['/50.jpg', '/60.jpg', '/maison.jpg'];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section id="home" className="relative flex items-center justify-center overflow-hidden" style={{ height: '75vh' }}>

      
      <div className="absolute inset-0 z-0">
        {images.map((src, idx) => (
          <img
            key={src}
            src={src}
            alt="Maison Rustique"
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover bg-black transition-opacity duration-700 ${idx === currentIndex ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="relative max-w-2xl mx-auto">
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
        <a
          href="#reservation"
          className="border-2 border-white text-white bg-transparent px-6 py-2 text-base rounded-lg transition-all duration-300 hover:bg-white hover:text-black font-bold md:px-8 md:py-3 md:text-lg"
        >
          Réserver maintenant
        </a>
      </div>
    </section>
  );
}