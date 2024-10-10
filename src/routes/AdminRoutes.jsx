// src/routes/AdminRoutes.jsx

import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import UserStoreOverview from "../pages/admin/UserStoreOverview"; // Ensure this path is correct
import RevenueManagement from "../pages/admin/RevenueManagement";
import SecurityCompliance from "../pages/admin/SecurityCompliance";
import DisputeResolution from "../pages/admin/DisputeResolution";
import PlatformMetrics from "../pages/admin/PlatformMetrics";
import StoreManagement from "../pages/admin/StoreManagement"; // Import the new StoreManagement component

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin-dashboard" element={<AdminDashboard />}>
        <Route index element={<UserStoreOverview />} />{" "}
        {/* Default route for /admin */}
        <Route path="user-store-overview" element={<UserStoreOverview />} />
        <Route path="revenue-management" element={<RevenueManagement />} />
        <Route path="security-compliance" element={<SecurityCompliance />} />
        <Route path="dispute-resolution" element={<DisputeResolution />} />
        <Route path="platform-metrics" element={<PlatformMetrics />} />
        <Route path="store-management" element={<StoreManagement />} />{" "}
        {/* Add the new route for Store Management */}
        {/* Add other routes here */}
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
