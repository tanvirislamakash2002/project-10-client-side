import {
  createBrowserRouter,
} from "react-router";
import App from "../App";
import RootLayout from "../RootLayout/RootLayout";
import AddFindRoommate from "../Pages/AddFindRoommate";
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
import Overview from "../dashboardPages/Overview";
import AboutUs from "../components/AboutUs";
import ContactUs from "../components/ContactUs";
import All_Items from "../Pages/All_Items";

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
      // {
      //   path: '/add-find-roommate',
      //   element:
      //     <PrivateRoute>
      //       <AddFindRoommate></AddFindRoommate>
      //     </PrivateRoute>,
      // },
      {
        path: '/register',
        Component: Register
      },
      {
        path: '/login',
        Component: Login
      },
      {
        path: '/all-items',
        loader: () => fetch('https://ph-a10-server-two.vercel.app/add-roommate'),
        Component: All_Items,
        hydrateFallbackElement: <Loading></Loading>
      },
      // {
      //   path: '/browse-listings',
      //   loader: () => fetch('https://ph-a10-server-two.vercel.app/add-roommate'),
      //   Component: BrowseListings,
      //   hydrateFallbackElement: <Loading></Loading>
      // },
      // {
      //   path:'/my-listings',
      //   loader:()=>fetch('https://ph-a10-server-two.vercel.app/add-roommate'),
      //   element: 
      //     <PrivateRoute>
      //       <MyListings></MyListings>
      //     </PrivateRoute>,            
      //     hydrateFallbackElement:<Loading></Loading>
      // },
      {
        path: '/details/:id',
        loader: () => fetch('https://ph-a10-server-two.vercel.app/add-roommate'),
        element:
          <PrivateRoute>
            <Details></Details>
          </PrivateRoute>,
        hydrateFallbackElement: <Loading></Loading>
      },
      {
        path: '/update-post/:id',
        loader: ({ params }) => fetch(`https://ph-a10-server-two.vercel.app/add-roommate/${params.id}`),
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
        loader: () => fetch('https://ph-a10-server-two.vercel.app/add-roommate'),
        element:
          <Overview></Overview>,
        hydrateFallbackElement: <Loading></Loading>

      },
      {
        path: '/dashboard/browse-listings',
        loader: () => fetch('https://ph-a10-server-two.vercel.app/add-roommate'),
        Component: BrowseListings,
        hydrateFallbackElement: <Loading></Loading>
      },
      {
        path: '/dashboard/my-listings',
        loader: () => fetch('https://ph-a10-server-two.vercel.app/add-roommate'),
        element:
          <PrivateRoute>
            <MyListings></MyListings>
          </PrivateRoute>,
        hydrateFallbackElement: <Loading></Loading>
      },
      {
        path: '/dashboard/add-find-roommate',
        element:
          <PrivateRoute>
            <AddFindRoommate></AddFindRoommate>
          </PrivateRoute>,
      },
    ]
  }
]);