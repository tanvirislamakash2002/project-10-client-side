import {
  createBrowserRouter,
} from "react-router";
import App from "../App";
import RootLayout from "../RootLayout/RootLayout";
import AddFindRoommate from "../Pages/AddFindRoommate/AddFindRoommate";
import Details from "../Pages/Details";
import UpdatePost from "../Pages/UpdatePost";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import PrivateRoute from "../provider/PrivateRoute";
import Loading from "../components/Loading";
import BrowseListings from "../Pages/BrowseListings";
import MyListings from "../Pages/MyListings";
import Home from "../Pages/Home";
import ErrorPage from "../Pages/ErrorPage";
import DashboardLayout from "../dashboardLayout/dashboardLayout";
import AboutUs from "../components/AboutUs";
import ContactUs from "../components/ContactUs";
import Browse from "../Pages/Browse/Browse";
import Dashboard from "../dashboardPages/Dashboard";
import Inquiries from "../dashboardPages/Provider/Inquiries/Inquiries";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        Component: Home
      },

      {
        path: '/register',
        Component: Register
      },
      {
        path: '/login',
        Component: Login
      },
      {
        path: '/browse',
        Component: Browse,
        hydrateFallbackElement: <Loading></Loading>
      },

      {
        path: '/details/:id',
        element: <Details></Details>,
        hydrateFallbackElement: <Loading></Loading>
      },
      {
        path: '/update-post/:id',
        element:
          <PrivateRoute>
            <UpdatePost></UpdatePost>
          </PrivateRoute>,
        hydrateFallbackElement: <Loading></Loading>
      },
      {
        path: '/about-us',
        Component: AboutUs
      },
      {
        path: '/contact-us',
        Component: ContactUs
      },
      {
        path: '/test',
        element:<App></App>
      },
    ]
  },
  {
        path: '/upload',
        element:<App></App>
      },

  // dashboard route 
  {
    path: "/dashboard",
    element:
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element:
          <Dashboard></Dashboard>,
        hydrateFallbackElement: <Loading></Loading>

      },
      // provider dashboard
      {
        path: '/dashboard/browse-listings',
        Component: BrowseListings,
        hydrateFallbackElement: <Loading></Loading>
      },
      {
        path: '/dashboard/my-listings',
        element:
          <PrivateRoute>
            <MyListings></MyListings>
          </PrivateRoute>,
        hydrateFallbackElement: <Loading></Loading>
      },
      {
        path: '/dashboard/listings/new',
        element:
          <PrivateRoute>
            <AddFindRoommate></AddFindRoommate>
          </PrivateRoute>,
      },
      {
        path: '/dashboard/inquiries',
        element:
          <PrivateRoute>
            <Inquiries></Inquiries>
          </PrivateRoute>,
      },
    ]
  }
]);