"use client";

import React, { useState, useEffect, useRef } from 'react';

const Carousel = ({
  children,
  itemsPerView = { mobile: 1, tablet: 2, desktop: 3 },
  autoplay = { enabled: true, delay: 5000, pauseOnHover: true },
  navigation = { showArrows: true, showDots: true },
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(itemsPerView.desktop);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

  // Mengubah children menjadi array yang bisa diolah, ini adalah kunci dari pola komposisi
  const items = React.Children.toArray(children);

  // Efek untuk mengatur item yang tampil berdasarkan lebar layar (responsif)
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setItemsToShow(itemsPerView.mobile);
      } else if (width < 1024) {
        setItemsToShow(itemsPerView.tablet);
      } else {
        setItemsToShow(itemsPerView.desktop);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); 

    return () => window.removeEventListener('resize', handleResize);
  }, [itemsPerView]);

  useEffect(() => {
    if (!autoplay.enabled || isHovered || items.length <= itemsToShow) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      goToNext();
    }, autoplay.delay);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoplay, isHovered, items.length, itemsToShow, currentIndex]); 

  const totalSlides = items.length > 0 ? Math.ceil(items.length / itemsToShow) : 0;
 
  const currentSlide = items.length > 0 ? Math.floor(currentIndex / itemsToShow) : 0;

 
  const goToPrevious = () => {
    const newCurrentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    setCurrentIndex(newCurrentSlide * itemsToShow);
  };


  const goToNext = () => {
    const newCurrentSlide = (currentSlide + 1) % totalSlides;
    setCurrentIndex(newCurrentSlide * itemsToShow);
  };
  
  
  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex * itemsToShow);
  };

  
  const getVisibleItems = () => {
    const visibleItems = [];
    if (items.length === 0) return visibleItems;
    
    for (let i = 0; i < itemsToShow; i++) {
      const itemIndex = (currentIndex + i) % items.length;
      visibleItems.push(items[itemIndex]);
    }
    return visibleItems;
  };
  

  if (items.length === 0) {
    return <div className="text-center text-gray-500 py-8">No items to display</div>;
  }

  return (
    <div
      className={`relative w-full ${className}`}
      onMouseEnter={() => autoplay.pauseOnHover && setIsHovered(true)}
      onMouseLeave={() => autoplay.pauseOnHover && setIsHovered(false)}
      style={{ minHeight: '370px' }} 
    >
      {/* Kontainer untuk item-item carousel */}
      <div className="overflow-visible rounded-2xl py-6 px-2 sm:px-4">
        <div 
          className="flex transition-transform duration-300 ease-in-out" 
          style={{ minHeight: 320 }}
        >
          {getVisibleItems().map((item, index) => (
            <div
              key={item.key || index} 
              className="flex-shrink-0 px-4"
              style={{ width: `calc(100% / ${itemsToShow})` }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Tombol Panah Navigasi */}
      {navigation.showArrows && items.length > itemsToShow && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute -left-6 sm:-left-10 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-200 z-10 group cursor-pointer"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6 text-primary group-hover:text-paragraph-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute -right-6 sm:-right-10 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-200 z-10 group cursor-pointer"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6 text-primary group-hover:text-paragraph-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Navigasi Dots */}
      {navigation.showDots && totalSlides > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide
                  ? 'bg-primary scale-110'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;