import {
  createBrowserRouter,
} from "react-router";
import App from "../App";
import RootLayout from "../RootLayout/RootLayout";
import AddFindRoommate from "../Pages/AddFindRoommate";
import Details from "../Pages/Details";
import SingleDetails from "../Pages/SingleDetails";
import UpdatePost from "../Pages/UpdatePost";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import PrivateRoute from "../provider/PrivateRoute";
import Loading from "../components/Loading";
import BrowseListings from "../Pages/BrowseListings";
import MyListings from "../Pages/MyListings";

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
          path:'/register',
          Component:Register
        },
        {
          path:'/login',
          Component:Login
        },
        {
          path:'/browse-listings',
          loader:()=>fetch('http://localhost:3000/add-roommate'),
          Component:BrowseListings
        },
        {
          path:'/my-listings',
          loader:()=>fetch('http://localhost:3000/add-roommate'),
          Component:MyListings
        },
        {
            path:'/details/:id',
            loader:()=>fetch('http://localhost:3000/add-roommate'),
            element: 
            <PrivateRoute>
              <Details></Details>,
            </PrivateRoute>,
            hydrateFallbackElement:<Loading></Loading>
        },
        {
            path:'/single-detail/:id',
            loader:({params})=>fetch(`http://localhost:3000/add-roommate/${params.id}`),
            Component:SingleDetails,
            hydrateFallbackElement:<Loading></Loading>
        },
        {
            path:'/update-post/:id',
            loader:({params})=>fetch(`http://localhost:3000/add-roommate/${params.id}`),
            Component:UpdatePost,
            hydrateFallbackElement:<Loading></Loading>
        }
    ]
  },
]);