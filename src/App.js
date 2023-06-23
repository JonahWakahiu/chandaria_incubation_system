import LoginPage from './pages/LoginPage';
import LandingBody from './pages/LandingBody'
import NavigationBar from './Components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes path="/" element={<NavigationBar />}>
        <Route index element={<LandingBody />} />
        <Route path="login" element={<LoginPage />} />
      </Routes>
      <Routes path="/admin" element={}>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
