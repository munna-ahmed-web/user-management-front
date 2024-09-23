import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import UserManagement from "../pages/admin/user-management/UserManagement";
import { MainLayout } from "../layout/MainLayout";
import About from "../pages/about/About";
import Service from "../pages/service/Service";
import Contact from "../pages/contact/Contact";
import AuthGuard from "../components/AuthGuard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "dashboard",
        element: (
          <AuthGuard>
            <UserManagement />
          </AuthGuard>
        ),
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "service",
        element: <Service />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
