import "./ReplyCard.css";

function ReplyCard({ reply }) {

  return (
    <div className="reply-card">

      <div className="reply-header">

        <div className="reply-avatar">
          {reply.sender?.username?.charAt(0).toUpperCase()}
        </div>

        <h4>
          {reply.sender?.username}
        </h4>

      </div>

      <p>
        {reply.content}
      </p>

    </div>
  );
}

export default ReplyCard;