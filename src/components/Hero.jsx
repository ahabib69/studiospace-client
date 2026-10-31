"use client";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, A11y } from "swiper/modules";
import { ArrowUpRight, MapPin, Star } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";
const slides = [
  {
    image: "photo-1497366754035-f200968a6e72",
    title: (
      <>
        Big ideas.
        <br />
        Extraordinary spaces.
      </>
    ),
    text: "From the first spark to the final take. Discover inspiring studios built for the way you create.",
    label: "The Daylight Loft",
    location: "Brooklyn, NY",
    tag: "For the independently creative",
  },
  {
    image: "photo-1598488035139-bdbb2231ce04",
    title: (
      <>
        Your voice.
        <br />A whole new stage.
      </>
    ),
    text: "Hit record in a space that sounds as good as your ideas. Find podcast lounges and recording rooms by the hour.",
    label: "Off Record Lounge",
    location: "Austin, TX",
    tag: "Make yourself heard",
  },
  {
    image: "photo-1513364776144-60967b0f800f",
    title: (
      <>
        Make room
        <br />
        for the unexpected.
      </>
    ),
    text: "Paint outside the lines. Build something with friends. Find a workshop that gives your next project room to grow.",
    label: "Clay & Color Atelier",
    location: "Portland, OR",
    tag: "Space to experiment",
  },
];
export default function Hero() {
  return (
    <Swiper
      className="hero-slider"
      modules={[Autoplay, Pagination, A11y]}
      autoplay={{
        delay: 6500,
        disableOnInteraction: true,
        pauseOnMouseEnter: true,
      }}
      pagination
      loop
    >
      {slides.map((s, i) => (
        <SwiperSlide key={s.image}>
          <section className="hero-scene">
            <img
              src={`https://images.unsplash.com/${s.image}?auto=format&fit=crop&w=2200&q=90`}
              alt={s.label}
              fetchPriority={i === 0 ? "high" : "auto"}
            />
            <div className="shell hero-copy">
              <div className="eyebrow mb-7 flex items-center gap-3">
                <span className="w-6 h-px bg-[#e9ae72]" />
                {s.tag}
              </div>
              <h1>{s.title}</h1>
              <p>{s.text}</p>
              <div className="flex gap-3 flex-wrap">
                <Link
                  href="/studios"
                  className="btn bg-[#e9ae72] text-[#20170f] border-0 hover:bg-[#f3c18c]"
                >
                  Explore Studios <ArrowUpRight size={17} />
                </Link>
                <Link
                  href="/studios"
                  className="btn bg-white/5 border-white/40 text-white hover:bg-white/15"
                >
                  Host Your Space
                </Link>
              </div>
            </div>
            <div className="hero-bottom">
              <div className="shell flex justify-between items-end">
                <div>
                  <p className="flex gap-1 items-center text-xs mb-2 text-[#e9ae72]">
                    <MapPin size={12} />
                    {s.location}
                  </p>
                  <p className="text-sm">{s.label}</p>
                </div>
                <div className="hidden sm:flex text-xs items-center gap-2 mr-36">
                  <Star
                    size={13}
                    className="text-[#e9ae72]"
                    fill="currentColor"
                  />{" "}
                  Spaces with a little more soul
                </div>
              </div>
            </div>
          </section>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
