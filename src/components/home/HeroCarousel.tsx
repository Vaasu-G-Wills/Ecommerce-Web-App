import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Zap, ArrowRight } from 'lucide-react';
import { formatINR } from '../../utils/formatters';

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  price: number;
  originalPrice: number;
  imageUrl: string;
  targetPath: string;
  accentColor: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    title: 'ASUS ROG Strix Scar 18 (2026) Rig',
    subtitle: 'The ultimate desktop-class gaming laptop powered by RTX 4090 175W & Core i9-14900HX.',
    tag: 'EXCLUSIVE FLAGSHIP LAUNCH',
    price: 349990,
    originalPrice: 389990,
    imageUrl: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1600&q=80',
    targetPath: '/product/lap-1',
    accentColor: '#ff9900',
  },
  {
    id: 'slide-2',
    title: 'Apple M4 Max MacBook Pro 16"',
    subtitle: 'Unprecedented 40-core GPU AI performance & 22-hour battery life in Space Black.',
    tag: 'DEVELOPER & VFX CHOICE',
    price: 349900,
    originalPrice: 369900,
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1600&q=80',
    targetPath: '/product/lap-2',
    accentColor: '#00f2fe',
  },
  {
    id: 'slide-3',
    title: 'Samsung Odyssey OLED G9 49"',
    subtitle: 'Super ultrawide 240Hz 0.03ms QD-OLED display equivalent to two QHD screens side by side.',
    tag: 'IMMERSIVE SIM RACING SETUPS',
    price: 139990,
    originalPrice: 169990,
    imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1600&q=80',
    targetPath: '/product/mon-1',
    accentColor: '#2ea043',
  },
  {
    id: 'slide-4',
    title: 'NVIDIA GeForce RTX 4090 Founders Edition',
    subtitle: '24GB high-speed VRAM ready for 8K path tracing and local Large Language Model training.',
    tag: 'THE KING OF GPUS',
    price: 189999,
    originalPrice: 219999,
    imageUrl: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=1600&q=80',
    targetPath: '/product/comp-1',
    accentColor: '#da3633',
  },
];

export const HeroCarousel: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '460px',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #131921 0%, #0d1117 100%)',
      }}
    >
      {/* Background Image with Dark & Fade Overlay */}
      <div
        key={slide.id}
        className="animate-fade-in"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${slide.imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.35)',
          transition: 'all 0.5s ease',
        }}
      />

      {/* Gradient Mask at bottom to blend smoothly with storefront */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(13, 17, 23, 0.95) 0%, rgba(13, 17, 23, 0.6) 50%, rgba(13, 17, 23, 0.1) 100%), linear-gradient(to top, #0d1117 0%, transparent 40%)',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          maxWidth: '1280px',
          height: '100%',
          margin: '0 auto',
          padding: '2.5rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          zIndex: 10,
        }}
      >
        <div style={{ maxWidth: '650px' }}>
          {/* Tag */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: '99px',
              backgroundColor: 'rgba(255, 153, 0, 0.2)',
              border: '1px solid #ff9900',
              color: '#ff9900',
              fontWeight: 800,
              fontSize: '0.78rem',
              letterSpacing: '0.5px',
              marginBottom: '1rem',
            }}
          >
            <Zap size={14} className="badge-pulse" />
            <span>{slide.tag}</span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: '2.4rem',
              fontWeight: 800,
              lineHeight: 1.15,
              color: '#fff',
              marginBottom: '0.8rem',
              textShadow: '0 2px 10px rgba(0,0,0,0.8)',
            }}
          >
            {slide.title}
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: '1.05rem',
              color: '#c9d1d9',
              marginBottom: '1.6rem',
              lineHeight: 1.5,
              textShadow: '0 1px 4px rgba(0,0,0,0.8)',
            }}
          >
            {slide.subtitle}
          </p>

          {/* Price & CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.8rem', color: '#8b949e', textDecoration: 'line-through' }}>
                M.R.P.: {formatINR(slide.originalPrice)}
              </span>
              <span
                style={{
                  fontSize: '1.8rem',
                  fontWeight: 800,
                  color: '#fff',
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {formatINR(slide.price)}
              </span>
            </div>

            <button
              onClick={() => onNavigate(slide.targetPath)}
              className="btn-primary"
              style={{ fontSize: '1rem', padding: '0.8rem 1.8rem' }}
            >
              <span>Explore Hardware & Specs</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Left/Right Navigation Arrows */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
        style={{
          position: 'absolute',
          left: '1.5rem',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          backgroundColor: 'rgba(22, 27, 34, 0.7)',
          border: '1px solid #30363d',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 20,
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#ff9900')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(22, 27, 34, 0.7)')}
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
        style={{
          position: 'absolute',
          right: '1.5rem',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          backgroundColor: 'rgba(22, 27, 34, 0.7)',
          border: '1px solid #30363d',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 20,
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#ff9900')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(22, 27, 34, 0.7)')}
      >
        <ChevronRight size={24} />
      </button>

      {/* Slide Indicators */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '8px',
          zIndex: 20,
        }}
      >
        {HERO_SLIDES.map((s, idx) => (
          <div
            key={s.id}
            onClick={() => setCurrentSlide(idx)}
            style={{
              width: currentSlide === idx ? '28px' : '8px',
              height: '8px',
              borderRadius: '99px',
              backgroundColor: currentSlide === idx ? '#ff9900' : 'rgba(255, 255, 255, 0.3)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
};
