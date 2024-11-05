import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from "react-router-dom";
import Courseicon from "../svg/course.svg";
import {
  RecoilRoot,
  useSetRecoilState,// second function 
  useRecoilValue,
  useRecoilState

} from 'recoil';
import { userEmailState } from '../store/selectors/userEmail';
import { userState } from '../store/atoms/user';
import { isUserLoading } from '../store/selectors/isUserLoading';
import { adminEmailState } from '../store/selectors/adminEmail';
import { adminState } from '../store/atoms/admin';
import { isAdminLoading } from '../store/selectors/isAdminLoading';


const navigation = [
  { name: 'HomePage', href: '/', current: true },
  { name: 'Courses', href: '/course', current: false },
  { name: 'Login', href: '/login', current: false },
  { name: 'Signup', href: '/signup', current: false },
  { name: 'Admin', href: '/Admin', current: false },
  { name: 'Dashboard', href: '/dashboard', current: false }
];

const AdminDashboard = [
  { name: 'Analytics', href: '/Admin/Analytics' },
  { name: 'Create Course', href: '/Admin/CreateCourse' },
  { name: 'Published Course', href: '/Admin/CoursePublished' }
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Appbar = () => {
  const userLoading = useRecoilValue(isUserLoading);
  const userEmail = useRecoilValue(userEmailState)
  // const setUser = useSetRecoilState(userState)

  const adminLoading = useRecoilValue(isAdminLoading)
  const adminEmail = useRecoilValue(adminEmailState)//selector


  console.log("admin email", adminEmail)




  if (adminEmail) {
    return <>    <AdminPart /></>
  } else {//default show this :
    return <>
      <UserPart></UserPart>
    </>//
  }



}
const UserPart = () => {
  const userEmail = useRecoilValue(userEmailState); // Get the user email from Recoil
  const navigate = useNavigate()
  const setUser = useSetRecoilState(userState)
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          {userEmail && (
            <div className="p-4 text-sm font-medium flex justify-center text-white">Welcome, {userEmail}</div>)}

          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img className="h-8 w-8 bg-white" src={Courseicon} alt="Top Notch" />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4 items-center">
                      {navigation.map((item) => (
                        // Only show "Login" and "Signup" when user is not logged in (no userEmail)
                        (!userEmail || (item.name !== "Login" && item.name !== "Signup")) && (
                          <Link
                            key={item.name}
                            to={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "rounded-md px-3 py-2 text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </Link>
                        )
                      ))}

                      {/* Show the Logout button if the user is logged in */}
                      {userEmail && (
                        <button
                          className="rounded-md px-3 py-2  bg-red-800 text-white p-3 "
                          onClick={() => {
                            localStorage.removeItem("adminToken");
                            setUser({
                              isLoading: false,
                              userEmail: null,
                            });
                            navigate("/");
                          }}
                        >
                          Logout
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">

            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </Disclosure.Panel>

        </>
      )}
    </Disclosure>
  );



};



const AdminPart = () => {
  const setAdmin = useSetRecoilState(adminState);
  const navigate = useNavigate();
  const adminEmail = useRecoilValue(adminEmailState); // selector

  return (
    <Disclosure as="nav" className="bg-yellow-200">
      {({ open }) => (
        <>
          <div className="p-4">
            <div className="flex justify-between items-center">
              {/* Admin Email */}
              {adminEmail && (
                <span className="text-gray-800 font-medium text-lg">
                  Hello, {adminEmail}
                </span>
              )}

              {/* Hamburger button for small screens */}
              <div className="sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:bg-yellow-300 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500">
                  <span className="sr-only">Open admin dashboard menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              {/* Logout Button */}
              <button
                className="hidden sm:block bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                onClick={() => {
                  localStorage.removeItem("adminToken");
                  setAdmin({
                    isLoading: false,
                    adminEmail: null,
                  });
                  navigate("/");
                }}
              >
                Logout
              </button>
            </div>
          </div>

          {/* Admin Dashboard Links for larger screens */}
          <div className="hidden sm:flex flex-wrap gap-4 p-4 bg-yellow-300">
            {AdminDashboard.map((item) => (
              <Link
                key={item.name}
                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition-colors"
                to={item.href}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Admin Dashboard Links for small screens */}
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 bg-yellow-300">
              {AdminDashboard.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-400 hover:text-white"
                >
                  {item.name}
                </Link>
              ))}

              <button
                className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors mt-4"
                onClick={() => {
                  localStorage.removeItem("adminToken");
                  setAdmin({
                    isLoading: false,
                    adminEmail: null,
                  });
                  navigate("/");
                }}
              >
                Logout
              </button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Appbar;