import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/produkApi"; 
import { formatRupiah } from "../utils/formatCurrency";
import PopupProduct from "./popupProduct";
import '../index.css'
import InfoIcon from "@mui/icons-material/Info";



const ProductPage = () => {
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Fungsi untuk fetch data dari API
  const fetchProducts = async () => {
    console.log("Fetching products...");
    try {
      const response = await api.get("/eusvc/Products/seeItemAll/limit/10");
      console.log("Full response:", response);

      const fetchedProducts = response?.data?.data || [];
      console.log("Fetched products:", fetchedProducts);

      setProducts(fetchedProducts);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to fetch products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // useEffect untuk memanggil API saat komponen pertama kali di-mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Jika sedang loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div class="loader"></div>
      </div>
    );
  }

  // Jika terjadi error
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>{error}</p>
      </div>
    );
  }

  // Function to handle arrow click
  const handleArrowClick = product => {
    setSelectedProduct(product);
    setIsPopupOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Background */}
      <div className="relative h-[300px] bg-cover bg-center">
        {/* Breadcrumb */}
        <div className="absolute top-4 left-4 text-white">
          <div className="flex items-center space-x-2 text-sm">
            <span className="hover:text-blue-300 cursor-pointer">Home</span>
            <span>›</span>
            <span className="hover:text-blue-300 cursor-pointer">
              Products & Services
            </span>
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
          {products.length > 0 ? (
            products.map(product => (
              <div
                key={product.id}
                className="card group bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
                onClick={() => handleArrowClick(product)} // Trigger popup on click
              >
                <div className="aspect-square flex items-center justify-center mb-4">
                  <img
                    src={
                      product.images && product.images.length > 0
                        ? product.images[0]
                        : "https://via.placeholder.com/150"
                    }
                    alt={product.nama || "Product Image"}
                    className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex items-center text-blue-500 group-hover:text-blue-600">
                  <span className="text-sm">{product.nama || "No Name"}</span>
                  <span
                    className="ml-auto cursor-pointer"
                    onClick={() => handleArrowClick(product)}
                  >
                    <InfoIcon/>
                  </span>
                </div>
                <div className="text-gray-500 text-sm">
                  Price:{" "}
                  {product.harga?.jual_online
                    ? formatRupiah(product.harga.jual_online)
                    : "N/A"}
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-600 text-xs">
                    Unit: {product.satuan || "N/A"}
                  </span>
                  {product.diskon_persen &&
                  parseFloat(product.diskon_persen) > 0 ? (
                    <span className="text-red-500 text-xs font-bold">
                      -{product.diskon_persen}%
                    </span>
                  ) : (
                    <span className="text-gray-400 text-xs">No Discount</span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No products available.
            </p>
          )}
        </div>
      </div>
      <div className="mt-8 text-center">
        <Link
          to="all-products"
          className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          See All Products
        </Link>
      </div>

      {/* Popup for Product Details */}
      {selectedProduct && (
        <PopupProduct
          product={selectedProduct}
          open={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
        />
      )}
    </div>
  );
};

export default ProductPage;
