'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';

export default function GallerySection() {
  const images = [
    "https://i.postimg.cc/jdXKj9d4/Whats-App-Image-2025-03-26-at-13-07-53.jpg",
    "https://i.postimg.cc/jdXKj9d4/Whats-App-Image-2025-03-26-at-13-07-53.jpg",
    "https://i.postimg.cc/jdXKj9d4/Whats-App-Image-2025-03-26-at-13-07-53.jpg",
    "https://i.postimg.cc/jdXKj9d4/Whats-App-Image-2025-03-26-at-13-07-53.jpg",
    "https://i.postimg.cc/jdXKj9d4/Whats-App-Image-2025-03-26-at-13-07-53.jpg",
    "https://i.postimg.cc/jdXKj9d4/Whats-App-Image-2025-03-26-at-13-07-53.jpg",
    "https://i.postimg.cc/jdXKj9d4/Whats-App-Image-2025-03-26-at-13-07-53.jpg",
    "https://i.postimg.cc/jdXKj9d4/Whats-App-Image-2025-03-26-at-13-07-53.jpg",
    "https://i.postimg.cc/jdXKj9d4/Whats-App-Image-2025-03-26-at-13-07-53.jpg",
  ];

  return (
    <section id="gallery" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
      <div className="px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Our Fleet</h2>
        </div>

        <div className="mt-12 max-w-5xl mx-auto">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {images.map((img, idx) => (
              <SwiperSlide key={idx}>
                <div className="p-4">
                  <img
                    src={img}
                    alt={`Car ${idx + 1}`}
                    className="w-full h-68 object-cover rounded-xl shadow-md"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
