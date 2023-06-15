import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Input from "./input";
import CategoryForm from "./categoryForm";

import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NewTable from "./newTable";
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";
import ButtonWithMessage from "./messageOnHover";
import FileInput from "./trial";
const root = ReactDOM.createRoot(document.getElementById("root"));
const routerObj = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/input",
    element: <Input />,
  },
  {
    path: "/newtable",
    element: <NewTable />,
  },
  {
    path: "/categoryForm",
    element: <CategoryForm />,
  },
  {
    path: "/buttonmessage",
    element: <ButtonWithMessage />,
  },
  {
    path: "/file",
    element: <FileInput />,
  },
]);
root.render(
  <React.StrictMode>
    <RouterProvider router={routerObj} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
