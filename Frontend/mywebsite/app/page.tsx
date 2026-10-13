"use client";

import { useMemo, useState } from "react";

/*
  NOVA MARKET — a large single-file Next.js practice project.
  Paste this file into app/page.tsx in a Next.js App Router project.
  It uses React state and plain CSS only; no extra packages are required.
  The deliberately expanded sections and comments make it useful for practice.
*/

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  badge?: string;
  color: string;
  icon: string;
  description: string;
  stock: number;
};

type CartItem = { product: Product; quantity: number };

const categories = [
  "All products",
  "Electronics",
  "Home",
  "Fashion",
  "Fitness",
  "Accessories",
  "Books",
];

const initialProducts: Product[] = [
  { id: 1,
    name: 'Wireless headphones',
    category: 'Electronics',
    price: 7499,
    oldPrice: 9999,
    rating: 4.8,
    reviews: 284,
    badge: 'BESTSELLER',
    color: '#dbeafe',
    icon: '🎧',
    description: 'Comfortable wireless headphones with rich sound and long battery life.',
    stock: 24,
  },
  { id: 2,
    name: 'Smart watch',
    category: 'Electronics',
    price: 8999,
    oldPrice: 11999,
    rating: 4.6,
    reviews: 193,
    badge: 'NEW',
    color: '#dcfce7',
    icon: '⌚',
    description: 'A versatile smartwatch for daily activity, notifications and timekeeping.',
    stock: 18,
  },
  { id: 3,
    name: 'Desk lamp',
    category: 'Home',
    price: 2499,
    oldPrice: 3299,
    rating: 4.5,
    reviews: 87,
    badge: '',
    color: '#fef3c7',
    icon: '💡',
    description: 'A clean modern lamp for a study desk or bedside table.',
    stock: 31,
  },
  { id: 4,
    name: 'Everyday backpack',
    category: 'Fashion',
    price: 3899,
    oldPrice: 4999,
    rating: 4.7,
    reviews: 152,
    badge: 'POPULAR',
    color: '#f3e8ff',
    icon: '🎒',
    description: 'A roomy backpack designed for school, work and weekend trips.',
    stock: 16,
  },
  { id: 5,
    name: 'Running shoes',
    category: 'Fashion',
    price: 6299,
    oldPrice: 7999,
    rating: 4.4,
    reviews: 211,
    badge: 'SALE',
    color: '#fee2e2',
    icon: '👟',
    description: 'Lightweight shoes for walks, workouts and everyday comfort.',
    stock: 20,
  },
  { id: 6,
    name: 'Yoga mat',
    category: 'Fitness',
    price: 1999,
    oldPrice: 2699,
    rating: 4.5,
    reviews: 95,
    badge: '',
    color: '#ccfbf1',
    icon: '🧘',
    description: 'A supportive non-slip mat for stretching and home workouts.',
    stock: 40,
  },
  { id: 7,
    name: 'Ceramic mug set',
    category: 'Home',
    price: 1599,
    oldPrice: 2199,
    rating: 4.3,
    reviews: 62,
    badge: '',
    color: '#ffedd5',
    icon: '☕',
    description: 'A set of simple ceramic mugs for coffee, tea and hot chocolate.',
    stock: 28,
  },
  { id: 8,
    name: 'Mechanical keyboard',
    category: 'Electronics',
    price: 6799,
    oldPrice: 8499,
    rating: 4.8,
    reviews: 176,
    badge: 'TOP RATED',
    color: '#e0e7ff',
    icon: '⌨️',
    description: 'A satisfying keyboard for typing, coding and gaming setups.',
    stock: 12,
  },
  { id: 9,
    name: 'Travel bottle',
    category: 'Accessories',
    price: 1299,
    oldPrice: 1799,
    rating: 4.2,
    reviews: 74,
    badge: '',
    color: '#cffafe',
    icon: '🥤',
    description: 'A reusable bottle for work, school, workouts and travel.',
    stock: 35,
  },
  { id: 10,
    name: 'Minimal wallet',
    category: 'Accessories',
    price: 1799,
    oldPrice: 2399,
    rating: 4.4,
    reviews: 109,
    badge: '',
    color: '#fce7f3',
    icon: '👛',
    description: 'A compact wallet with practical slots and a minimalist profile.',
    stock: 22,
  },
  { id: 11,
    name: 'Design notebook',
    category: 'Books',
    price: 899,
    oldPrice: 1199,
    rating: 4.6,
    reviews: 58,
    badge: '',
    color: '#fef9c3',
    icon: '📓',
    description: 'A sturdy notebook for ideas, plans, sketches and daily notes.',
    stock: 55,
  },
  { id: 12,
    name: 'Resistance bands',
    category: 'Fitness',
    price: 1499,
    oldPrice: 1999,
    rating: 4.5,
    reviews: 132,
    badge: 'POPULAR',
    color: '#d1fae5',
    icon: '🏋️',
    description: 'A set of resistance bands for portable strength training.',
    stock: 29,
  },
  { id: 13,
    name: 'Bluetooth speaker',
    category: 'Electronics',
    price: 4299,
    oldPrice: 5599,
    rating: 4.6,
    reviews: 203,
    badge: 'SALE',
    color: '#dbeafe',
    icon: '🔊',
    description: 'A compact speaker for music at home, outdoors or on a trip.',
    stock: 14,
  },
  { id: 14,
    name: 'Throw pillow',
    category: 'Home',
    price: 1199,
    oldPrice: 1599,
    rating: 4.1,
    reviews: 43,
    badge: '',
    color: '#fce7f3',
    icon: '🛋️',
    description: 'A soft decorative pillow to add a relaxed touch to your room.',
    stock: 37,
  },
  { id: 15,
    name: 'Classic sunglasses',
    category: 'Fashion',
    price: 2199,
    oldPrice: 2999,
    rating: 4.2,
    reviews: 88,
    badge: 'NEW',
    color: '#e0f2fe',
    icon: '🕶️',
    description: 'Classic everyday sunglasses with a clean, versatile look.',
    stock: 19,
  },
  { id: 16,
    name: 'Fitness tracker',
    category: 'Fitness',
    price: 4999,
    oldPrice: 6499,
    rating: 4.4,
    reviews: 118,
    badge: '',
    color: '#dcfce7',
    icon: '📈',
    description: 'Track your daily movement and keep your fitness routine visible.',
    stock: 17,
  },
  { id: 17,
    name: 'Phone stand',
    category: 'Accessories',
    price: 999,
    oldPrice: 1399,
    rating: 4.3,
    reviews: 96,
    badge: '',
    color: '#ede9fe',
    icon: '📱',
    description: 'A stable stand for video calls, study sessions and watching clips.',
    stock: 44,
  },
  { id: 18,
    name: 'Cookbook',
    category: 'Books',
    price: 1899,
    oldPrice: 2499,
    rating: 4.7,
    reviews: 77,
    badge: 'EDITOR PICK',
    color: '#ffedd5',
    icon: '🍲',
    description: 'An approachable cookbook full of ideas for everyday meals.',
    stock: 26,
  },
  { id: 19,
    name: 'Storage basket',
    category: 'Home',
    price: 1699,
    oldPrice: 2299,
    rating: 4.2,
    reviews: 51,
    badge: '',
    color: '#f3f4f6',
    icon: '🧺',
    description: 'A useful basket for keeping shelves, desks and rooms organized.',
    stock: 33,
  },
  { id: 20,
    name: 'USB-C hub',
    category: 'Electronics',
    price: 3599,
    oldPrice: 4599,
    rating: 4.5,
    reviews: 144,
    badge: '',
    color: '#dbeafe',
    icon: '🔌',
    description: 'A compact hub that helps connect compatible devices and accessories.',
    stock: 21,
  },
  { id: 21,
    name: 'Wireless headphones — Edition 2',
    category: 'Electronics',
    price: 7649,
    oldPrice: 10149,
    rating: 4.8,
    reviews: 291,
    badge: 'BESTSELLER',
    color: '#dbeafe',
    icon: '🎧',
    description: 'Comfortable wireless headphones with rich sound and long battery life.',
    stock: 25,
  },
  { id: 22,
    name: 'Smart watch — Edition 2',
    category: 'Electronics',
    price: 9149,
    oldPrice: 12149,
    rating: 4.6,
    reviews: 200,
    badge: 'NEW',
    color: '#dcfce7',
    icon: '⌚',
    description: 'A versatile smartwatch for daily activity, notifications and timekeeping.',
    stock: 19,
  },
  { id: 23,
    name: 'Desk lamp — Edition 2',
    category: 'Home',
    price: 2649,
    oldPrice: 3449,
    rating: 4.5,
    reviews: 94,
    badge: '',
    color: '#fef3c7',
    icon: '💡',
    description: 'A clean modern lamp for a study desk or bedside table.',
    stock: 32,
  },
  { id: 24,
    name: 'Everyday backpack — Edition 2',
    category: 'Fashion',
    price: 4049,
    oldPrice: 5149,
    rating: 4.7,
    reviews: 159,
    badge: 'POPULAR',
    color: '#f3e8ff',
    icon: '🎒',
    description: 'A roomy backpack designed for school, work and weekend trips.',
    stock: 17,
  },
  { id: 25,
    name: 'Running shoes — Edition 2',
    category: 'Fashion',
    price: 6449,
    oldPrice: 8149,
    rating: 4.4,
    reviews: 218,
    badge: 'SALE',
    color: '#fee2e2',
    icon: '👟',
    description: 'Lightweight shoes for walks, workouts and everyday comfort.',
    stock: 21,
  },
  { id: 26,
    name: 'Yoga mat — Edition 2',
    category: 'Fitness',
    price: 2149,
    oldPrice: 2849,
    rating: 4.5,
    reviews: 102,
    badge: '',
    color: '#ccfbf1',
    icon: '🧘',
    description: 'A supportive non-slip mat for stretching and home workouts.',
    stock: 41,
  },
  { id: 27,
    name: 'Ceramic mug set — Edition 2',
    category: 'Home',
    price: 1749,
    oldPrice: 2349,
    rating: 4.3,
    reviews: 69,
    badge: '',
    color: '#ffedd5',
    icon: '☕',
    description: 'A set of simple ceramic mugs for coffee, tea and hot chocolate.',
    stock: 29,
  },
  { id: 28,
    name: 'Mechanical keyboard — Edition 2',
    category: 'Electronics',
    price: 6949,
    oldPrice: 8649,
    rating: 4.8,
    reviews: 183,
    badge: 'TOP RATED',
    color: '#e0e7ff',
    icon: '⌨️',
    description: 'A satisfying keyboard for typing, coding and gaming setups.',
    stock: 13,
  },
  { id: 29,
    name: 'Travel bottle — Edition 2',
    category: 'Accessories',
    price: 1449,
    oldPrice: 1949,
    rating: 4.2,
    reviews: 81,
    badge: '',
    color: '#cffafe',
    icon: '🥤',
    description: 'A reusable bottle for work, school, workouts and travel.',
    stock: 36,
  },
  { id: 30,
    name: 'Minimal wallet — Edition 2',
    category: 'Accessories',
    price: 1949,
    oldPrice: 2549,
    rating: 4.4,
    reviews: 116,
    badge: '',
    color: '#fce7f3',
    icon: '👛',
    description: 'A compact wallet with practical slots and a minimalist profile.',
    stock: 23,
  },
  { id: 31,
    name: 'Design notebook — Edition 2',
    category: 'Books',
    price: 1049,
    oldPrice: 1349,
    rating: 4.6,
    reviews: 65,
    badge: '',
    color: '#fef9c3',
    icon: '📓',
    description: 'A sturdy notebook for ideas, plans, sketches and daily notes.',
    stock: 56,
  },
  { id: 32,
    name: 'Resistance bands — Edition 2',
    category: 'Fitness',
    price: 1649,
    oldPrice: 2149,
    rating: 4.5,
    reviews: 139,
    badge: 'POPULAR',
    color: '#d1fae5',
    icon: '🏋️',
    description: 'A set of resistance bands for portable strength training.',
    stock: 30,
  },
  { id: 33,
    name: 'Bluetooth speaker — Edition 2',
    category: 'Electronics',
    price: 4449,
    oldPrice: 5749,
    rating: 4.6,
    reviews: 210,
    badge: 'SALE',
    color: '#dbeafe',
    icon: '🔊',
    description: 'A compact speaker for music at home, outdoors or on a trip.',
    stock: 15,
  },
  { id: 34,
    name: 'Throw pillow — Edition 2',
    category: 'Home',
    price: 1349,
    oldPrice: 1749,
    rating: 4.1,
    reviews: 50,
    badge: '',
    color: '#fce7f3',
    icon: '🛋️',
    description: 'A soft decorative pillow to add a relaxed touch to your room.',
    stock: 38,
  },
  { id: 35,
    name: 'Classic sunglasses — Edition 2',
    category: 'Fashion',
    price: 2349,
    oldPrice: 3149,
    rating: 4.2,
    reviews: 95,
    badge: 'NEW',
    color: '#e0f2fe',
    icon: '🕶️',
    description: 'Classic everyday sunglasses with a clean, versatile look.',
    stock: 20,
  },
  { id: 36,
    name: 'Fitness tracker — Edition 2',
    category: 'Fitness',
    price: 5149,
    oldPrice: 6649,
    rating: 4.4,
    reviews: 125,
    badge: '',
    color: '#dcfce7',
    icon: '📈',
    description: 'Track your daily movement and keep your fitness routine visible.',
    stock: 18,
  },
  { id: 37,
    name: 'Phone stand — Edition 2',
    category: 'Accessories',
    price: 1149,
    oldPrice: 1549,
    rating: 4.3,
    reviews: 103,
    badge: '',
    color: '#ede9fe',
    icon: '📱',
    description: 'A stable stand for video calls, study sessions and watching clips.',
    stock: 45,
  },
  { id: 38,
    name: 'Cookbook — Edition 2',
    category: 'Books',
    price: 2049,
    oldPrice: 2649,
    rating: 4.7,
    reviews: 84,
    badge: 'EDITOR PICK',
    color: '#ffedd5',
    icon: '🍲',
    description: 'An approachable cookbook full of ideas for everyday meals.',
    stock: 27,
  },
  { id: 39,
    name: 'Storage basket — Edition 2',
    category: 'Home',
    price: 1849,
    oldPrice: 2449,
    rating: 4.2,
    reviews: 58,
    badge: '',
    color: '#f3f4f6',
    icon: '🧺',
    description: 'A useful basket for keeping shelves, desks and rooms organized.',
    stock: 34,
  },
  { id: 40,
    name: 'USB-C hub — Edition 2',
    category: 'Electronics',
    price: 3749,
    oldPrice: 4749,
    rating: 4.5,
    reviews: 151,
    badge: '',
    color: '#dbeafe',
    icon: '🔌',
    description: 'A compact hub that helps connect compatible devices and accessories.',
    stock: 22,
  },
  { id: 41,
    name: 'Wireless headphones — Edition 3',
    category: 'Electronics',
    price: 7799,
    oldPrice: 10299,
    rating: 4.8,
    reviews: 298,
    badge: 'BESTSELLER',
    color: '#dbeafe',
    icon: '🎧',
    description: 'Comfortable wireless headphones with rich sound and long battery life.',
    stock: 26,
  },
  { id: 42,
    name: 'Smart watch — Edition 3',
    category: 'Electronics',
    price: 9299,
    oldPrice: 12299,
    rating: 4.6,
    reviews: 207,
    badge: 'NEW',
    color: '#dcfce7',
    icon: '⌚',
    description: 'A versatile smartwatch for daily activity, notifications and timekeeping.',
    stock: 20,
  },
  { id: 43,
    name: 'Desk lamp — Edition 3',
    category: 'Home',
    price: 2799,
    oldPrice: 3599,
    rating: 4.5,
    reviews: 101,
    badge: '',
    color: '#fef3c7',
    icon: '💡',
    description: 'A clean modern lamp for a study desk or bedside table.',
    stock: 33,
  },
  { id: 44,
    name: 'Everyday backpack — Edition 3',
    category: 'Fashion',
    price: 4199,
    oldPrice: 5299,
    rating: 4.7,
    reviews: 166,
    badge: 'POPULAR',
    color: '#f3e8ff',
    icon: '🎒',
    description: 'A roomy backpack designed for school, work and weekend trips.',
    stock: 18,
  },
  { id: 45,
    name: 'Running shoes — Edition 3',
    category: 'Fashion',
    price: 6599,
    oldPrice: 8299,
    rating: 4.4,
    reviews: 225,
    badge: 'SALE',
    color: '#fee2e2',
    icon: '👟',
    description: 'Lightweight shoes for walks, workouts and everyday comfort.',
    stock: 22,
  },
  { id: 46,
    name: 'Yoga mat — Edition 3',
    category: 'Fitness',
    price: 2299,
    oldPrice: 2999,
    rating: 4.5,
    reviews: 109,
    badge: '',
    color: '#ccfbf1',
    icon: '🧘',
    description: 'A supportive non-slip mat for stretching and home workouts.',
    stock: 42,
  },
  { id: 47,
    name: 'Ceramic mug set — Edition 3',
    category: 'Home',
    price: 1899,
    oldPrice: 2499,
    rating: 4.3,
    reviews: 76,
    badge: '',
    color: '#ffedd5',
    icon: '☕',
    description: 'A set of simple ceramic mugs for coffee, tea and hot chocolate.',
    stock: 30,
  },
  { id: 48,
    name: 'Mechanical keyboard — Edition 3',
    category: 'Electronics',
    price: 7099,
    oldPrice: 8799,
    rating: 4.8,
    reviews: 190,
    badge: 'TOP RATED',
    color: '#e0e7ff',
    icon: '⌨️',
    description: 'A satisfying keyboard for typing, coding and gaming setups.',
    stock: 14,
  },
  { id: 49,
    name: 'Travel bottle — Edition 3',
    category: 'Accessories',
    price: 1599,
    oldPrice: 2099,
    rating: 4.2,
    reviews: 88,
    badge: '',
    color: '#cffafe',
    icon: '🥤',
    description: 'A reusable bottle for work, school, workouts and travel.',
    stock: 37,
  },
  { id: 50,
    name: 'Minimal wallet — Edition 3',
    category: 'Accessories',
    price: 2099,
    oldPrice: 2699,
    rating: 4.4,
    reviews: 123,
    badge: '',
    color: '#fce7f3',
    icon: '👛',
    description: 'A compact wallet with practical slots and a minimalist profile.',
    stock: 24,
  },
  { id: 51,
    name: 'Design notebook — Edition 3',
    category: 'Books',
    price: 1199,
    oldPrice: 1499,
    rating: 4.6,
    reviews: 72,
    badge: '',
    color: '#fef9c3',
    icon: '📓',
    description: 'A sturdy notebook for ideas, plans, sketches and daily notes.',
    stock: 57,
  },
  { id: 52,
    name: 'Resistance bands — Edition 3',
    category: 'Fitness',
    price: 1799,
    oldPrice: 2299,
    rating: 4.5,
    reviews: 146,
    badge: 'POPULAR',
    color: '#d1fae5',
    icon: '🏋️',
    description: 'A set of resistance bands for portable strength training.',
    stock: 31,
  },
  { id: 53,
    name: 'Bluetooth speaker — Edition 3',
    category: 'Electronics',
    price: 4599,
    oldPrice: 5899,
    rating: 4.6,
    reviews: 217,
    badge: 'SALE',
    color: '#dbeafe',
    icon: '🔊',
    description: 'A compact speaker for music at home, outdoors or on a trip.',
    stock: 16,
  },
  { id: 54,
    name: 'Throw pillow — Edition 3',
    category: 'Home',
    price: 1499,
    oldPrice: 1899,
    rating: 4.1,
    reviews: 57,
    badge: '',
    color: '#fce7f3',
    icon: '🛋️',
    description: 'A soft decorative pillow to add a relaxed touch to your room.',
    stock: 39,
  },
  { id: 55,
    name: 'Classic sunglasses — Edition 3',
    category: 'Fashion',
    price: 2499,
    oldPrice: 3299,
    rating: 4.2,
    reviews: 102,
    badge: 'NEW',
    color: '#e0f2fe',
    icon: '🕶️',
    description: 'Classic everyday sunglasses with a clean, versatile look.',
    stock: 21,
  },
  { id: 56,
    name: 'Fitness tracker — Edition 3',
    category: 'Fitness',
    price: 5299,
    oldPrice: 6799,
    rating: 4.4,
    reviews: 132,
    badge: '',
    color: '#dcfce7',
    icon: '📈',
    description: 'Track your daily movement and keep your fitness routine visible.',
    stock: 19,
  },
  { id: 57,
    name: 'Phone stand — Edition 3',
    category: 'Accessories',
    price: 1299,
    oldPrice: 1699,
    rating: 4.3,
    reviews: 110,
    badge: '',
    color: '#ede9fe',
    icon: '📱',
    description: 'A stable stand for video calls, study sessions and watching clips.',
    stock: 46,
  },
  { id: 58,
    name: 'Cookbook — Edition 3',
    category: 'Books',
    price: 2199,
    oldPrice: 2799,
    rating: 4.7,
    reviews: 91,
    badge: 'EDITOR PICK',
    color: '#ffedd5',
    icon: '🍲',
    description: 'An approachable cookbook full of ideas for everyday meals.',
    stock: 28,
  },
  { id: 59,
    name: 'Storage basket — Edition 3',
    category: 'Home',
    price: 1999,
    oldPrice: 2599,
    rating: 4.2,
    reviews: 65,
    badge: '',
    color: '#f3f4f6',
    icon: '🧺',
    description: 'A useful basket for keeping shelves, desks and rooms organized.',
    stock: 35,
  },
  { id: 60,
    name: 'USB-C hub — Edition 3',
    category: 'Electronics',
    price: 3899,
    oldPrice: 4899,
    rating: 4.5,
    reviews: 158,
    badge: '',
    color: '#dbeafe',
    icon: '🔌',
    description: 'A compact hub that helps connect compatible devices and accessories.',
    stock: 23,
  },
  { id: 61,
    name: 'Wireless headphones — Edition 4',
    category: 'Electronics',
    price: 7949,
    oldPrice: 10449,
    rating: 4.8,
    reviews: 305,
    badge: 'BESTSELLER',
    color: '#dbeafe',
    icon: '🎧',
    description: 'Comfortable wireless headphones with rich sound and long battery life.',
    stock: 27,
  },
  { id: 62,
    name: 'Smart watch — Edition 4',
    category: 'Electronics',
    price: 9449,
    oldPrice: 12449,
    rating: 4.6,
    reviews: 214,
    badge: 'NEW',
    color: '#dcfce7',
    icon: '⌚',
    description: 'A versatile smartwatch for daily activity, notifications and timekeeping.',
    stock: 21,
  },
  { id: 63,
    name: 'Desk lamp — Edition 4',
    category: 'Home',
    price: 2949,
    oldPrice: 3749,
    rating: 4.5,
    reviews: 108,
    badge: '',
    color: '#fef3c7',
    icon: '💡',
    description: 'A clean modern lamp for a study desk or bedside table.',
    stock: 34,
  },
  { id: 64,
    name: 'Everyday backpack — Edition 4',
    category: 'Fashion',
    price: 4349,
    oldPrice: 5449,
    rating: 4.7,
    reviews: 173,
    badge: 'POPULAR',
    color: '#f3e8ff',
    icon: '🎒',
    description: 'A roomy backpack designed for school, work and weekend trips.',
    stock: 19,
  },
  { id: 65,
    name: 'Running shoes — Edition 4',
    category: 'Fashion',
    price: 6749,
    oldPrice: 8449,
    rating: 4.4,
    reviews: 232,
    badge: 'SALE',
    color: '#fee2e2',
    icon: '👟',
    description: 'Lightweight shoes for walks, workouts and everyday comfort.',
    stock: 23,
  },
  { id: 66,
    name: 'Yoga mat — Edition 4',
    category: 'Fitness',
    price: 2449,
    oldPrice: 3149,
    rating: 4.5,
    reviews: 116,
    badge: '',
    color: '#ccfbf1',
    icon: '🧘',
    description: 'A supportive non-slip mat for stretching and home workouts.',
    stock: 43,
  },
  { id: 67,
    name: 'Ceramic mug set — Edition 4',
    category: 'Home',
    price: 2049,
    oldPrice: 2649,
    rating: 4.3,
    reviews: 83,
    badge: '',
    color: '#ffedd5',
    icon: '☕',
    description: 'A set of simple ceramic mugs for coffee, tea and hot chocolate.',
    stock: 31,
  },
  { id: 68,
    name: 'Mechanical keyboard — Edition 4',
    category: 'Electronics',
    price: 7249,
    oldPrice: 8949,
    rating: 4.8,
    reviews: 197,
    badge: 'TOP RATED',
    color: '#e0e7ff',
    icon: '⌨️',
    description: 'A satisfying keyboard for typing, coding and gaming setups.',
    stock: 15,
  },
  { id: 69,
    name: 'Travel bottle — Edition 4',
    category: 'Accessories',
    price: 1749,
    oldPrice: 2249,
    rating: 4.2,
    reviews: 95,
    badge: '',
    color: '#cffafe',
    icon: '🥤',
    description: 'A reusable bottle for work, school, workouts and travel.',
    stock: 38,
  },
  { id: 70,
    name: 'Minimal wallet — Edition 4',
    category: 'Accessories',
    price: 2249,
    oldPrice: 2849,
    rating: 4.4,
    reviews: 130,
    badge: '',
    color: '#fce7f3',
    icon: '👛',
    description: 'A compact wallet with practical slots and a minimalist profile.',
    stock: 25,
  },
  { id: 71,
    name: 'Design notebook — Edition 4',
    category: 'Books',
    price: 1349,
    oldPrice: 1649,
    rating: 4.6,
    reviews: 79,
    badge: '',
    color: '#fef9c3',
    icon: '📓',
    description: 'A sturdy notebook for ideas, plans, sketches and daily notes.',
    stock: 58,
  },
  { id: 72,
    name: 'Resistance bands — Edition 4',
    category: 'Fitness',
    price: 1949,
    oldPrice: 2449,
    rating: 4.5,
    reviews: 153,
    badge: 'POPULAR',
    color: '#d1fae5',
    icon: '🏋️',
    description: 'A set of resistance bands for portable strength training.',
    stock: 32,
  },
  { id: 73,
    name: 'Bluetooth speaker — Edition 4',
    category: 'Electronics',
    price: 4749,
    oldPrice: 6049,
    rating: 4.6,
    reviews: 224,
    badge: 'SALE',
    color: '#dbeafe',
    icon: '🔊',
    description: 'A compact speaker for music at home, outdoors or on a trip.',
    stock: 17,
  },
  { id: 74,
    name: 'Throw pillow — Edition 4',
    category: 'Home',
    price: 1649,
    oldPrice: 2049,
    rating: 4.1,
    reviews: 64,
    badge: '',
    color: '#fce7f3',
    icon: '🛋️',
    description: 'A soft decorative pillow to add a relaxed touch to your room.',
    stock: 40,
  },
  { id: 75,
    name: 'Classic sunglasses — Edition 4',
    category: 'Fashion',
    price: 2649,
    oldPrice: 3449,
    rating: 4.2,
    reviews: 109,
    badge: 'NEW',
    color: '#e0f2fe',
    icon: '🕶️',
    description: 'Classic everyday sunglasses with a clean, versatile look.',
    stock: 22,
  },
  { id: 76,
    name: 'Fitness tracker — Edition 4',
    category: 'Fitness',
    price: 5449,
    oldPrice: 6949,
    rating: 4.4,
    reviews: 139,
    badge: '',
    color: '#dcfce7',
    icon: '📈',
    description: 'Track your daily movement and keep your fitness routine visible.',
    stock: 20,
  },
  { id: 77,
    name: 'Phone stand — Edition 4',
    category: 'Accessories',
    price: 1449,
    oldPrice: 1849,
    rating: 4.3,
    reviews: 117,
    badge: '',
    color: '#ede9fe',
    icon: '📱',
    description: 'A stable stand for video calls, study sessions and watching clips.',
    stock: 47,
  },
  { id: 78,
    name: 'Cookbook — Edition 4',
    category: 'Books',
    price: 2349,
    oldPrice: 2949,
    rating: 4.7,
    reviews: 98,
    badge: 'EDITOR PICK',
    color: '#ffedd5',
    icon: '🍲',
    description: 'An approachable cookbook full of ideas for everyday meals.',
    stock: 29,
  },
  { id: 79,
    name: 'Storage basket — Edition 4',
    category: 'Home',
    price: 2149,
    oldPrice: 2749,
    rating: 4.2,
    reviews: 72,
    badge: '',
    color: '#f3f4f6',
    icon: '🧺',
    description: 'A useful basket for keeping shelves, desks and rooms organized.',
    stock: 36,
  },
  { id: 80,
    name: 'USB-C hub — Edition 4',
    category: 'Electronics',
    price: 4049,
    oldPrice: 5049,
    rating: 4.5,
    reviews: 165,
    badge: '',
    color: '#dbeafe',
    icon: '🔌',
    description: 'A compact hub that helps connect compatible devices and accessories.',
    stock: 24,
  },
  { id: 81,
    name: 'Wireless headphones — Edition 5',
    category: 'Electronics',
    price: 8099,
    oldPrice: 10599,
    rating: 4.8,
    reviews: 312,
    badge: 'BESTSELLER',
    color: '#dbeafe',
    icon: '🎧',
    description: 'Comfortable wireless headphones with rich sound and long battery life.',
    stock: 28,
  },
  { id: 82,
    name: 'Smart watch — Edition 5',
    category: 'Electronics',
    price: 9599,
    oldPrice: 12599,
    rating: 4.6,
    reviews: 221,
    badge: 'NEW',
    color: '#dcfce7',
    icon: '⌚',
    description: 'A versatile smartwatch for daily activity, notifications and timekeeping.',
    stock: 22,
  },
  { id: 83,
    name: 'Desk lamp — Edition 5',
    category: 'Home',
    price: 3099,
    oldPrice: 3899,
    rating: 4.5,
    reviews: 115,
    badge: '',
    color: '#fef3c7',
    icon: '💡',
    description: 'A clean modern lamp for a study desk or bedside table.',
    stock: 35,
  },
  { id: 84,
    name: 'Everyday backpack — Edition 5',
    category: 'Fashion',
    price: 4499,
    oldPrice: 5599,
    rating: 4.7,
    reviews: 180,
    badge: 'POPULAR',
    color: '#f3e8ff',
    icon: '🎒',
    description: 'A roomy backpack designed for school, work and weekend trips.',
    stock: 20,
  },
  { id: 85,
    name: 'Running shoes — Edition 5',
    category: 'Fashion',
    price: 6899,
    oldPrice: 8599,
    rating: 4.4,
    reviews: 239,
    badge: 'SALE',
    color: '#fee2e2',
    icon: '👟',
    description: 'Lightweight shoes for walks, workouts and everyday comfort.',
    stock: 24,
  },
  { id: 86,
    name: 'Yoga mat — Edition 5',
    category: 'Fitness',
    price: 2599,
    oldPrice: 3299,
    rating: 4.5,
    reviews: 123,
    badge: '',
    color: '#ccfbf1',
    icon: '🧘',
    description: 'A supportive non-slip mat for stretching and home workouts.',
    stock: 44,
  },
  { id: 87,
    name: 'Ceramic mug set — Edition 5',
    category: 'Home',
    price: 2199,
    oldPrice: 2799,
    rating: 4.3,
    reviews: 90,
    badge: '',
    color: '#ffedd5',
    icon: '☕',
    description: 'A set of simple ceramic mugs for coffee, tea and hot chocolate.',
    stock: 32,
  },
  { id: 88,
    name: 'Mechanical keyboard — Edition 5',
    category: 'Electronics',
    price: 7399,
    oldPrice: 9099,
    rating: 4.8,
    reviews: 204,
    badge: 'TOP RATED',
    color: '#e0e7ff',
    icon: '⌨️',
    description: 'A satisfying keyboard for typing, coding and gaming setups.',
    stock: 16,
  },
  { id: 89,
    name: 'Travel bottle — Edition 5',
    category: 'Accessories',
    price: 1899,
    oldPrice: 2399,
    rating: 4.2,
    reviews: 102,
    badge: '',
    color: '#cffafe',
    icon: '🥤',
    description: 'A reusable bottle for work, school, workouts and travel.',
    stock: 39,
  },
  { id: 90,
    name: 'Minimal wallet — Edition 5',
    category: 'Accessories',
    price: 2399,
    oldPrice: 2999,
    rating: 4.4,
    reviews: 137,
    badge: '',
    color: '#fce7f3',
    icon: '👛',
    description: 'A compact wallet with practical slots and a minimalist profile.',
    stock: 26,
  },
  { id: 91,
    name: 'Design notebook — Edition 5',
    category: 'Books',
    price: 1499,
    oldPrice: 1799,
    rating: 4.6,
    reviews: 86,
    badge: '',
    color: '#fef9c3',
    icon: '📓',
    description: 'A sturdy notebook for ideas, plans, sketches and daily notes.',
    stock: 59,
  },
  { id: 92,
    name: 'Resistance bands — Edition 5',
    category: 'Fitness',
    price: 2099,
    oldPrice: 2599,
    rating: 4.5,
    reviews: 160,
    badge: 'POPULAR',
    color: '#d1fae5',
    icon: '🏋️',
    description: 'A set of resistance bands for portable strength training.',
    stock: 33,
  },
  { id: 93,
    name: 'Bluetooth speaker — Edition 5',
    category: 'Electronics',
    price: 4899,
    oldPrice: 6199,
    rating: 4.6,
    reviews: 231,
    badge: 'SALE',
    color: '#dbeafe',
    icon: '🔊',
    description: 'A compact speaker for music at home, outdoors or on a trip.',
    stock: 18,
  },
  { id: 94,
    name: 'Throw pillow — Edition 5',
    category: 'Home',
    price: 1799,
    oldPrice: 2199,
    rating: 4.1,
    reviews: 71,
    badge: '',
    color: '#fce7f3',
    icon: '🛋️',
    description: 'A soft decorative pillow to add a relaxed touch to your room.',
    stock: 41,
  },
  { id: 95,
    name: 'Classic sunglasses — Edition 5',
    category: 'Fashion',
    price: 2799,
    oldPrice: 3599,
    rating: 4.2,
    reviews: 116,
    badge: 'NEW',
    color: '#e0f2fe',
    icon: '🕶️',
    description: 'Classic everyday sunglasses with a clean, versatile look.',
    stock: 23,
  },
  { id: 96,
    name: 'Fitness tracker — Edition 5',
    category: 'Fitness',
    price: 5599,
    oldPrice: 7099,
    rating: 4.4,
    reviews: 146,
    badge: '',
    color: '#dcfce7',
    icon: '📈',
    description: 'Track your daily movement and keep your fitness routine visible.',
    stock: 21,
  },
  { id: 97,
    name: 'Phone stand — Edition 5',
    category: 'Accessories',
    price: 1599,
    oldPrice: 1999,
    rating: 4.3,
    reviews: 124,
    badge: '',
    color: '#ede9fe',
    icon: '📱',
    description: 'A stable stand for video calls, study sessions and watching clips.',
    stock: 48,
  },
  { id: 98,
    name: 'Cookbook — Edition 5',
    category: 'Books',
    price: 2499,
    oldPrice: 3099,
    rating: 4.7,
    reviews: 105,
    badge: 'EDITOR PICK',
    color: '#ffedd5',
    icon: '🍲',
    description: 'An approachable cookbook full of ideas for everyday meals.',
    stock: 30,
  },
  { id: 99,
    name: 'Storage basket — Edition 5',
    category: 'Home',
    price: 2299,
    oldPrice: 2899,
    rating: 4.2,
    reviews: 79,
    badge: '',
    color: '#f3f4f6',
    icon: '🧺',
    description: 'A useful basket for keeping shelves, desks and rooms organized.',
    stock: 37,
  },
  { id: 100,
    name: 'USB-C hub — Edition 5',
    category: 'Electronics',
    price: 4199,
    oldPrice: 5199,
    rating: 4.5,
    reviews: 172,
    badge: '',
    color: '#dbeafe',
    icon: '🔌',
    description: 'A compact hub that helps connect compatible devices and accessories.',
    stock: 25,
  },
];

