import { Routes, Route } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent";
import HeroSection from "./components/HeroSection";
import ProductPage from "./components/ProductPage";
import AllProduct from "./pages/AllProduct";

function App() {
  return (
    <>
      <NavbarComponent />
      <Routes>

        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <ProductPage />
            </>
          }
        />

        <Route path="/all-products" element={<AllProduct />} />
      </Routes>
    </>
  );
}

export default App;
