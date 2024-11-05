import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CourseIcon from "../svg/course.svg";
import { toast } from "react-toastify";
import { useSetRecoilState } from "recoil";
import { adminState } from "../store/atoms/admin";
import { BASE_URL } from "../baseUrl";
const AdminSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // To navigate to another page on success
  const setAdmin = useSetRecoilState(adminState);
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/admin/signup`, {
        username: email,
        password: password
      });

      if (response.data.token) {
        // Handle successful signup (e.g., store token and redirect)
        localStorage.setItem("adminToken", response.data.token);
        localStorage.removeItem("userToken");
        setAdmin({
          adminEmail: email,
          isLoading: false
      })
        toast.success("Admin Signup successful!"); // Toast for success
     
        navigate("/Admin/CoursePublished");// Redirect to admin dashboard or any page you want
      } else {
        setErrorMessage(response.data.message || "Admin Signup failed");
        toast.error(response.data.message || "Admin Signup failed"); // Toast for failure
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "An error occurred during signup");
    }
  };

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
            Admin <span className="bg-yellow-400 p-2">Signup</span> With New Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSignup}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
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
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminSignup;
