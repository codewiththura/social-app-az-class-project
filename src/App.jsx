import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import { BrowserRouter, Routes, Route } from "react-router";
import DetailPost from "./pages/DetailPost";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/post/:id" element={<DetailPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
