import React from "react";

export default function Report({ selectedRoom, setPage }) {
  const handleSubmit = () => {
    alert("Reported successfully!");
    setPage("home");
  };

  return (
    <div className="login-box">
      <div className="room-pill">ROOM {selectedRoom}</div>
      <h2>
        Report <span className="mustard">Issue</span>
      </h2>
      <select>
        <option>Select Category</option>
        <option>Electrical / Lights</option>
        <option>Plumbing / Leakage</option>
        <option>Air Conditioning</option>
        <option>Furniture / Cleaning</option>
      </select>
      <textarea placeholder="Describe the problem here..." />
      <button className="btn-main" onClick={handleSubmit}>
        SUBMIT REPORT
      </button>
      <p
        onClick={() => setPage("rooms")}
        style={{ marginTop: "20px", color: "#bbb", cursor: "pointer" }}
      >
        ← Cancel
      </p>
    </div>
  );
}