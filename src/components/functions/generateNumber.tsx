export const generateNumber = () => {
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
