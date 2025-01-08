import { useEffect, useState } from "react";
import api from "../api/produkApi";
import { formatRupiah } from "../utils/formatCurrency";
import PopupProduct from "../components/popupProduct";
import SearchIcon from "@mui/icons-material/Search";
const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Function to fetch data from API
  const fetchProducts = async (search = "") => {
    console.log("Fetching products...");
    try {
      const response = await api.get(
        `/eusvc/Products/seeItemAll/search/${search}`
      );
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

  // useEffect to call API when the component mounts or when the search term changes
  useEffect(() => {
    fetchProducts();
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // If loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  // If there is an error
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>{error}</p>
      </div>
    );
  }

  // Function to handle product click
  const handleArrowClick = (product) => {
    setSelectedProduct(product);
    setIsPopupOpen(true);
  };

  //top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-[300px] bg-cover bg-center">
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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">All Products</h2>
          <div className="flex items-center border rounded-lg w-fit">
            <SearchIcon className=" m-2 w-full text-gray-500" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 outline-none"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                className="group bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
                onClick={() => handleArrowClick(product)}
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
      </div>

      {/* Popup for Product Details */}
      {selectedProduct && (
        <PopupProduct
          product={selectedProduct}
          open={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
        />
      )}

      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="flex justify-center items-center gap-2 fixed bottom-8 right-8 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 z-50"
          aria-label="Back to top"
        >
          <span className="text-2xl">↑</span>
          Kembali ke atas
        </button>
      )}
    </div>
  );
};

export default AllProduct;
