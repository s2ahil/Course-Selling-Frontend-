import { useState, useEffect } from 'react';
import { BASE_URL } from '../baseUrl';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { toast } from 'react-toastify';
const CoursePublished = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem("adminToken");
      try {
        const response = await fetch(`${BASE_URL}/admin/courses`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
          }
        });
        const data = await response.json();
        setCourses(data.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleEdit = (courseId) => {
    // Navigate to the AdminForm with the course ID passed in the URL
    navigate(`/Admin/Edit/${courseId}`);
  };

  const handleDelete = async (courseId) => {
    const token = localStorage.getItem("adminToken");
    try {
      const response = await fetch(`${BASE_URL}/admin/courses/${courseId}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        // Update the state to remove the deleted course
        setCourses((prevCourses) => prevCourses.filter(course => course._id !== courseId));
        toast("course deleted")
      } else {
        console.error("Failed to delete course:", response.statusText);
        toast("Failed to delete course")
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <div className="course-list">
      <h2 className="text-xl font-bold mb-4">Published Courses</h2>
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
              {course.published ? (
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded">Published</span>
              ) : (
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded">Not Published</span>
              )}

              <div className="flex gap-2 mt-4">
                <button className="text-green-600" onClick={() => handleEdit(course._id)}>
                  Edit
                </button>
                <button className="text-red-600" onClick={() => handleDelete(course._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CoursePublished;
