'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
import Image from 'next/image';
import * as motion from "motion/react-client"

export default function GallerySection() {
  const images = [
    "/image1.png",
    "/image2.png",
    "/image3.png",
    "/image4.png",
    "/image5.png",
    "/image6.png",
    "/image1.png",
    "/image2.png",
    "/image3.png",
    "/image4.png",
    "/image5.png",
    "/image6.png",
  ];

  return (
    <section id="gallery" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
      <div className="px-4 md:px-6">
        <motion.div 
             initial={{ opacity: 0, y: -50 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             viewport={{ once: true }}
             className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Our Fleet</h2>
        </motion.div>

        <motion.div
        initial={{ opacity: 0, y: -50 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             viewport={{ once: true }} className="mt-12 max-w-5xl mx-auto">
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
                  <Image
                    src={img}
                    width={1200}
                    height={1200}
                    alt={`Car ${idx + 1}`}
                    className="w-full h-68 object-cover rounded-xl shadow-md"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
