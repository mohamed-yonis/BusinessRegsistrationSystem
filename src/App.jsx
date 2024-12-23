import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./PrivateRoute";
import AddUser from "./pages/AddUser";
import TotalUsers from "./pages/TotalUsers";
import CityManager from "./pages/CityManager";
import UserManager from "./pages/UserManager";
import BusinessTypeManager from "./pages/BusinessTypeManager";
import OwnerManager from "./pages/OwnerManager";
import BusinessRegistrationManager from "./pages/BusinessRegistrationManager";
import Sidebar from "./components/Sidebar";
import Approved from "./components/Aproved";
import Rejected from "./components/Rejected";
import BusinessByCityChart from "./components/BusinessByCityChart";
import ManageMinistry from "./components/ManageMinistry";
import MenuLayout from "./layout/MenuLayout";
import ManagePayment from "./components/ManagePayment";

const App = () => {
  return (
    // <div className="flex h-screen">
    //   <Sidebar />
    //   <div className="flex-grow flex flex-col">
    //     <Routes>
    //       <Route path="/" element={<PrivateRoute Component={Dashboard} />} />
    //       <Route path="/city" element={<CityManager />} />
    //       <Route path="/users" element={<AddUser />} />
    //       <Route path="/total" element={<TotalUsers />} />
    //       <Route path="/manageusers" element={<UserManager />} />
    //       <Route path="/managebusinestype" element={<BusinessTypeManager />} />
    //       <Route path="/manageowner" element={<OwnerManager />} />
    //       <Route path="/managebusiness" element={<BusinessRegistrationManager />} />
    //       <Route path="/aproved" element={<Approved />} />
    //       <Route path="/rejected" element={<Rejected />} />
    //       <Route path="/chart" element={<BusinessByCityChart />} />
    //       <Route path="/ministry" element={<ManageMinistry />} />
    //       <Route path="/login" element={<Login />} />
    //     </Routes>
    //   </div>
    // </div>

    <Routes>
      <Route path="" element={<MenuLayout />}>
        <Route path="/" element={<PrivateRoute Component={Dashboard} />} />
        <Route path="/city" element={<CityManager />} />
        <Route path="/users" element={<AddUser />} />
        <Route path="/total" element={<TotalUsers />} />
        <Route path="/manageusers" element={<UserManager />} />
        <Route path="/managebusinestype" element={<BusinessTypeManager />} />
        <Route path="/manageowner" element={<OwnerManager />} />
        <Route
          path="/managebusiness"
          element={<BusinessRegistrationManager />}
        />
        <Route path="/payment" element={<ManagePayment />} />

        <Route path="/aproved" element={<Approved />} />
        <Route path="/rejected" element={<Rejected />} />
        <Route path="/chart" element={<BusinessByCityChart />} />
        <Route path="/ministry" element={<ManageMinistry />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
