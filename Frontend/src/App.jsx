import { createBrowserRouter, RouterProvider } from "react-router-dom";
   import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import Home from "./components/components_lite/Home";

const appRouter = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
 
]);

function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />  
    </div>
  );
}

export default App;
