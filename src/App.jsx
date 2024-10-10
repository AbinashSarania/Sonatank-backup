import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import HomeRoutes from "./routes/HomeRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import CustomerRoutes from "./routes/CustomerRoutes";
import JewellerRoutes from "./routes/JewellerRoutes";
import PawnBrokerRoutes from "./routes/PawnBrokerRoutes";
import AuthRoutes from "./routes/AuthRoutes"; // Import the AuthRoutes

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Home routes */}
          <Route path="/*" element={<HomeRoutes />} />

          {/* Authentication routes */}
          <Route path="/auth/*" element={<AuthRoutes />} />

          {/* Admin routes */}
          <Route path="/admin/*" element={<AdminRoutes />} />

          {/* Customer routes */}
          <Route path="/customer/*" element={<CustomerRoutes />} />

          {/* Jeweller routes */}
          <Route path="/jeweller/*" element={<JewellerRoutes />} />

          {/* Pawn Broker routes */}
          <Route path="/pawnbroker/*" element={<PawnBrokerRoutes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
