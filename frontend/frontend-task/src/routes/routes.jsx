//routes/routes.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "../pages/Dashboard/index.jsx";
import AddCommentPage from "../pages/AddComment/index.jsx";
import AddTaskPage from "../pages/AddTask/index.jsx";
import DetailsPage from "../pages/Details/index.jsx";
import SetTaskPage from "../pages/SetTask/index.jsx"
import SetCommentPage from "../pages/SetComment/index.jsx"

export default function Routers() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/addtask" element={<AddTaskPage />} />
          <Route path="/task/addcomment/:id" element={<AddCommentPage />} />
          <Route path="/task/details/:id" element={<DetailsPage />} />
          <Route path="/task/set/:id" element={<SetTaskPage />} />
          <Route path="/comment/set/:idTask/:idComment" element={<SetCommentPage />} />

        </Routes>
      </div>
    </Router>
  );
}
