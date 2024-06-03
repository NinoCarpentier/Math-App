import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ExFooter } from "./ExFooter";

const generateNumber = () => {
  const positiveNumber = Math.round(Math.random() * 10);
  const positiveOrNegative = Math.round(Math.random() * 10);
  if (positiveOrNegative % 2 === 0) {
    const randomNumber = -1 * positiveNumber;
    return randomNumber;
  } else {
    const randomNumber = positiveNumber;
    return randomNumber;
  }
};

const isNumber = (value: unknown): boolean => !Number.isNaN(Number(value));
type Calcul = {
  numberOne: number;
  numberTwo: number;
  result: number;
};
export const Question = () => {
  const { exerciceType, questionId } = useParams();

  const [score, setScore] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [verification, setVerification] = useState<boolean | null>(null);
  const [calcul, setCalcul] = useState<Calcul | null>(null);
  const [message, setMessage] = useState("");
  const [calculationList, setCalculationList] = useState<Calcul[]>([]);

  const currentQuestionId = Number(questionId);
  const nextUrl =
    currentQuestionId < 10
      ? `/${exerciceType}/question/${Number(questionId) + 1}`
      : `/result/${score}`;

  const generateCalculation = (): Calcul | null => {
    let firstTourPassed = false;
    let calcul: Calcul | null = null;
    while (String(calcul) in calculationList || firstTourPassed === false) {
      const numberOne: number =
        exerciceType === "Square roots"
          ? generateNumber() ** 2
          : exerciceType === "Cubic roots"
          ? generateNumber() ** 3
          : generateNumber();
      const numberTwo: number =
        exerciceType === "Additions" ||
        exerciceType === "Subtractions" ||
        exerciceType === "Multiplications"
          ? generateNumber()
          : exerciceType === "Divisions"
          ? generateNumber() * numberOne
          : 0;
      const result: number =
        exerciceType === "Additions"
          ? numberOne + numberTwo
          : exerciceType === "Subtractions"
          ? numberOne - numberTwo
          : exerciceType === "Multiplications"
          ? numberOne * numberTwo
          : exerciceType === "Divisions"
          ? numberTwo / numberOne
          : exerciceType === "Squares"
          ? numberOne ** 2
          : exerciceType === "Cubes"
          ? numberOne ** 3
          : exerciceType === "Square roots"
          ? Math.sqrt(numberOne)
          : Math.cbrt(numberOne);

      calcul = {
        numberOne,
        numberTwo,
        result,
      };
      if (firstTourPassed === false) {
        firstTourPassed = true;
      }
    }

    return calcul;
  };

  const checkValue = (value: string) => {
    if (value && (isNumber(value) || value.startsWith("-"))) {
      setInputValue(value);
    } else {
      setInputValue("");
    }
  };

  const correction = (value: number) => {
    if (calcul?.result && value === calcul.result) {
      setVerification(true);
      setScore(score + 1);
    } else {
      setVerification(false);
    }
  };

  useEffect(() => {
    const calcul = generateCalculation();
    setCalcul(calcul);
    setCalculationList(calculationList.concat(calcul!));
    console.log(calculationList);
    setVerification(null);
    setInputValue("");
  }, [questionId]);

  useEffect(() => {
    setMessage(
      exerciceType === "Additions"
        ? `${calcul?.numberOne}+${
            calcul?.numberTwo && calcul?.numberTwo < 0
              ? `(${calcul?.numberTwo})`
              : calcul?.numberTwo
          }`
        : exerciceType === "Subtractions"
        ? `${calcul?.numberOne}-${
            calcul?.numberTwo && calcul?.numberTwo < 0
              ? `(${calcul?.numberTwo})`
              : calcul?.numberTwo
          }`
        : exerciceType === "Multiplications"
        ? `${calcul?.numberOne}*${
            calcul?.numberTwo && calcul?.numberTwo < 0
              ? `(${calcul?.numberTwo})`
              : calcul?.numberTwo
          }`
        : exerciceType === "Divisions"
        ? `${calcul?.numberTwo}/${
            calcul?.numberOne && calcul?.numberOne < 0
              ? `(${calcul?.numberOne})`
              : calcul?.numberOne
          }`
        : exerciceType === "Squares"
        ? `${calcul?.numberOne}`
        : exerciceType === "Square roots"
        ? `√${calcul?.numberOne}`
        : exerciceType === "Cubes"
        ? `${calcul?.numberOne}`
        : String(calcul?.numberOne)
    );
  }, [calcul]);

  return (
    <div className="question">
      <p>
        Question {questionId}:{" "}
        {exerciceType === "Squares" ? (
          <div>
            {message}
            <sup>2</sup>
          </div>
        ) : exerciceType === "Cubes" ? (
          <div>
            {message}
            <sup>3</sup>
          </div>
        ) : exerciceType === "Cubic roots" ? (
          <div>
            √<sup>3</sup>
            {message}
          </div>
        ) : (
          message
        )}
        =
        <input
          value={inputValue}
          placeholder="Your response..."
          onChange={(e) => checkValue(e.target.value)}
          onBlur={() => correction(Number(inputValue))}
        />
      </p>
      <ExFooter
        verification={verification}
        solution={calcul?.result!}
        score={score}
      />
      <Link to={"."}>
        <button>Valider</button>
      </Link>
      <Link to={nextUrl}>
        <button>Next</button>
      </Link>
    </div>
  );
};
