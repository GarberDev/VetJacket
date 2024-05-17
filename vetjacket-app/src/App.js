import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import PatientIntakeForms from "./components/HospitalSide/PatientIntakeFroms/PatientIntakeForms";
import NewClientForms from "./components/HospitalSide/NewClientForms/NewClientForms";
import NewClientOnboardingWizard from "./components/ClientSide/NewClientOnboardingWizard/NewClientOnboardingWizard";
import LinksList from "./components/HospitalSide/LinksLIst/LinksList";

// import RecordsRequests from './components/RecordsRequests';
// import OrderList from './components/OrderList';
// import RecordsReleaseList from './components/RecordsReleaseList';
// import LinksList from './components/LinksList';
// import Settings from './components/Settings';

function App() {
  return (
    <Router>
      <Routes>
        {/* publice routes */}
        <Route
          path="/new-client-onboarding/:uuid"
          element={<NewClientOnboardingWizard />}
        />

        {/* login routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate replace to="/login" />} />

        <Route path="/dashboard" element={<Dashboard />}>
          {/* Nesting routes under Dashboard */}
          <Route path="patient-intake-forms" element={<PatientIntakeForms />} />
          <Route path="new-client-forms" element={<NewClientForms />} />
          {/* <Route path="records-requests" element={<RecordsRequests />} />
          <Route path="orderlist" element={<OrderList />} />
          <Route path="records-release-list" element={<RecordsReleaseList />} />
          <Route path="settings" element={<Settings />} /> */}
          <Route path="links-list" element={<LinksList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
