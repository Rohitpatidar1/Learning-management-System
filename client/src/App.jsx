import { createBrowserRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar";
import { Button } from "./components/ui/button";
import Login from "./pages/login";
import HeroSection from "./pages/students/HeroSection";
import MainLayout from "./layout/MainLayout";
import { RouterProvider } from "react-router";
import Courses from "./pages/students/Courses";
import MyLearning from "./pages/students/MyLearning";
import Profile from "./pages/students/Profile";
import Sidebar from "./pages/admin/lecture/sidebar";
import Dashboard from "./pages/admin/Dashboard";
import CourseTable from "./pages/admin/course/CourseTable";
import AddCourse from "./pages/admin/course/AddCourse";
import EditCourse from "./pages/admin/course/EditCourse";
// import Createlecture from "./pages/admin/lecture/Createlecture";
import EditLecture from "./pages/admin/lecture/EditLecture";
import CreateLecture from "./pages/admin/lecture/CreateLacture";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: (
          <>
            <HeroSection></HeroSection>
            <Courses></Courses>
          </>
        ),
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "myLearning",
        element: <MyLearning></MyLearning>,
      },
      {
        path: "Login",
        element: <Login></Login>,
      },
      {
        path: "Profile",
        element: <Profile></Profile>,
      },

      {
        path: "admin",
        element: <Sidebar />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "course",
            element: <CourseTable />,
          },
          {
            path: "course/create",
            element: <AddCourse />,
          },
          {
            path: "course/:courseId",
            element: <EditCourse />,
          },
          {
            path: "course/:courseId/lecture",
            element: <CreateLecture />,
          },
          {
            path: "course/:courseId/lecture/:lectureId",
            element: <EditLecture />, // Removed extra "admin"
          },
        ],
      },
    ],
  },
]);
function App() {
  return (
    <>
      <main>
        <RouterProvider router={appRouter} />
      </main>
    </>
  );
}

export default App;
