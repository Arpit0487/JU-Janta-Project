import { useNavigate } from "react-router-dom";
import "./BecomeMentor.css";

function BecomeMentor() {

  const navigate = useNavigate();

  return (
    <div className="mentor-page">

      <div className="mentor-card">
        <h1>Become a Mentor</h1>

        <p>
          Share your knowledge and help fellow students navigate
          academics, projects, internships, placements, and career
          opportunities.
        </p>

        <h3>Why Become a Mentor?</h3>

        <ul>
          <li>Help juniors grow and succeed.</li>
          <li>Develop leadership and communication skills.</li>
          <li>Build your professional profile.</li>
          <li>Create a positive impact in the JU community.</li>
        </ul>

        <h3>Requirements</h3>

        <ul>
          <li>Strong academic or technical background.</li>
          <li>Willingness to guide students.</li>
          <li>Good communication skills.</li>
          <li>Commitment to respond responsibly.</li>
        </ul>

        <button 
          className="apply-btn" 
          onClick={() => navigate("/mentor-application")}
        >
          Apply as Mentor
        </button>

      </div>

    </div>
  );
}

export default BecomeMentor;