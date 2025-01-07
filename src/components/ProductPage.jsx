import React from "react";
import { Link } from "react-router-dom";
import acDaikinImage from "../assets/AC-DAIKIN-FTV-160x190.png";
import acDaikinUds from "../assets/AC-DAIKIN-FTV-160x190.png";

const ProductPage = () => {
  const categories = [
    {
      id: 1,
      title: "Split / Multi-Split Type Air Conditioners",
      image: acDaikinImage,
      link: "/products/split-ac",
    },
    {
      id: 2,
      title: "Unitary (Ducted Split)",
      image: acDaikinUds,
      link: "/products/ducted-split",
    },
    {
      id: 3,
      title: "Air to Water Heat Pump Systems",
      image: acDaikinImage,
      link: "/products/heat-pump",
    },
    {
      id: 4,
      title: "Heating Systems",
      image: acDaikinImage,
      link: "/products/heating",
    },
    // Add more categories as needed
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Background */}
      <div className="relative h-[300px] bg-cover bg-center">
        {/* Breadcrumb */}
        <div className="absolute top-4 left-4 text-white">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="hover:text-blue-300">
              Home
            </Link>
            <span>›</span>
            <Link to="/products" className="hover:text-blue-300">
              Products & Services
            </Link>
            <span>›</span>
            <span>Air Conditioning & Refrigeration</span>
          </div>
        </div>

        {/* Title */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h1 className="bg-blue-500 text-white px-8 py-2 text-3xl font-bold">
            AIR CONDITIONING & REFRIGERATION
          </h1>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8">Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={category.link}
              className="group bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="aspect-square flex items-center justify-center mb-4">
                <img
                  src={category.image}
                  alt={category.title}
                  className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex items-center text-blue-500 group-hover:text-blue-600">
                <span className="text-sm">{category.title}</span>
                <span className="ml-auto">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
