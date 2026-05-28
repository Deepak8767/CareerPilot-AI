import Home from "./home/home.jsx";
import Login from "./login/login.jsx";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { usercontext } from "./appcontext.jsx";
import Forgotpassword from "./resetpassword/resetpassword.jsx";
import Uploadpage from "./upload/upload.jsx";
import Analyse from "./analyse/analyse.jsx";
import Profile from "./profile/profile.jsx";
import AIMentor from "./aiMentor/AIMentor.jsx";
import AIMentorHistory from "./aiMentor/AIMentorHistory.jsx";
import AIMentorDetail from "./aiMentor/AIMentorDetail.jsx";
import AnalysisHistory from "./analysis/AnalysisHistory.jsx";
import AnalysisDetail from "./analysis/AnalysisDetail.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Styles from "./loadstyle.module.css";

function App() {

  const { isauthenticated, islogged } = useContext(usercontext);

  return (
    isauthenticated ?
      <>
        <div className="appBackground"></div>

        <ToastContainer
          theme="dark"
          stacked
          autoClose={1500}
          position="top-right"
        />

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgotpassword" element={<Forgotpassword />} />
            <Route path="/uploaddoc" element={<ProtectedRoute islogged={islogged}><Uploadpage /></ProtectedRoute>} />
            <Route path="/analysereport" element={<ProtectedRoute islogged={islogged}><Analyse /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute islogged={islogged}><Profile /></ProtectedRoute>} />
            <Route path="/ai-mentor" element={<ProtectedRoute islogged={islogged}><AIMentor /></ProtectedRoute>} />
            <Route path="/ai-mentor/history" element={<ProtectedRoute islogged={islogged}><AIMentorHistory /></ProtectedRoute>} />
            <Route path="/ai-mentor/:id" element={<ProtectedRoute islogged={islogged}><AIMentorDetail /></ProtectedRoute>} />
            <Route path="/analysis/history" element={<ProtectedRoute islogged={islogged}><AnalysisHistory /></ProtectedRoute>} />
            <Route path="/analysis/:id" element={<ProtectedRoute islogged={islogged}><AnalysisDetail /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </>
      :
      <div className={Styles.mainLoaderWrapper}>

        <div className={Styles.backgroundGlow}></div>

        <div className={Styles.loadani} id="animate">

          <div className={Styles.brandText}>
            CareerPilot AI
          </div>

          <div className={Styles.loadanimation}>
            <div className={Styles.capstart}></div>
            <div className={Styles.loadblock}></div>
          </div>

          <p className={Styles.loadingText}>
            Preparing your AI dashboard...
          </p>

        </div>
      </div>
  );
}

export default App;