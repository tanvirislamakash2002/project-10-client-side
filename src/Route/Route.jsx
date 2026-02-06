import {
  createBrowserRouter,
} from "react-router";
import PrivateRoute from "../provider/PrivateRoute";
import Loading from "../components/Loading";
import ErrorPage from "../Pages/ErrorPage";
import UnderConstructionPage from "../Pages/UnderConstructionPage";
import Root from "../layout/Root";
import Details from "../Pages/public/Details";
import Register from "../Pages/auth/Register/Register";
import Login from "../Pages/auth/Login";
import Home from "../Pages/public/Home/Home";
import DashboardLayout from "../layout/DashboardLayout";
import Inquiries from "../Pages/dashboard/Provider/Inquiries/Inquiries";
import UpdatePost from "../Pages/dashboard/Provider/UpdatePost";
import Dashboard from "../Pages/dashboard/Dashboard";
import MyListings from "../Pages/dashboard/Provider/MyListings";
import SavedListings from "../Pages/dashboard/Seeker/SavedListings/SavedListings";
import AboutUs from "../Pages/public/AboutUs";
import ContactUs from "../Pages/public/ContactUs";
import Blog from "../Pages/public/Blog/Blog";
import CreateBlogPost from "../Pages/dashboard/Admin/CreateBlogPost/CreateBlogPost";
import CreateListing from "../Pages/dashboard/Provider/CreateListing/CreateListing";
import BrowsePage from "../Pages/public/Browse/Browse";

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
        Component: BrowsePage,
        hydrateFallbackElement: <Loading></Loading>
      },
      {
        path: '/blog',
        Component: Blog,
        hydrateFallbackElement: <Loading></Loading>
      },
      // {
      //   path: '/blog/:slug',
      //   Component: BlogPost,
      //   hydrateFallbackElement: <Loading></Loading>
      // },

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

    ]
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
      // admin dashboard
      {
        path: '/dashboard/blogs/new',
        element:
          <PrivateRoute>
            <CreateBlogPost></CreateBlogPost>
          </PrivateRoute>,
        hydrateFallbackElement: <Loading></Loading>
      },
      // provider dashboard
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
            <CreateListing></CreateListing>
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
// seeker Dashboard
      {
        path: '/dashboard/saved',
        element:
          <PrivateRoute>
            <SavedListings></SavedListings>
          </PrivateRoute>,
      },
    ]
  }
]);