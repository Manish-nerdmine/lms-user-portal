import React, { useState, useEffect } from "react"; 
import Sidebar from "./Components/Sidebar"; 
import Dashboard from "./Pages/Dashboard"; 
import TodoTraning from "./Pages/TodoTraning"; 
import Overdue from "./Pages/Overdue"; 
import Complete from "./Pages/Complete"; 
import { Route, Routes, Navigate, useLocation } from "react-router-dom"; 
import Setting from "./Pages/Setting"; 
import Sign from "./Pages/Signup"; 
import LoginPage from "./Pages/Login"; 
import { ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import CoursePlayer from "./Pages/videos"; 
import Certificates from "./Pages/Certificates"; 
import Certificate from "./Components/Certificate"; 

const App = () => { 
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [groupId, setGoupId] = useState(null); 
  const [overdueCourses, setOverdueCourses] = useState([]); 
  const [loading, setLoading] = useState(true); //  added loading state 
  const [completedCourses, setCompletedCourses] = useState([]); 
  const location = useLocation(); 
  const [courses, setCourses] = useState([]); 

  useEffect(() => { 
    const token = localStorage.getItem("token"); 
    if (token) { 
      setIsAuthenticated(true); 
    } else { 
      setIsAuthenticated(false); 
    } 
    setLoading(false); //  stop loading after token check 
  }, [location]); 

  const hideSidebarRoutes = ["/login", "/signup"]; 
  const showSidebar = isAuthenticated && !hideSidebarRoutes.includes(location.pathname); 

  if (loading) { 
    // 👇 Show loader (to avoid early redirect) 
    return ( 
      <div className="flex items-center justify-center h-screen text-xl font-semibold text-gray-700"> 
        Loading... 
      </div> 
    ); 
  } 

  return ( 
    <div className="flex bg-gray-100 min-h-screen"> 
      {showSidebar && <Sidebar />} 

      <main 
        className={`flex-1 p-6 md:mt-5 sm:mt-5 ${ 
          showSidebar ? "lg:mt-0 lg:ml-64" : "" 
        }`} 
      > 
        <Routes> 
          {/* Public Routes */} 
          <Route path="/signup" element={<Sign />} /> 
          <Route path="/auth/signup" element={<Sign />} /> 
          <Route 
            path="/login" 
            element={<LoginPage setGroupId={setGoupId} groupId={groupId} setIsAuthenticated={setIsAuthenticated}/>} 
          /> 

          {/* Private Routes */} 
          {isAuthenticated ? ( 
            <> 
              <Route path="/" element={<Dashboard  completedCourses={completedCourses} overdueCourses={overdueCourses} courses={courses} setCompletedCourses={setCompletedCourses} setOverdueCourses={setOverdueCourses} setCourses={setCourses}/>} /> 
              <Route 
                path="/todo-training" 
                element={ 
                  <TodoTraning 
                    groupId={groupId} 
                    overdueCourses={overdueCourses} 
                    setOverdueCourses={setOverdueCourses} 
                    completedCourses={completedCourses} 
                    setCompletedCourses={setCompletedCourses}
                    courses={courses}
                    setCourses={setCourses} 
                  /> 
                } 
              /> 
              <Route 
                path="/overdue" 
                element={<Overdue overdueCourses={overdueCourses} />} 
              /> 
              <Route path="/complete-training" element={<Complete completedTrainings={completedCourses}/>} /> 
              <Route path="/setting" element={<Setting />} /> 
              <Route path="/videos/:courseId" element={<CoursePlayer />} /> 
              <Route path="/certificates" element={<Certificates overdueCourses={completedCourses}/>} /> 
            </> 
          ) : ( 
            <Route path="*" element={<Navigate to="/signup" replace />} /> 
          )} 
        </Routes> 
      </main> 

      <ToastContainer position="top-right" /> 
    </div> 
  ); 
}; 

export default App;
