import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import ArticlePage from "./pages/ArticlePage";
import TopicPage from "./pages/TopicPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="min-h-screen flex flex-col">
      {/* Only show Navbar if NOT on /login */}
      {!isLoginPage && <Navbar />}

      {isLoginPage ? (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      ) : (
        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-screen-3xl mx-auto w-full bg-gray-50">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/articles/:article_id" element={<ArticlePage />} />
            <Route path="/topics/:topic" element={<TopicPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      )}

      {!isLoginPage && (
        <footer className="p-4 bg-gray-100 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Cosmino News
        </footer>
      )}
    </div>
  );
}

export default App;
