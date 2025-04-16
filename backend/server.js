const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/ProductRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');  // Import payment routes

const app = express();

// Define JWT secret
const JWT_SECRET = 'Sanjaisuga@43';

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
const db_url = "mongodb+srv://sanjai:admin@cluster0.i0aygay.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(db_url)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);  // Use payment routes for webhook

// Home Route
app.get('/', (req, res) => {
  res.send("Welcome to the Grocery Delivery API!");
});

// Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`📦 Server running on http://localhost:${PORT}`);
});
