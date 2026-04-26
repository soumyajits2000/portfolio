import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Portfolio from "./components/Portfolio";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import AdminResearch from "./pages/AdminResearch";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <div className="App paper-bg">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/admin/research" element={<AdminResearch />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
