import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "react-tabs/style/react-tabs.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import { Toaster } from "react-hot-toast";
function App() {
  const [count, setCount] = useState(0);
  return (
    <main className="font-poppins">
      <Toaster />
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
