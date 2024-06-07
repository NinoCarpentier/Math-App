import { Calcul } from "../Question";

export const generateCalculation = (
  exerciceType: string,
  calculationList: string[],
  generateNumber: { (): number }
): Calcul | null => {
  let calcul: Calcul | null = null;
  let calculsDatas: string;
  do {
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
    calculsDatas = `${calcul?.numberOne}_${calcul?.numberTwo}_${calcul?.result}`;
  } while (calculationList.includes(calculsDatas));

  return calcul;
};
