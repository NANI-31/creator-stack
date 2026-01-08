import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import ForgotPassword from "./features/auth/pages/ForgotPassword";
import Home from "./features/websites/pages/Home";
import Dashboard from "./features/dashboard/pages/Dashboard";
import MyContributions from "./features/dashboard/pages/MyContributions";
import SavedWebsites from "./features/dashboard/pages/SavedWebsites";
import MainLayout from "./components/layout/MainLayout";
import ProtectedRoute from "./features/auth/components/ProtectedRoute";
import SubmitWebsite from "./features/websites/pages/SubmitWebsite";
import SubmissionSuccess from "./features/websites/pages/SubmissionSuccess";
import ToolDetails from "./features/websites/pages/ToolDetails";
import WebsiteListView from "./features/websites/pages/WebsiteListView";
import AdminLayout from "./features/admin/layouts/AdminLayout";
import AdminDashboard from "./features/admin/pages/AdminDashboard";
import SubmissionsManager from "./features/admin/pages/SubmissionsManager";
import SubmissionReview from "./features/admin/pages/SubmissionReview";
import CategoriesManager from "./features/admin/pages/CategoriesManager";
import UsersManager from "./features/admin/pages/UsersManager";
import ReportsManager from "./features/admin/pages/ReportsManager";
import AnalyticsDashboard from "./features/admin/pages/AnalyticsDashboard";
import AdminSettings from "./features/admin/pages/AdminSettings";
import AdminNotifications from "./features/admin/pages/AdminNotifications";
import RolesManager from "./features/admin/pages/RolesManager";
import AuditLogs from "./features/admin/pages/AuditLogs";

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Routes - Completely separate from MainLayout */}
        <Route
          path="/admin"
          element={<ProtectedRoute allowedRoles={["Admin", "Moderator"]} />}
        >
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="submissions" element={<SubmissionsManager />} />
            <Route path="submissions/:id" element={<SubmissionReview />} />
            <Route path="categories" element={<CategoriesManager />} />
            <Route path="users" element={<UsersManager />} />
            <Route path="reports" element={<AdminDashboard />} />
            <Route path="moderation" element={<ReportsManager />} />
            <Route path="analytics" element={<AnalyticsDashboard />} />
            <Route path="analytics" element={<AnalyticsDashboard />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="notifications" element={<AdminNotifications />} />
            <Route path="roles" element={<RolesManager />} />
            <Route path="audit-logs" element={<AuditLogs />} />
          </Route>
        </Route>

        {/* Main Application Routes - Wrapped in MainLayout */}
        <Route
          path="/*"
          element={
            <MainLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                {/* Protected Routes within Main App (Limited to non-admin roles) */}
                <Route
                  element={
                    <ProtectedRoute
                      allowedRoles={[
                        "User",
                        "Developer",
                        "Designer",
                        "Creator",
                        "Editor",
                      ]}
                    />
                  }
                >
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route
                    path="/my-contributions"
                    element={<MyContributions />}
                  />
                  <Route path="/submit" element={<SubmitWebsite />} />
                  <Route
                    path="/submission-success"
                    element={<SubmissionSuccess />}
                  />
                  <Route path="/saved" element={<SavedWebsites />} />
                  <Route path="/activity" element={<Dashboard />} />
                  <Route path="/settings" element={<Dashboard />} />
                </Route>

                <Route path="/categories" element={<Home />} />
                <Route path="/trending" element={<Home />} />
                <Route path="/websites" element={<WebsiteListView />} />
                <Route path="/tool/:id" element={<ToolDetails />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
