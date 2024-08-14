import { useState, useRef, useCallback } from 'react';

// Debounce function
const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

const useImageNavigation = (allImagesLinks, handleNextImage, handlePrevImage) => {
    const [clickRight, setClickRight] = useState(false);
    const [clickLeft, setClickLeft] = useState(false);
    const [visibleMiddle, setVisibleMiddle] = useState(true);
    const [visibleRight, setVisibleRight] = useState(false);
    const [visibleLeft, setVisibleLeft] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [animationNextImageHref, setAnimationNextImageHref] = useState(null);
    const [animationPrevImageHref, setAnimationPrevImageHref] = useState(null);

    const debounceTime = 500;
    const inProgressRef = useRef(false);

    const overridedHandleNextImage = useCallback(debounce(() => {
        if (inProgressRef.current) return;
        inProgressRef.current = true;

        setClickRight(true);
        setVisibleMiddle(false);
        setVisibleRight(true);
        if (currentImageIndex + 2 !== allImagesLinks.length) {
            setAnimationNextImageHref(allImagesLinks[currentImageIndex + 2]);
        }
        window.setTimeout(() => {
            handleNextImage(animationNextImageHref || allImagesLinks[currentImageIndex + 1]);
            setClickRight(false);
            setVisibleMiddle(true);
            setVisibleRight(false);
            setCurrentImageIndex(prevIndex => prevIndex + 1);
            inProgressRef.current = false;
        }, debounceTime);
    }, debounceTime), [currentImageIndex, allImagesLinks, handleNextImage, animationNextImageHref]);

    const overridedHandlePrevImage = useCallback(debounce(() => {
        if (inProgressRef.current) return;
        inProgressRef.current = true;

        setClickLeft(true);
        setVisibleMiddle(false);
        setVisibleLeft(true);

        if (currentImageIndex - 2 !== -1) {
            setAnimationPrevImageHref(allImagesLinks[currentImageIndex - 2]);
        }

        setTimeout(() => {
            handlePrevImage(animationPrevImageHref || allImagesLinks[currentImageIndex - 1]);
            setClickLeft(false);
            setVisibleMiddle(true);
            setVisibleLeft(false);
            setCurrentImageIndex(prevIndex => prevIndex - 1);
            inProgressRef.current = false;
        }, debounceTime);
    }, debounceTime), [currentImageIndex, allImagesLinks, handlePrevImage, animationPrevImageHref]);

    return {
        overridedHandleNextImage,
        overridedHandlePrevImage,
        clickRight,
        clickLeft,
        visibleMiddle,
        visibleRight,
        visibleLeft,
    };
};

export default useImageNavigation;