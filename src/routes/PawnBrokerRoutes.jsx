import { Routes, Route } from "react-router-dom";
import PawnBrokerDashboard from "../pages/pawnBroker/PawnBrokerDashboard";
import ManagePawns from "../pages/pawnbroker/ManagePawns";

const PawnBrokerRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PawnBrokerDashboard />} />
      <Route path="/manage-pawns" element={<ManagePawns />} />
    </Routes>
  );
};

export default PawnBrokerRoutes;
