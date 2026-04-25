import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">Students</div>

      <div className="links">
        <Link to="/dashboard">Dashboard</Link>

        {token && <Link to="/profile">Profile</Link>}

        {!token ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="logoutBtn">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
