import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { StoryPage } from './pages/StoryPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AuthorizedDeveloperPage } from './pages/AuthorizedDeveloperPage';
import { SmoothScrollProvider } from './providers/SmoothScrollProvider';
import { LuxuryCursor } from './components/effects/LuxuryCursor';
import './App.css';

export function App() {
  return (
    <BrowserRouter>
      <SmoothScrollProvider>
        <LuxuryCursor />
        <Routes>
          {/* 5 Spice Sakinaka Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/story" element={<StoryPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Standalone Authorized Developer Attribution Page (Direct URL Only) */}
          <Route path="/authorizeddeveloper" element={<AuthorizedDeveloperPage />} />

          {/* Legacy route redirects */}
          <Route path="/about" element={<Navigate to="/story" replace />} />
          <Route path="/pricing" element={<Navigate to="/menu" replace />} />
          <Route path="/demos/*" element={<Navigate to="/" replace />} />

          {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </SmoothScrollProvider>
    </BrowserRouter>
  );
}

export default App;
