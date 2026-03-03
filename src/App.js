import React, { useState } from "react";

export default function App() {
  const [page, setPage] = useState("home");
  const [block, setBlock] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");

  return (
    <div className="viewport-wrapper">
      
      {/* 1. HOME SCREEN */}
      {page === "home" && (
        <>
          <h1>Welcome to <span className="mustard">FixMyCampus</span></h1>
          <p className="subtitle">Please select authorization level</p>
          <div className="card-row">
            <button className="tile" onClick={() => setPage("student-login")}>
              <span style={{fontSize: '50px'}}>🎓</span>
              <span style={{fontWeight: '700', marginTop: '15px'}}>Student/Staff</span>
            </button>
            <button className="tile" onClick={() => setPage("maint-login")}>
              <span style={{fontSize: '50px'}}>🛠️</span>
              <span style={{fontWeight: '700', marginTop: '15px'}}>Maintenance</span>
            </button>
            <button className="tile" onClick={() => setPage("admin-login")}>
              <span style={{fontSize: '50px'}}>🔐</span>
              <span style={{fontWeight: '700', marginTop: '15px'}}>Admin Panel</span>
            </button>
          </div>
        </>
      )}

      {/* 2. LOGIN FORMS */}
      {page.includes("login") && (
        <div className="login-box">
          <h2 style={{textTransform: 'uppercase'}}>{page.split('-')[0]} <span className="mustard">Login</span></h2>
          <input type="text" placeholder="Student ID" />
          <input type={page === "student-login" ? "text" : "password"} 
                 placeholder={page === "student-login" ? "Full Name" : "Password"} />
          <button className="btn-main" onClick={() => setPage(page === "student-login" ? "blocks" : "dash")}>SIGN IN</button>
          <p onClick={() => setPage("home")} style={{marginTop: '20px', color: '#bbb', cursor: 'pointer'}}>← Go Back</p>
        </div>
      )}

      {/* 3. BLOCK SELECTION */}
      {page === "blocks" && (
        <>
          <h1>Select <span className="mustard">Block</span></h1>
          <p className="subtitle">Choose a building</p>
          <div className="card-row">
            {["A", "B", "C", "D", "E"].map(b => (
              <button key={b} className="tile" style={{width: '150px', height: '150px'}} onClick={() => {setBlock(b); setPage("rooms");}}>
                <span style={{fontWeight: '700'}}>Block {b}</span>
              </button>
            ))}
          </div>
          <p onClick={() => setPage("home")} style={{marginTop: '30px', color: '#bbb', cursor: 'pointer'}}>Logout</p>
        </>
      )}

      {/* 4. ROOM SELECTION */}
      {page === "rooms" && (
        <>
          <h1>Block {block} <span className="mustard">Rooms</span></h1>
          <p className="subtitle">Pick a room to report</p>
          <div className="card-row">
            {[101, 102, 103, 201, 202, 203, 301, 302, 303].map(r => (
              <button key={r} className="tile" style={{width: '110px', height: '110px'}} 
                      onClick={() => {setSelectedRoom(`${block}${r}`); setPage("report");}}>
                <span style={{fontWeight: '700'}}>{block}{r}</span>
              </button>
            ))}
          </div>
          <p onClick={() => setPage("blocks")} style={{marginTop: '30px', color: '#bbb', cursor: 'pointer'}}>← Back to Blocks</p>
        </>
      )}

      {/* 5. REPORT ISSUE PAGE */}
      {page === "report" && (
        <div className="login-box">
          <div className="room-pill">ROOM {selectedRoom}</div>
          <h2>Report <span className="mustard">Issue</span></h2>
          <select>
            <option>Select Category</option>
            <option>Electrical / Lights</option>
            <option>Plumbing / Leakage</option>
            <option>Air Conditioning</option>
            <option>Furniture / Cleaning</option>
          </select>
          <textarea placeholder="Describe the problem here..." />
          <button className="btn-main" onClick={() => {alert("Reported!"); setPage("home");}}>SUBMIT REPORT</button>
          <p onClick={() => setPage("rooms")} style={{marginTop: '20px', color: '#bbb', cursor: 'pointer'}}>← Cancel</p>
        </div>
      )}
    </div>
  );
}