import HeroCarousel, { type HeroSlide } from "@/components/home/HeroCarousel";
import QuoteForm from "@/components/home/QuoteForm";
import ServicesGrid from "@/components/home/ServicesGrid";
import FeaturedServices from "@/components/home/FeaturedServices";
import AboutSection from "@/components/home/AboutSection";
import Reviews from "@/components/home/Reviews";

const HERO_SLIDES: HeroSlide[] = [
  {
    image: "/images/hero-1.webp",
    caption: "Coverage Tailored to Your Life",
    alt: "Family in front of their home",
  },
  {
    image: "/images/hero-2.webp",
    caption: "Protecting What Matters Most",
    alt: "San Francisco skyline at sunset",
  },
  {
    image: "/images/hero-3.webp",
    caption: "Independent. Trusted. Local.",
    alt: "Office team meeting with clients",
  },
];

export default function Home() {
  return (
    <>
      <HeroCarousel slides={HERO_SLIDES} />

      <QuoteForm />

      <ServicesGrid />

      <FeaturedServices />

      <AboutSection />

      <Reviews />
    </>
  );
}
