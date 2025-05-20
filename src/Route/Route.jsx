import {
  createBrowserRouter,
} from "react-router";
import App from "../App";
import RootLayout from "../RootLayout/RootLayout";
import FindRoommate from "../Pages/FindRoommate";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children:[
        {
            index:true,
            element:<FindRoommate></FindRoommate>
        }
    ]
  },
]);