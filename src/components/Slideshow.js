import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig'; // Adjust to your Firestore instance
import { collection, getDocs } from 'firebase/firestore';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Import icons for buttons

const Slideshow = () => {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

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
    if (!isHovered) {
      const slideInterval = setInterval(() => {
        setCurrentSlide((currentSlide + 1) % images.length);
      }, 3000); // Change slide every 3 seconds

      return () => clearInterval(slideInterval);
    }
  }, [currentSlide, images.length, isHovered]);

  const nextSlide = () => setCurrentSlide((currentSlide + 1) % images.length);
  const prevSlide = () => setCurrentSlide((currentSlide - 1 + images.length) % images.length);

  const goToSlide = (index) => setCurrentSlide(index);

  return (
    <div
      className="relative w-full max-w-3xl mx-auto bg-black rounded-lg overflow-hidden"
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      {images.length > 0 ? (
        <>
          {/* Image with fade effect */}
          <div className="relative">
            <img
              src={images[currentSlide].imageUrl}
              alt={`Slide ${currentSlide + 1}`}
              className="w-full h-80 object-cover transition-opacity duration-1000 opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
          </div>
          
          {/* Slide Text */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white">
            <h3 className="text-2xl font-bold">{images[currentSlide].title}</h3>
            <p className="text-lg">{images[currentSlide].description}</p>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 p-2 bg-white text-gray-700 rounded-full opacity-75 hover:opacity-100 transition-all"
          >
            <FaChevronLeft />
          </button>

          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 p-2 bg-white text-gray-700 rounded-full opacity-75 hover:opacity-100 transition-all"
          >
            <FaChevronRight />
          </button>

          {/* Navigation Dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full bg-white transition-all duration-300 ${
                  currentSlide === index ? 'opacity-100' : 'opacity-50'
                }`}
              ></button>
            ))}
          </div>
        </>
      ) : (
        <p className="text-center text-white">No images available.</p>
      )}
    </div>
  );
};

export default Slideshow;
