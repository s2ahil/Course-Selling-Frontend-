
import { Link, useNavigate } from "react-router-dom";
import CourseIcon from "../svg/course.svg"
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { adminState } from "../store/atoms/admin";
import { useSetRecoilState } from "recoil";
import { BASE_URL } from "../baseUrl";

const AdminLogin = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // To navigate to another page on success
  const setAdmin = useSetRecoilState(adminState);

  const handleLogin = async (e) => {

    e.preventDefault();

    try {


      const response = await axios.post(`${BASE_URL}/admin/login`, {
        username: email,
        password
      })


      if (response.data.token) {
        localStorage.setItem("adminToken", response.data.token);
        localStorage.removeItem("userToken");
        setAdmin({
          adminEmail: email,
          isLoading: false
      })
        toast.success("Admin Login successful!"); // Toast for success
        navigate("/Admin/CoursePublished");

      } else {
        setErrorMessage(response.data.message || "User Login failed")
        toast.error(response.data.message || "User Login failed"); // Toast for failure
      }

    }
    catch (err) {

      setErrorMessage(err.response?.data?.message || "An error occurred during login")
      toast.error(err.response?.data?.message || "An error occurred during login")


    }

  }

  return (
    <div>

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
            className="mx-auto h-10 w-auto"
            src={CourseIcon}
            alt="SkillNest"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Admin <span className="bg-yellow-400 p-2">Login</span> in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>

              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  autoComplete="current-password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                />
              </div>
            </div>

            {errorMessage && (
              <p className="text-red-500 text-sm">{errorMessage}</p>
            )}


            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Log in now
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}

export default AdminLogin