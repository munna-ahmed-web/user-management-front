import { NavLink, useNavigate } from "react-router-dom";

const navLinks = [
  { name: "Home", link: "/" },
  { name: "Dashboard", link: "/dashboard" },
  { name: "About", link: "/about" },
  { name: "Contact", link: "/contact" },
  { name: "Service", link: "/service" },
];

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  let name = localStorage.getItem("userInfo");

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    navigate("/login");
  };
  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink
          to={"/"}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            User Management
          </span>
        </NavLink>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {name && <p className="text-gray-600 p-2">Hello,{` ${name}`}</p>}
          {!token && (
            <NavLink
              to="/login"
              className="mx-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Log In
            </NavLink>
          )}
          {token && (
            <button
              onClick={handleLogOut}
              className="mx-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Log Out
            </button>
          )}
        </div>
        <div className="items-center justify-between  w-full md:flex md:w-auto md:order-1">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {navLinks &&
              navLinks.map((item) => {
                return (
                  <li>
                    <NavLink
                      to={item.link}
                      className={({ isActive }) => {
                        return isActive
                          ? "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                          : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700";
                      }}
                    >
                      {item.name}
                    </NavLink>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
