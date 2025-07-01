"use client";
import React, { useState, useEffect, useRef } from 'react';

const Carousel = ({
  items = [],
  renderItem,
  itemsPerView = { mobile: 1, tablet: 2, desktop: 3 },
  autoplay = { enabled: true, delay: 5000, pauseOnHover: true },
  navigation = { showArrows: true, showDots: true },
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(itemsPerView.desktop);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

  // Responsive items per view
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
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [itemsPerView]);

  // Auto-play functionality
  useEffect(() => {
    if (autoplay.enabled && !isHovered && items.length > itemsToShow) {
      intervalRef.current = setInterval(() => {
        goToNext();
      }, autoplay.delay);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line
  }, [autoplay, isHovered, items.length, itemsToShow, currentIndex]);

  // Berapa "slide" total: slide = halaman, per halaman = itemsToShow
  const totalSlides = Math.ceil(items.length / itemsToShow);
  const currentSlide = Math.floor(currentIndex / itemsToShow);

  // Geser per halaman
  const goToPrevious = () => {
    setCurrentIndex(prevIndex => {
      const prevSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      return prevSlide * itemsToShow;
    });
  };

  const goToNext = () => {
    setCurrentIndex(prevIndex => {
      const nextSlide = (currentSlide + 1) % totalSlides;
      return nextSlide * itemsToShow;
    });
  };

  const goToSlide = (slideIdx) => {
    setCurrentIndex(slideIdx * itemsToShow);
  };

  // Ambil item yang tampil di halaman ini (per halaman)
  const getVisibleItems = () => {
    const visible = [];
    for (let i = 0; i < itemsToShow; i++) {
      // Looping jika sisa data tidak cukup
      visible.push(items[(currentIndex + i) % items.length]);
    }
    return visible;
  };

  if (items.length === 0) {
    return <div className="text-center text-gray-500 py-8">No items to display</div>;
  }

  return (
    <div
      className={`relative w-full ${className}`}
      onMouseEnter={() => autoplay.pauseOnHover && setIsHovered(true)}
      onMouseLeave={() => autoplay.pauseOnHover && setIsHovered(false)}
      style={{ minHeight: '370px' }} // Tinggi minimum agar efek card tidak terpotong
    >
      {/* Carousel Container */}
      <div className="overflow-visible rounded-2xl py-6 px-2 sm:px-4">
        <div className="flex transition-transform duration-300 ease-in-out"
          style={{ minHeight: 320 }}>
          {getVisibleItems().map((item, idx) => (
            <div
              key={item.id || idx}
              className="flex-shrink-0 px-4"
              style={{ width: `calc(100%/${itemsToShow})` }}
            >
              {renderItem(item, (currentIndex + idx) % items.length)}
            </div>
          ))}
        </div>
      </div>
      {/* Navigation Arrows */}
      {navigation.showArrows && items.length > itemsToShow && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute -left-6 sm:-left-10 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-200 z-10 group"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6 text-primary group-hover:text-paragraph-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute -right-6 sm:-right-10 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-200 z-10 group"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6 text-primary group-hover:text-paragraph-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
      {/* Dots Navigation */}
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