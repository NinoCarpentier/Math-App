import { Link, useParams } from "react-router-dom";

export const Result = () => {
  const { score } = useParams();
  const updatedScore = Number(score) + 2;
  return (
    <div>
      <h1>Result</h1>
      <h3>Your score: {updatedScore}</h3>
      <Link to="/">
        <button>Continue</button>
      </Link>
    </div>
  );
};
