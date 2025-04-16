const express = require('express');
const router = express.Router();

const products = [
  {
    id: 1,
    name: 'Tomato',
    category: 'Vegetables',
    price: 30,
    stock: 100,
    description: 'Fresh farm tomatoes.',
    image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpngtree.com%2Fso%2Ftomato&psig=AOvVaw2FtXt0BI7JPKk3nY_xG_H4&ust=1744758239568000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCLDa14rR2IwDFQAAAAAdAAAAABAE",
  },
  {
    id: 2,
    name: 'Onion',
    category: 'Vegetables',
    price: 25,
    stock: 80,
    description: 'Organic onions.',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    name: 'Milk 1L',
    category: 'Dairy',
    price: 50,
    stock: 50,
    description: 'Full cream milk.',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 4,
    name: 'Wheat Flour 1kg',
    category: 'Grocery',
    price: 45,
    stock: 75,
    description: 'Premium wheat flour.',
    image: 'https://via.placeholder.com/150',
  },
];

router.get('/', (req, res) => {
  res.json(products);
});

module.exports = router;
