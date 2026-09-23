import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Mentors from "./pages/Mentors";
import Profile from "./pages/Profile";
import MyQuestions from "./pages/MyQuestions";
import ReceivedQuestions from "./pages/ReceivedQuestions";
import QuestionDetails from "./pages/QuestionDetails";
import NotFound from "./pages/NotFound";
import BecomeMentor from "./pages/BecomeMentor";
import MentorApplication from "./pages/MentorApplication";
import UpdateProfile from "./pages/UpdateProfile";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/mentors"
          element={
            <ProtectedRoute>
              <Mentors />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile/:id"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-questions"
          element={
            <ProtectedRoute>
              <MyQuestions />
            </ProtectedRoute>
          }
        />

        <Route
          path="/received-questions"
          element={
            <ProtectedRoute>
              <ReceivedQuestions />
            </ProtectedRoute>
          }
        />

        <Route
          path="/question/:questionId"
          element={
            <ProtectedRoute>
              <QuestionDetails />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />

        <Route
          path="/Become-Mentor"
          element={
            <BecomeMentor />
          }
        />

        <Route 
          path="/mentor-application" 
          element={<MentorApplication />} />


        <Route
          path="/UpdateProfile"
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
