import "./App.css";
import { Routes, Route } from "react-router-dom";
import StartScreen from "./pages/StartScreen/StartScreen";
import RankingPage from "./pages/RankingPage/RankingPage";
import ProfileHouses from "./pages/ProfileHouses/ProfileHouses";
import GeneralLayout from "./components/GeneralLayout/GeneralLayout";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Cash from "./pages/Cash/Cash";
import RealState from "./pages/RealState/RealState";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Profile" element={<GeneralLayout><ProfilePage /></GeneralLayout>} />
        <Route path="/Cash" element={<GeneralLayout><Cash /></GeneralLayout>} />
        <Route path="/Ranking" element={<GeneralLayout><RankingPage /></GeneralLayout>} />
        <Route path="/ProfileHouses" element={<GeneralLayout><ProfileHouses /></GeneralLayout>} />
        <Route path="/RealState" element={<GeneralLayout><RealState /></GeneralLayout>} />
      </Routes>
    </>
  );
}

export default App;
