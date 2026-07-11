import React from 'react';
import { Star, StarHalf } from 'lucide-react';

interface StarRatingProps {
  rating: number; // e.g. 4.7 or 3.5
  maxRating?: number;
  size?: number;
  interactive?: boolean;
  onRatingChange?: (newRating: number) => void;
  showNumber?: boolean;
  count?: number;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size = 16,
  interactive = false,
  onRatingChange,
  showNumber = false,
  count,
}) => {
  const [hoverRating, setHoverRating] = React.useState<number | null>(null);
  const displayRating = hoverRating !== null ? hoverRating : rating;

  const stars = [];
  for (let i = 1; i <= maxRating; i++) {
    const isFull = i <= Math.floor(displayRating);
    const isHalf = !isFull && i - displayRating <= 0.5 && i - displayRating > 0;

    stars.push(
      <span
        key={i}
        style={{ cursor: interactive ? 'pointer' : 'default', display: 'inline-flex' }}
        onMouseEnter={() => interactive && setHoverRating(i)}
        onMouseLeave={() => interactive && setHoverRating(null)}
        onClick={() => interactive && onRatingChange && onRatingChange(i)}
      >
        {isFull ? (
          <Star size={size} fill="#ff9900" color="#ff9900" />
        ) : isHalf ? (
          <StarHalf size={size} fill="#ff9900" color="#ff9900" />
        ) : (
          <Star size={size} color="#8b949e" />
        )}
      </span>
    );
  }

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
      <div style={{ display: 'inline-flex', gap: '2px' }}>{stars}</div>
      {showNumber && (
        <span style={{ fontSize: `${Math.max(12, size - 2)}px`, fontWeight: 600, color: '#f0f6fc' }}>
          {rating.toFixed(1)}
        </span>
      )}
      {count !== undefined && (
        <span style={{ fontSize: `${Math.max(12, size - 2)}px`, color: '#00f2fe', cursor: 'pointer' }}>
          ({count.toLocaleString('en-IN')})
        </span>
      )}
    </div>
  );
};
