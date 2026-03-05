import React from "react";

export default function StdLogin({ setPage }) {
  const handleSignIn = () => {
    console.log("Sign In clicked! Setting page to: options");
    setPage("options");
  };

  return (
    <div className="login-box">
      <h2>Student/Staff <span className="mustard">Login</span></h2>
      <input type="text" placeholder="ID" />
      <input type="text" placeholder="Full Name" />
      <button className="btn-main" onClick={handleSignIn}>
        SIGN IN
      </button>
      <p onClick={() => setPage("home")} style={{marginTop: '20px', color: '#bbb', cursor: 'pointer'}}>
        ← Go Back
      </p>
    </div>
  );
}