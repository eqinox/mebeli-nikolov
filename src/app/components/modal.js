import { isEmpty } from "lodash";
import Image from "next/legacy/image";
import { forwardRef, useEffect, useRef, useState } from "react";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";

import styles from './modal.module.css';

const Modal = forwardRef(({ href, resetImage, handleNextImage, handlePrevImage }, ref) => {
    const [isZoomed, setIsZoomed] = useState(false);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const modalRef = useRef();

    const handleClose = () => {
        resetImage('');
        if (ref.current) {
            ref.current.close();
        }
    }

    const toggleZoom = () => {
        setIsZoomed(!isZoomed);
    }

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
            handlePrevImage(href); // Swiping right to go to the previous image
        } else if (swipeLeft) {
            handleNextImage(href); // Swiping left to go to the next image
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
            handleNextImage(href);
        } else if (event.key === 'ArrowLeft') {
            handlePrevImage(href);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [href]);

    return <dialog ref={ref} className={styles.resultModal}>
        {!isEmpty(href) &&
            <div
                ref={modalRef}
                className={styles.imageContainer}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div
                    style={{
                        display: 'block',
                        position: 'absolute',
                        top: '0px',
                        right: '0px',
                        top: '-25px',
                    }}
                    onClick={() => handleClose()}
                >
                    <IoCloseSharp size={30} className={styles.arrowIcon} />
                </div>
                <div
                    className={styles.leftArrow}
                    onClick={() => handlePrevImage(href)}
                >
                    <FaChevronCircleLeft size={30} className={styles.arrowIcon} />
                </div>

                <Image
                    src={href}
                    alt='Displayed Image'
                    layout='fill'
                    priority
                    onClick={toggleZoom}
                    className={isZoomed ? styles.zoomedIn : styles.zoomedOut}
                />
                <div
                    className={styles.rightArrow}
                    onClick={() => handleNextImage(href)}
                >
                    <FaChevronCircleRight size={30} className={styles.arrowIcon} />
                </div>
            </div>}
    </dialog>;
});

Modal.displayName = 'Modal';

export default Modal;
