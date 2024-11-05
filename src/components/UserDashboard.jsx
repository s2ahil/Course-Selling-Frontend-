import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userEmailState } from '../store/selectors/userEmail';
import { BASE_URL } from '../baseUrl';

const UserDashboard = () => {
  const userEmail = useRecoilValue(userEmailState);
  const [purchasedCourses, setPurchasedCourses] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("userToken");

    // Fetch purchased courses
    const fetchPurchasedCourses = async () => {
      try {
        const response = await fetch(`${BASE_URL}/user/purchasedCourses`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log(data)
        setPurchasedCourses(data.purchasedCourses.map(course => course.course)); // Store purchased courses
      } catch (error) {
        console.error("Error fetching purchased courses:", error);
      }
    };

    fetchPurchasedCourses();
  }, []);


  
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Purchased Courses</h2>
      {purchasedCourses.length === 0 ? (
        <p>No purchased courses found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {purchasedCourses.map((course) => (
            <div key={course._id} className="border rounded p-4 shadow">
              <img
                className="w-full h-48 object-cover mb-4"
                src={course.imageLink || "default-image-url"}
                alt={course.title}
              />
              <h3 className="text-lg font-semibold">{course.title}</h3>
              <p className="text-gray-700">{course.description}</p>
              <p className="text-green-600 font-bold">${course.price}</p>
              <p className="text-gray-500">Already Purchased</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
