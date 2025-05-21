import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import Home from "./components/components_lite/Home";
import Contact from "./components/components_lite/contact";
import About from "./components/components_lite/about";
import Terms from "./components/components_lite/terms";
import Privacy from "./components/components_lite/Privacy";
import Jobs from "./components/components_lite/Jobs";
import Browse from "./components/components_lite/Browse";
import Profile from "./components/components_lite/Profile";
import Description from "./components/components_lite/Description";
import Commpanies from "./components/admincomponents/Commpanies";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/Description/:id",
    element: <Description/>
  },
  {
    path: "/Privacy",
    element: <Privacy />,
  },
  {
    path: "/Terms",
    element: <Terms />,
  },
  {
    path: "/About",
    element: <About />,
  },
  {
    path: "/Contact",
    element: <Contact />,
  },
  {
    path: "/Jobs",
    element: <Jobs />,
  },
  {
    path: "Profile",
    element: <Profile />,
  },

  {
    path: "Browse",
    element: <Browse />,
  },

  // admin 
  {
    path: "/admin/companies",
    element: <Commpanies />
     
  }
]);

function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}
export default App;
