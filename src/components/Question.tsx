import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ExFooter } from "./ExFooter";
import { generateCalculation } from "./functions/generateCalculation";
import { generateNumber } from "./functions/generateNumber";
import "../styles/Question.css";
import { useTimer } from "./useTimer.hook";
import { useFocus } from "./useFocus.hook";

const isNumber = (value: unknown): boolean => !Number.isNaN(Number(value));

export type Calcul = {
  numberOne: number;
  numberTwo: number;
  result: number;
};
export const Question = () => {
  const { exerciceType, questionId } = useParams();
  const navigate = useNavigate();

  const [score, setScore] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>("");
  const [verification, setVerification] = useState<boolean | null>(null);
  const [calcul, setCalcul] = useState<Calcul | null>(null);
  const [message, setMessage] = useState<string>("");
  const [calculationList, setCalculationList] = useState<string[]>([]);

  const { counter, start, stop } = useTimer();
  const minutes = Math.floor(counter / 60);
  const seconds = counter % 60;

  const { inputRef, setFocus } = useFocus();

  const currentQuestionId = Number(questionId);
  const nextUrl =
    currentQuestionId < 10
      ? `/${exerciceType}/question/${Number(questionId) + 1}`
      : `/result/${score}/${counter}`;

  const checkValue = (value: string) => {
    if (value && (isNumber(value) || value === "-")) {
      setInputValue(value);
    } else if (!value) {
      setInputValue("");
    } else {
      setInputValue(inputValue);
    }
  };

  const correction = (value: number) => {
    if ((calcul?.result || calcul?.result === 0) && value === calcul.result) {
      setVerification(true);
      setScore(score + 1);
    } else {
      setVerification(false);
    }
  };

  useEffect(() => {
    start();
    return stop;
  }, []);

  useEffect(() => {
    const calculProposition = generateCalculation(
      exerciceType!,
      calculationList,
      generateNumber
    );
    setCalcul(calculProposition);
    setVerification(null);
    setInputValue("");
  }, [questionId]);

  useEffect(() => {
    setFocus();

    if (calculationList[0] === "undefined_undefined_undefined") {
      calculationList.splice(0, 1);
    }
    setCalculationList(
      calculationList.concat(
        `${calcul?.numberOne}_${calcul?.numberTwo}_${calcul?.result}`
      )
    );

    setMessage(
      exerciceType === "Additions"
        ? `${calcul?.numberOne} + ${
            calcul?.numberTwo && calcul?.numberTwo < 0
              ? `(${calcul?.numberTwo})`
              : calcul?.numberTwo
          }`
        : exerciceType === "Subtractions"
        ? `${calcul?.numberOne} - ${
            calcul?.numberTwo && calcul?.numberTwo < 0
              ? `(${calcul?.numberTwo})`
              : calcul?.numberTwo
          }`
        : exerciceType === "Multiplications"
        ? `${calcul?.numberOne} * ${
            calcul?.numberTwo && calcul?.numberTwo < 0
              ? `(${calcul?.numberTwo})`
              : calcul?.numberTwo
          }`
        : exerciceType === "Divisions"
        ? `${calcul?.numberTwo} ÷ ${
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
        : `√${calcul?.numberOne}`
    );
  }, [calcul]);

  const onEnterKeyPress = (key: string) => {
    if (
      key === "Enter" &&
      inputValue &&
      inputValue !== "-" &&
      verification === null
    ) {
      correction(Number(inputValue));
    }
  };

  return (
    <div
      className="question"
      onKeyDown={(e) => {
        if (
          verification !== null &&
          (e.key === "Enter" || e.key === "ArrowRight")
        ) {
          navigate(nextUrl);
        }
      }}
    >
      <p>
        {minutes < 10 ? `0${minutes}` : minutes} :{" "}
        {seconds < 10 ? `0${seconds}` : seconds}
      </p>
      <div className="calcul">
        <p>Question {questionId}:</p>
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
            <sup>3</sup>
            {message}
          </div>
        ) : (
          message
        )}{" "}
        ={" "}
        <input
          autoFocus
          ref={inputRef}
          value={inputValue}
          onChange={(e) => checkValue(e.target.value)}
          onKeyDown={(e) => onEnterKeyPress(e.key)}
        />
      </div>
      <ExFooter
        verification={verification}
        solution={calcul?.result!}
        correction={correction}
        inputValue={inputValue}
        nextUrl={nextUrl}
      />
    </div>
  );
};
