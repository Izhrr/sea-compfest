import { meal,delivery,information } from "../assets/icons";
import { star,plan1,plan2,plan3 } from "../assets/images";


export const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#menu", label: "Menu" },
    { href: "#subscription", label: "Subscription" },
    { href: "#contact-us", label: "Contact Us" },
];

export const services = [
    { icon: meal, label: 'Meals crafted precisely for your unique taste and dietary needs.' },
    { icon: delivery, label: 'Convenient, fresh delivery straight to major cities nationwide.' },
    { icon: information, label: "Detailed nutrition facts so you always know what you're eating." },
];

export const reviews = [
    {
        rating: star,
        title: 'Amazing Taste!',
        feedback: 'Another great review text here about the food quality and delivery service.',
        reviewer: 'Ellen',
    },
    {
        rating: star,
        title: 'Amazing Taste!',
        feedback: 'Another great review text here about the food quality and delivery service.',
        reviewer: 'John Doe',
    },

    {
        rating: star,
        title: 'Amazing Taste!',
        feedback: 'Another great review text here about the food quality and delivery service.',
        reviewer: 'John Doe',
    },
];

export const mealPlans = [
    {
        id: 1,
        name: "Weight Loss Warrior",
        price: "Rp120.000,00",
        pricePerWeek: "(week)",
        description: "Achieve your weight loss goals with delicious, calorie-controlled meals designed for effective fat burning and sustained energy.",
        image: plan1,
        keyFeatures: [
            "Calorie-controlled portions for optimal weight management.",
            "Rich in lean proteins and fiber for prolonged satiety.",
            "Balanced macronutrient ratios (Carbohydrates, Protein, Fats).",
            "Eliminates processed foods, unhealthy fats, and excessive sugars.",
            "Expertly prepared to maximize nutrient absorption."
        ],
        dietaryInfo: [
            "Estimated Daily Macros: ~1500 kcal, 40% Carb, 30% Protein, 30% Fat.",
            "Common Allergens: Contains nuts (almond), fish (salmon). Please notify us of specific allergies."
        ]
    },
    {
        id: 2,
        name: "Muscle Builder Pro",
        price: "Rp150.000,00",
        pricePerWeek: "(week)",
        description: "Fuel your gains with high-protein, perfectly portioned meals engineered for muscle growth and recovery. Optimized macros for peak performance.",
        image: plan2,
        keyFeatures: [
            "High-protein content for muscle development.",
            "Optimized for post-workout recovery.",
            "Balanced macronutrient ratios for performance.",
            "Premium quality ingredients.",
            "Expertly crafted meal combinations."
        ],
        dietaryInfo: [
            "Estimated Daily Macros: ~2000 kcal, 35% Carb, 40% Protein, 25% Fat.",
            "Common Allergens: Contains dairy, eggs. Please notify us of specific allergies."
        ]
    },
    {
        id: 3,
        name: "Busy Bee Balance",
        price: "Rp175.000,00",
        pricePerWeek: "(week)",
        description: "Save time without sacrificing health. Nutritious and convenient meals delivered daily, perfect for your demanding schedule.",
        image: plan3,
        keyFeatures: [
            "Time-saving convenient meals.",
            "Nutritionally balanced for busy lifestyles.",
            "Fresh daily delivery.",
            "Variety of healthy options.",
            "Perfect portion control."
        ],
        dietaryInfo: [
            "Estimated Daily Macros: ~1800 kcal, 45% Carb, 25% Protein, 30% Fat.",
            "Common Allergens: May contain gluten, nuts. Please notify us of specific allergies."
        ]
    }
];

export  const planOptions = [
    { id: 'diet', name: 'Diet Plan', price: 30000, label: 'Diet Plan - Rp30.000,00 per meal' },
    { id: 'protein', name: 'Protein Plan', price: 40000, label: 'Protein Plan - Rp40.000,00 per meal' },
    { id: 'royal', name: 'Royal Plan', price: 60000, label: 'Royal Plan - Rp60.000,00 per meal' }
  ];

export const mealTypeOptions = [
    { id: 'breakfast', name: 'Breakfast' },
    { id: 'lunch', name: 'Lunch' },
    { id: 'dinner', name: 'Dinner' }
  ];

export const deliveryDayOptions = [
    { id: 'monday', name: 'Monday' },
    { id: 'tuesday', name: 'Tuesday' },
    { id: 'wednesday', name: 'Wednesday' },
    { id: 'thursday', name: 'Thursday' },
    { id: 'friday', name: 'Friday' },
    { id: 'saturday', name: 'Saturday' },
    { id: 'sunday', name: 'Sunday' }
  ];