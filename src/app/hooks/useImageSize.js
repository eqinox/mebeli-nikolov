// hooks/useImageSize.js
import { useState, useEffect } from 'react';

const useImageSize = (src) => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setSize({ width: img.naturalWidth, height: img.naturalHeight });
    };
  }, [src]);

  return size;
};

export default useImageSize;
