import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Landing } from "./pages/Landing";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { LoginForm } from "./components/Login-Form";
import { AddPackage } from "./components/AddPackage";
import { BookingForm } from "./components/BookingForm";
import { RatingForm } from "./components/RatingForm";
import { Home } from "./pages/Home";
import { Bookings } from "./pages/Bookings";
import { Blogs } from "./pages/Blogs";
import { Packages } from "./pages/Packages";
import { Profile } from "./pages/Profile";

export const App = () => {
  const router = createBrowserRouter([
    {
      path: "/", //Landing Page
      element: <Landing />,
    },
    {
      path: "/login-page", //Login Option Page
      element: <Login />,
    },
    {
      path: "/sign-page", //Signup Option Page
      element: <SignUp />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/bookings",
      element: <Bookings />,
    },
    {
      path: "/blogs",
      element: <Blogs />,
    },
    {
      path: "/packages",
      element: <Packages />,
    },
    {
      path: "/add-package",
      element: <AddPackage agency_id="1234" />,
    },
    {
      path: "/book",
      element: <BookingForm touristId={1} packageId={1} />,
    },
    {
      path: "/rating",
      element: <RatingForm bookingId="12" />,
    },
  ]);
  return <RouterProvider router={router} />;
};
