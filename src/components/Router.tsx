import { createBrowserRouter } from "react-router-dom";
import { Question } from "./Question";
import { App } from "./App";
import { Result } from "./Result";
import { ErrorBoundary } from "./ErrorBoundary";
import { Home } from "./Home";
import { Header } from "./Header";

export const getRouter = () =>
  createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorBoundary />,
      children: [
        {
          path: "/",
          element: (
            <div>
              <Header />
              <Home />
            </div>
          ),
        },
        {
          path: ":exerciceType/question/:questionId",
          element: (
            <div>
              <Question />
            </div>
          ),
        },
        {
          path: "result/:score/:counter",
          element: <Result />,
        },
      ],
    },
  ]);
