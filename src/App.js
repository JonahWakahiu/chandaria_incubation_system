import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPageLayout from "./landingPage/LandingPageLayout";
import LandingPageHome from "./landingPage/routes/LandingPageHome";
import LoginPage from "./landingPage/routes/LoginPage";
import AdminNavbar from "./admin/components/AdminNavbar";
import AdminDashboard from "./admin/routes/AdminDashboard";
import AdminInnovator from "./admin/routes/AdminInnovator";
import InnovatorLayout from "./innovator/InnovatorLayout";
import InnovatorDashboard from "./innovator/routes/InnovatorDashboard";
import AdminMentor from "./admin/routes/AdminMentor";
import Adminadmins from "./admin/routes/Adminadmins";
import AdminProfile from "./admin/routes/AdminProfile";
import AdminAddPatent from "./admin/routes/AdminAddPatent";
import PageNotFound from "./PageNotFound";
import AdminRegistration from "./admin/routes/AdminRegistration";
import RegistrationForm from "./landingPage/routes/RegistrationForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPageLayout />}>
          <Route index element={<LandingPageHome />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationForm />} />
        </Route>
        <Route path="/admin" element={<AdminNavbar />}>
          <Route index element={<AdminDashboard />} />
          <Route path="/admin/innovator" element={<AdminInnovator />} />
          <Route path="/admin/Mentor" element={<AdminMentor />} />
          <Route path="/admin/admins" element={<Adminadmins />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route path="/admin/addpatent" element={<AdminAddPatent />} />
          <Route path="/admin/registration" element={<AdminRegistration />} />
        </Route>
        <Route path="/innovator" element={<InnovatorLayout />}>
          <Route index element={<InnovatorDashboard />} />
        </Route>
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
