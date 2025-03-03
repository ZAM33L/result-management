import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/faculty/Login";
import Register from "./pages/faculty/Register";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import Spinner from "./components/spinner";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import FacultyHome from "./pages/faculty/FacultyHome";
import Students from "./pages/faculty/Students";
import AddStudents from "./pages/faculty/AddStudent";
import EditStudent from "./pages/faculty/EditStudentss";
import PublicRoute from "./components/PublicRoute";
import Results from "./pages/faculty/Results";
import AddResult from "./pages/faculty/AddResult";
import EditResult from "./pages/faculty/EditResult";
import ResultCheck from "./pages/ResultCheck";
function App() {
  const { loading } = useSelector((state) => state.alert);
  return (
    <div className="App">
      {loading ? <Spinner /> : null}
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/result/:resultId" element={<ResultCheck />}></Route>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          ></Route>
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          ></Route>
          <Route
            path="/faculty"
            element={
              <ProtectedRoute>
                <FacultyHome />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/faculty/students"
            element={
              <ProtectedRoute>
                <Students />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/faculty/students/add"
            element={
              <ProtectedRoute>
                <AddStudents />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/faculty/students/edit/:roll"
            element={
              <ProtectedRoute>
                <EditStudent />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/faculty/results"
            element={
              <ProtectedRoute>
                <Results />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/faculty/results/add"
            element={
              <ProtectedRoute>
                <AddResult />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/faculty/results/edit/:resultId"
            element={
              <ProtectedRoute>
                <EditResult />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
