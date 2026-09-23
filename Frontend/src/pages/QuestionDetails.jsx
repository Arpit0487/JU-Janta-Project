import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";
import StatusBadge from "../components/StatusBadge";

import useCurrentUser from "../hooks/useCurrentUser";

import api from "../api/axios";

import "./QuestionDetails.css";

function QuestionDetails() {

  const { questionId } = useParams();

  const { user: currentUser } = useCurrentUser();

  const [question, setQuestion] = useState(null);
  const [replies, setReplies] = useState([]);

  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(true);

  async function fetchData() {

    try {

      const questionResponse =
        await api.get(`/questions/${questionId}`);

      setQuestion(questionResponse.data.populatedQuestion);

      const repliesResponse =
        await api.get(`/question/${questionId}/replies`);

      setReplies(repliesResponse.data.replies);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    fetchData();

  }, [questionId]);

  async function handleReply(e) {

    e.preventDefault();

    try {

      await api.post(
        `/question/${questionId}/reply`,
        {
          content,
        }
      );

      setContent("");

      fetchData();

    } catch (error) {

      console.log(error);

    }

  }

  async function handleCloseQuestion() {

    try {

      await api.patch(
        `/questions/${questionId}/close`
      );

      alert("Question Closed");

      fetchData();

    } catch (error) {

      console.log(error);

    }

  }

  if (loading) {
    return <Loading />;
  }

  if (!question) {
    return (
      <>
        <Navbar />
        <EmptyState
          title="Question Not Found"
          description="This question may have been removed."
        />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="question-page">

        <div className="question-header">

          <h1>{question.title}</h1>

          <p>{question.description}</p>

          <StatusBadge
            status={question.status}
          />

        </div>

        <div className="discussion-section">

          <h2>Discussion</h2>

          {
            replies.length === 0 ? (
              <EmptyState
                title="No Replies Yet"
                description="Start the conversation."
              />
            ) : (
              <div className="replies-list">

                {
                  replies.map((reply) => (

                    <div
                      key={reply._id}
                      className="reply-card"
                    >

                      <h4>
                        {reply.sender?.username}
                      </h4>

                      <p>
                        {reply.content}
                      </p>

                    </div>

                  ))
                }

              </div>
            )
          }

        </div>

        {
          question.status !== "closed" && (
            <form
              onSubmit={handleReply}
              className="reply-form"
            >

              <textarea
                value={content}
                onChange={(e) =>
                  setContent(e.target.value)
                }
                placeholder="Write your reply..."
                required
              />

              <button type="submit">
                Reply
              </button>

            </form>
          )
        }

        {
          currentUser?.role === "student" &&
          question.status !== "closed" && (
            <button
              onClick={handleCloseQuestion}
              className="close-btn"
            >
              Close Question
            </button>
          )
        }

      </div>
    </>
  );
}

export default QuestionDetails;