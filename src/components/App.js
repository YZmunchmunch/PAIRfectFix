import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from "./Index";
import BusinessDashboard from "./BusinessDashboard";
import BusinessDetails from "./BusinessDetails";
import Forum from "./Forum";
import Layout from "./Layout";
import Dashboard from "./Dashboard";
import Donation from "./Donation";
import './app.css'

// Import Login and Register components here
import Login from "./Login";
import Register from "./Register";

function App() {
  return (
    <AuthProvider>
      <div className="project-container" style={{ width: '100%', height: '100%' }}>
        <Router>
          <Routes>
            {/* These routes are not enclosed by the Layout */}
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            
            {/* These routes are enclosed by the Layout */}
            <Route
              path="/dashboard"
              element={
                <Layout>
                  <Dashboard />
                </Layout>
              }
            />
            <Route
              path="/index"
              element={
                <Layout>
                  <Index />
                </Layout>
              }
            />
            <Route
              path="/business-dashboard"
              element={
                <Layout>
                  <BusinessDashboard />
                </Layout>
              }
            />
            <Route
              path="/details/:id"
              element={
                <Layout>
                  <BusinessDetails />
                </Layout>
              }
            />
            <Route
              path="/forum"
              element={
                <Layout>
                  <Forum />
                </Layout>
              }
            />
            <Route
              path="/donation"
              element={
                <Layout>
                  <Donation />
                </Layout>
              }
            />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
