import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface ImageMagnifierProps {
    src: string;
    magnifierHeight?: number;
    magnifierWidth?: number;
    zoomLevel?: number;
}

const ImageMagnifier: React.FC<ImageMagnifierProps> = ({
    src,
    magnifierHeight = 100,
    magnifierWidth = 100,
    zoomLevel = 1.5
}) => {
    const [[x, y], setXY] = useState([0, 0]);
    const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
    const [showMagnifier, setShowMagnifier] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (imgRef.current) {
            setSize([imgRef.current.width, imgRef.current.height]);
        }
    }, []);

    return (
        <div
          className="flex justify-center items-center"
            style={{
                position: "relative",
                height: "100%",
                width: "100%",

            }}
        >
            <div
          
                style={{
                    position: "relative",
                    width: "50%",
                    height: "100%",
                }}
                onMouseEnter={(e) => {
                    setShowMagnifier(true);
                }}
                onMouseMove={(e) => {
                    const elem = e.currentTarget;
                    const { top, left } = elem.getBoundingClientRect();
                    const x = e.pageX - left - window.pageXOffset;
                    const y = e.pageY - top - window.pageYOffset;
                    setXY([x, y]);
                }}
                onMouseLeave={() => {
                    setShowMagnifier(false);
                }}
            >
                <Image
                    ref={imgRef}
                    src={src}
                    layout="fill"
                    objectFit="cover"
                    
                    alt="magnifiable image"
                />
            </div>

            {showMagnifier && (
                <div
                    style={{
                        display: "block",
                        position: "absolute",
                        pointerEvents: "none",
                        height: `${magnifierHeight}px`,
                        width: `${magnifierWidth}px`,
                        top: `${y - magnifierHeight / 2}px`,
                        left: `${x - magnifierWidth / 2 +150}px`,
                        opacity: "1",
                        border: "1px solid lightgray",
                        backgroundColor: "white",
                        backgroundImage: `url('${src}')`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: `${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px`,
                        backgroundPositionX: `${-x * zoomLevel + magnifierWidth / 2}px`,
                        backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`
                    }}
                ></div>
            )}
        </div>
    );
};

export default ImageMagnifier;
