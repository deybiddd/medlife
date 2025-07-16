import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AdminProvider } from './contexts/AdminContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Application from './pages/Application';
import ApplicationSuccess from './pages/ApplicationSuccess';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ApplicationDetail from './pages/ApplicationDetail';
import CompleteMedlifePortal from './pages/CompleteMedlifePortal';

function App() {
  
  try {
    return (
      <AdminProvider>
        <Router>
          <Routes>
            {/* Full-width route without Layout wrapper */}
            <Route path="/portal-demo" element={<CompleteMedlifePortal />} />
            
            {/* Routes with Layout wrapper */}
            <Route path="/*" element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/application" element={<Application />} />
                  <Route path="/success" element={<ApplicationSuccess />} />
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin" element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/applications/:id" element={
                    <ProtectedRoute>
                      <ApplicationDetail />
                    </ProtectedRoute>
                  } />
                </Routes>
              </Layout>
            } />
          </Routes>
        </Router>
      </AdminProvider>
    );
  } catch (error) {
    console.error('Error in App component:', error)
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        <h1>Application Error</h1>
        <p>There was an error loading the application. Check console for details.</p>
        <pre>{String(error)}</pre>
      </div>
    )
  }
}

export default App;