import { BrowserRouter, Routes, Route } from "react-router-dom";
import { InitializrPage } from "./components/InitializrPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/starter-client" element={<InitializrPage />} />
        <Route path="/" element={<InitializrPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

