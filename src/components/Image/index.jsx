import { useState, forwardRef } from "react";
import images from "@/assets/images";

const Image = forwardRef(({ src, alt, className, fallback: customFallback = images.noImage, ...props }, ref) => {
    const [fallback, setFallback] = useState("");
    const handleError = () => {
        setFallback(customFallback);
    };
    return <img src={fallback || src} ref={ref} alt={alt} className={className} {...props} onError={handleError} />;
});

export default Image;
