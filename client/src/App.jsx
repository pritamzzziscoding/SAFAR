import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import { SignUp } from "./pages/SignUp"
import { LoginForm } from "./components/Login-Form"
import { AddPackage } from "./components/AddPackage"
import { BookingForm } from "./components/BookingForm"
import { RatingForm } from "./components/RatingForm"

export const App = () => {
  const router = createBrowserRouter([
    {
      path: "/", //Landing Page
      element: <Home />
    },
    {
      path: "/login-page", //Login Option Page
      element: <Login />
    },
    {
      path: "/sign-page", //Signup Option Page
      element: <SignUp />
    },
    {
      path: "/add-package",
      element: <AddPackage agency_id="1234"/>
    },
    {
      path: "/book",
      element: <BookingForm touristId={1} packageId={1}/>
    },
    {
      path: "/rating",
      element: <RatingForm bookingId="12"/>
    }
  ])
  return <RouterProvider router={router} />
}