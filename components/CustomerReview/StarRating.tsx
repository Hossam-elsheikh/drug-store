import React, { useState, useEffect, FC } from "react";

interface StarProps {
    onRate?: () => void;
    full: boolean;
    onHoverIn?: () => void;
    onHoverOut?: () => void;
    color: string;
    size: number;
    mode: "rating" | "review";
}

interface StarRatingProps {
    maxRating?: number;
    defaultRating?: number;
    color?: string;
    size?: number;
    messages?: string[];
    className?: string;
    onSetRating?: (rating: number) => void;
    mode: "rating" | "review";
}

const Star: FC<StarProps> = ({ onRate, full, onHoverIn, onHoverOut, color, size, mode }) => {
    return (
        <span
            role="button"
            style={{ width: size, height: size, display: 'block', cursor: mode === 'rating' ? 'pointer' : 'default' }}
            onClick={mode === 'rating' ? onRate : undefined}
            onMouseEnter={mode === 'rating' ? onHoverIn : undefined}
            onMouseLeave={mode === 'rating' ? onHoverOut : undefined}
            className={mode === 'rating' ? 'active:scale-[.90] duration-200' : ''}
        >
            {full ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill={color}
                    stroke={color}
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke={color}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                </svg>
            )}
        </span>
    );
};

const StarRating: FC<StarRatingProps> = ({
    maxRating = 5,
    color = "#fcc419",
    size = 48,
    className = "",
    messages = [],
    defaultRating = 0,
    onSetRating,
    mode,
}) => {
    const [rating, setRating] = useState<number>(defaultRating);
    const [tempRating, setTempRating] = useState<number>(0);

    useEffect(() => {
    
        setRating(defaultRating);
        setTempRating(0);
    }, [defaultRating]);

    function handleRating(rating: number) {
        setRating(rating);
        setTempRating(0); 
        if (onSetRating && mode === "rating") {
            onSetRating(rating);
        }
    }

    const renderStars = (currentRating: number) => (
        <div className="flex">
            {Array.from({ length: maxRating }, (_, i) => (
                <Star
                    key={i}
                    full={currentRating >= i + 1}
                    color={color}
                    size={size}
                    mode={mode}
                />
            ))}
        </div>
    );

    if (mode === "review") {
        return (
            <div className={`flex items-center gap-4 ${className}`} style={{ fontSize: size / 1.5, color: color }}>
                {renderStars(rating)}
                <p className="text-sm">
                    {messages.length > 0 && rating
                        ? messages[(rating - 1) % messages.length]
                        : ""}
                </p>
            </div>
        );
    }

    return (
        <div className={`flex items-center gap-4 ${className}`} style={{ fontSize: size / 1.5, color: color }}>
            <div className="flex">
                {Array.from({ length: maxRating }, (_, i) => (
                    <Star
                        key={i}
                        full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
                        onRate={() => handleRating(i + 1)}
                        onHoverIn={() => setTempRating(i + 1)}
                        onHoverOut={() => setTempRating(0)}
                        color={color}
                        size={size}
                        mode={mode}
                    />
                ))}
            </div>
            <p className='text-sm hidden'>
                {messages.length > 0 && (tempRating || rating)
                    ? messages[(tempRating || rating) - 1 % messages.length]
                    : tempRating || rating || ""}
            </p>
        </div>
    );
};

export default StarRating;
