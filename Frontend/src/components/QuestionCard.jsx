import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";
import "./QuestionCard.css";

function QuestionCard({ question }) {

  return (
    <div className="question-card">

      <h2>
        {question.title}
      </h2>

      <p className="question-description">
        {question.description}
      </p>

      <div className="question-meta">

        {
          question.mentor &&
          (
            <p>
              Mentor:
              {" "}
              <strong>
                {question.mentor.username}
              </strong>
            </p>
          )
        }

        {
          question.student &&
          (
            <p>
              Student:
              {" "}
              <strong>
                {question.student.username}
              </strong>
            </p>
          )
        }

        <StatusBadge
          status={question.status}
        />

      </div>

      <Link
        to={`/question/${question._id}`}
        className="question-btn"
      >
        Open Discussion
      </Link>

    </div>
  );
}

export default QuestionCard;