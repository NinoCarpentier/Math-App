import { Link } from "react-router-dom";
import { exerciceTypeList } from "../datas/exerciceTypeList";
import "../styles/Home.css";

export const Home = () => {
  return (
    <div className="exercice-button-container">
      {exerciceTypeList.map((exerciceType) => (
        <Link to={`/${exerciceType}/question/1`} key={exerciceType}>
          <button className="exercice-button">{exerciceType}</button>
        </Link>
      ))}
    </div>
  );
};
