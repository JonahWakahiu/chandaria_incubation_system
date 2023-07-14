import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPageLayout from "./landingPage/LandingPageLayout";
import LandingPageHome from "./landingPage/routes/LandingPageHome";
import LoginPage from "./landingPage/routes/LoginPage";
import AdminNavbar from "./admin/components/AdminNavbar";
import AdminDashboard from "./admin/routes/AdminDashboard";
import AdminInnovator from "./admin/routes/AdminInnovator";
import InnovatorLayout from "./innovator/InnovatorLayout";
import AdminMentor from "./admin/routes/AdminMentor";
import Adminadmins from "./admin/routes/Adminadmins";
import AdminProfile from "./admin/routes/AdminProfile";
import AdminAddPatent from "./admin/routes/AdminAddPatent";
import PageNotFound from "./PageNotFound";
import AdminRegistration from "./admin/routes/AdminRegistration";
import RegistrationForm from "./landingPage/routes/RegistrationForm";
import Patent from "./admin/routes/Patent";
import MentorLayout from "./mentor/pages/MentorLayout";
import MentorNavbar from "./mentor/components/MentorNavbar";
import IncubateProgress from "./admin/routes/IncubateProgress";
import InnovatorDashboard from "./innovator/pages/InnovatorDashboard";
import ExpectationForm from "./innovator/pages/ExpectationForm";
import InnovatorProfile from "./innovator/pages/InnovatorProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPageLayout />}>
          <Route index element={<LandingPageHome />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="registration" element={<RegistrationForm />} />
        </Route>
        <Route path="admin" element={<AdminNavbar />}>
          <Route index element={<AdminDashboard />} />
          <Route path="innovator" element={<AdminInnovator />} />
          <Route path="Mentor" element={<AdminMentor />} />
          <Route path="admins" element={<Adminadmins />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="addpatent" element={<AdminAddPatent />} />
          <Route path="registration" element={<AdminRegistration />} />
          <Route path="progress" element={<IncubateProgress />} />
          <Route path="patent" element={<Patent />} />
        </Route>
        <Route path="innovator" element={<InnovatorLayout />}>
          <Route index element={<InnovatorDashboard />} />
          <Route path="expectation" element={<ExpectationForm />} />
          <Route path="profile" element={<InnovatorProfile />} />
        </Route>
        <Route path="mentor" element={<MentorNavbar />}></Route>
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
