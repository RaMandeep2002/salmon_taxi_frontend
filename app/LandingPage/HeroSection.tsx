export default function HeroSection() {
    return (
      <section
        id="home"
        className="relative w-full py-12 md:py-24 lg:py-32 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://i.postimg.cc/C1mmWRWy/Whats-App-Image-2025-03-26-at-13-07-52.jpg')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#F2EE21]/50 z-10" />
  
        {/* Content */}
        <div className="relative z-20 px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-black">
                Welcome To Salmon Arm Taxi
              </h1>
              <p className="mx-auto max-w-[700px] text-black md:text-xl">
                Fast, reliable, and comfortable taxi service available 24/7. Book your ride now and experience the
                difference.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
  