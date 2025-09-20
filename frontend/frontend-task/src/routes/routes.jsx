//routes/routes.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskPage from "../pages/private/Task/index.jsx";
import AddCommentPage from "../pages/private/AddComment/index.jsx";
import AddTaskPage from "../pages/private/AddTask/index.jsx";
import DetailsPage from "../pages/private/Details/index.jsx";
import SetTaskPage from "../pages/private/SetTask/index.jsx"
import SetCommentPage from "../pages/private/SetComment/index.jsx"
import LoginPage from "../pages/public/login/login.jsx";
import AddAccountPage from "../pages/public/AddAccount/addAccount.jsx";
import HomePage from "../pages/public/Home/home.jsx";
import PrivateHome from "../pages/private/PrivateHome/privateHome.jsx";
import ProfilePage from "../pages/private/Profile/profile.jsx";
import PrivateRoute from "./routeWrapper.jsx";
import ProfileTasksPage from "../pages/private/ProfileTasks/profileTasks.jsx";
import ProfileCommentsPage from "../pages/private/ProfileComments/profileComments.jsx";
import ProfileEditPage from "../pages/private/ProfileEdit/profileEdit.jsx";
import { AuthProvider } from "../context/AuthContext.jsx";

export default function Routers() {
  return (
    <AuthProvider>
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<AddAccountPage />} />
          <Route element={<PrivateRoute/>} >
            <Route path="/home" element={<PrivateHome />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/task" element={<TaskPage />} />
            <Route path="/addtask" element={<AddTaskPage />} />
            <Route path="/task/addcomment/:id" element={<AddCommentPage />} />
            <Route path="/task/details/:id" element={<DetailsPage />} />
            <Route path="/task/set/:id" element={<SetTaskPage />} />
            <Route path="/comment/set/:idTask/:idComment" element={<SetCommentPage />} />
            <Route path="/profile/tasks" element={<ProfileTasksPage />} />
            <Route path="/profile/comments" element={<ProfileCommentsPage />} />
            <Route path="/profile/edit" element={<ProfileEditPage />} />
          </Route>
        </Routes>
      </div>
    </Router>
    </AuthProvider>
  );
}
