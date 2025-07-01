"use client";
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const Carousel = ({
  items = [],
  renderItem,
  itemsPerView = { mobile: 1, tablet: 2, desktop: 3 },
  autoplay = { enabled: true, delay: 5000, pauseOnHover: true },
  navigation = { showArrows: true, showDots: true },
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(itemsPerView.desktop);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

  // Validasi renderItem di awal
  if (!renderItem || typeof renderItem !== 'function') {
    console.error('Carousel: renderItem prop must be a function');
    return (
      <div className="text-center text-red-500 py-8 border border-red-300 rounded-lg bg-red-50">
        <div className="text-lg font-semibold mb-2">⚠️ Carousel Configuration Error</div>
        <div className="text-sm">renderItem prop is required and must be a function</div>
        <div className="text-xs text-red-400 mt-2">
        </div>
      </div>
    );
  }

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
  }, [autoplay, isHovered, items.length, itemsToShow, currentIndex]);

  // Total slides calculation
  const totalSlides = Math.ceil(items.length / itemsToShow);
  const currentSlide = Math.floor(currentIndex / itemsToShow);

  // Navigation functions
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => {
      const prevSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      return prevSlide * itemsToShow;
    });
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => {
      const nextSlide = (currentSlide + 1) % totalSlides;
      return nextSlide * itemsToShow;
    });
  };

  const goToSlide = (slideIdx) => {
    setCurrentIndex(slideIdx * itemsToShow);
  };

  // Get visible items
  const getVisibleItems = () => {
    const visible = [];
    for (let i = 0; i < itemsToShow; i++) {
      visible.push({
        ...items[(currentIndex + i) % items.length],
        uniqueKey: `${(currentIndex + i) % items.length}-${i}`,
      });
    }
    return visible;
  };

  if (items.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        <div className="text-lg mb-2">📋 No items to display</div>
        <div className="text-sm">Please provide items array to display in carousel</div>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full ${className}`}
      onMouseEnter={() => autoplay.pauseOnHover && setIsHovered(true)}
      onMouseLeave={() => autoplay.pauseOnHover && setIsHovered(false)}
      style={{ minHeight: '370px' }}
    >
      {/* Carousel Container */}
      <div className="overflow-visible rounded-2xl py-6 px-2 sm:px-4">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{ minHeight: 320 }}
        >
          {getVisibleItems().map((item, idx) => (
            <div
              key={item.uniqueKey}
              className="flex-shrink-0 px-4"
              style={{ width: `calc(100%/${itemsToShow})` }}
            >
              {(() => {
                try {
                  // Double check renderItem sebelum memanggil
                  if (typeof renderItem !== 'function') {
                    return (
                      <div className="text-red-500 border border-red-300 rounded p-4 bg-red-50">
                        <div className="font-semibold">Error:</div>
                        <div className="text-sm">renderItem is not a function</div>
                      </div>
                    );
                  }
                  return renderItem(item, (currentIndex + idx) % items.length);
                } catch (error) {
                  console.error('Error rendering carousel item:', error);
                  return (
                    <div className="text-red-500 border border-red-300 rounded p-4 bg-red-50">
                      <div className="font-semibold">Render Error:</div>
                      <div className="text-sm">{error.message}</div>
                    </div>
                  );
                }
              })()}
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
            <svg
              className="w-6 h-6 text-primary group-hover:text-paragraph-black transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute -right-6 sm:-right-10 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-100 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-200 z-10 group"
            aria-label="Next slide"
          >
            <svg
              className="w-6 h-6 text-primary group-hover:text-paragraph-black transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
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

// Props validation
Carousel.propTypes = {
  items: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired,
  itemsPerView: PropTypes.shape({
    mobile: PropTypes.number,
    tablet: PropTypes.number,
    desktop: PropTypes.number,
  }),
  autoplay: PropTypes.shape({
    enabled: PropTypes.bool,
    delay: PropTypes.number,
    pauseOnHover: PropTypes.bool,
  }),
  navigation: PropTypes.shape({
    showArrows: PropTypes.bool,
    showDots: PropTypes.bool,
  }),
  className: PropTypes.string,
};

export default Carousel;