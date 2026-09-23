import { useState } from "react";
import { Link } from "react-router-dom";
import authAPI from "../api/authAPI";
import "./Register.css";

function Register() {

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response =
        await authAPI.post("/register", formData);

      alert(response.data.message);

      window.location.href = "/";

    } catch (error) {

      alert(
        error?.response?.data?.message ||
        "Registration Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (
    <div className="register-page">

      <div className="register-card">

        <h2>Register</h2>

        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <label>Username</label>

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />

          </div>

          <div className="form-group">

            <label>Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>

          <div className="form-group">

            <label>Password</label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

          </div>

          <button
            type="submit"
            disabled={loading}
          >
            {
              loading
                ? "Creating Account..."
                : "Register"
            }
          </button>

        </form>

        <p>

          Already have an account?

          <Link to="/login">
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;