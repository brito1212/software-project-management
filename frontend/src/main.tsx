import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

export const backendClientId = import.meta.env.VITE_BACKEND_CLIENT_ID;
export const backendClientSecret = import.meta.env.VITE_BACKEND_CLIENT_SECRET;

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