const money = (amount: number) =>
  new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0,
  }).format(amount);

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All products");
  const [sortBy, setSortBy] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(15000);
  const [onlyDeals, setOnlyDeals] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterMessage, setNewsletterMessage] = useState("");
  const [toast, setToast] = useState("");

  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];
    const normalizedSearch = search.trim().toLowerCase();
    if (normalizedSearch) {
      result = result.filter((product) =>
        `${product.name} ${product.category} ${product.description}`
          .toLowerCase()
          .includes(normalizedSearch),
      );
    }
    if (activeCategory !== "All products") {
      result = result.filter((product) => product.category === activeCategory);
    }
    result = result.filter((product) => product.price <= maxPrice);
    if (onlyDeals) result = result.filter((product) => product.oldPrice && product.oldPrice > product.price);
    if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);
    if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating);
    if (sortBy === "name") result.sort((a, b) => a.name.localeCompare(b.name));
    return result;
  }, [search, activeCategory, maxPrice, onlyDeals, sortBy]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  }

  function addToCart(product: Product) {
    setCart((current) => {
      const found = current.find((item) => item.product.id === product.id);
      if (found) {
        return current.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...current, { product, quantity: 1 }];
    });
    showToast(`${product.name} added to cart`);
  }

  function changeQuantity(productId: number, change: number) {
    setCart((current) =>
      current
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + change }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function toggleFavorite(productId: number) {
    setFavorites((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    );
  }

  function submitNewsletter(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!newsletterEmail.includes("@")) {
      setNewsletterMessage("Please enter a valid email address.");
      return;
    }
    setNewsletterMessage("You are on the list! Thanks for joining Nova.");
    setNewsletterEmail("");
  }

  return (
    <main className="site-shell">
      <style jsx global>{`
        :root { color-scheme: light; }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; background: #f7f8fb; color: #182033; font-family: Arial, Helvetica, sans-serif; }
        button, input, select { font: inherit; }
        button { cursor: pointer; }
        button:focus-visible, input:focus-visible, select:focus-visible { outline: 3px solid #93c5fd; outline-offset: 2px; }
        .site-shell { min-height: 100vh; overflow: hidden; }
        .announcement { background: #111827; color: white; text-align: center; padding: 10px 16px; font-size: 12px; letter-spacing: .08em; }
        .announcement strong { color: #a7f3d0; }
        .container { width: min(1180px, calc(100% - 40px)); margin: 0 auto; }
        .header { background: rgba(255,255,255,.94); border-bottom: 1px solid #e5e7eb; position: sticky; top: 0; z-index: 30; backdrop-filter: blur(14px); }
        .header-main { min-height: 78px; display: flex; align-items: center; gap: 26px; }
        .brand { display: flex; align-items: center; gap: 10px; text-decoration: none; color: #111827; font-size: 22px; font-weight: 900; letter-spacing: -.06em; white-space: nowrap; }
        .brand-mark { display: grid; place-items: center; width: 38px; height: 38px; border-radius: 13px; color: #fff; background: linear-gradient(135deg,#111827,#4b5563); box-shadow: 0 6px 18px #1118272b; }
        .search-box { display: flex; align-items: center; gap: 10px; flex: 1; max-width: 560px; padding: 0 15px; height: 46px; border: 1px solid #e5e7eb; border-radius: 14px; background: #f9fafb; }
        .search-box span { color: #6b7280; font-size: 18px; }
        .search-box input { width: 100%; border: 0; outline: 0; background: transparent; color: #111827; }
        .header-actions { margin-left: auto; display: flex; align-items: center; gap: 10px; }
        .icon-button { position: relative; border: 1px solid #e5e7eb; background: #fff; width: 44px; height: 44px; border-radius: 14px; display: grid; place-items: center; color: #111827; font-size: 18px; transition: .2s; }
        .icon-button:hover { border-color: #9ca3af; transform: translateY(-1px); }
        .count { position: absolute; top: -6px; right: -6px; min-width: 20px; height: 20px; padding: 0 5px; display: grid; place-items: center; border-radius: 99px; background: #111827; color: white; font-size: 11px; font-weight: 800; }
        .menu-button { display: none; }
        .nav { border-top: 1px solid #f3f4f6; }
        .nav-inner { display: flex; align-items: center; gap: 26px; min-height: 46px; }
        .nav a { color: #4b5563; text-decoration: none; font-size: 13px; font-weight: 700; }
        .nav a:hover { color: #111827; }
        .nav-note { margin-left: auto; color: #6b7280; font-size: 12px; }
        .hero { padding: 38px 0 24px; }
        .hero-card { position: relative; isolation: isolate; min-height: 390px; overflow: hidden; border-radius: 30px; padding: clamp(28px,5vw,62px); color: white; background: radial-gradient(circle at 80% 25%,#4b5563 0,#263041 25%,transparent 48%), linear-gradient(120deg,#101827,#263244 65%,#111827); display: flex; align-items: center; }
        .hero-card:before { content: ""; position: absolute; z-index: -1; width: 360px; height: 360px; border: 1px solid #ffffff22; border-radius: 50%; right: 8%; top: 10%; box-shadow: 0 0 0 35px #ffffff08,0 0 0 75px #ffffff05; }
        .hero-card:after { content: "N"; position: absolute; z-index: -1; right: 12%; top: -42px; font-size: clamp(260px,32vw,430px); line-height: 1; font-weight: 900; color: #ffffff0b; transform: rotate(-12deg); }
        .hero-copy { max-width: 590px; }
        .eyebrow { display: inline-flex; align-items: center; gap: 8px; color: #a7f3d0; font-size: 11px; font-weight: 900; letter-spacing: .18em; text-transform: uppercase; }
        .eyebrow:before { content: ""; width: 24px; height: 2px; background: currentColor; }
        .hero h1 { margin: 18px 0; font-size: clamp(38px,5.6vw,68px); line-height: .98; letter-spacing: -.065em; max-width: 650px; }
        .hero p { max-width: 490px; color: #d1d5db; line-height: 1.7; font-size: 15px; }
        .hero-buttons { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 28px; }
        .button { border: 0; border-radius: 13px; padding: 14px 20px; font-size: 13px; font-weight: 800; display: inline-flex; justify-content: center; align-items: center; gap: 9px; transition: transform .2s,box-shadow .2s,background .2s; text-decoration: none; }
        .button:hover { transform: translateY(-2px); }
        .button-primary { background: #fff; color: #111827; box-shadow: 0 8px 22px #0002; }
        .button-primary:hover { box-shadow: 0 12px 25px #0004; }
        .button-dark { background: #111827; color: #fff; }
        .button-outline { background: transparent; color: #fff; border: 1px solid #ffffff55; }
        .hero-stats { display: flex; flex-wrap: wrap; gap: 28px; margin-top: 30px; }
        .hero-stat strong { display: block; font-size: 19px; }
        .hero-stat span { color: #9ca3af; font-size: 11px; }
        .benefits { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; padding: 18px 0 42px; }
        .benefit { display: flex; align-items: center; gap: 13px; padding: 17px; background: white; border: 1px solid #eef0f4; border-radius: 17px; }
        .benefit-icon { width: 40px; height: 40px; display: grid; place-items: center; border-radius: 13px; background: #f3f4f6; font-size: 19px; flex-shrink: 0; }
        .benefit strong { display: block; font-size: 12px; margin-bottom: 4px; }
        .benefit span { display: block; font-size: 11px; color: #6b7280; }
        .section-heading { display: flex; justify-content: space-between; align-items: end; gap: 20px; margin-bottom: 22px; }
        .section-kicker { color: #6b7280; font-size: 11px; font-weight: 900; letter-spacing: .16em; text-transform: uppercase; }
        .section-heading h2 { margin: 8px 0 0; font-size: clamp(26px,3vw,36px); letter-spacing: -.05em; }
        .section-heading p { color: #6b7280; font-size: 13px; margin: 8px 0 0; }
        .category-row { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 26px; }
        .category-chip { border: 1px solid #e5e7eb; background: white; color: #4b5563; border-radius: 999px; padding: 10px 15px; font-size: 12px; font-weight: 800; transition: .2s; }
        .category-chip:hover { border-color: #9ca3af; }
        .category-chip.active { background: #111827; color: white; border-color: #111827; }
        .shop-layout { display: grid; grid-template-columns: 225px minmax(0,1fr); gap: 24px; align-items: start; }
        .filters { background: white; border: 1px solid #e5e7eb; border-radius: 20px; padding: 20px; position: sticky; top: 145px; }
        .filters h3 { font-size: 14px; margin: 0 0 20px; }
        .filter-group { border-top: 1px solid #f0f1f4; padding: 17px 0; }
        .filter-group:first-of-type { border-top: 0; padding-top: 0; }
        .filter-title { display: flex; justify-content: space-between; font-size: 12px; font-weight: 800; margin-bottom: 13px; }
        .filter-group label { display: flex; gap: 9px; align-items: center; color: #4b5563; font-size: 12px; margin: 10px 0; cursor: pointer; }
        .filter-group input[type="checkbox"] { accent-color: #111827; }
        .price-value { font-weight: 900; font-size: 13px; }
        .price-range { width: 100%; accent-color: #111827; }
        .clear-button { border: 0; padding: 0; color: #6b7280; background: transparent; text-decoration: underline; font-size: 11px; }
        .product-toolbar { display: flex; align-items: center; justify-content: space-between; gap: 15px; margin-bottom: 18px; }
        .result-count { color: #6b7280; font-size: 12px; }
        .result-count strong { color: #111827; }
        .sort-select { border: 1px solid #e5e7eb; background: white; color: #374151; border-radius: 12px; padding: 11px 13px; font-size: 12px; }
        .product-grid { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 16px; }
        .product-card { min-width: 0; border: 1px solid #e8eaf0; border-radius: 20px; background: white; overflow: hidden; transition: transform .22s,box-shadow .22s,border-color .22s; }
        .product-card:hover { transform: translateY(-4px); border-color: #d1d5db; box-shadow: 0 16px 35px #1118270b; }
        .product-art { position: relative; min-height: 185px; display: grid; place-items: center; overflow: hidden; cursor: pointer; }
        .product-art:before { content: ""; position: absolute; width: 155px; height: 155px; border-radius: 50%; background: #ffffff88; }
        .product-emoji { position: relative; font-size: 66px; filter: drop-shadow(0 12px 8px #00000012); transition: transform .25s; }
        .product-card:hover .product-emoji { transform: scale(1.09) rotate(-4deg); }
        .product-badge { position: absolute; top: 13px; left: 13px; z-index: 2; background: #fff; color: #111827; border-radius: 8px; padding: 6px 8px; font-size: 9px; font-weight: 900; letter-spacing: .06em; }
        .favorite-button { position: absolute; z-index: 2; top: 10px; right: 10px; width: 34px; height: 34px; border: 0; border-radius: 50%; background: #ffffffd9; color: #4b5563; font-size: 17px; }
        .favorite-button.active { color: #e11d48; }
        .product-info { padding: 16px; }
        .product-category { color: #9ca3af; font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: .12em; }
        .product-name { border: 0; padding: 0; background: transparent; color: #111827; text-align: left; font-size: 14px; font-weight: 800; margin: 7px 0 8px; line-height: 1.4; }
        .product-name:hover { text-decoration: underline; }
        .rating { color: #d97706; font-size: 11px; }
        .rating span { color: #9ca3af; margin-left: 5px; }
        .product-description { color: #6b7280; font-size: 11px; line-height: 1.55; margin: 10px 0 14px; min-height: 35px; }
        .product-bottom { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
        .price strong { display: block; font-size: 15px; letter-spacing: -.03em; }
        .price del { display: block; color: #9ca3af; font-size: 10px; margin-top: 3px; }
        .add-button { flex-shrink: 0; width: 38px; height: 38px; border: 0; border-radius: 12px; background: #111827; color: white; font-size: 20px; transition: .2s; }
        .add-button:hover { background: #374151; transform: scale(1.05); }
        .empty-state { grid-column: 1/-1; padding: 50px 20px; text-align: center; background: white; border: 1px dashed #d1d5db; border-radius: 20px; }
        .empty-state strong { display: block; font-size: 18px; margin-bottom: 8px; }
        .empty-state p { color: #6b7280; font-size: 13px; }
        .promo-strip { margin: 70px 0; display: grid; grid-template-columns: 1.2fr .8fr; gap: 20px; }
        .promo-main { border-radius: 24px; padding: 34px; color: white; background: linear-gradient(135deg,#064e3b,#047857); position: relative; overflow: hidden; }
        .promo-main:after { content: "↗"; position: absolute; right: 25px; bottom: -50px; font-size: 200px; color: #ffffff0d; font-weight: 900; }
        .promo-main h2 { max-width: 430px; margin: 14px 0; font-size: clamp(28px,4vw,42px); letter-spacing: -.06em; }
        .promo-main p { color: #d1fae5; max-width: 430px; font-size: 13px; line-height: 1.7; }
        .promo-side { border-radius: 24px; padding: 30px; background: #e5e7eb; display: flex; flex-direction: column; justify-content: space-between; min-height: 240px; }
        .promo-side .big-number { font-size: clamp(42px,5vw,65px); font-weight: 900; letter-spacing: -.08em; }
        .promo-side p { color: #4b5563; line-height: 1.6; font-size: 13px; }
        .trust-section { padding: 10px 0 70px; }
        .trust-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 16px; }
        .trust-card { border: 1px solid #e5e7eb; background: white; border-radius: 20px; padding: 25px; }
        .trust-card .trust-icon { font-size: 25px; }
        .trust-card h3 { font-size: 15px; margin: 15px 0 8px; }
        .trust-card p { color: #6b7280; font-size: 12px; line-height: 1.7; margin: 0; }
        .newsletter { border-radius: 28px; padding: clamp(25px,5vw,48px); background: #eef2ff; display: grid; grid-template-columns: 1fr 1fr; gap: 25px; align-items: center; margin-bottom: 70px; }
        .newsletter h2 { margin: 8px 0 10px; font-size: clamp(25px,3vw,36px); letter-spacing: -.05em; }
        .newsletter p { color: #6b7280; font-size: 13px; line-height: 1.7; max-width: 430px; }
        .newsletter-form { display: flex; gap: 8px; background: white; border: 1px solid #dbe1f1; padding: 7px; border-radius: 15px; }
        .newsletter-form input { min-width: 0; flex: 1; border: 0; outline: 0; padding: 10px; background: transparent; }
        .newsletter-form button { border: 0; border-radius: 10px; background: #111827; color: white; padding: 0 17px; font-size: 12px; font-weight: 800; }
        .newsletter-message { min-height: 18px; margin-top: 10px; color: #374151; font-size: 11px; }
        .footer { background: #111827; color: white; padding: 52px 0 22px; }
        .footer-grid { display: grid; grid-template-columns: 1.5fr repeat(3,1fr); gap: 30px; padding-bottom: 38px; }
        .footer .brand { color: white; }
        .footer-copy { max-width: 300px; color: #9ca3af; font-size: 12px; line-height: 1.8; margin-top: 18px; }
        .footer h4 { margin: 0 0 17px; font-size: 12px; }
        .footer a { display: block; color: #9ca3af; text-decoration: none; font-size: 12px; margin: 12px 0; }
        .footer a:hover { color: white; }
        .footer-bottom { border-top: 1px solid #ffffff1a; padding-top: 20px; display: flex; justify-content: space-between; gap: 15px; color: #9ca3af; font-size: 11px; }
        .overlay { position: fixed; inset: 0; z-index: 80; background: #11182780; backdrop-filter: blur(4px); display: flex; justify-content: flex-end; }
        .cart-panel { width: min(440px,100%); height: 100%; background: white; display: flex; flex-direction: column; box-shadow: -15px 0 50px #0002; animation: slide-in .22s ease-out; }
        @keyframes slide-in { from { transform: translateX(30px); opacity: .6; } to { transform: translateX(0); opacity: 1; } }
        .panel-head { display: flex; justify-content: space-between; align-items: center; padding: 23px; border-bottom: 1px solid #e5e7eb; }
        .panel-head h2 { margin: 0; font-size: 20px; }
        .close-button { width: 36px; height: 36px; border: 1px solid #e5e7eb; border-radius: 11px; background: white; font-size: 18px; }
        .cart-items { flex: 1; overflow: auto; padding: 18px 23px; }
        .cart-item { display: grid; grid-template-columns: 65px 1fr; gap: 13px; padding: 15px 0; border-bottom: 1px solid #f0f1f4; }
        .cart-item-art { display: grid; place-items: center; border-radius: 13px; font-size: 28px; }
        .cart-item h4 { margin: 1px 0 6px; font-size: 13px; }
        .cart-item p { margin: 0; color: #6b7280; font-size: 11px; }
        .quantity-control { display: flex; align-items: center; gap: 10px; margin-top: 12px; }
        .quantity-control button { width: 25px; height: 25px; border: 1px solid #e5e7eb; border-radius: 7px; background: white; }
        .quantity-control span { font-size: 12px; font-weight: 800; }
        .cart-summary { padding: 23px; border-top: 1px solid #e5e7eb; }
        .summary-row { display: flex; justify-content: space-between; margin: 10px 0; color: #6b7280; font-size: 12px; }
        .summary-row.total { color: #111827; font-weight: 900; font-size: 16px; margin: 17px 0; }
        .checkout-button { width: 100%; }
        .cart-empty { text-align: center; padding: 55px 15px; }
        .cart-empty .empty-icon { font-size: 48px; }
        .cart-empty h3 { margin: 15px 0 8px; }
        .cart-empty p { color: #6b7280; font-size: 12px; line-height: 1.7; }
        .modal-backdrop { position: fixed; z-index: 90; inset: 0; display: grid; place-items: center; padding: 20px; background: #11182799; backdrop-filter: blur(5px); }
        .product-modal { width: min(760px,100%); background: white; border-radius: 25px; overflow: hidden; display: grid; grid-template-columns: .9fr 1.1fr; position: relative; animation: pop-in .2s ease-out; }
        @keyframes pop-in { from { transform: scale(.97); opacity: .5; } to { transform: scale(1); opacity: 1; } }
        .modal-art { min-height: 350px; display: grid; place-items: center; font-size: 100px; }
        .modal-copy { padding: 35px; }
        .modal-copy h2 { margin: 10px 0; font-size: 28px; letter-spacing: -.05em; }
        .modal-copy p { color: #6b7280; font-size: 13px; line-height: 1.8; }
        .modal-price { margin: 22px 0; font-size: 24px; font-weight: 900; }
        .modal-close { position: absolute; top: 13px; right: 13px; z-index: 2; }
        .toast { position: fixed; z-index: 120; bottom: 24px; left: 50%; transform: translateX(-50%); background: #111827; color: white; padding: 13px 18px; border-radius: 12px; box-shadow: 0 10px 30px #0003; font-size: 12px; font-weight: 700; animation: toast-in .2s ease-out; }
        @keyframes toast-in { from { opacity: 0; transform: translate(-50%,10px); } to { opacity: 1; transform: translate(-50%,0); } }
        .mobile-filter-toggle { display: none; }
        @media (max-width: 1000px) {
          .product-grid { grid-template-columns: repeat(2,minmax(0,1fr)); }
          .benefits { grid-template-columns: repeat(2,1fr); }
          .shop-layout { grid-template-columns: 200px minmax(0,1fr); gap: 16px; }
          .header-main { gap: 15px; }
          .footer-grid { grid-template-columns: repeat(2,1fr); }
        }
        @media (max-width: 700px) {
          .container { width: min(100% - 28px,1180px); }
          .announcement { font-size: 10px; }
          .header-main { min-height: 68px; flex-wrap: wrap; padding: 12px 0; gap: 12px; }
          .brand { font-size: 19px; }
          .brand-mark { width: 34px; height: 34px; }
          .header-actions { gap: 7px; }
          .icon-button { width: 39px; height: 39px; border-radius: 12px; }
          .search-box { order: 3; flex-basis: 100%; max-width: none; height: 42px; }
          .menu-button { display: grid; }
          .nav { display: none; }
          .nav.mobile-open { display: block; }
          .nav-inner { padding: 12px 0 18px; align-items: flex-start; flex-direction: column; gap: 16px; }
          .nav-note { margin-left: 0; }
          .hero { padding-top: 22px; }
          .hero-card { min-height: 440px; border-radius: 22px; padding: 28px 24px; align-items: flex-start; }
          .hero-card:before { right: -130px; top: 160px; }
          .hero-card:after { right: -25px; top: 130px; font-size: 270px; }
          .hero h1 { font-size: 43px; }
          .hero p { font-size: 13px; }
          .hero-stats { gap: 20px; }
          .benefits { gap: 9px; padding-bottom: 35px; }
          .benefit { padding: 12px; gap: 9px; }
          .benefit-icon { width: 34px; height: 34px; font-size: 16px; }
          .benefit strong { font-size: 11px; }
          .benefit span { font-size: 10px; }
          .section-heading { align-items: flex-start; flex-direction: column; }
          .shop-layout { display: block; }
          .filters { display: none; position: static; margin-bottom: 18px; }
          .filters.show { display: block; }
          .mobile-filter-toggle { display: inline-flex; }
          .product-toolbar { flex-wrap: wrap; }
          .product-grid { gap: 10px; }
          .product-art { min-height: 145px; }
          .product-emoji { font-size: 52px; }
          .product-info { padding: 12px; }
          .product-name { font-size: 12px; }
          .product-description { display: none; }
          .product-bottom { align-items: end; }
          .price strong { font-size: 12px; }
          .add-button { width: 33px; height: 33px; border-radius: 10px; }
          .product-badge { top: 8px; left: 8px; font-size: 8px; padding: 5px; }
          .favorite-button { width: 29px; height: 29px; top: 7px; right: 7px; }
          .promo-strip { grid-template-columns: 1fr; margin: 45px 0; }
          .promo-main { padding: 27px; }
          .trust-grid { grid-template-columns: 1fr; }
          .trust-card { padding: 20px; }
          .newsletter { grid-template-columns: 1fr; gap: 12px; margin-bottom: 45px; border-radius: 22px; }
          .newsletter-form { flex-direction: column; }
          .newsletter-form input { min-height: 42px; }
          .newsletter-form button { min-height: 42px; }
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 25px 18px; }
          .footer-grid > div:first-child { grid-column: 1/-1; }
          .footer-bottom { flex-direction: column; }
          .product-modal { grid-template-columns: 1fr; max-height: 90vh; overflow-y: auto; }
          .modal-art { min-height: 190px; font-size: 75px; }
          .modal-copy { padding: 25px; }
          .modal-copy h2 { font-size: 23px; }
        }
        @media (max-width: 390px) {
          .hero h1 { font-size: 37px; }
          .product-grid { grid-template-columns: 1fr 1fr; }
          .product-art { min-height: 125px; }
          .product-emoji { font-size: 43px; }
          .product-info { padding: 10px; }
          .product-bottom { gap: 4px; }
          .price strong { font-size: 11px; }
          .add-button { width: 30px; height: 30px; }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { scroll-behavior: auto !important; animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
        }
      `}</style>

      <div className="announcement">
        WEEKEND DROP: <strong>UP TO 25% OFF SELECT ITEMS</strong> · SIMPLE SHOPPING, GOOD FINDS
      </div>

      <header className="header">
        <div className="container header-main">
          <a className="brand" href="#" aria-label="Nova Market home">
            <span className="brand-mark">N</span>
            <span>nova<span style={{ color: "#6b7280" }}>market</span></span>
          </a>
          <label className="search-box">
            <span aria-hidden="true">⌕</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products, categories, and more..."
              aria-label="Search products"
            />
            {search && <button className="clear-button" onClick={() => setSearch("")} type="button">Clear</button>}
          </label>
          <div className="header-actions">
            <button className="icon-button" aria-label="View favorites" onClick={() => { setSearch(""); setActiveCategory("All products"); showToast(`${favorites.length} saved favorite${favorites.length === 1 ? "" : "s"}`); }}>♡
              {favorites.length > 0 && <span className="count">{favorites.length}</span>}
            </button>
            <button className="icon-button" aria-label="Open shopping cart" onClick={() => setCartOpen(true)}>🛍
              {cartCount > 0 && <span className="count">{cartCount}</span>}
            </button>
            <button className="icon-button menu-button" aria-label="Toggle navigation" onClick={() => setMobileMenuOpen((open) => !open)}>☰</button>
          </div>
        </div>
        <nav className={`nav ${mobileMenuOpen ? "mobile-open" : ""}`}>
          <div className="container nav-inner">
            <a href="#shop" onClick={() => setMobileMenuOpen(false)}>Shop all</a>
            <a href="#shop" onClick={() => { setActiveCategory("Electronics"); setMobileMenuOpen(false); }}>Electronics</a>
            <a href="#shop" onClick={() => { setActiveCategory("Home"); setMobileMenuOpen(false); }}>Home essentials</a>
            <a href="#shop" onClick={() => { setActiveCategory("Fashion"); setMobileMenuOpen(false); }}>Fashion</a>
            <a href="#deals" onClick={() => setMobileMenuOpen(false)}>Deals</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)}>Our story</a>
            <span className="nav-note">Thoughtful finds. Everyday prices.</span>
          </div>
        </nav>
      </header>

      <section className="hero">
        <div className="container">
          <div className="hero-card">
            <div className="hero-copy">
              <span className="eyebrow">The new everyday</span>
              <h1>Good things.<br />Better living.</h1>
              <p>Discover useful essentials, clever accessories, and little upgrades that make every day feel a bit better.</p>
              <div className="hero-buttons">
                <a className="button button-primary" href="#shop">Explore the store <span>↗</span></a>
                <a className="button button-outline" href="#deals">See this week’s deals</a>
              </div>
              <div className="hero-stats">
                <div className="hero-stat"><strong>100+</strong><span>Curated finds</span></div>
                <div className="hero-stat"><strong>4.7/5</strong><span>Average rating</span></div>
                <div className="hero-stat"><strong>Easy</strong><span>Shopping experience</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container benefits" aria-label="Shopping benefits">
        <div className="benefit"><div className="benefit-icon">🚚</div><div><strong>Convenient delivery</strong><span>Delivery options at checkout</span></div></div>
        <div className="benefit"><div className="benefit-icon">↩</div><div><strong>Easy returns</strong><span>Clear, friendly policies</span></div></div>
        <div className="benefit"><div className="benefit-icon">🔒</div><div><strong>Secure experience</strong><span>Your details matter</span></div></div>
        <div className="benefit"><div className="benefit-icon">✦</div><div><strong>Carefully selected</strong><span>Useful items, less clutter</span></div></div>
      </section>

      <section className="container" id="shop" style={{ paddingTop: 10 }}>
        <div className="section-heading">
          <div><span className="section-kicker">Your next favorite</span><h2>Shop the collection</h2><p>Explore the catalogue and find something useful for your everyday.</p></div>
          <button className="button button-dark" onClick={() => { setActiveCategory("All products"); setSearch(""); setOnlyDeals(false); setMaxPrice(15000); setSortBy("featured"); }}>Reset shop ↺</button>
        </div>
        <div className="category-row" aria-label="Product categories">
          {categories.map((category) => (
            <button key={category} className={`category-chip ${activeCategory === category ? "active" : ""}`} onClick={() => setActiveCategory(category)}>{category}</button>
          ))}
        </div>
        <div className="shop-layout">
          <aside className={`filters ${mobileMenuOpen ? "show" : ""}`}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}><h3>Filter products</h3><button className="clear-button" onClick={() => { setOnlyDeals(false); setMaxPrice(15000); }}>Reset</button></div>
            <div className="filter-group">
              <div className="filter-title"><span>Category</span></div>
              {categories.map((category) => <label key={category}><input type="radio" name="filter-category" checked={activeCategory === category} onChange={() => setActiveCategory(category)} />{category}</label>)}
            </div>
            <div className="filter-group">
              <div className="filter-title"><span>Maximum price</span><span className="price-value">{money(maxPrice)}</span></div>
              <input className="price-range" type="range" min="1000" max="15000" step="500" value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} aria-label="Maximum price" />
              <div style={{ display: "flex", justifyContent: "space-between", color: "#9ca3af", fontSize: 10, marginTop: 7 }}><span>KES 1,000</span><span>KES 15,000</span></div>
            </div>
            <div className="filter-group">
              <div className="filter-title"><span>Special offers</span></div>
              <label><input type="checkbox" checked={onlyDeals} onChange={(event) => setOnlyDeals(event.target.checked)} /> Discounted items only</label>
            </div>
            <div className="filter-group"><p style={{ color: "#6b7280", fontSize: 11, lineHeight: 1.7, margin: 0 }}>Tip: combine search, categories, and price filters to narrow down your results.</p></div>
          </aside>
          <div className="product-area">
            <div className="product-toolbar">
              <div className="result-count">Showing <strong>{filteredProducts.length}</strong> of {initialProducts.length} products</div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <button className="button button-dark mobile-filter-toggle" onClick={() => setMobileMenuOpen((open) => !open)}>☷ Filters</button>
                <select className="sort-select" value={sortBy} onChange={(event) => setSortBy(event.target.value)} aria-label="Sort products">
                  <option value="featured">Sort: Featured</option>
                  <option value="price-low">Price: Low to high</option>
                  <option value="price-high">Price: High to low</option>
                  <option value="rating">Top rated</option>
                  <option value="name">Name: A–Z</option>
                </select>
              </div>
            </div>
            <div className="product-grid">
              {filteredProducts.length === 0 ? (
                <div className="empty-state"><strong>No products found</strong><p>Try another search or relax your filters.</p><button className="button button-dark" onClick={() => { setSearch(""); setActiveCategory("All products"); setMaxPrice(15000); setOnlyDeals(false); }}>Clear all filters</button></div>
              ) : filteredProducts.map((product) => (
                <article className="product-card" key={product.id}>
                  <div className="product-art" style={{ background: product.color }} onClick={() => setSelectedProduct(product)} role="button" tabIndex={0} onKeyDown={(event) => { if (event.key === "Enter") setSelectedProduct(product); }} aria-label={`View ${product.name}`}>
                    {product.badge && <span className="product-badge">{product.badge}</span>}
                    <button className={`favorite-button ${favorites.includes(product.id) ? "active" : ""}`} aria-label={favorites.includes(product.id) ? "Remove from favorites" : "Add to favorites"} onClick={(event) => { event.stopPropagation(); toggleFavorite(product.id); }} type="button">{favorites.includes(product.id) ? "♥" : "♡"}</button>
                    <span className="product-emoji">{product.icon}</span>
                  </div>
                  <div className="product-info">
                    <div className="product-category">{product.category}</div>
                    <button className="product-name" onClick={() => setSelectedProduct(product)}>{product.name}</button>
                    <div className="rating">★★★★★ <span>{product.rating} ({product.reviews})</span></div>
                    <p className="product-description">{product.description}</p>
                    <div className="product-bottom">
                      <div className="price"><strong>{money(product.price)}</strong>{product.oldPrice && <del>{money(product.oldPrice)}</del>}</div>
                      <button className="add-button" aria-label={`Add ${product.name} to cart`} onClick={() => addToCart(product)}>+</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container promo-strip" id="deals">
        <div className="promo-main">
          <span className="eyebrow">A little extra value</span>
          <h2>Small upgrades can make a big difference.</h2>
          <p>Explore discounted picks and practical essentials. Use the filters above to see items on offer and compare prices in one place.</p>
          <a href="#shop" className="button button-primary" style={{ marginTop: 12 }}>Browse the deals ↗</a>
        </div>
        <div className="promo-side">
          <div><span className="section-kicker">Made for everyday</span><div className="big-number">25% off</div></div>
          <p>Selected products have a lower display price. Look for the original price below each item to compare.</p>
          <button className="button button-dark" onClick={() => { setOnlyDeals(true); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }}>Show discounted items</button>
        </div>
      </section>

      <section className="container trust-section" id="about">
        <div className="section-heading"><div><span className="section-kicker">Why Nova?</span><h2>A simpler way to shop</h2><p>We believe online shopping should feel clear, useful, and easy to explore.</p></div></div>
        <div className="trust-grid">
          <article className="trust-card"><div className="trust-icon">✦</div><h3>Curated, not crowded</h3><p>Our demo catalogue focuses on practical items across everyday categories instead of overwhelming you with endless choices.</p></article>
          <article className="trust-card"><div className="trust-icon">⌕</div><h3>Easy to discover</h3><p>Search by name or description, browse categories, adjust the price range, and sort products to find a good fit.</p></article>
          <article className="trust-card"><div className="trust-icon">♡</div><h3>Built around your choices</h3><p>Save favorites, open product details, and add items to a cart. This practice project demonstrates common shop interactions.</p></article>
        </div>
      </section>

      <section className="container newsletter">
        <div><span className="section-kicker">The Nova note</span><h2>Good finds, occasionally.</h2><p>Join our demo mailing list to practise form handling and validation. This page does not send your email to a real mailing service.</p></div>
        <div>
          <form className="newsletter-form" onSubmit={submitNewsletter}>
            <input type="email" value={newsletterEmail} onChange={(event) => setNewsletterEmail(event.target.value)} placeholder="Your email address" aria-label="Your email address" required />
            <button type="submit">Join the list ↗</button>
          </form>
          <div className="newsletter-message" role="status">{newsletterMessage}</div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div><a className="brand" href="#"><span className="brand-mark">N</span><span>nova<span style={{ color: "#9ca3af" }}>market</span></span></a><p className="footer-copy">A fictional storefront made for frontend practice. Explore the interface, inspect the components, and make it your own.</p></div>
            <div><h4>Explore</h4><a href="#shop">All products</a><a href="#shop">Popular items</a><a href="#deals">Special offers</a><a href="#about">Our story</a></div>
            <div><h4>Customer care</h4><a href="#about">Help centre</a><a href="#about">Delivery information</a><a href="#about">Returns policy</a><a href="#about">Contact us</a></div>
            <div><h4>Follow along</h4><a href="#newsletter">Newsletter</a><a href="#shop">New arrivals</a><a href="#deals">Weekly deals</a><a href="#top">Back to top ↑</a></div>
          </div>
          <div className="footer-bottom"><span>© {new Date().getFullYear()} Nova Market · Practice project</span><span>Built with React and Next.js · No real checkout</span></div>
        </div>
      </footer>

      {cartOpen && (
        <div className="overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setCartOpen(false); }}>
          <aside className="cart-panel" role="dialog" aria-modal="true" aria-label="Shopping cart">
            <div className="panel-head"><h2>Your cart <span style={{ color: "#9ca3af", fontSize: 13 }}>({cartCount})</span></h2><button className="close-button" onClick={() => setCartOpen(false)} aria-label="Close cart">×</button></div>
            <div className="cart-items">
              {cart.length === 0 ? <div className="cart-empty"><div className="empty-icon">🛍</div><h3>Your cart is waiting</h3><p>Add a few things you like and they will appear here.</p><button className="button button-dark" onClick={() => setCartOpen(false)}>Continue shopping</button></div> : cart.map((item) => (
                <div className="cart-item" key={item.product.id}>
                  <div className="cart-item-art" style={{ background: item.product.color }}>{item.product.icon}</div>
                  <div><h4>{item.product.name}</h4><p>{money(item.product.price)} each</p><div className="quantity-control"><button onClick={() => changeQuantity(item.product.id, -1)} aria-label={`Remove one ${item.product.name}`}>−</button><span>{item.quantity}</span><button onClick={() => changeQuantity(item.product.id, 1)} aria-label={`Add one ${item.product.name}`}>+</button><span style={{ marginLeft: "auto", color: "#111827" }}>{money(item.product.price * item.quantity)}</span></div></div>
                </div>
              ))}
            </div>
            {cart.length > 0 && <div className="cart-summary"><div className="summary-row"><span>Subtotal</span><span>{money(cartTotal)}</span></div><div className="summary-row"><span>Delivery estimate</span><span>{cartTotal >= 10000 ? "FREE" : money(350)}</span></div><div className="summary-row total"><span>Total</span><span>{money(cartTotal + (cartTotal >= 10000 ? 0 : 350))}</span></div><button className="button button-dark checkout-button" onClick={() => showToast("Demo only — checkout is not connected.")}>Continue to checkout ↗</button><p style={{ color: "#9ca3af", textAlign: "center", fontSize: 10, lineHeight: 1.6 }}>This is a frontend demo. No payment or order will be processed.</p></div>}
          </aside>
        </div>
      )}

      {selectedProduct && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedProduct(null); }}>
          <section className="product-modal" role="dialog" aria-modal="true" aria-label={`${selectedProduct.name} details`}>
            <button className="close-button modal-close" onClick={() => setSelectedProduct(null)} aria-label="Close product details">×</button>
            <div className="modal-art" style={{ background: selectedProduct.color }}>{selectedProduct.icon}</div>
            <div className="modal-copy"><div className="product-category">{selectedProduct.category}</div><h2>{selectedProduct.name}</h2><div className="rating">★★★★★ <span>{selectedProduct.rating} from {selectedProduct.reviews} reviews</span></div><p>{selectedProduct.description}</p><p>Designed for everyday use, this item is part of the Nova Market demo catalogue. Product descriptions and stock values are sample data for frontend practice.</p><div className="modal-price">{money(selectedProduct.price)} {selectedProduct.oldPrice && <del style={{ color: "#9ca3af", fontSize: 14, marginLeft: 8 }}>{money(selectedProduct.oldPrice)}</del>}</div><p style={{ fontSize: 11 }}>Availability: {selectedProduct.stock > 0 ? "In stock" : "Currently unavailable"}</p><button className="button button-dark" onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}>Add to cart +</button></div>
          </section>
        </div>
      )}

      {toast && <div className="toast" role="status">{toast}</div>}
    </main>
  );
}