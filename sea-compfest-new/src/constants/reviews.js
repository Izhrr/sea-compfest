import { star } from "../../public/assets/images";

export const reviews = [
    {
        id: 1,
        customerName: 'Ellen',
        reviewMessage: 'SEA Catering has completely transformed my meal planning! The food is fresh, delicious, and perfectly portioned. I love how they cater to my dietary restrictions without compromising on taste.',
        rating: 5,
        ratingImage: star, 
        title: 'Amazing Taste!',
        feedback: 'SEA Catering has completely transformed my meal planning! The food is fresh, delicious, and perfectly portioned. I love how they cater to my dietary restrictions without compromising on taste.', // untuk backward compatibility
        reviewer: 'Ellen',
        createdAt: '2024-12-15T08:30:00Z',
        isApproved: true,
        isVisible: true,
        source: 'website'
    },
    {
        id: 2,
        customerName: 'John Doe',
        reviewMessage: 'Outstanding service and quality! The delivery is always on time, and the packaging keeps everything fresh. My family loves the variety of meals available.',
        rating: 5,
        ratingImage: star,
        title: 'Outstanding Service!',
        feedback: 'Outstanding service and quality! The delivery is always on time, and the packaging keeps everything fresh. My family loves the variety of meals available.',
        reviewer: 'John Doe',
        createdAt: '2024-12-10T14:45:00Z',
        isApproved: true,
        isVisible: true,
        source: 'website'
    },
    {
        id: 3,
        customerName: 'Sarah Williams',
        reviewMessage: 'As a busy professional, SEA Catering has been a lifesaver. Healthy, tasty meals delivered right to my door. The nutrition information is detailed and accurate.',
        rating: 4,
        ratingImage: star,
        title: 'Perfect for Busy Life!',
        feedback: 'As a busy professional, SEA Catering has been a lifesaver. Healthy, tasty meals delivered right to my door. The nutrition information is detailed and accurate.',
        reviewer: 'Sarah Williams',
        createdAt: '2024-12-08T11:20:00Z',
        isApproved: true,
        isVisible: true,
        source: 'website'
    },
    {
        id: 4,
        customerName: 'Michael Chen',
        reviewMessage: 'Great variety and excellent customer service. When I had a special request for my meal plan, they accommodated it perfectly. Highly recommend!',
        rating: 5,
        ratingImage: star,
        title: 'Great Variety!',
        feedback: 'Great variety and excellent customer service. When I had a special request for my meal plan, they accommodated it perfectly. Highly recommend!',
        reviewer: 'Michael Chen',
        createdAt: '2024-12-05T16:10:00Z',
        isApproved: true,
        isVisible: true,
        source: 'website'
    },
    {
        id: 5,
        customerName: 'Lisa Rodriguez',
        reviewMessage: 'The meal quality is consistently excellent. I appreciate how they use fresh, local ingredients. The portion sizes are perfect for my fitness goals.',
        rating: 4,
        ratingImage: star,
        title: 'Consistently Excellent!',
        feedback: 'The meal quality is consistently excellent. I appreciate how they use fresh, local ingredients. The portion sizes are perfect for my fitness goals.',
        reviewer: 'Lisa Rodriguez',
        createdAt: '2024-12-02T09:35:00Z',
        isApproved: true,
        isVisible: true,
        source: 'website'
    },
    {
        id: 6,
        customerName: 'David Kim',
        reviewMessage: 'SEA Catering exceeded my expectations! The food tastes homemade, and I love the eco-friendly packaging. Will definitely continue my subscription.',
        rating: 5,
        ratingImage: star,
        title: 'Exceeded Expectations!',
        feedback: 'SEA Catering exceeded my expectations! The food tastes homemade, and I love the eco-friendly packaging. Will definitely continue my subscription.',
        reviewer: 'David Kim',
        createdAt: '2024-11-28T13:15:00Z',
        isApproved: true,
        isVisible: true,
        source: 'website'
    }
];


export const getApprovedReviews = () => {
    return reviews.filter(review => review.isApproved && review.isVisible);
};

export const getReviewsByRating = (rating) => {
    return reviews.filter(review => review.rating === rating && review.isApproved && review.isVisible);
};

export const getAverageRating = () => {
    const approvedReviews = getApprovedReviews();
    if (approvedReviews.length === 0) return 0;
    
    const totalRating = approvedReviews.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / approvedReviews.length).toFixed(1);
};

export const getTotalReviewsCount = () => {
    return getApprovedReviews().length;
};