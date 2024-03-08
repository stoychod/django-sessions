import "the-new-css-reset/css/reset.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "src/index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import store from "store/store";
import Root from "routes/Root";
import Home from "routes/Home";
import Dashboard from "routes/Dashboard";
import Register from "routes/Register";
import Login from "routes/Login";
import RequireAuth from "components/RequireAuth";
import ErrorPage from "routes/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "auth/register", element: <Register /> },
      { path: "auth/login", element: <Login /> },
      {
        element: <RequireAuth />,
        children: [{ path: "dashboard", element: <Dashboard /> }],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Toaster position="bottom-right" toastOptions={{duration: 5000}}/>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
