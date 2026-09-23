import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";
import StatusBadge from "../components/StatusBadge";

import api from "../api/axios";

import "./MyQuestions.css";

function MyQuestions() {

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function fetchQuestions() {

      try {

        const response =
          await api.get("/questions/student");

        setQuestions(response.data.messages);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    }

    fetchQuestions();

  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />

      <div className="my-questions-page">

        <h1>My Questions</h1>

        {
          questions.length === 0
          ?
          (
            <EmptyState
              title="No Questions Yet"
              description="Ask your first question to a mentor."
            />
          )
          :
          (
            <div className="questions-list">

              {
                questions.map((question) => (

                  <div
                    key={question._id}
                    className="question-card"
                  >

                    <h2>
                      {question.title}
                    </h2>

                    <p className="question-description">
                      {question.description}
                    </p>

                    <div className="question-info">

                      <p>
                        Mentor:
                        {" "}
                        <strong>
                          {
                            question.mentor?.username
                          }
                        </strong>
                      </p>

                      <StatusBadge
                        status={question.status}
                      />

                    </div>

                    <Link
                      to={`/question/${question._id}`}
                      className="discussion-btn"
                    >
                      Open Discussion
                    </Link>

                  </div>

                ))
              }

            </div>
          )
        }

      </div>
    </>
  );
}

export default MyQuestions;