import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Product from './components/crudProduct/Product';
import AddProduct from './components/crudProduct/AddProduct';
import DetailProduct from './components/crudProduct/DetailProduct';
import LogActivity from './components/crudProduct/LogActivity';
import EditProduct from './components/crudProduct/EditProduct';
import ReactPlayer from 'react-player';
import { FaPlay, FaPause } from 'react-icons/fa';

import backgroundSound from './assest/gta.mp3';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(backgroundSound);

    if (isPlaying) {
      audio.play().catch(error => {
        console.error('Autoplay error:', error);
      });
    } else {
      audio.pause();
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <Router>
      <Routes>
        {/* Rute untuk halaman login */}
        <Route path="/login" element={<Login />} />
        {/* Rute untuk halaman registrasi */}
        <Route path="/register" element={<Register />} />
        {/* Rute untuk dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Rute default, arahkan ke halaman login */}
        <Route index element={<Navigate to="/login" />} />
        {/* Rute default, arahkan ke halaman product */}
        <Route path="/product" element={<Product />} />
        {/* Rute untuk logs */}
        <Route path="/logs" element={<LogActivity />} />
        {/* Rute untuk logactivity */}
        <Route path="/logactivity" element={<LogActivity />} />
        {/* Rute untuk AddProduct */}
        <Route path="product/add" element={<AddProduct />} />
        {/* Rute untuk EditProduct */}
        <Route path="product/edit/:id" element={<EditProduct />} />
        {/* Rute untuk DetailProduct */}
        <Route path="product/detail/:id" element={<DetailProduct />} />

      </Routes>

      {/* <div className="fixed bottom-0 left-0 bg-opacity-80 bg-black text-white p-5 text-center">
        <div className="mb-4">
          {isPlaying ? (
            <FaPause onClick={handlePlayPause} className="cursor-pointer text-2xl" />
          ) : (
            <FaPlay onClick={handlePlayPause} className="cursor-pointer text-2xl" />
          )}
        </div>
      </div> */}

    </Router>
  );
}

export default App;
