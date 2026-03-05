export default function MaintLogin({ setPage }) {
  return (
    <div className="login-box">
      <h2>MAINTENANCE <span className="mustard">Login</span></h2>
      <input type="text" placeholder="Worker ID" />
      <input type="password" placeholder="Password" />
<button className="btn-main" onClick={() => setPage("dash")}>SIGN IN</button>
      <p onClick={() => setPage("home")} style={{marginTop: '20px', color: '#bbb', cursor: 'pointer'}}>← Go Back</p>
    </div>
  );
}