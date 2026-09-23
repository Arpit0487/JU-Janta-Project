import { useState } from "react";
import axios from "axios";
import './MentorApplication.css';

function MentorApplication() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    year: "",
    course: "",
    branch: "",
    cgpa: "",
    github: "",
    linkedIn: "",
    graduation: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://ju-janta-backend.onrender.com/api/user/newMentor",
        formData,
        { withCredentials: true }
      );

      alert(res.data.message);
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("Application failed");
    }
  };

  return (
    <div className="mentor-form-container">
      <form onSubmit={handleSubmit}>
        <h1>Mentor Application</h1>

        <input name="name" placeholder="Name" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="contact" placeholder="Contact no." onChange={handleChange} />
        <input name="year" placeholder="Current semester" onChange={handleChange} />
        <input name="course" placeholder="Course Specalization (if any)" onChange={handleChange} />
        <input name="branch" placeholder="Branch" onChange={handleChange} />
        <input name="cgpa" placeholder="CGPA" onChange={handleChange} />
        <input name="github" placeholder="GitHub Link" onChange={handleChange} />
        <input name="linkedIn" placeholder="LinkedIn Link" onChange={handleChange} />
        <input name="graduation" placeholder="Graduation Year" onChange={handleChange} />

        <button type="submit">
          Submit Application
        </button>
      </form>
    </div>
  );
}

export default MentorApplication;