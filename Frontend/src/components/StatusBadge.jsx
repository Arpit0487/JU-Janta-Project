import "./StatusBadge.css";

function StatusBadge({ status }) {

  return (
    <span className={`status ${status}`}>
      {status}
    </span>
  );
}

export default StatusBadge;