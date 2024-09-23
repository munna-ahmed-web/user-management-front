import NavBar from "../components/nav-bar/NavBar";
import { Outlet } from "react-router-dom";
export const MainLayout = () => {
  return (
    <div>
      <NavBar />
      <div className="mt-20">
        <Outlet />
      </div>
    </div>
  );
};
