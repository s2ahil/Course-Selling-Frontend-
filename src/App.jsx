import { useState, useEffect } from 'react'

import { Appbar, Front, Course, Login, Signup, Admin, CoursePublished, CreateCourse, AdminAnalytics, EditAdminCourse, UserDashboard, NotFound, UnauthorizedMessage } from "./components/ManagePages.js"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  RecoilRoot,

  useRecoilState
} from 'recoil';
import axios from 'axios';
import { BASE_URL } from './baseUrl.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { userState } from './store/atoms/user.js';
import { adminState } from './store/atoms/admin.js';
import { useNavigate } from 'react-router-dom';


function App() {


  return (
    <>
      <RecoilRoot>
        <Router >
          <ToastContainer />
          <Appbar></Appbar>
          <InitUser></InitUser>
          <Routes>
            <Route path="/" element={<Front></Front>} />
            <Route path="/course" element={<Course></Course>} />
            <Route path="/signup" element={<Signup></Signup>} />
            <Route path="/login" element={<Login></Login>} />
            <Route path="/Dashboard" element={<UserDashboard></UserDashboard>} />
            <Route path="/Admin" element={<Admin></Admin>} />
            {/* Protected Admin Routes */}
            <Route
              path="/Admin/CoursePublished"
              element={<ProtectedRoute isAdmin={true} component={<CoursePublished />} />}
            />
            <Route
              path="/Admin/CreateCourse"
              element={<ProtectedRoute isAdmin={true} component={<CreateCourse />} />}
            />
            <Route
              path="/Admin/Analytics"
              element={<ProtectedRoute isAdmin={true} component={<AdminAnalytics />} />}
            />
            <Route
              path="/Admin/Edit/:courseId"
              element={<ProtectedRoute isAdmin={true} component={<EditAdminCourse />} />}
            />
            <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 page */}



          </Routes>

        </Router>
      </RecoilRoot>
    </>
  )
}


function ProtectedRoute({ isAdmin, component }) {
  const [user] = useRecoilState(userState);
  const [admin] = useRecoilState(adminState);

  const isAuthenticated = isAdmin ? admin.adminEmail : false;

  return isAuthenticated ? component : <UnauthorizedMessage />;
}



function InitUser() {
  const [user, setUser] = useRecoilState(userState);
  const [admin, setAdmin] = useRecoilState(adminState);
  const navigate = useNavigate()
  const init = async () => {

    if (localStorage.getItem("adminToken")) {


      try {
        const response = await axios.get(`${BASE_URL}/admin/me`, {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("adminToken")
          }
        })

        if (response.data.username) {
          setAdmin({
            isLoading: false,
            adminEmail: response.data.username
          })

          navigate("/Admin/CoursePublished")



        } else {
          setAdmin({
            isLoading: false,
            adminEmail: null
          })
        }


      } catch (e) {

        setAdmin({
          isLoading: false,
          adminEmail: null
        })
      }

    } else {

      // for user
      try {
        const response = await axios.get(`${BASE_URL}/user/me`, {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("userToken")
          }
        })

        if (response.data.username) {
          setUser({
            isLoading: false,
            userEmail: response.data.username
          })
        } else {
          setUser({
            isLoading: false,
            userEmail: null
          })
        }


      } catch (e) {

        setUser({
          isLoading: false,
          userEmail: null
        })
      }

    }
  };

  useEffect(() => {
    init();
  }, []);

  return <></>
}

export default App
