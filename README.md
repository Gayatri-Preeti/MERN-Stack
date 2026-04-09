# MERN Stack Product Store

A modern, full-stack e-commerce product management application built with the MERN stack (MongoDB, Express.js, React, Node.js). Features a dark-themed responsive UI with complete CRUD operations for product management.

## Features

- **Product Management**: Create, Read, Update, Delete products
- **Modern UI**: Dark theme with light mode toggle using Chakra UI
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Database**: MongoDB Atlas for data persistence
- **RESTful API**: Express.js backend with proper error handling
- **Image Previews**: Live image preview when adding/editing products
- **Toast Notifications**: User-friendly feedback for all actions

## Tech Stack

### Frontend
- **React 19** - Modern React with hooks
- **Chakra UI 2** - Component library for UI
- **React Router 7** - Client-side routing
- **Vite** - Fast build tool and dev server
- **React Icons** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing

### Database
- **MongoDB Atlas** - Cloud-hosted MongoDB

## Project Structure

```
mern-stack/
|
 Backend/
 |   config/
 |   |   db.js          # MongoDB connection
 |   controller/
 |   |   product.controller.js  # CRUD logic
 |   models/
 |   |   product.model.js      # Product schema
 |   routes/
 |   |   product.route.js      # API routes
 |   server.js                # Express server
 |
 frontend/
 |   src/
 |   |   components/
 |   |   |   Navbar.jsx        # Navigation component
 |   |   |   ProductCard.jsx   # Product card component
 |   |   pages/
 |   |   |   HomePage.jsx      # Main product grid
 |   |   |   CreatePage.jsx    # Add/Edit product form
 |   |   services/
 |   |   |   api.js            # API service functions
 |   |   App.jsx               # Main app component
 |   |   main.jsx              # React entry point
 |   package.json
 |   vite.config.js
 |
 .env                         # Environment variables
 .gitignore
 package.json                 # Root dependencies
 README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/mern-stack-product-store.git
cd mern-stack-product-store
```

### 2. Install Dependencies

#### Backend Dependencies
```bash
npm install
```

#### Frontend Dependencies
```bash
cd frontend
npm install
cd ..
```

### 3. Environment Setup
Create a `.env` file in the root directory:

```env
MONGO_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/your_database?appName=YourApp
PORT=5000
```

### 4. Start the Application

#### Start Backend Server
```bash
npm run dev
```
Backend will run on: `http://localhost:5000`

#### Start Frontend Development Server
```bash
cd frontend
npm run dev
```
Frontend will run on: `http://localhost:5173`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| POST | `/api/products` | Create a new product |
| PUT | `/api/products/:id` | Update a product |
| DELETE | `/api/products/:id` | Delete a specific product |
| DELETE | `/api/products` | Delete all products (for testing) |

## Usage

### Adding Products
1. Click the "Add Product" button
2. Fill in the product details:
   - Product Name
   - Price
   - Image URL
3. Click "Create Product"

### Managing Products
- **Edit**: Click the "Edit" button on any product card
- **Delete**: Click the "Delete" button on any product card
- **Theme Toggle**: Use the sun/moon icon in the navbar

## Sample Product Data

You can add sample products using these URLs for testing:

```javascript
// Sample products to add
const sampleProducts = [
  {
    name: "Wireless Earbuds",
    price: 199.99,
    image: "https://picsum.photos/seed/earbuds/400/300.jpg"
  },
  {
    name: "Smart Watch",
    price: 299.99,
    image: "https://picsum.photos/seed/watch/400/300.jpg"
  },
  {
    name: "Gaming Laptop",
    price: 1299.99,
    image: "https://picsum.photos/seed/laptop/400/300.jpg"
  }
];
```

## Deployment

### Frontend Deployment (Vercel/Netlify)
1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```
2. Deploy the `dist` folder to your preferred hosting platform

### Backend Deployment (Heroku/Railway)
1. Set environment variables in your hosting platform
2. Deploy the backend using the platform's CLI or GitHub integration

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Verify your MongoDB Atlas connection string
   - Check if your IP is whitelisted in MongoDB Atlas
   - Ensure database user has proper permissions

2. **CORS Error**
   - Backend server should be running on port 5000
   - Check if CORS is properly configured in server.js

3. **Frontend Build Error**
   - Clear node_modules and reinstall dependencies
   - Check for any missing environment variables

4. **Port Already in Use**
   - Kill existing processes using the ports
   - Or change the PORT in .env file

