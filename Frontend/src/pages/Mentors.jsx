import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import MentorCard from "../components/MentorCard";
import "./Mentors.css";

function Mentors() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMentors() {
      try {
        const response = await api.get("/mentors");
        setMentors(response.data.mentors);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchMentors();
  }, []);

  return (
    <>
      <Navbar />

      <div className="mentors-page">
        <h1>Mentors</h1>

        {loading ? (
          <h2>Loading...</h2>
        ) : (
          <div className="mentors-grid">
            {mentors.map((mentor) => (
              <MentorCard key={mentor._id} mentor={mentor} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Mentors;
