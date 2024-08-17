"use client"
import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

import { imageUrlBase } from "../utils/helper";
import axiosInstance from "../utils/axios-instance";
import Image from 'next/image';
import styles from './page.module.css';

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [imagesInCollection, setImagesInCollection] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [viewCollection, setViewCollection] = useState(false);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axiosInstance.get(`/api/furnitures?populate=*`);
                setImages(response.data.data);

            } catch (err) {
                // Handle any errors that occur during the fetch
                setError(error);
            } finally {
                // Set loading to false once the fetch is complete
                setLoading(false);
            }
        }
        fetchImages();
    }, [])

    // Add event listener for 'Escape' key press
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setViewCollection(false);
            }
        };

        if (viewCollection) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [viewCollection]);

    const openGalleryInSliderMode = (item) => {
        const images = item.attributes.images.data.map((image) => image);
        setViewCollection(true);
        setImagesInCollection(images);
    }

    if (loading) {
        // Render loading state
        return <div>Loading...</div>;
    }

    if (error) {
        // Render error state
        return <div>Error: {error.message}</div>;
    }

    const images2 = imagesInCollection.map((image) => ({
        original: imageUrlBase + image.attributes.url,
        thumbnail: imageUrlBase + image.attributes.formats.thumbnail.url,
    }));

    return <div style={{ width: '100%' }} >
        {!viewCollection && <h1 style={{ textAlign: 'center' }}>Галерия</h1>}


        {!viewCollection && images.length && images.map((collection) => <div
            key={collection.id}
            className={styles.gallery}
            onClick={() => openGalleryInSliderMode(collection)}
        >
            <Image
                alt={`${collection.attributes.title}`}
                src={imageUrlBase + collection.attributes.displayImage.data.attributes.url}
                height={240}
                width={320}
            />
            <div className={styles.overlay}>
                {collection.attributes.title}
            </div>
        </div>)}

        {viewCollection && <>
            <div style={{ position: 'relative' }}>
                <div onClick={() => setViewCollection(false)} style={{ position: 'absolute', zIndex: '100', top: '0', right: '0' }}>
                    <IoCloseSharp size={30} className={styles.arrowIcon} />
                </div>

                <ImageGallery
                    items={images2}
                    showThumbnails={true} // Hides thumbnails below the images
                    showPlayButton={true} // Hide the play button
                    showFullscreenButton={true} // Show the fullscreen button
                    useBrowserFullscreen={true} // Use the browser's native fullscreen API
                    showBullets={true} // Show bullets (pagination dots)
                    slideDuration={600} // Duration of slide transition in milliseconds
                    autoPlay={true} // Enable autoplay
                    slideInterval={3000} // Interval between slides (3 seconds)
                />
            </div>
        </>}

    </div>;
};

export default Gallery;
