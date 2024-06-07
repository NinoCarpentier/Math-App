import { Link, useParams, useSearchParams } from "react-router-dom";
import "../styles/Result.css";

export const Result = () => {
  const { score, counter } = useParams();
  const minutes = Math.floor(Number(counter) / 60);
  const seconds = Number(counter) % 60;
  const updatedScore = Number(score) + 2;
  return (
    <div className="result">
      <h1>Result</h1>
      <div className="score-time">
        <div className="result-item">
          Score: <h3>{updatedScore}</h3>
        </div>
        <br />
        <div className="result-item">
          Time :{" "}
          <h3>
            {minutes} : {seconds}
          </h3>
        </div>
      </div>
      <Link to="/">
        <button>Continue</button>
      </Link>
    </div>
  );
};
