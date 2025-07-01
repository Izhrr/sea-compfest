import { meal,delivery,information } from "../assets/icons";
import { star } from "../assets/images";

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