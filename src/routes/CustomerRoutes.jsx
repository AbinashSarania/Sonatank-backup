// src/routes/CustomerRoutes.jsx

import { Routes, Route } from "react-router-dom";
import CustomerDashboard from "../pages/customer/CustomerDashboard";
import CustomerHome from "../pages/customer/CustomerHome"; // Import CustomerHome
import MyOrders from "../pages/customer/MyOrders"; // Import MyOrders
import CustomerProfile from "../pages/customer/CustomerProfile";
import Favorites from "../pages/customer/Favorites";
import CustomerSupport from "../pages/customer/CustomerSupport";
import ProductDetails from "../pages/customer/ProductDetails";
import JewelleryTypes from "../pages/customer/JewelleryTypes";
import Cart from "../pages/customer/Cart"; // Import the Cart component

const CustomerRoutes = () => {
  return (
    <>
      {/* CustomerNavbar is rendered on all pages */}

      {/* Main content - Routes */}
      <Routes>
        {/* Customer Dashboard route with nested routes */}
        <Route path="/customer-dashboard" element={<CustomerDashboard />}>
          <Route index element={<MyOrders />} />{" "}
          {/* Default route for /customer-dashboard */}
          <Route path="my-orders" element={<MyOrders />} />
          <Route path="customer-profile" element={<CustomerProfile />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="customer-support" element={<CustomerSupport />} />
          <Route path="cart" element={<Cart />} /> {/* Added route for Cart */}
        </Route>
        {/* You can also add a separate route for customer home if needed */}
        <Route path="/customer-home" element={<CustomerHome />} />
        <Route path="/product-details" element={<ProductDetails />} />
        <Route path="/jewellery-types" element={<JewelleryTypes />} />
      </Routes>
    </>
  );
};

export default CustomerRoutes;
