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
import DistTopups from "./../src/components/DistTopups";
import NotFoundPage from "./pages/notFount";
import TellersId from "./pages/tellerSummaryPage";
/* import DistSummaryPage from "./pages/distSummaryPage"; */
import Login from "./pages/login";
import DistLists from "./pages/distributorList";
import Subscriber from "./pages/subscriberOutlet";
import SubscriberList from "./pages/subscriberLists";
import FormSub from "./pages/new_subscriber_form";
import TellerLists from "./pages/tellerLists";
import RequestLists from "./pages/distRequests";
import RequestSummary from "./pages/requestSummary";
import PendingLists from "./pages/pendingReqList";
import SubsForm from "./pages/subscriberOutlet";
import ProtectedRoutes from "./utils/privateRoute";
import TellerTopup from "./pages/tellerTopupReq";

const App = () => {
  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/dist_dashboard" element={<NewDash />} />
            <Route path="/distributors/*" element={<Outlet />}>
              <Route index element={<DistLists />} />
              <Route
                path="topup/bydist/:distributorId"
                element={<RequestSummary />}
              />
            </Route>

            <Route path="/subscribers" element={<Subscriber />}>
              <Route index element={<SubsForm />} />
              <Route path="subscriber" element={<SubscriberList />} />
              <Route path="new_subs" element={<FormSub />} />
            </Route>
            <Route path="/teller_topup" element={<TellerTopup />} />
            <Route path="/teller_list" element={<TellerLists />} />

            <Route path="/request_list/*" element={<Outlet />}>
              <Route index element={<RequestLists />} />
            </Route>
            <Route path="/pending_request_list" element={<PendingLists />} />
            <Route path="/teller_dashboard" element={<TellerDash />} />
            <Route path="/teller_listo" element={<TellerList />} />
            <Route path="/teller_topups" element={<TellerTopups />} />
            <Route path="/dist_topups" element={<DistTopups />} />
            <Route path="/login" element={<RegisterPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/distributor/*" element={<Outlet />}>
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
