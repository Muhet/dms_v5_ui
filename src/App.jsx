import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import RegisterPage from "./pages/login";
import Dashboard from "./pages/dashboard";
import NewDash from "./pages/distDashboard";
import TellerDash from "./pages/tellerDashbord";
import TellerList from "./pages/tellerList";
import TellerTopups from "./pages/tellerTopups";
import NotFoundPage from "./pages/notFount";
import TellersId from "./pages/tellerSummaryPage";
import DistSummaryPage from "./pages/distSummaryPage";
import Signin from "./pages/signin";
import ProtectedRoutes from "./utils/privateRoute";
import Manager from "./components/DistManenger";

const App = () => {
  return (
    <div className="bg-neutral-200 w-full h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/distributors" element={<Manager />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/dist_dashboard" element={<NewDash />} />
            <Route path="/teller_dashboard" element={<TellerDash />} />
            <Route path="/teller_list" element={<TellerList />} />
            <Route path="/teller_topups" element={<TellerTopups />} />
            <Route path="/login" element={<RegisterPage />} />{" "}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/distributor" element={<Outlet />}>
              <Route
                path="topup/bydist/:distributorId"
                element={<DistSummaryPage />}
              />
              <Route path="bydist/:distributorId" element={<TellersId />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
