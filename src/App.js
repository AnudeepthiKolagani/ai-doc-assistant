import "./App.css";
import UploadFile from "./components/UploadFile";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/" element={<Home />} />
      <Route path="/upload-file" element={<UploadFile />} />
    </Routes>
  );
}

export default App;
