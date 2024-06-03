interface ExFooterProps {
  verification: boolean | null;
  solution: number;
  score: number;
}

export const ExFooter = ({ verification, solution, score }: ExFooterProps) => {
  if (verification) {
    return <div>Correct !</div>;
  } else if (verification === false) {
    return <div>Oops, the response is {String(solution)}.</div>;
  }
  return null;
};
