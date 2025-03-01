import React from "react";
import AHeader from "../../Components/AHeader/AHeader"; // Importing AHeader component
import AFooter from "../../Components/AFooter/AFooter";
const AHome = () => {
  // Function to handle sign out
  const handleSignOut = () => {
    alert("Signing out...");
    // Add your sign-out logic here (e.g., clear session, redirect, etc.)
  };

  return (
    <div>
      {/* Calling AHeader and passing the sign-out function */}
      <AHeader onSignOut={handleSignOut} />

      <main style={{ padding: "20px" }}>
        <h2>Welcome to HostelAssist</h2>
        <p>This is the home page content.</p>
      </main>

      <AFooter/>
    </div>
  );
};

export default AHome;
