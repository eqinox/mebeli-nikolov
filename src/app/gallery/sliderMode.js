import { isEmpty } from "lodash";
import { forwardRef, useEffect, useRef, useState } from "react";
import styles from './sliderMode.module.css';
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";

const SliderMode = forwardRef(({ href, resetImage, handleNextImage, handlePrevImage, allImagesLinks }, ref) => {
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const [clickLeft, setClickLeft] = useState(false);
    const [clickRight, setClickRight] = useState(false);
    const [visibleLeft, setVisibleLeft] = useState(false);
    const [visibleRight, setVisibleRight] = useState(false);
    const [visibleMiddle, setVisibleMiddle] = useState(true);
    const [animationNextImageHref, setAnimationNextImageHref] = useState(null);
    const [animationPrevImageHref, setAnimationPrevImageHref] = useState(null);
    const modalRef = useRef();
    const timeoutRef = useRef(null);
    const lastTimeoutCallbackRef = useRef(null);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
            clearTimeout(timeoutRef.current);
        };
    }, [href]);

    const currentImageIndex = allImagesLinks.indexOf(href);
    let prevImageUrl = null;
    let nextImageUrl = null;
    if (currentImageIndex - 1 !== -1) {
        prevImageUrl = allImagesLinks[currentImageIndex - 1];
    }
    if (currentImageIndex + 1 !== allImagesLinks.length) {
        nextImageUrl = allImagesLinks[currentImageIndex + 1];
    }

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

            if (currentImageIndex + 2 !== allImagesLinks.length) {
                setAnimationNextImageHref(allImagesLinks[currentImageIndex + 2]);
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
            }, 500);
        });
    };

    const overridedHandlePrevImage = () => {
        executeWithImmediateInterrupt(() => {
            setClickLeft(true);
            setVisibleMiddle(false);
            setVisibleLeft(true);

            if (currentImageIndex - 2 !== -1) {
                setAnimationPrevImageHref(allImagesLinks[currentImageIndex - 2]);
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
            }, 500);
        });
    };

    const handleClose = () => {
        resetImage('');
        if (ref.current) {
            ref.current.close();
        }
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

    const handleClickOutside = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            handleClose();
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'ArrowRight') {
            overridedHandleNextImage();
        } else if (event.key === 'ArrowLeft') {
            overridedHandlePrevImage();
        }
    };

    return (
        <dialog ref={ref} className={styles.resultModal}>
            {!isEmpty(href) && (
                <div
                    ref={modalRef}
                    className={styles.imageContainer}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    {clickLeft && (
                        <div className={styles.animateFromLeftToRight}>
                            <Image
                                src={animationPrevImageHref}
                                fill
                                priority
                                style={{ objectFit: 'contain', opacity: 0.2 }}
                                alt="Displayed Image"
                            />
                        </div>
                    )}

                    <div
                        style={{
                            position: 'relative',
                            backgroundColor: 'black',
                        }}
                        className={`${styles.leftAndRight} 
                        ${clickLeft ? styles.moving : ''}
                        ${clickRight ? styles.leftOrRightBecomeNone : ''}`}
                    >
                        {!isEmpty(prevImageUrl) && (
                            <Image
                                src={prevImageUrl}
                                fill
                                priority
                                style={{ objectFit: 'contain' }}
                                className={`${visibleLeft ? styles.visibleWithTransition : styles.notVisibleWithoutTransition}`}
                                alt="Displayed Image"
                            />
                        )}
                    </div>

                    <div
                        style={{
                            display: 'block',
                            position: 'absolute',
                            top: '0px',
                            right: '0px',
                            top: '-25px',
                        }}
                        onClick={handleClose}
                    >
                        <IoCloseSharp size={30} className={styles.arrowIcon} />
                    </div>
                    <div className={styles.leftArrow} onClick={overridedHandlePrevImage}>
                        <FaChevronCircleLeft size={40} className={styles.arrowIcon} />
                    </div>

                    <div
                        className={`${styles.middle} 
                        ${clickRight || clickLeft ? styles.movingMiddle : ''}`}
                        style={{ position: 'relative', backgroundColor: '#000' }}
                    >
                        <Image
                            src={href}
                            fill
                            priority
                            style={{ objectFit: 'contain' }}
                            className={`${visibleMiddle ? styles.visible : styles.notVisible}`}
                            alt="Displayed Image"
                        />
                    </div>
                    <div
                        style={{ position: 'relative', backgroundColor: 'black' }}
                        className={`${styles.leftAndRight}                     
                        ${clickRight ? styles.moving : ''} 
                        ${clickLeft ? styles.leftOrRightBecomeNone : ''}`}
                    >
                        {!isEmpty(nextImageUrl) && (
                            <Image
                                src={nextImageUrl}
                                fill
                                priority
                                style={{ objectFit: 'contain' }}
                                className={`${visibleRight ? styles.visibleWithTransition : styles.notVisibleWithoutTransition}`}
                                alt="Displayed Image"
                            />
                        )}
                    </div>

                    {clickRight && (
                        <div style={{ position: 'relative', backgroundColor: 'black', flex: '0 0 20%', transition: 'all 0.5s' }}>
                            {!isEmpty(animationNextImageHref) && (
                                <Image
                                    src={animationNextImageHref}
                                    fill
                                    priority
                                    style={{ objectFit: 'contain', opacity: 0.2 }}
                                    alt="Displayed Image"
                                />
                            )}
                        </div>
                    )}

                    <div className={styles.rightArrow} onClick={overridedHandleNextImage}>
                        <FaChevronCircleRight size={40} className={styles.arrowIcon} />
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            width: '100%',
                            position: 'absolute',
                            bottom: '0',
                        }}
                    >
                        {allImagesLinks.map((image, index) => (
                            <div key={index} onClick={() => resetImage(image)} style={{ cursor: 'pointer', position: 'relative' }}>
                                {href === image && (
                                    <FaCheckCircle
                                        style={{
                                            position: 'absolute',
                                            left: '40%',
                                            top: '40%',
                                            backgroundColor: 'transparent',
                                            color: 'white',
                                        }}
                                        size={25}
                                    />
                                )}

                                <Image alt="temp" width={100} height={100} src={image} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </dialog>
    );
});

SliderMode.displayName = 'SliderMode';

export default SliderMode;
