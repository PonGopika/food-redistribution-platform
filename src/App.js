<<<<<<< HEAD
import CreateListing from "./pages/CreateListing";

function App() {
  return (
    <div>
      <h1>Food Donation Platform</h1>
      <CreateListing />
    </div>
=======
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { FoodProvider } from "./context/FoodContext";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RoleSelection from "./pages/auth/RoleSelection";
import DonorDashboard from "./pages/donor/DonorDashboard";
import DonorVerification from "./pages/donor/DonorVerification";
import AddFood from "./pages/donor/AddFood";
import FoodStatus from "./pages/donor/FoodStatus";
import NGODashboard from "./pages/ngo/NGODashboard";
import NGOProfile from "./pages/ngo/NGOProfile";
import NearbyFood from "./pages/ngo/NearbyFood";
import AcceptedFood from "./pages/ngo/AcceptedFood";
import VolunteerDashboard from "./pages/volunteer/VolunteerDashboard";
import VolunteerOnboarding from "./pages/volunteer/VolunteerOnboarding";
import PickupTasks from "./pages/volunteer/PickupTasks";
import ConfirmDelivery from "./pages/volunteer/ConfirmDelivery";
import DeliverySuccess from "./pages/volunteer/DeliverySuccess";
import DeliveryHistory from "./pages/volunteer/DeliveryHistory";
import VolunteerBadges from "./pages/volunteer/VolunteerBadges";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProfileDashboard from "./pages/profile/ProfileDashboard";

function App() {
  return (
    <AuthProvider>
      <FoodProvider>
        <BrowserRouter>
          <Routes>
            {/* Auth routes */}
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/role" element={<RoleSelection />} />

            {/* Profile */}
            <Route path="/profile" element={<ProfileDashboard />} />

            {/* Donor routes */}
            <Route path="/donor" element={<DonorDashboard />} />
            <Route path="/donor/add-food" element={<AddFood />} />
            <Route path="/donor/status" element={<FoodStatus />} />
            <Route path="/donor/verification" element={<DonorVerification />} />

            {/* NGO routes */}
            <Route path="/ngo" element={<NGODashboard />} />
            <Route path="/ngo/nearby-food" element={<NearbyFood />} />
            <Route path="/ngo/accepted" element={<AcceptedFood />} />
            <Route path="/ngo/profile" element={<NGOProfile />} />

            {/* Volunteer routes */}
            <Route path="/volunteer" element={<VolunteerDashboard />} />
            <Route path="/volunteer/onboarding" element={<VolunteerOnboarding />} />
            <Route path="/volunteer/tasks" element={<PickupTasks />} />
            <Route path="/volunteer/confirm-delivery/:id" element={<ConfirmDelivery />} />
            <Route path="/volunteer/delivery-success" element={<DeliverySuccess />} />
            <Route path="/volunteer/history" element={<DeliveryHistory />} />
            <Route path="/volunteer/badges" element={<VolunteerBadges />} />

            {/* Admin routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </BrowserRouter>
      </FoodProvider>
    </AuthProvider>
>>>>>>> 80fd6fbc26856ce9c71394c1bed1e55efb8d8859
  );
}

export default App;
<<<<<<< HEAD
=======

>>>>>>> 80fd6fbc26856ce9c71394c1bed1e55efb8d8859
