import React, { useState } from "react";
// 1. All Page Imports
import Landing from "./pages/Landing";
import StdLogin from "./pages/StdLogin";
import MaintLogin from "./pages/MaintLogin";
import AdminLogin from "./pages/AdminLogin";
import OptionMenu from "./pages/OptionMenu"; // <-- New Page
import Block from "./pages/Block";
import Room from "./pages/Room";
import Report from "./pages/Report";
import Dashboard from "./pages/Dashboard";

export default function App() {
  // 2. Global State Management
  const [page, setPage] = useState("home");
  const [block, setBlock] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");

  return (
    <div className="viewport-wrapper">
      
      {/* LANDING PAGE */}
      {page === "home" && <Landing setPage={setPage} />}
      
      {/* LOGIN PAGES */}
      {page === "student-login" && <StdLogin setPage={setPage} />}  
      {page === "maint-login" && <MaintLogin setPage={setPage} />}
      {page === "admin-login" && <AdminLogin setPage={setPage} />}

      {/* NEW: OPTION MENU (Shows after Student Login) */}
      {page === "options" && <OptionMenu setPage={setPage} />}

      {/* COMPLAINT FLOW */}
      {page === "blocks" && <Block setPage={setPage} setBlock={setBlock} />}
      {page === "dash" && <Dashboard setPage={setPage} />}
      
      {page === "rooms" && (
        <Room 
          block={block} 
          setPage={setPage} 
          setSelectedRoom={setSelectedRoom} 
        />
      )}

      {page === "report" && (
        <Report 
          selectedRoom={selectedRoom} 
          setPage={setPage} 
        />
      )}

      {/* PLACEHOLDER FOR STATUS PAGE */}
      {page === "status" && (
        <div className="login-box">
          <h2>Complaint <span className="mustard">Status</span></h2>
          <p style={{color: '#666', margin: '20px 0'}}>You have no pending complaints.</p>
          <button className="btn-main" onClick={() => setPage("options")}>BACK</button>
        </div>
      )}
      
    </div>
  );
}