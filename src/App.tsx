import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import EditPostPage from "./pages/EditPostPage";
import PostPage from "./pages/PostPage";
import CategoriesPage from "./pages/CategoriesPage";
import TagsPage from "./pages/TagsPage";
import DraftsPage from "./pages/DraftsPage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider, useAuth } from "./components/AuthContext";

import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Footer from "./pages/Footer";
import SearchResults from "./components/SearchResults";
import AdminDashboard from "./components/AdminDashboard";
import { useEffect } from "react";


// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function AppContent() {
  const { isAuthenticated, logout, user } = useAuth();

  useEffect(() => {
    fetch('/api/v1/visitors/track', { method: 'POST' });
  }, []);


  return (
    <BrowserRouter>
      {/* Full-height layout wrapper */}
      <div className="min-h-screen flex flex-col">
        <NavBar
          isAuthenticated={isAuthenticated}
          userProfile={user ? {
            name: user.name,
            avatar: undefined
          } : undefined}
          onLogout={logout}
        />

        {/* Main content area should grow to push footer down */}
        <main className="flex-grow container mx-auto">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/posts/new"
              element={
                <ProtectedRoute>
                  <EditPostPage />
                </ProtectedRoute>
              }
            />
            <Route path="/posts/:id" element={<PostPage isAuthenticated={isAuthenticated} />} />
            <Route
              path="/posts/:id/edit"
              element={
                <ProtectedRoute>
                  <EditPostPage />
                </ProtectedRoute>
              }
            />
            <Route path="/categories" element={<CategoriesPage isAuthenticated={isAuthenticated} />} />
            <Route path="/tags" element={<TagsPage isAuthenticated={isAuthenticated} />} />
            <Route
              path="/posts/drafts"
              element={
                <ProtectedRoute>
                  <DraftsPage />
                </ProtectedRoute>
              }
            />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/search" element={<SearchResults />} />

            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

          </Routes>
        </main>

        {/* Footer always at the bottom */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
