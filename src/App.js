import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SignUp from './pages/Signup';
import FetchUserData from './pages/FetchUserData';
import SignIn from './pages/SignIn';
import ProtectedPage from './pages/ProtectedPage';
import FullCartView from './pages/FullCartView';
import Home from './pages/Home';
import Sidebar from './components/common/Sidebar'; // Import Sidebar component
import Navbar from './components/common/Navbar'; // Import Navbar component
import CategoryDisplay from './pages/CategoryDisplay'; 
import AllCategories from './pages/AllCategories';
import ProductDetailPage from './pages/ProductDetailPage';
import './styles/App.css';
import CheckOut from './pages/CheckOut';
import axios from 'axios';
import AdminForm from './pages/AdminForm'; // Import AdminForm component
import './styles/AdminForm.css'; // Import the CSS file for styling
import ProtectedRoute from './components/common/ProtectedRoute'; // Import ProtectedRoute component
import SearchPage from './pages/SearchPage'; // Import SearchPage component
import { setLoggedIn } from './store/slices/cartSlice';
import { useDispatch } from 'react-redux';
import ResetPass from './pages/ResetPass';
import ForgotPass from './pages/ForgotPass';





export const axiosInstance = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer YOUR_ACCESS_TOKEN',
  },
});

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  // const cartItems = useSelector((state) => state.cart); // Cart items from Redux store

  const handleLogout = () => {
    localStorage.removeItem('Accesstoken');
    dispatch(setLoggedIn(false));
    setIsAuthenticated(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="app">
      <Navbar toggleSidebar={toggleSidebar} handleLogout={handleLogout} />

      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className={`content ${isSidebarOpen ? 'shifted' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fetch-user-data" element={<FetchUserData />} />
          <Route path="/create-account" element={<SignUp />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/FullCartView" element={<FullCartView />} />
          <Route path="/category/:category" element={<CategoryDisplay />} />
          <Route path="/product/:productId" element={<ProductDetailPage />} />
          <Route path="/all-categories" element={<AllCategories />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path= "/forgot-password" element={<ForgotPass />} />
          <Route path="/reset-password/:token" element={<ResetPass />}  />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ProtectedPage"
            element={
              <ProtectedPage isAuthenticated={isAuthenticated}>
                <h2>Protected Page</h2>
                <p>This page is protected and requires authentication to access.</p>
              </ProtectedPage>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
