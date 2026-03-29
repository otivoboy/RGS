"use client";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden min-h-[600px] flex items-center justify-center">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          id="hero-video-player"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transform: "scale(1.2)", 
            transformOrigin: "center center",
          }}
          loop
          muted
          autoPlay
          playsInline
          preload="auto"
        >
          <source src="/video1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/65 z-10" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto max-w-[1440px] px-4 text-center z-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-300 via-amber-500 to-amber-700 bg-clip-text text-transparent animate-pulse drop-shadow-lg font-headline">
            Where Quality Meets Affordability
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-blue-100 drop-shadow-lg">
            Discover the latest smartphones, laptops, PCs, home appliances, and
            accessories at unbeatable prices.
          </p>
          <p className="text-lg md:text-xl mb-8 text-blue-200 font-semibold drop-shadow-lg">
            🚚 Country Wide Delivery Available | Quality products, expert
            service, and customer satisfaction guaranteed.
          </p>
        </div>
      </div>
    </section>
  );
}
