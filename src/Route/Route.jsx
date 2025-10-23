import {
  createBrowserRouter,
} from "react-router";
import App from "../App";
import AddFindRoommate from "../Pages/AddFindRoommate/AddFindRoommate";
import PrivateRoute from "../provider/PrivateRoute";
import Loading from "../components/Loading";
import ErrorPage from "../Pages/ErrorPage";
import AboutUs from "../components/AboutUs";
import ContactUs from "../components/ContactUs";
import Browse from "../Pages/Browse/Browse";
import UnderConstructionPage from "../Pages/UnderConstructionPage";
import Root from "../layout/Root";
import Details from "../Pages/public/Details";
import Register from "../Pages/auth/Register";
import Login from "../Pages/auth/Login";
import BrowseListings from "../Pages/public/BrowseListings";
import Home from "../Pages/public/Home";
import DashboardLayout from "../layout/DashboardLayout";
import Inquiries from "../Pages/dashboard/Provider/Inquiries/Inquiries";
import UpdatePost from "../Pages/dashboard/Provider/UpdatePost";
import Dashboard from "../Pages/dashboard/Dashboard";
import MyListings from "../Pages/dashboard/Provider/MyListings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
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
      {
        path: '/dashboard/favorites',
        element:
          <PrivateRoute>
            <UnderConstructionPage></UnderConstructionPage>
          </PrivateRoute>,
      },
      {
        path: '/dashboard/analytics',
        element:
          <PrivateRoute>
            <UnderConstructionPage></UnderConstructionPage>
          </PrivateRoute>,
      },
      {
        path: '/dashboard/profile',
        element:
          <PrivateRoute>
            <UnderConstructionPage></UnderConstructionPage>
          </PrivateRoute>,
      },
      {
        path: '/dashboard/settings',
        element:
          <PrivateRoute>
            <UnderConstructionPage></UnderConstructionPage>
          </PrivateRoute>,
      },
    ]
  }
]);