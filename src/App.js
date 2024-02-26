import React from "react";
import { useSelector } from "react-redux";
import Sidebar from "./components/SideBar";
import { Route, Routes } from "react-router-dom";
import LoginRegister from "./Pages/LoginRegister";
import Dashboard from "./Pages/Dashboard";
import Analytics from "./Pages/Analytics";
import Invoice from "./Pages/Invoice";
import NewAccount from "./Pages/NewAccount";
// import ShowNav from "./Pages/ShowNav";
import NewInvoice from "./Pages/Invoice/NewInvoice";
import Schedule from "./Pages/Schedule";
import ScheduleList from "./Pages/Schedule/ScheduleList";
import Setting from "./Pages/Setting";
import ScheduleStatus from "./Pages/Schedule/ScheduleStatus";
import Calendar from "./Pages/Calendar";
export default function App() {
  const { token } = useSelector((state) => state.auth);
  return (
    <>
      {/* <ShowNav>
        <Sidebar />
      </ShowNav> */}

      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/new-account" element={<NewAccount />} />
        <Route path="/invoice/new-invoice" element={<NewInvoice />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/schedule/list" element={<ScheduleList />} />
        <Route path="/schedule/status" element={<ScheduleStatus />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/calender" element={<Calendar />} />

        <Route path="/login-register" element={<LoginRegister />} />
      </Routes>
    </>
  );
}
