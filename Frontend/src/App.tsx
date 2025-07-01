import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { AboutUs } from './pages/AboutUs';
import { AIModel } from './pages/AIModel';
import { Authentication } from './pages/Authentication';
import { WebsiteFeatures } from './pages/WebsiteFeatures';

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<WebsiteFeatures />} />
          <Route path="/features" element={<WebsiteFeatures />} />
          <Route path="/about" element={<AboutUs />} />
          <Route
            path="/ai-model"
            element={
              <ProtectedRoute>
                <AIModel />
              </ProtectedRoute>
            }
          />
          <Route path="/auth" element={<Authentication />} />
          <Route path="*" element={<WebsiteFeatures />} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
}

export default App;