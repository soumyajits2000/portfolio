import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Portfolio from "./components/Portfolio";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import AdminResearch from "./pages/AdminResearch";
import AdminLogin from "./pages/AdminLogin";
import AuthCallback from "./pages/AuthCallback";
import { Toaster } from "./components/ui/sonner";

function AppRouter() {
  const location = useLocation();
  // Synchronous check (NOT in useEffect) to handle the OAuth callback before any
  // ProtectedRoute auth-check runs and bounces the user.
  if (location.hash && location.hash.includes("session_id=")) {
    return <AuthCallback />;
  }
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/research" element={<AdminResearch />} />
    </Routes>
  );
}

function App() {
  return (
    <div className="App paper-bg">
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
