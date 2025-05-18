import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import Home from "./components/components_lite/Home";
import About from "./components/components_lite/about";
import Contact from "./components/components_lite/Contact";
import Privacy from "./components/components_lite/Privacy";
import Terms from "./components/components_lite/terms";
import Navbar from "./components/components_lite/Navbar";
import Footer from "./components/components_lite/Footer";

// Layout component to wrap pages that need Navbar and Footer
const AppLayout = () => {
  return (
    <>
      <Navbar />
      <main style={{ flexGrow: 1 }}> {/* Ensures content can grow and push footer down */}
        <Outlet /> {/* Nested routes will render their components here */}
      </main>
      <Footer />
    </>
  );
};

const appRouter = createBrowserRouter([
  {
    element: <AppLayout />, // Apply layout to these routes
    children: [
      { path: "/", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "privacy", element: <Privacy /> },
      { path: "terms", element: <Terms /> },
    ],
  },
  // Standalone routes without the main Navbar/Footer
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
