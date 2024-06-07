import "../styles/ExFooter.css";
import { Link } from "react-router-dom";

interface ExFooterProps {
  verification: boolean | null;
  solution: number;
  correction: (value: number) => void;
  inputValue: string;
  nextUrl: string;
}

export const ExFooter = ({
  verification,
  solution,
  correction,
  inputValue,
  nextUrl,
}: ExFooterProps) => {
  let correctionMessage = "";
  if (verification) {
    correctionMessage = "Correct !";
  } else if (verification === false) {
    correctionMessage = `Oops, the response is ${String(solution)}.`;
  }
  return (
    <div className="footer">
      <p
        className={
          verification
            ? "correction-message-right"
            : verification === false
            ? "correction-message-wrong"
            : "not-corrected"
        }
      >
        {correctionMessage}
      </p>
      <div className="button-container">
        <button
          onClick={() => correction(Number(inputValue))}
          disabled={!inputValue || inputValue === "-" || verification !== null}
        >
          Validate
        </button>
        <Link to={nextUrl}>
          <button disabled={verification === null}>Next</button>
        </Link>
      </div>
    </div>
  );
};
