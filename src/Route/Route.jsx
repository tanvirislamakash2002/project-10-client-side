import {
  createBrowserRouter,
} from "react-router";
import App from "../App";
import RootLayout from "../RootLayout/RootLayout";
import AddFindRoommate from "../Pages/AddFindRoommate";
import Details from "../Pages/Details";
import SingleDetails from "../Pages/SingleDetails";
import UpdatePost from "../Pages/UpdatePost";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children:[
        {
            index:true,
            Component:AddFindRoommate
        },
        {
            path:'/details',
            loader:()=>fetch('http://localhost:3000/add-roommate'),
            Component:Details
        },
        {
            path:'/single-detail/:id',
            loader:({params})=>fetch(`http://localhost:3000/add-roommate/${params.id}`),
            Component:SingleDetails
        },
        {
            path:'/update-post/:id',
            loader:({params})=>fetch(`http://localhost:3000/add-roommate/${params.id}`),
            Component:UpdatePost
        }
    ]
  },
]);