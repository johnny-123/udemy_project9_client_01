import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Layout from "./components/Layout";
import HomeComponent from "./components/home-component";
import RegisterComponent from "./components/register-component";
import LoginComponent from "./components/login-component";
import ProfileComponent from "./components/profile-component";
import AuthService from "./services/auth.service";
import CourseComponent from "./components/course-component";
import PostCourseComponent from "./components/postCourse-component";
import EnrollComponent from "./components/enroll-component";
import ModifyCourseComponent from "./components/modifyCourse-component";
import DeleteCourseComponent from "./components/delete-component";
function App() {
  let [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser);
  let [currentCourse, setCurrentCourse] = useState(null);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout currentUser={currentUser} setCurrentUser={setCurrentUser} />
          }
        >
          <Route index element={<HomeComponent />} />
          <Route path="register" element={<RegisterComponent />} />
          <Route
            path="login"
            element={
              <LoginComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route
            path="profile"
            element={
              <ProfileComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route
            path="course"
            element={
              <CourseComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                currentCourse={currentCourse}
                setCurrentCourse={setCurrentCourse}
              />
            }
          />
          <Route
            path="postCourse"
            element={
              <PostCourseComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route
            path="enroll"
            element={
              <EnrollComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          />
          <Route
            path="modifyCourse"
            element={
              <ModifyCourseComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                currentCourse={currentCourse}
                setCurrentCourse={setCurrentCourse}
              />
            }
          />
          <Route
            path="deleteCourse"
            element={
              <DeleteCourseComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
                currentCourse={currentCourse}
                setCurrentCourse={setCurrentCourse}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
