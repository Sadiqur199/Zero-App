import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Main from "./Main/Main.jsx";
import BookList from "./Component/BookList/BookList.jsx";
import WishList from "./Component/Wishlist/WishList.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children:[
     {
      path: "/",
      element:<BookList></BookList>
     },
     {
      path: "/wishlist",
      element:<WishList></WishList>
     }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);