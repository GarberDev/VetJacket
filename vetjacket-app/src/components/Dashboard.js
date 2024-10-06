import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./Dashboard.css"; // Ensure you have styles for the sidebar

class Dashboard extends React.Component {
  render() {
    return (
      <div className="dashboard">
        <div className="sidebar">
          <Link to="patient-intake-forms">Patient Intake Forms</Link>
          <Link to="new-client-forms">New Client Forms</Link>
          <hr></hr>
          {/* <Link to="records-requests">Records Requests</Link> */}
          <hr></hr>
          {/* <Link to="order-list">Order List ++</Link> */}
          {/* <Link to="records-release-list">Records Release Approval</Link> */}
          {/* <Link to="doctor-callback-list">Doctor Callback List</Link> */}
          <hr></hr>
          <Link to="links-list">Links List</Link>
          {/* <Link to="settings">Settings</Link> */}
        </div>
        <div className="content">
          <Outlet />{" "}
          {/* This is where the nested route components will be rendered */}
        </div>
      </div>
    );
  }
}

export default Dashboard;
