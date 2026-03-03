import React, { useState } from "react";

export default function App() {
  const [view, setView] = useState("landing");
  const [selectedBlock, setSelectedBlock] = useState("");

  return (
    <div className="main-wrapper">
      {/* 1. LANDING SCREEN */}
      {view === "landing" && (
        <>
          <h1>Welcome to <span className="mustard">FixMyCampus</span></h1>
          <p className="subtitle">Please select authorization level</p>
          <div className="button-grid">
            <button className="tile" onClick={() => setView("student-login")}>
              <span className="tile-icon">🎓</span> Student/Staff
            </button>
            <button className="tile" onClick={() => setView("maint-login")}>
              <span className="tile-icon">🛠️</span> Maintenance
            </button>
            <button className="tile" onClick={() => setView("admin-login")}>
              <span className="tile-icon">🔐</span> Admin Panel
            </button>
          </div>
        </>
      )}

      {/* 2. LOGIN SCREENS */}
      {(view === "student-login" || view === "maint-login") && (
        <div className="login-card">
          <h2>{view === "student-login" ? "Student" : "Maintenance"} <span className="mustard">Login</span></h2>
          <input type="text" placeholder={view === "student-login" ? "Student/Staff ID" : "Worker ID"} />
          <input type={view === "maint-login" ? "password" : "text"} placeholder={view === "maint-login" ? "Password" : "Full Name"} />
          <button className="primary-btn" onClick={() => setView(view === "student-login" ? "blocks" : "maint-dash")}>
            SIGN IN
          </button>
          <div className="back-btn" onClick={() => setView("landing")}>← GO BACK</div>
        </div>
      )}

      {/* 3. BLOCK SELECTION */}
      {view === "blocks" && (
        <>
          <h1>Select <span className="mustard">Block</span></h1>
          <p className="subtitle">Choose your building block</p>
          <div className="button-grid">
            {["A", "B", "C", "D", "E"].map(b => (
              <button key={b} className="tile" style={{width: '140px', height: '140px'}} onClick={() => {setSelectedBlock(b); setView("rooms");}}>
                Block {b}
              </button>
            ))}
          </div>
          <div className="back-btn" onClick={() => setView("landing")}>Logout</div>
        </>
      )}

      {/* 4. ROOM SELECTION */}
      {view === "rooms" && (
        <>
          <h1>Block {selectedBlock} <span className="mustard">Rooms</span></h1>
          <p className="subtitle">Select the specific room number</p>
          <div className="button-grid">
            {[101, 102, 103, 201, 202, 203, 301, 302, 303].map(r => (
              <button key={r} className="tile" style={{width: '100px', height: '100px'}} onClick={() => alert(`Room ${selectedBlock}${r} selected`)}>
                {selectedBlock}{r}
              </button>
            ))}
          </div>
          <div className="back-btn" onClick={() => setView("blocks")}>← BACK TO BLOCKS</div>
        </>
      )}
    </div>
  );
}