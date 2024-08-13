"use client"
import { useEffect, useRef, useState } from "react";
import { imageUrlBase } from "../utils/helper";
import axiosInstance from "../utils/axios-instance";
import Image from 'next/legacy/image';
import styles from './page.module.css';
import SliderMode from "./sliderMode";

const Gallery = () => {
    const [images, setImages] = useState([]);
    const [allImagesLinks, setAllImagesLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imageForOpening, setImageForOpening] = useState("");

    const sliderRef = useRef(null);

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

    const openGalleryInSliderMode = (item) => {
        const imagesLinks = item.attributes.images.data.map((image) => imageUrlBase + image.attributes.url);
        const href = imagesLinks[0];
        if (href) {
            sliderRef.current.showModal();
            console.log('imageLinks', imagesLinks);
            setImageForOpening(href);
            setAllImagesLinks(imagesLinks);
        }
    }

    const goToNextImage = (url) => {
        const index = allImagesLinks.findIndex((item) => item === url);
        if (index + 1 === allImagesLinks.length) {
            console.log('its the last so skip' );
            // setImageForOpening(allImagesLinks[0].src);
        } else {
            setImageForOpening(allImagesLinks[index + 1]);
        }
    }

    const goToPrevImage = (url) => {
        const index = allImagesLinks.findIndex((item) => item === url);
        if (index - 1 === -1) {
            console.log('its first so skip' );
            // setImageForOpening(allImagesLinks[allImagesLinks.length - 1]);
        } else {
            setImageForOpening(allImagesLinks[index - 1]);
        }
    }

    if (loading) {
        // Render loading state
        return <div>Loading...</div>;
    }

    if (error) {
        // Render error state
        return <div>Error: {error.message}</div>;
    }
    
    return <div style={{width: '100%'}} >

        <div style={{
            display: 'flex',
            flexDirection: 'column',
            flex: '1 0 auto',
            position: 'relative'
        }}>
            <SliderMode
                ref={sliderRef}
                href={imageForOpening}
                allImagesLinks={allImagesLinks}
                resetImage={setImageForOpening}
                handleNextImage={goToNextImage}
                handlePrevImage={goToPrevImage}
            />
        </div>

        <h1 style={{ textAlign: 'center' }}>Галерия</h1>

        {images.length > 0 && images.map((item) =>
            <div
                key={item.id}
                className={styles.gallery}
                onClick={() => openGalleryInSliderMode(item)}
            >
                <Image
                    alt={`${item.attributes.title}`}
                    src={imageUrlBase + item.attributes.displayImage.data.attributes.url}
                    height={240}
                    width={320}
                />
                <div className={styles.overlay}>
                    {item.attributes.title}
                </div>
            </div>

        )}

    </div>;
};

export default Gallery;
