export default function AdminLogin({ setPage }) {
  return (
    <div className="login-box">
      <h2>ADMIN <span className="mustard">Login</span></h2>
      <input type="text" placeholder="Admin ID" />
      <input type="password" placeholder="Password" />
<button className="btn-main" onClick={() => setPage("dash")}>SIGN IN</button>
      <p onClick={() => setPage("home")} style={{marginTop: '20px', color: '#bbb', cursor: 'pointer'}}>← Go Back</p>
    </div>
  );
}