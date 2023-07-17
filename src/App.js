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
import PageNotFound from "./PageNotFound";
import RegistrationForm from "./landingPage/routes/RegistrationForm";
import Patent from "./admin/routes/Patent";
import MentorLayout from "./mentor/pages/MentorLayout";
import MentorNavbar from "./mentor/components/MentorNavbar";
import IncubateProgress from "./admin/routes/IncubateProgress";
import InnovatorDashboard from "./innovator/pages/InnovatorDashboard";
import ExpectationForm from "./innovator/pages/ExpectationForm";
import InnovatorProfile from "./innovator/pages/InnovatorProfile";
import { useState, useMemo } from "react";
import { UserContext } from "./UserContext";
import AccelerationReport from "./mentor/pages/AccelerationReport";
import MentorDashboard from "./mentor/pages/MentorDashboard";
import MentorProfile from "./mentor/pages/MentorProfile";

function App() {
  const [user, setUser] = useState(null);

  const provideUser = useMemo(() => ({ user, setUser }), [user, setUser]);
  return (
    <BrowserRouter>
      <UserContext.Provider value={provideUser}>
        <Routes>
          <Route path="/" element={<LandingPageLayout />}>
            <Route index element={<LandingPageHome />} />
            <Route path="registration" element={<RegistrationForm />} />
          </Route>
          <Route path="login" element={<LoginPage />} setUser={setUser} />
          <Route path="admin" element={<AdminNavbar />}>
            <Route index element={<AdminDashboard />} />
            <Route path="innovator" element={<AdminInnovator />} />
            <Route path="Mentor" element={<AdminMentor />} />
            <Route path="admins" element={<Adminadmins />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="progress" element={<IncubateProgress />} />
            <Route path="patent" element={<Patent />} />
          </Route>
          <Route path="innovator" element={<InnovatorLayout />}>
            <Route index element={<InnovatorDashboard />} />
            <Route path="expectation" element={<ExpectationForm />} />
            <Route path="profile" element={<InnovatorProfile />} />
          </Route>
          <Route path="mentor" element={<MentorNavbar />}>
            <Route index element={<MentorDashboard />} />
            <Route path="accelerationreport" element={<AccelerationReport />} />
            <Route path="profile" element={<MentorProfile />} />
          </Route>

          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
