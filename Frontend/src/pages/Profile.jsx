import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Loading from "../components/Loading";

import api from "../api/axios";

import "./Profile.css";

function Profile() {
  const { id } = useParams();

  const [user, setUser] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await api.get(`/u/${id}`);
        setUser(response.data.user);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [id]);

  async function handleQuestionSubmit(e) {
    e.preventDefault();

    try {
      setSubmitting(true);

      const response = await api.post("/questions", {
        title,
        description,
        mentor: user._id,
      });

      alert(response.data.message);

      setTitle("");
      setDescription("");
    } catch (error) {
      alert(
        error?.response?.data?.message ||
        "Failed to send question"
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />

      <div className="profile-page">

        <div className="profile-header">

          <h1>{user.username}</h1>

          <h3>
            {user.role.toUpperCase()}
          </h3>

          <p className="profile-course">
            {user.course || "Course Not Added"}
            {user.branch && ` • ${user.branch}`}
            {user.currentYear && ` • ${user.currentYear}`}
          </p>

          <p className="profile-bio">
            {user.bio || "No bio added yet."}
          </p>

        </div>

        <div className="profile-grid">

          <div className="profile-card">

            <h2>Academic Information</h2>

            <p>
              <strong>Course:</strong>{" "}
              {user.course || "Not Added"}
            </p>

            <p>
              <strong>Branch:</strong>{" "}
              {user.branch || "Not Added"}
            </p>

            <p>
              <strong>Current Year:</strong>{" "}
              {user.currentYear || "Not Added"}
            </p>

            <p>
              <strong>Graduation Year:</strong>{" "}
              {user.year || "Not Added"}
            </p>

            <p>
              <strong>Role:</strong>{" "}
              {user.role}
            </p>

          </div>

          <div className="profile-card">

            <h2>Profiles</h2>

            <p>
              <strong>LinkedIn:</strong>{" "}
              {
                user.linkedin ? (
                  <a
                    href={user.linkedin}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open LinkedIn
                  </a>
                ) : (
                  "Not Added"
                )
              }
            </p>

            <p>
              <strong>GitHub:</strong>{" "}
              {
                user.github ? (
                  <a
                    href={user.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open GitHub
                  </a>
                ) : (
                  "Not Added"
                )
              }
            </p>

            <p>
              <strong>LeetCode:</strong>{" "}
              {
                user.leetcode ? (
                  <a
                    href={user.leetcode}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open LeetCode
                  </a>
                ) : (
                  "Not Added"
                )
              }
            </p>

          </div>

          <div className="profile-card">

            <h2>Achievements</h2>

            <p>
              <strong>Codolio College Rank:</strong>{" "}
              {user.codolioCollege || "Not Added"}
            </p>

          </div>

          <div className="profile-card">

            <h2>Projects</h2>

            {
              user.project?.length > 0 ? (
                <ul className="project-list">

                  {
                    user.project.map((project, index) => (
                      <li key={index}>
                        {project}
                      </li>
                    ))
                  }

                </ul>
              ) : (
                <p>No Projects Added</p>
              )
            }

          </div>

        </div>

        {
          user.role === "mentor" && (
            <div className="ask-question-card">

              <h2>Ask a Question</h2>

              <form onSubmit={handleQuestionSubmit}>

                <input
                  type="text"
                  placeholder="Question Title"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  required
                />

                <textarea
                  placeholder="Describe your doubt"
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  required
                />

                <button
                  type="submit"
                  disabled={submitting}
                >
                  {
                    submitting
                      ? "Sending..."
                      : "Ask Question"
                  }
                </button>

              </form>

            </div>
          )
        }

      </div>
    </>
  );
}

export default Profile;