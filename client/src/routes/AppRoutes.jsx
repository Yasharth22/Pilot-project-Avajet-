// AppRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Dashboard from '../pages/Dashboard';
import DefaultDashboard from '../pages/DefaultDashboard';
import MyAircraft from '../pages/MyAircraft';
import AircraftDetails from '../pages/AircraftDetails';
import Configuration from '../pages/Configuration';
import MaintenanceTasks from '../pages/MaintenanceTasks';
import AircraftDefects from '../pages/AircraftDefects';
import TechLogConfiguration from '../pages/TechLogConfiguration';
import TechLogDetails from '../pages/TechLogDetails';
import Flights from '../pages/Flights';
import DailyUtilization from '../pages/DailyUtilization';
import AircraftCheckWorkPack from '../pages/AircraftCheckWorkPack';
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
import Settings from '../components/Settings';
import Support from '../components/Support';
import Forum from '../pages/Forum';
import AircraftAccountModal from '../components/AircraftAccountModal';

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
        path="/configuration"
        element={
          <ProtectedRoute>
            <Layout>
              <Configuration />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/maintenance-tasks"
        element={
          <ProtectedRoute>
            <Layout>
              <MaintenanceTasks />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/aircraft-defects"
        element={
          <ProtectedRoute>
            <Layout>
              <AircraftDefects />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/techlog-configuration"
        element={
          <ProtectedRoute>
            <Layout>
              <TechLogConfiguration />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/techlog-details"
        element={
          <ProtectedRoute>
            <Layout>
              <TechLogDetails />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/flights"
        element={
          <ProtectedRoute>
            <Layout>
              <Flights />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/daily-utilization"
        element={
          <ProtectedRoute>
            <Layout>
              <DailyUtilization />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/aircraft-check-workpack"
        element={
          <ProtectedRoute>
            <Layout>
              <AircraftCheckWorkPack />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/aircraft-account"
        element={
          <ProtectedRoute>
            <Layout>
              <AircraftAccountModal />
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

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Layout>
              <Settings />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/support"
        element={
          <ProtectedRoute>
            <Layout>
              <Support />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/forum"
        element={
          <ProtectedRoute>
            <Layout>
              <Forum />
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
