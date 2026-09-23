import { useEffect, useState } from "react";
import authAPI from "../api/authAPI";
import api from "../api/axios";
import "./UpdateProfile.css";

function UpdateProfile() {
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    username: "",
    currentYear: "",
    bio: "",
    course: "",
    branch: "",
    year: "",
    linkedin: "",
    github: "",
    leetcode: "",
    project: "",
    codolioCollege: "",
  });

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await authAPI.get("/me");

        const user = response.data.user;

        setFormData({
          username: user.username || "",
          currentYear: user.currentYear || "",
          bio: user.bio || "",
          course: user.course || "",
          branch: user.branch || "",
          year: user.year || "",
          linkedin: user.linkedin || "",
          github: user.github || "",
          leetcode: user.leetcode || "",
          project: user.project?.join(", ") || "",
          codolioCollege: user.codolioCollege || "",
        });
      } catch (error) {
        console.log(error);
        alert("Failed to load profile");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const payload = {
        ...formData,

        project: formData.project
          .split(",")
          .map((project) => project.trim())
          .filter(Boolean),
      };

      const response = await api.patch(
        "/updateProfile",
        payload
      );

      alert(response.data.message);

      window.location.href = "/mentors";
    } catch (error) {
      console.log(error);

      alert(
        error?.response?.data?.message ||
        "Failed to update profile"
      );
    }
  }

  if (loading) {
    return (
      <div className="update-profile-loading">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="update-profile-container">

      <form
        onSubmit={handleSubmit}
        className="update-profile-form"
      >

        <h1>Edit Mentor Profile</h1>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />

        <input
          type="text"
          name="currentYear"
          placeholder="Current Semester / Year"
          value={formData.currentYear}
          onChange={handleChange}
        />

        <textarea
          name="bio"
          rows="4"
          placeholder="Skills / Achievements / About Yourself"
          value={formData.bio}
          onChange={handleChange}
        />

        <input
          type="text"
          name="course"
          placeholder="Course (B.Tech, M.Tech, MBA...)"
          value={formData.course}
          onChange={handleChange}
        />

        <input
          type="text"
          name="branch"
          placeholder="Branch / Specialization"
          value={formData.branch}
          onChange={handleChange}
        />

        <input
          type="number"
          name="year"
          placeholder="Graduation Year"
          value={formData.year}
          onChange={handleChange}
        />

        <input
          type="text"
          name="linkedin"
          placeholder="LinkedIn Profile URL"
          value={formData.linkedin}
          onChange={handleChange}
        />

        <input
          type="text"
          name="github"
          placeholder="GitHub Profile URL"
          value={formData.github}
          onChange={handleChange}
        />

        <input
          type="text"
          name="leetcode"
          placeholder="LeetCode Profile URL"
          value={formData.leetcode}
          onChange={handleChange}
        />

        <textarea
          name="project"
          rows="3"
          placeholder="Projects (comma separated)"
          value={formData.project}
          onChange={handleChange}
        />

        <input
          type="number"
          name="codolioCollege"
          placeholder="Codolio College Rank"
          value={formData.codolioCollege}
          onChange={handleChange}
        />

        <button type="submit">
          Save Profile
        </button>

      </form>

    </div>
  );
}

export default UpdateProfile;