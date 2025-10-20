// AppRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Dashboard from '../pages/Dashboard';
import DefaultDashboard from '../pages/DefaultDashboard';
import MyAircraft from '../pages/MyAircraft';
import AircraftDetails from '../pages/AircraftDetails';
import Administration from '../pages/Administration';
import MyMaterials from '../pages/MyMaterials';
import MyResources from '../pages/MyResources';
import MyFinancials from '../pages/MyFinancials';
import Analytics from '../pages/Analytics';
import AIAssistance from '../pages/AIAssistant';
import MyActions from '../pages/MyActions';
import ProtectedRoute from './ProtectedRoute';
import Layout from '../components/Layout';
import AIAssistant from '../pages/AIAssistant';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes wrapped in Layout */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/default-dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <DefaultDashboard />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-aircraft"
        element={
          <ProtectedRoute>
            <Layout>
              <MyAircraft />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/aircraft-details"
        element={
          <ProtectedRoute>
            <Layout>
              <AircraftDetails />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-materials"
        element={
          <ProtectedRoute>
            <Layout>
              <MyMaterials />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/administration"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Layout>
              <Administration />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-resources"
        element={
          <ProtectedRoute>
            <Layout>
              <MyResources />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-financials"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <Layout>
              <MyFinancials />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/analytics"
        element={
          <ProtectedRoute>
            <Layout>
              <Analytics />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/ai"
        element={
          <ProtectedRoute>
            <Layout>
              <AIAssistant />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-actions"
        element={
          <ProtectedRoute>
            <Layout>
              <MyActions />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;
