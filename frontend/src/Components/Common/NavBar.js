import { Link, useLocation } from "react-router-dom";

function NavBar({ user, isLoggedIn, logOut }){
  const location = useLocation();
  return(
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">Better Bank</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
        {!isLoggedIn ? (
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/CreateAccount" ? "active" : ''}`} aria-current="page" to="/CreateAccount" data-toggle="tooltip" title="Click here to create a new account login.">Create Account</Link>
              </li>) : ( <>
              <li className="nav-item">
                  <Link className={`nav-link ${location.pathname === "/deposit" ? "active" : ''}`} aria-current="page" to="/deposit" data-toggle="tooltip" title="Click here to deposit funds into your account.">Deposit</Link>
              </li>
              <li className="nav-item">
                  <Link className={`nav-link ${location.pathname === "/withdraw" ? "active" : ''}`} aria-current="page" to="/withdraw" data-toggle="tooltip" title="Click here to withdraw funds from your account.">Withdraw</Link>
              </li>
              {user.role === "admin" ? (
                  <li className="nav-item">
                    <Link className={`nav-link ${location.pathname === "/alldata" ? "active" : ''}`} aria-current="page" to="/alldata" data-toggle="tooltip" title="Click here to see the data from all users, Admins only (⌐■_■)">AllData</Link>
                  </li>) : (
                  <></>
              )}
              </>
            )}
          </ul>        
      </div>
      <div class="text-light"> <p className="nav-link px-3 m-0">Hello {user.name}</p></div>
        <div class="nav navbar-nav navbar-right">
          {!isLoggedIn ? (
            <Link className={`btn btn-dark navbar-btn ${location.pathname === "/login" ? "active" : ''}`} aria-current="page" to="/login" data-toggle="tooltip" title="Click here to login to your account.">Login</Link>
          ) : (
            <button type="button" className="btn btn-dark navbar-btn" onClick={() => logOut()}>Log Out</button>)
          }</div>
      </nav>
    </>
  );
}
export default NavBar;