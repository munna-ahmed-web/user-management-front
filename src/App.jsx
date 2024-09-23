import "./App.css";
import router from "./routes/router.jsx";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="w-full h-screen bg-gray-100">
      <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
