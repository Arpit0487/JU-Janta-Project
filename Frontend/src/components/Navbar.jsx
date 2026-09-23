import { Link } from "react-router-dom";
import authAPI from "../api/authAPI";
import useCurrentUser from "../hooks/useCurrentUser";
import "./Navbar.css";

function Navbar() {
  const { user, loading } = useCurrentUser();
  const handleLogout = async () => {
    try {
      await authAPI.post("/logout");

      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return null;
  }

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        JU Janta
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>

        {user?.role === "student" && (
          <>
            <Link to="/mentors">Mentors</Link>

            <Link to="/my-questions">My Questions</Link>
          </>
        )}

        {user?.role === "mentor" && (
          <>
            <Link to="/UpdateProfile">Edit Profile</Link>

            <Link to="/received-questions">Received Questions</Link>
          </>
        )}

        {!user ? (
          <>
            <Link to="/login">Login</Link>

            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <span className="username">{user.username}</span>

            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
