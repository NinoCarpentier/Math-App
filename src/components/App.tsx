import "../styles/App.css";
import { Outlet } from "react-router-dom";

export const App = () => {
  return (
    <div className="App">
      <Outlet />
    </div>
  );
};
