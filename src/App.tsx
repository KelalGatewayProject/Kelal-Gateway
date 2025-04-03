import { Suspense, lazy, useState, useEffect } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import routes from "tempo-routes";
import NavigationDebugger from "./components/NavigationDebugger";
import DebugOverlay from "./components/DebugOverlay";
import NavigationFix from "./components/NavigationFix";
import { AuthProvider, useAuth } from "./context/AuthContext";
import NetworkErrorHandler from "./components/NetworkErrorHandler";

// Lazy load pages
const Welcome = lazy(() => import("./pages/Welcome"));
const PhoneLogin = lazy(() => import("./pages/PhoneLogin"));
const VerifyCode = lazy(() => import("./pages/VerifyCode"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const ProfileSetup = lazy(() => import("./pages/ProfileSetup"));
const Home = lazy(() => import("./pages/Home"));
const AppSettings = lazy(() => import("./pages/AppSettings"));
const Calendar = lazy(() => import("./pages/Calendar"));
const DayEvents = lazy(() => import("./pages/DayEvents"));
const Credits = lazy(() => import("./pages/Credits"));
const EventOrganizers = lazy(() => import("./pages/EventOrganizers"));
const EventDetails = lazy(() => import("./pages/EventDetails"));
const InviteFriends = lazy(() => import("./pages/InviteFriends"));
const MyTickets = lazy(() => import("./pages/MyTickets"));
const Profile = lazy(() => import("./pages/Profile"));
const TransferCredits = lazy(() => import("./pages/TransferCredits"));
const VenuesAndClubs = lazy(() => import("./pages/VenuesAndClubs"));
const SearchResults = lazy(() => import("./pages/SearchResults"));
// Wallet page removed
const CreateEvent = lazy(() => import("./pages/CreateEvent"));
const CreateEventForm = lazy(() => import("./pages/CreateEventForm"));
const CategoryEvents = lazy(() => import("./pages/CategoryEvents"));
const AllFreeEvents = lazy(() => import("./pages/AllFreeEvents"));
const FreeEventDetails = lazy(() => import("./pages/FreeEventDetails"));
const LinkUpBazaarEvent = lazy(() => import("./pages/LinkUpBazaarEvent"));
const EventManagement = lazy(() => import("./pages/EventManagement"));
const EventApproval = lazy(() => import("./pages/EventApproval"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

// Event Organizer Pages
const EventOrganizerDashboard = lazy(
  () => import("./pages/EventOrganizerDashboard"),
);
const EventOrganizerRegister = lazy(
  () => import("./pages/EventOrganizerRegister"),
);

/**
 * ProtectedRoute Component
 *
 * Ensures that only authenticated users can access the route
 * Redirects to login page if not authenticated
 */
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

/**
 * OrganizerRoute Component
 *
 * Ensures that only authenticated users with the 'organizer' role can access the route
 * Redirects to login page if not authenticated or to home page if not an organizer
 */
const OrganizerRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, userRole, isOrganizer } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isOrganizer && userRole !== "organizer") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

/**
 * AdminRoute Component
 *
 * Ensures that only authenticated users with the 'admin' role can access the route
 * Redirects to login page if not authenticated or to home page if not an admin
 */
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

/**
 * AppRoutes Component
 *
 * Defines all the routes for the application
 * Includes public routes, protected routes, organizer-only routes, and admin-only routes
 */
function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/phone-login" element={<PhoneLogin />} />
      <Route path="/verify-code" element={<VerifyCode />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Protected routes for all authenticated users */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile-setup"
        element={
          <ProtectedRoute>
            <ProfileSetup />
          </ProtectedRoute>
        }
      />
      <Route
        path="/app-settings"
        element={
          <ProtectedRoute>
            <AppSettings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/calendar"
        element={
          <ProtectedRoute>
            <Calendar />
          </ProtectedRoute>
        }
      />
      <Route
        path="/day-events/:date"
        element={
          <ProtectedRoute>
            <DayEvents />
          </ProtectedRoute>
        }
      />
      <Route
        path="/credits"
        element={
          <ProtectedRoute>
            <Credits />
          </ProtectedRoute>
        }
      />
      <Route
        path="/event-organizers"
        element={
          <ProtectedRoute>
            <EventOrganizers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/event/:id"
        element={
          <ProtectedRoute>
            <EventDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/invite-friends"
        element={
          <ProtectedRoute>
            <InviteFriends />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-tickets"
        element={
          <ProtectedRoute>
            <MyTickets />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/transfer-credits"
        element={
          <ProtectedRoute>
            <TransferCredits />
          </ProtectedRoute>
        }
      />
      <Route
        path="/venues-and-clubs"
        element={
          <ProtectedRoute>
            <VenuesAndClubs />
          </ProtectedRoute>
        }
      />
      <Route
        path="/search"
        element={
          <ProtectedRoute>
            <SearchResults />
          </ProtectedRoute>
        }
      />
      {/* Wallet route removed */}
      <Route
        path="/category/:category"
        element={
          <ProtectedRoute>
            <CategoryEvents />
          </ProtectedRoute>
        }
      />
      <Route
        path="/free-events"
        element={
          <ProtectedRoute>
            <AllFreeEvents />
          </ProtectedRoute>
        }
      />
      <Route
        path="/free-event/:id"
        element={
          <ProtectedRoute>
            <FreeEventDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/linkup-bazaar"
        element={
          <ProtectedRoute>
            <LinkUpBazaarEvent />
          </ProtectedRoute>
        }
      />

      {/* Organizer-only routes */}
      <Route
        path="/create-event"
        element={
          <OrganizerRoute>
            <CreateEvent />
          </OrganizerRoute>
        }
      />
      <Route
        path="/create-event-form"
        element={
          <OrganizerRoute>
            <CreateEventForm />
          </OrganizerRoute>
        }
      />
      <Route
        path="/event-management/:id"
        element={
          <OrganizerRoute>
            <EventManagement />
          </OrganizerRoute>
        }
      />
      <Route
        path="/event-approval"
        element={
          <OrganizerRoute>
            <EventApproval />
          </OrganizerRoute>
        }
      />
      <Route
        path="/event-organizer-dashboard"
        element={
          <OrganizerRoute>
            <EventOrganizerDashboard />
          </OrganizerRoute>
        }
      />

      {/* Admin routes */}
      <Route
        path="/admin-dashboard"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

      {import.meta.env.VITE_TEMPO && <Route path="/tempobook/*" />}

      {/* Event organizer registration is accessible to all authenticated users */}
      <Route
        path="/event-organizer-register"
        element={
          <ProtectedRoute>
            <EventOrganizerRegister />
          </ProtectedRoute>
        }
      />

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

/**
 * App Component
 *
 * The main application component that sets up the authentication provider,
 * routing, and loading states
 */
function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a short delay to ensure components have time to initialize
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Shorter delay for faster loading

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-700 font-medium">
            Loading application...
          </p>
        </div>
      </div>
    );
  }

  return (
    <NetworkErrorHandler>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen bg-white">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        }
      >
        <AuthProvider>
          <NavigationDebugger />
          <DebugOverlay />
          <NavigationFix />
          <AppRoutes />
          {import.meta.env.VITE_TEMPO && useRoutes(routes)}
        </AuthProvider>
      </Suspense>
    </NetworkErrorHandler>
  );
}

export default App;
