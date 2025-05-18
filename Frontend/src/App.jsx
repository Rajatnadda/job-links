import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import Home from "./components/components_lite/Home";
import Navbar from "./components/components_lite/Navbar";
import Contact from "./components/components_lite/contact";
import About from "./components/components_lite/about";
import Terms from "./components/components_lite/terms";
import Privacy from "./components/components_lite/Privacy";


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />},
    {
      path: "/Login",
      element: <Login />},
      {
        path: "/Register",
        element: <Register />},
        {
          path: "/Privacy",
          element: <Privacy />},
          {
            path: "/Terms",
            element: <Terms />},
            {
              path: "/About",
              element: <About />},
              {
                path: "/Contact",
                element: <Contact />},
        

])

function App(){
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}
export default App;