import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig'; // Adjust to your Firestore instance
import { collection, getDocs } from 'firebase/firestore';

const Slideshow = () => {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      const imagesCollection = collection(db, 'images');
      const imagesSnapshot = await getDocs(imagesCollection);
      const imagesList = imagesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setImages(imagesList);
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((currentSlide + 1) % images.length);
    }, 3000);

    return () => clearInterval(slideInterval);
  }, [currentSlide, images.length]);

  const nextSlide = () => setCurrentSlide((currentSlide + 1) % images.length);
  const prevSlide = () => setCurrentSlide((currentSlide - 1 + images.length) % images.length);

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      {images.length > 0 ? (
        <>
          <img
            src={images[currentSlide].imageUrl}
            alt={`Slide ${currentSlide + 1}`}
            className="w-full rounded-lg"
          />
          <h3 className="text-center">{images[currentSlide].title}</h3>
          <p className="text-center">{images[currentSlide].description}</p>

          {/* Slide Controls */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full"
          >&#9664;</button>

          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full"
          >&#9654;</button>
        </>
      ) : (
        <p className="text-center">No images available.</p>
      )}
    </div>
  );
};

export default Slideshow;
