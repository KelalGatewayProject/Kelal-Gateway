import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import routes from "tempo-routes";

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
const Credits = lazy(() => import("./pages/Credits"));
const EventOrganizers = lazy(() => import("./pages/EventOrganizers"));
const FullEvent = lazy(() => import("./pages/FullEvent"));
const InviteFriends = lazy(() => import("./pages/InviteFriends"));
const MyTickets = lazy(() => import("./pages/MyTickets"));
const Profile = lazy(() => import("./pages/Profile"));
const TransferCredits = lazy(() => import("./pages/TransferCredits"));
const VenuesAndClubs = lazy(() => import("./pages/VenuesAndClubs"));
const Wallet = lazy(() => import("./pages/Wallet"));

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          Loading...
        </div>
      }
    >
      <>
    <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Home />} />
      <Route path="/phone-login" element={<PhoneLogin />} />
      <Route path="/verify-code" element={<VerifyCode />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
          <Route path="/profile-setup" element={<ProfileSetup />} />
          <Route path="/app-settings" element={<AppSettings />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/credits" element={<Credits />} />
          <Route path="/event-organizers" element={<EventOrganizers />} />
          <Route path="/event/:id" element={<FullEvent />} />
          <Route path="/invite-friends" element={<InviteFriends />} />
          <Route path="/my-tickets" element={<MyTickets />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/transfer-credits" element={<TransferCredits />} />
          <Route path="/venues-and-clubs" element={<VenuesAndClubs />} />
          <Route path="/wallet" element={<Wallet />} />
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" />
          )}
    </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
