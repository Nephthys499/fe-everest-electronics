import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/produkApi"; // Pastikan path ini sesuai lokasi file apiService.js
import { formatRupiah } from "../utils/formatCurrency";
import PopupProduct from "./popupProduct";
import { Button } from "@nextui-org/react";

const ProductPage = () => {
  const [products, setProducts] = useState([]); // State untuk menyimpan data produk
  const [loading, setLoading] = useState(true); // State untuk loading
  const [error, setError] = useState(null); // State untuk error
  const [selectedProduct, setSelectedProduct] = useState(null); // State untuk produk yang dipilih
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
        <p>Loading...</p>
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
  const handleArrowClick = (product) => {
    setSelectedProduct(product);
    setIsPopupOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Background */}
      <div className="relative h-[300px] bg-cover bg-center">
        {/* Breadcrumb */}
        <div className="absolute top-4 left-4 text-blue-500">
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
            products.map((product) => (
              <div
                key={product.id}
                className="group bg-white p-6 rounded-2xl shadow-2xl hover:shadow-md transition-shadow duration-300 cursor-pointer"
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
                    →
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
        <div className="flex justify-center mt-20 ">
          <Button variant="ghost" color="primary" type="button">
            <Link
              to="all-products"
              className="min-w-36 flex items-center justify-center gap-2 text-md p-4"
            >
              See All Products
              <svg
                width="1em"
                height="1em"
                fill="currentColor"
                viewBox="0 0 1024 1024"
              >
                <path d="M400 317.7h73.9V656c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V317.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 163a8 8 0 0 0-12.6 0l-112 141.7c-4.1 5.3-.4 13 6.3 13zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z" />
              </svg>
            </Link>
          </Button>
        </div>
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
