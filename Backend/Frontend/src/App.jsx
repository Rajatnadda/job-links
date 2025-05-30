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
import Commpanies from "./components/admincomponents/Companies";
import CompanyCreate from "./components/admincomponents/CompanyCreate";
import CompanySetup from "./components/admincomponents/CompanySetup";
import AdminJobs from "./components/admincomponents/AdminJobs"
import PostJob from "./components/admincomponents/PostJob";
import Applicants from "./components/admincomponents/Applicants";
import ProtectedRoute from "./components/admincomponents/ProtectedRoute";

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
    element: <Description />
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
    element: <ProtectedRoute><Commpanies /></ProtectedRoute>
     
  },
  {
    path: "/admin/companies/create",
    element: <ProtectedRoute><CompanyCreate /></ProtectedRoute>
     
  },
   {
    path: "/admin/companies/:id",
    element: <ProtectedRoute><CompanySetup /></ProtectedRoute>
     
  },
  {
    path: "/admin/jobs",
    element: <ProtectedRoute><AdminJobs /></ProtectedRoute>
  },
  {
    path: "/admin/jobs/create",
    element: <ProtectedRoute><PostJob /></ProtectedRoute>
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: <ProtectedRoute><Applicants /></ProtectedRoute>
  },
  
]);

function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}
export default App;
