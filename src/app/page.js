"use client"
import { useEffect, useState } from "react";
import axiosInstance from "./utils/axios-instance";
import Slider from "./home/slider";
import { imageUrlBase } from "./utils/helper";

export default function Home() {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [imageForOpening, setImageForOpening] = useState("");
  const [allImagesLinks, setAllImagesLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('enter here?',);
    const fetchImages = async () => {
      try {
        const response = await axiosInstance.get(`/api/slider-furnitures/1?populate=*`);
        console.log('res', response.data.data);
        setImages(response.data.data);
        const imagesLinks = response.data.data.attributes.images.data.map((image) => imageUrlBase + image.attributes.url);
        const href = imagesLinks[0];
        if (href) {
          console.log('imageLinks', imagesLinks);
          setImageForOpening(href);
          setAllImagesLinks(imagesLinks);
        }

      } catch (err) {
        // Handle any errors that occur during the fetch
        setError(err);
      } finally {
        // Set loading to false once the fetch is complete
        setLoading(false);
      }
    }
    fetchImages();
  }, [])

  const goToNextImage = (url) => {
    const index = allImagesLinks.findIndex((item) => item === url);
    if (index + 1 === allImagesLinks.length) {
      console.log('its the last so skip');
      // setImageForOpening(allImagesLinks[0].src);
    } else {
      setImageForOpening(allImagesLinks[index + 1]);
    }
  }

  const goToPrevImage = (url) => {
    const index = allImagesLinks.findIndex((item) => item === url);
    if (index - 1 === -1) {
      console.log('its first so skip');
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

  return <div>
    <h1 style={{ textAlign: 'center' }}>Мебели по поръчка</h1>
    <Slider
      href={imageForOpening}
      allImagesLinks={allImagesLinks}
      resetImage={setImageForOpening}
      handleNextImage={goToNextImage}
      handlePrevImage={goToPrevImage}
    />
  </div>;
}
