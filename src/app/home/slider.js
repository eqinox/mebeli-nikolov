import { isEmpty } from "lodash";
import { forwardRef, useEffect, useRef, useState } from "react";
import styles from './slider.module.css';
import Image from "next/image";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

const Slider = forwardRef(({ href, resetImage, handleNextImage, handlePrevImage, allImagesLinks }) => {
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const [clickLeft, setClickLeft] = useState(false);
    const [clickRight, setClickRight] = useState(false);
    const [visibleLeft, setVisibleLeft] = useState(false);
    const [visibleRight, setVisibleRight] = useState(false);
    const [visibleMiddle, setVisibleMiddle] = useState(true);
    const [animationTwoTimesNextImageHref, setAnimationTwoTimesNextImageHref] = useState(null);
    const [animationTwoTimesPrevImageHref, setAnimationTwoTimesPrevImageHref] = useState(null);
    const timeoutRef = useRef(null);
    const lastTimeoutCallbackRef = useRef(null);

    

    const currentImageIndex = allImagesLinks.indexOf(href);
    let twoTimesPrevImgUrl = null;
    let twoTimesNextImgUrl = null;
    let prevImageUrl = null;
    let nextImageUrl = null;
    if (currentImageIndex - 1 !== -1) {
        prevImageUrl = allImagesLinks[currentImageIndex - 1];
    }
    if (currentImageIndex + 1 !== allImagesLinks.length) {
        nextImageUrl = allImagesLinks[currentImageIndex + 1];
    }

    if (currentImageIndex - 2 !== -2) {
        twoTimesPrevImgUrl = allImagesLinks[currentImageIndex - 2];
    }
    if (currentImageIndex + 2 !== allImagesLinks.length) {
        twoTimesNextImgUrl = allImagesLinks[currentImageIndex + 2];
    }

    useEffect(() => {
        // Set up the keydown event listener
        document.addEventListener('keydown', handleKeyDown);
        
        // Set up the interval to call overridedHandleNextImage every 7 seconds
        const intervalId = setInterval(() => {
            if (currentImageIndex !== allImagesLinks.length - 1) {
                overridedHandleNextImage()
            }            
        }, 7000);

        return () => {
            // Cleanup the keydown event listener
            document.removeEventListener('keydown', handleKeyDown);

            // Clear the interval
            clearInterval(intervalId);

            // Clear any timeout still running
            clearTimeout(timeoutRef.current);
        };
    }, [href]);

    const executeTimeoutCallback = () => {
        if (lastTimeoutCallbackRef.current) {
            lastTimeoutCallbackRef.current();
            lastTimeoutCallbackRef.current = null;
        }
    };

    const executeWithImmediateInterrupt = (callback) => {
        executeTimeoutCallback();
        callback();
    };

    const overridedHandleNextImage = () => {
        executeWithImmediateInterrupt(() => {
            setClickRight(true);
            setVisibleMiddle(false);
            setVisibleRight(true);

            if (currentImageIndex + 3 !== allImagesLinks.length) {
                setAnimationTwoTimesNextImageHref(allImagesLinks[currentImageIndex + 3]);
            }

            lastTimeoutCallbackRef.current = () => {
                handleNextImage(href);
                setClickRight(false);
                setVisibleMiddle(true);
                setVisibleRight(false);
            };

            timeoutRef.current = setTimeout(() => {
                if (lastTimeoutCallbackRef.current) {
                    lastTimeoutCallbackRef.current();
                    lastTimeoutCallbackRef.current = null;
                }
            }, 1000);
        });
    };

    const overridedHandlePrevImage = () => {
        executeWithImmediateInterrupt(() => {
            setClickLeft(true);
            setVisibleMiddle(false);
            setVisibleLeft(true);

            if (currentImageIndex - 3 !== -1) {
                setAnimationTwoTimesPrevImageHref(allImagesLinks[currentImageIndex - 3])
            }

            lastTimeoutCallbackRef.current = () => {
                handlePrevImage(href);
                setClickLeft(false);
                setVisibleMiddle(true);
                setVisibleLeft(false);
            };

            timeoutRef.current = setTimeout(() => {
                if (lastTimeoutCallbackRef.current) {
                    lastTimeoutCallbackRef.current();
                    lastTimeoutCallbackRef.current = null;
                }
            }, 1000);
        });
    };

    const handleTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        // Ensure there was a swipe, not just a tap
        if (!touchStart || !touchEnd) return;

        // Determine swipe direction
        const threshold = 50; // Minimum distance of the swipe
        const swipeRight = touchEnd - touchStart > threshold;
        const swipeLeft = touchStart - touchEnd > threshold;

        if (swipeRight) {
            overridedHandlePrevImage(); // Swiping right to go to the previous image
        } else if (swipeLeft) {
            overridedHandleNextImage(); // Swiping left to go to the next image
        }

        // Reset
        setTouchStart(null);
        setTouchEnd(null);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'ArrowRight') {
            overridedHandleNextImage();
        } else if (event.key === 'ArrowLeft') {
            overridedHandlePrevImage();
        }
    };

    const getVisibleImages = (currentIndex, images, maxVisible = 9) => {
        // If the current index is within the first maxVisible images, always show the first maxVisible images
        if (currentIndex < maxVisible - 1) {
            return images.slice(0, maxVisible);
        }

        // Calculate the start and end index for the sliding window
        const start = currentIndex - maxVisible + 2;
        const end = currentIndex + 2;

        // Return the sliced array of images
        return images.slice(start, end);
    }

    const indexOfDisplayedImage = allImagesLinks.findIndex((item) => item === href);
    const imagesToVisualizeAtBottom = getVisibleImages(indexOfDisplayedImage, allImagesLinks);

    return (
        <div
            className={styles.resultModal}
        >
            {!isEmpty(href) && (
                <div
                    className={styles.imageContainer}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    {/* Animation two times left */}
                    {clickLeft && <div className={styles.animateFlexTwoTimesLeft}>
                        <Image
                            src={animationTwoTimesPrevImageHref}
                            fill
                            priority
                            style={{
                                objectFit: 'contain',
                                opacity: 0.2
                            }}
                            alt="Displayed Image"
                        />
                    </div>}

{/* Two times prev */}
                    <div
                        style={{
                            position: 'relative',
                        }}
                        className={`${styles.twoTimesLeftAndRight} 
                    ${clickLeft ? styles.movingTwoTimesToOneTime : ''}
                    ${clickRight ? styles.leftOrRightBecomeNone : ''}`}
                    >
                        {!isEmpty(twoTimesPrevImgUrl) && <Image
                            src={twoTimesPrevImgUrl}
                            fill
                            priority
                            style={{ objectFit: 'contain', opacity: 0.4 }}
                            className={`${visibleLeft ? styles.visibleWithTransition : styles.notVisibleWithoutTransition}`}
                            alt="Displayed Image"
                        />}
                    </div>

                    {/* Prev */}
                    <div
                        style={{
                            position: 'relative',
                        }}
                        className={`${styles.leftAndRight} 
                        ${clickLeft ? styles.movingToMiddle : ''}
                        ${clickRight ? styles.movingPrevToTwoTimesPrev : ''}`}
                    >
                        {!isEmpty(prevImageUrl) && (
                            <Image
                                src={prevImageUrl}
                                fill
                                priority
                                style={{ objectFit: 'contain'}}
                                className={`${visibleLeft ? styles.visibleWithTransition : styles.notVisibleWithoutTransition}`}
                                alt="Displayed Image"
                            />
                        )}
                    </div>

                    <div className={styles.leftArrow} onClick={overridedHandlePrevImage}>
                        <MdOutlineKeyboardArrowLeft size={80} className={styles.arrowIcon} />
                    </div>

                    {/* Middle */}
                    <div
                        className={`${styles.middle} 
                        ${clickRight || clickLeft ? styles.movingMiddle : ''}`}
                        style={{ position: 'relative' }}
                    >
                        <Image
                            src={href}
                            fill
                            priority
                            // width={100}
                            // height={100}
                            style={{
                                objectFit: 'contain',
                                //  width: 'auto', height: 'auto' 
                            }}
                            className={`${visibleMiddle ? styles.visible : styles.notVisible}`}
                            alt="Displayed Image"
                        />
                    </div>

                    {/* Next */}
                    <div
                        style={{ position: 'relative' }}
                        className={`${styles.leftAndRight}                     
                        ${clickRight ? styles.movingToMiddle : ''} 
                        ${clickLeft ? styles.movingOneTimeToTwoTimes : ''}`}
                    >
                        {!isEmpty(nextImageUrl) && <Image
                            src={nextImageUrl}
                            fill
                            priority
                            style={{ objectFit: 'contain'}}
                            className={`${visibleRight ? styles.visibleWithTransition : styles.notVisibleWithoutTransition}`}
                            alt="Displayed Image"
                        />}

                    </div>

                    {/* Two times next */}
                    <div
                        style={{ position: 'relative' }}
                        className={`${styles.twoTimesLeftAndRight}                     
                    ${clickRight ? styles.movingTwoTimesToOneTime : ''} 
                    ${clickLeft ? styles.leftOrRightBecomeNone : ''}`}
                    >
                        {!isEmpty(twoTimesNextImgUrl) && <Image
                            src={twoTimesNextImgUrl}
                            fill
                            priority
                            style={{ objectFit: 'contain', opacity: 0.4}}
                            className={`${visibleRight ? styles.visibleWithTransition : styles.notVisibleWithoutTransition}`}
                            alt="Displayed Image"
                        />}

                    </div>

                    {/* Two times animation next */}
                    {clickRight && (
                        <div style={{
                            position: 'relative',
                            flex: '0 0 10%',
                            transition: 'all 1s',
                            height: '50%'
                        }}>
                            <Image
                                src={animationTwoTimesNextImageHref}
                                fill
                                priority
                                style={{
                                    objectFit: 'contain',
                                    opacity: 0.4 
                                }}
                                alt="Displayed Image"
                            />
                        </div>
                    )}

                    <div className={styles.rightArrow} onClick={overridedHandleNextImage}>
                        <MdOutlineKeyboardArrowRight size={80} className={styles.arrowIcon} />
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            width: '100%',
                            position: 'absolute',
                            bottom: '20%',
                            backgroundColor: 'black',
                            justifyContent: 'center'
                        }}
                    >
                        {imagesToVisualizeAtBottom.map((image, index) => (
                            <div key={index} onClick={() => resetImage(image)} style={{
                                cursor: 'pointer', position: 'relative',
                                padding: '20px 5px'
                            }}>
                                <Image alt="temp" style={{
                                    // padding: '20px 5px',
                                    border: href === image ? '3px solid white' : ''
                                }} width={60} height={60} src={image} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
});

Slider.displayName = 'Slider';

export default Slider;
