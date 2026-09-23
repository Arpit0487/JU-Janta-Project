import { Link } from "react-router-dom";
import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3>JU Janta</h3>

        <Link to="/Become-Mentor"
              className="mentor-link"
        >
                Want to be a mentor?
              </Link>

        <p>
          Connecting students with experienced mentors to guide,
          support, and inspire academic and career growth.
        </p>

        <p>
          © {new Date().getFullYear()} JU Janta. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;