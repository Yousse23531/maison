export function Gallery() {
  const images = [
    { url: "/1421.jpg", title: "salon extérieure", description: "Un espace chaleureux pour se détendre" },
    { url: "/salon.jpg", title: "Salon", description: "Conviviale et élégante" },
    { url: "/71.jpg", title: "Façade en pierre", description: "Architecture authentique" },
    { url: "/100.jpg", title: "Terrasse", description: "Espace extérieur" },
    { url: "/50.jpg", title: "table de ping pong", description: "Espace de jeux" },
    { url: "/wow2.jpg", title: "Picine géante", description: "Coin détente au vert" },
    { url: "/dor.jpg", title: "Vue de jardin", description: "Vue d'ensemble" },
    { url: "/1422.jpg", title: "Cheminée", description: "Ambiance cocooning" },
    { url: "/2.jpg", title: "Jardin", description: "Espace convivial" }
  ];

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-amber-800 mb-4">
            Galerie Photos
          </h2>
          <p className="text-xl text-amber-700 max-w-2xl mx-auto">
          Laissez-vous inspirer par la beauté et l’authenticité de notre maison en images
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img src={image.url} alt={image.title} className="w-full h-full object-cover bg-black/5 group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-bold mb-1">{image.title}</h3>
                  <p className="text-sm text-gray-200">{image.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}