import React from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  // Getting user's name from Redux state
  const userName = useSelector((state) => state.auth.user?.fullname);

  // Get current hour to greet the user accordingly
  const currentHour = new Date().getHours();
  let greeting;

  if (currentHour < 12) {
    greeting = "Good Morning";
  } else if (currentHour < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  return (
      <div className="dashboard-container px-6 py-8">
        <h1 className="text-4xl font-bold">
          {greeting}, {userName ? userName : "Guest"}!
        </h1>
        <p className="text-lg mt-4">Welcome to your Dashboard</p>
        <div className="dashboard-content mt-6">
          <p>Here you can manage your data, view reports, and perform actions.</p>
        </div>
      </div>
  );
};

export default Dashboard;
