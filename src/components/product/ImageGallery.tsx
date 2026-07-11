import React, { useState } from 'react';

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, title }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const currentImg = images[selectedIdx] || images[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
      {/* Thumbnails Column */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          maxHeight: '460px',
          overflowY: 'auto',
          paddingRight: '4px',
        }}
      >
        {images.map((img, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedIdx(idx)}
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '6px',
              overflow: 'hidden',
              cursor: 'pointer',
              border: `2px solid ${selectedIdx === idx ? '#ff9900' : '#30363d'}`,
              backgroundColor: '#0d1117',
              transition: 'all 0.2s',
              boxShadow: selectedIdx === idx ? '0 0 10px rgba(255, 153, 0, 0.4)' : 'none',
            }}
          >
            <img src={img} alt={`${title} view ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        ))}
      </div>

      {/* Main Large Image Box with Hover Magnifier */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        style={{
          position: 'relative',
          flex: 1,
          height: '460px',
          borderRadius: '12px',
          overflow: 'hidden',
          backgroundColor: '#0d1117',
          border: '1px solid #30363d',
          cursor: 'zoom-in',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src={currentImg}
          alt={title}
          style={{
            maxHeight: '100%',
            maxWidth: '100%',
            objectFit: 'contain',
            transition: 'opacity 0.2s',
          }}
        />

        {/* Zoom Lens Overlay inside main box */}
        {isHovered && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${currentImg})`,
              backgroundSize: '220%',
              backgroundPosition: `${mousePos.x}% ${mousePos.y}%`,
              pointerEvents: 'none',
              borderRadius: '12px',
              boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8)',
            }}
          />
        )}

        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            fontSize: '0.75rem',
            color: '#8b949e',
            backgroundColor: 'rgba(13, 17, 23, 0.8)',
            padding: '4px 8px',
            borderRadius: '4px',
            pointerEvents: 'none',
          }}
        >
          Hover to Magnify 2x
        </div>
      </div>
    </div>
  );
};
