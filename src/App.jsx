import React from "react";
import GoalSetter from "./components/GoalSetter";
import SiteTracker from "./components/SiteTracker";
import Dashboard from "./components/Dashboard";

const App = () => (
  <div style={{ padding: "20px" }}>
    <h1>Productivity Tracker</h1>
    <GoalSetter />
    <SiteTracker />
    <Dashboard />
  </div>
);

export default App;

