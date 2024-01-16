import React from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  const handleChangeInfo = () => {
  
    console.log("Change Info button clicked");
  };

  return (
    <div className="container" style={{ textAlign: "center", paddingTop: "20vh" }}>
      <img
        src="public\healthcareab 3.png" 
        alt="Description of the image"
        style={{ width: "40%", height: "auto", marginBottom: "80px" }}  
      />
      <h3>
        Welcome to <strong>{currentUser.username}</strong> Profile
      </h3>
      <p>
        <strong>Username:</strong> {currentUser.username}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <button 
        onClick={handleChangeInfo} 
        style={{ backgroundColor: "#259ec8", color: "white", padding: "10px 20px", borderRadius: "5px", cursor: "pointer" }}
      >
        Change Info
      </button>
    </div>
  );
};

export default Profile;