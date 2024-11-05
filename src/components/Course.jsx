import { useEffect, useState } from 'react';
import { userEmailState } from '../store/selectors/userEmail';
import { useRecoilValue } from 'recoil';
import { BASE_URL } from '../baseUrl';

const Course = () => {
  const userEmail = useRecoilValue(userEmailState);
  const [courses, setCourses] = useState([]);
  const [purchasedCourses, setPurchasedCourses] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
  
    // Verify token exists
    if (!token) {
      console.error("User token is missing");
      return;
    }
  
    // Fetch all courses
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${BASE_URL}/user/courses`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setCourses(data.courses || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
  
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
        setPurchasedCourses(data.purchasedCourses.map(course => course.course._id));
        // console.log("Purchased Courses:", data.purchasedCourses.map(course => course));  // Check the structure here
      } catch (error) {
        console.error("Error fetching purchased courses:", error);
      }
    };
  
    // Fetch both lists
    fetchCourses();
    fetchPurchasedCourses();
  }, []);
  

  const handlePurchase = async (courseId) => {
    const token = localStorage.getItem("userToken");

    try {
      const response = await fetch(`${BASE_URL}/user/courses/${courseId}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`,
        },
      });
      const data = await response.json();
      
      if (response.ok) {
        alert(data.message);
        setPurchasedCourses([...purchasedCourses, courseId]);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error purchasing course:", error);
    }
  };



  return (
    <div>
     { console.log("yaha kuch",purchasedCourses)}
      {userEmail ? (
        <div>
          <div className="course-list">
            <h2 className="text-xl font-bold mb-4">Courses</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.length === 0 ? (
                <p>No courses available</p>
              ) : (
                courses.map((course) => (
                  <div key={course._id} className="border rounded p-4 shadow">
                    <img
                      className="w-full h-48 object-cover mb-4"
                      src={course.imageLink || "default-image-url"}
                      alt={course.title}
                    />
                    <h3 className="text-lg font-semibold">{course.title}</h3>
                    <p className="text-gray-700">{course.description}</p>
                    <p className="text-green-600 font-bold">${course.price}</p>

                    {purchasedCourses.includes(course._id) ? (
                      <p className="text-gray-500">Already Purchased</p>
                    ) : (
                      <button
                        onClick={() => handlePurchase(course._id)}
                        className="text-green-900 font-bold"
                      >
                        Buy Course
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>Login First</div>
      )}
    </div>
  );
};

export default Course;
