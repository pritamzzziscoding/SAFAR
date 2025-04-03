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
import { PackageDetails } from "./pages/PackageDetails";
import { getIndividualPackageDetails } from "./services/get-data";
import { ViewDetails } from "./components/ViewDetails";
import { CustomerBookings } from "./pages/CustomerBookings";
import { Success } from "./pages/Success";
import { Failure } from "./pages/Fail";

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
      path: "/home/:packageID",
      element: <PackageDetails />,
      loader: getIndividualPackageDetails //this is what done
    }
    ,
    {
      path: "/bookings",
      element: <Bookings />,
    },
    {
      path: "/bookings/:id",
      element: <ViewDetails />
    }
    ,
    {
      path: "/blogs",
      element: <Blogs />,
    },
    {
      path: "/packages",
      element: <Packages />,
    },
    {
      path: "/packages/:package_id",
      element: <CustomerBookings />
    }
    ,
    {
      path: "/add-package",
      element: <AddPackage agency_id="1234" />,
    },
    {
      path: "/book",
      element: <BookingForm packageId={1} price={100} />,
    },
    {
      path: "/rating/:id",
      element: <RatingForm />,
    },
    {
      path: "/success/:reference",
      element: <Success />
    },{
      path: "/failure",
      element : <Failure />
    }
  ]);
  return <RouterProvider router={router} />;
};
