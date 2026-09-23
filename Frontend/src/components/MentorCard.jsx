import { Link } from "react-router-dom";
import "./MentorCard.css";

function MentorCard({ mentor }) {
  return (
    <div className="mentor-card">

      <h2 className="mentor-name">
        {mentor.username}
      </h2>

      <p className="mentor-academic">
        {mentor.course || "Course Not Added"}
        {mentor.branch && `, ${mentor.branch}`}
        {mentor.year && `, ${mentor.year}`}
      </p>

      <p className="mentor-bio">
        {mentor.bio || "No bio added yet."}
      </p>

      <div className="mentor-rating">
        <strong>Codolio ranking:</strong>{" "}
        {mentor.codolioCollege || "Not Added"}
      </div>

      <Link
        to={`/profile/${mentor._id}`}
        className="view-profile-btn"
      >
        View Profile
      </Link>

    </div>
  );
}

export default MentorCard;