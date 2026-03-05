import React, { useState } from "react";

export default function Dashboard({ setPage }) {
  const [activeIssue, setActiveIssue] = useState(null);
  const [filters, setFilters] = useState({ block: "", type: "", search: "" });

  const [complaints, setComplaints] = useState([
    { id: 1, user: "John Doe", block: "A", room: "101", type: "Electrical", status: "PENDING", expense: "500", description: "Ceiling fan making loud grinding noise." },
    { id: 2, user: "Jane Smith", block: "C", room: "302", type: "Plumbing", status: "ONGOING", expense: "450", description: "Water leakage from the flush tank." },
    { id: 3, user: "Alex Reed", block: "B", room: "201", type: "Furniture", status: "COMPLETED", expense: "120", description: "Wooden chair has a broken leg." },
    { id: 4, user: "Sita Ram", block: "A", room: "105", type: "Electrical", status: "PENDING", expense: "100", description: "Light bulb flickering." },
  ]);

  const [stocks] = useState([
    { id: 1, item: "Ceiling Fan", qty: 12, location: "Warehouse A" },
    { id: 2, item: "LED Bulb 12W", qty: 45, location: "Main Office" },
  ]);

  const filteredComplaints = complaints.filter(item => {
    return (
      (filters.block === "" || item.block === filters.block) &&
      (filters.type === "" || item.type === filters.type) &&
      (item.room.includes(filters.search) || item.user.toLowerCase().includes(filters.search.toLowerCase()))
    );
  });

  const handleStatusChange = (id, newStatus) => {
    setComplaints(complaints.map(c => c.id === id ? { ...c, status: newStatus } : c));
  };

  const getStatusStyle = (status) => {
    let bg = "#dc3545"; 
    if (status === "COMPLETED") bg = "#28a745"; 
    if (status === "ONGOING") bg = "#ffc107"; 
    return {
      backgroundColor: bg,
      color: status === "ONGOING" ? "#000" : "#fff",
      border: 'none',
      borderRadius: '8px',
      padding: '12px 0',
      fontSize: '12px',
      fontWeight: '900',
      width: '160px',
      textAlign: 'center',
      cursor: 'pointer',
      display: 'block',
      margin: '0 auto',
      appearance: 'none'
    };
  };

  return (
    <div style={pageBackground}>
      <div style={mainContentWrapper}>
        
        {/* TOP HEADER */}
        <div style={topHeader}>
          <h1 style={titleStyle}>Maintenance <span className="mustard">Database</span></h1>
          <div style={actionArea}>
            <input type="text" placeholder="Search Room..." style={smallSearch} onChange={(e) => setFilters({...filters, search: e.target.value})} />
            <select style={smallSelect} onChange={(e) => setFilters({...filters, block: e.target.value})}>
              <option value="">Block</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
            <select style={smallSelect} onChange={(e) => setFilters({...filters, type: e.target.value})}>
              <option value="">Type</option>
              <option value="Electrical">Electrical</option>
              <option value="Plumbing">Plumbing</option>
              <option value="Furniture">Furniture</option>
            </select>
            <button className="btn-main" style={logoutBtn} onClick={() => setPage("home")}>Logout</button>
          </div>
        </div>

        {/* COMPLAINTS TABLE */}
        <div style={tableWrapper}>
          <table style={formalTable}>
            <thead style={headerContainer}>
              <tr>
                <th style={{...thStyle, borderTopLeftRadius: '15px'}}>Raised By</th>
                <th style={thStyle}>Block</th>
                <th style={thStyle}>Room</th>
                <th style={thStyle}>Type</th>
                <th style={{...thStyle, textAlign: 'center'}}>Issue</th>
                <th style={{...thStyle, textAlign: 'center'}}>Status</th>
                <th style={{...thStyle, textAlign: 'center'}}>Expense ($)</th>
                <th style={{...thStyle, textAlign: 'center', borderTopRightRadius: '15px'}}>Bill</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.map((item) => (
                <tr key={item.id} style={trStyle}>
                  <td style={tdStyle}>{item.user}</td>
                  <td style={tdStyle}>{item.block}</td>
                  <td style={tdStyle}>{item.room}</td>
                  <td style={tdStyle}>{item.type}</td>
                  <td style={{...tdStyle, textAlign: 'center'}}>
                    <button onClick={() => setActiveIssue(item.description)} style={issueBtn}>👁️ View</button>
                  </td>
                  <td style={{...tdStyle, textAlign: 'center'}}>
                    <select value={item.status} onChange={(e) => handleStatusChange(item.id, e.target.value)} style={getStatusStyle(item.status)}>
                      <option value="PENDING">PENDING</option>
                      <option value="ONGOING">ONGOING</option>
                      <option value="COMPLETED">COMPLETED</option>
                    </select>
                  </td>
                  <td style={{...tdStyle, textAlign: 'center'}}><input type="number" defaultValue={item.expense} style={cleanInput} /></td>
                  <td style={{...tdStyle, textAlign: 'center'}}><span style={iconLink}>📁</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* STOCK INVENTORY HEADER */}
        <div style={{...topHeader, marginTop: '80px', marginBottom: '30px'}}> 
          <h1 style={titleStyle}>Stock <span className="mustard">Inventory</span></h1>
        </div>
        <div style={tableWrapper}>
          <table style={formalTable}>
            <thead style={headerContainer}>
              <tr>
                <th style={{...thStyle, borderTopLeftRadius: '15px'}}>Item Name</th>
                <th style={thStyle}>Quantity</th>
                <th style={thStyle}>Storage Location</th>
                <th style={{...thStyle, textAlign: 'center', borderTopRightRadius: '15px'}}>Attachment</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock) => (
                <tr key={stock.id} style={trStyle}>
                  <td style={tdStyle}>{stock.item}</td>
                  <td style={tdStyle}><input type="number" defaultValue={stock.qty} style={cleanInput} /></td>
                  <td style={tdStyle}>{stock.location}</td>
                  <td style={{...tdStyle, textAlign: 'center'}}><span style={iconLink}>📎</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MODAL */}
        {activeIssue && (
          <div style={modalOverlay} onClick={() => setActiveIssue(null)}>
            <div style={modalContent} onClick={e => e.stopPropagation()}>
              <h3 style={{marginTop: 0, color: '#E1AD01'}}>Detailed Description</h3>
              <p style={{lineHeight: '1.8', color: '#333', fontSize: '16px'}}>{activeIssue}</p>
              <button className="btn-main" style={{marginTop: '30px', width: '130px'}} onClick={() => setActiveIssue(null)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// --- Formal Spacing Styles ---
const pageBackground = { backgroundColor: "#FDFBF3", minHeight: "100vh", padding: "50px 0", display: "flex", justifyContent: "center" };
const mainContentWrapper = { width: "98%", maxWidth: "none" }; 
const topHeader = { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px", padding: "0 10px" };
const actionArea = { display: "flex", gap: "15px", alignItems: "center" }; 
const titleStyle = { fontSize: "32px", fontWeight: "900", color: "#333", margin: 0, textTransform: "uppercase", letterSpacing: "2px" };
const logoutBtn = { width: "130px", padding: "14px", fontSize: "14px", borderRadius: "10px", border: 'none', cursor: 'pointer', fontWeight: '800' };
const smallSearch = { padding: "14px 20px", borderRadius: "12px", border: "1px solid #ddd", fontSize: "15px", width: "250px", outline: "none" };
const smallSelect = { padding: "14px", borderRadius: "12px", border: "1px solid #ddd", fontSize: "15px", cursor: "pointer", backgroundColor: "#fff", minWidth: "120px" };

const tableWrapper = { width: "100%" };
const formalTable = { width: "100%", borderCollapse: "separate", borderSpacing: "0" }; // Separate allows radius to show

// RESTORED SHADOW AND ELEVATION
const headerContainer = { 
  backgroundColor: "#E1AD01",
  boxShadow: "0 10px 30px rgba(225, 173, 1, 0.3)", // Heavy mustard shadow
};

// RESTORED RADII
const thStyle = { 
  padding: "25px 45px", 
  textAlign: "left", 
  fontSize: "14px", 
  fontWeight: "900", 
  color: "#fff", 
  textTransform: "uppercase",
  backgroundColor: "#E1AD01" // Ensures color covers the radius area
};

const trStyle = { borderBottom: "1px solid #e8e8e8" };
const tdStyle = { padding: "22px 45px", fontSize: "17px", color: "#222", fontWeight: "600", borderBottom: "1px solid #eee" };
const cleanInput = { border: "1px solid #ccc", borderRadius: "8px", padding: "10px", width: "100px", fontSize: "16px", outline: "none", textAlign: 'center' };
const iconLink = { cursor: 'pointer', opacity: 0.9, fontSize: '24px' };
const issueBtn = { background: '#fff', border: '1px solid #bbb', borderRadius: '10px', padding: '10px 20px', fontSize: '13px', cursor: 'pointer', fontWeight: '800' };

const modalOverlay = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000 };
const modalContent = { backgroundColor: 'white', padding: '50px', borderRadius: '30px', width: '550px', textAlign: 'center' };