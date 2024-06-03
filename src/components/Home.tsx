import { Link } from "react-router-dom";

const exerciceTypeList = [
  "Additions",
  "Subtractions",
  "Multiplications",
  "Divisions",
  "Squares",
  "Square roots",
  "Cubes",
  "Cubic roots",
];

export const Home = () => {
  return (
    <div>
      {exerciceTypeList.map((exerciceType) => (
        <Link to={`/${exerciceType}/question/1`} key={exerciceType}>
          <button>{exerciceType}</button>
        </Link>
      ))}
      <Link to={"/statistics"}>
        <button>My statistics</button>
      </Link>
    </div>
  );
};
