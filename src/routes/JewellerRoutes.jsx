import { Routes, Route } from "react-router-dom";
import JewellerDashboard from "../pages/jeweller/JewellerDashboard";
import JewellerOrders from "../pages/jeweller/JewellerOrders";
import JewellerProfile from "../pages/jeweller/JewellerProfile";
import JewellerCreateProducts from "../pages/jeweller/JewellerCreateProducts"; // Component for creating products
import ProductManagement from "../pages/jeweller/ProductManagement"; // Component for managing products
import JewellerEditProducts from "../pages/jeweller/JewellerEditProducts";

const JewellerRoutes = () => {
  return (
    <Routes>
      <Route path="/jeweller-dashboard" element={<JewellerDashboard />}>
        <Route index element={<JewellerOrders />} />{" "}
        {/* Default route for /jeweller-dashboard */}
        <Route path="jeweller-orders" element={<JewellerOrders />} />
        <Route path="jeweller-profile" element={<JewellerProfile />} />
        <Route
          path="create-product"
          element={<JewellerCreateProducts />}
        />{" "}
        {/* Route for creating products */}
        <Route path="product-management" element={<ProductManagement />} />{" "}
        {/* Route for managing products */}
        <Route path="product-edit" element={<JewellerEditProducts />} />
      </Route>
    </Routes>
  );
};

export default JewellerRoutes;
