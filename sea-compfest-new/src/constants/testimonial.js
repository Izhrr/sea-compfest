//testimonials.js
export const ratingOptions = [
    { value: 1, label: '1 Star', stars: '⭐' },
    { value: 2, label: '2 Stars', stars: '⭐⭐' },
    { value: 3, label: '3 Stars', stars: '⭐⭐⭐' },
    { value: 4, label: '4 Stars', stars: '⭐⭐⭐⭐' },
    { value: 5, label: '5 Stars', stars: '⭐⭐⭐⭐⭐' }
];

export const testimonialFormMessages = {
    customerName: {
        required: 'Customer name is required',
        minLength: 'Name must be at least 2 characters',
        maxLength: 'Name must not exceed 50 characters'
    },
    reviewMessage: {
        required: 'Review message is required',
        minLength: 'Review must be at least 5 characters',
        maxLength: 'Review must not exceed 500 characters'
    },
    rating: {
        required: 'Please select a rating',
        invalid: 'Rating must be between 1 and 5'
    }
};

export const testimonialFormConfig = {
    customerName: {
        type: 'text',
        placeholder: 'Enter your full name',
        maxLength: 50,
        minLength: 2
    },
    reviewMessage: {
        type: 'textarea',
        placeholder: 'Share your experience with SEA Catering...',
        rows: 4,
        maxLength: 500,
        minLength: 5
    },
    rating: {
        type: 'select',
        placeholder: 'Select your rating'
    }
};

export const testimonialTemplate = {
    id: null, 
    customerName: '',
    reviewMessage: '',
    rating: 0, 
    createdAt: null, 
    updatedAt: null, 
    isApproved: false,
    isVisible: true,
    source: 'website'
};

export const carouselConfig = {
    itemsPerView: {
        mobile: 1,
        tablet: 2, 
        desktop: 3
    },
    autoplay: {
        enabled: false,
        delay: 5000, 
        pauseOnHover: true
    },
    navigation: {
        showArrows: true,
        showDots: true
    },
    animation: {
        transition: 'slide',
        duration: 300
    }
};