// HomeRoutes.jsx
import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/home/LandingPage";
import About from "../pages/home/About";
import Contact from "../pages/home/Contact";
import HomeNavbar from "../pages/home/HomeNavbar";
import HomeFooter from "../pages/home/HomeFooter";
import MetalPrices from "../pages/home/MetalPrices"; // Import your new MetalPrices component

const HomeRoutes = () => {
  return (
    <>
      {/* HomeNavbar is rendered on all pages */}
      <HomeNavbar />

      {/* Main content - Routes */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/metal-prices" element={<MetalPrices />} /> {/* Add new route */}
      </Routes>

      {/* HomeFooter is rendered on all pages */}
      <HomeFooter />
    </>
  );
};

export default HomeRoutes;
