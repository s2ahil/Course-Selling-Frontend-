import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // To get courseId from the URL
import AdminForm from './AdminForm'; // Assuming AdminForm is in the same folder
import { BASE_URL } from '../baseUrl'; // Assuming you have a base URL for your API
import { toast } from 'react-toastify';
const EditAdminCourse = () => {
    const { courseId } = useParams(); // Get the course ID from the URL
    const [courseData, setCourseData] = useState(null); // State to store fetched course data
    const [loading, setLoading] = useState(true); // To show a loading state while fetching data

    useEffect(() => {
        // Fetch course data only if there's a courseId (i.e., we're in edit mode)
        if (courseId) {
            const fetchCourse = async () => {
                const token = localStorage.getItem('adminToken'); // Get token from local storage
                try {
                    const response = await fetch(`${BASE_URL}/admin/courses/${courseId}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                    });
                    const data = await response.json();
                    setCourseData(data); // Populate the form with the course data
                } catch (error) {
                    console.error('Error fetching course:', error);
                } finally {
                    setLoading(false);
                }
            };
            fetchCourse();
        } else {
            setLoading(false);
        }
    }, [courseId]);



    const handleFormSubmit = async (updatedCourseData) => {
        const token = localStorage.getItem('adminToken');
        const url = `${BASE_URL}/admin/courses/${courseId}`;

        try {
            const response = await fetch(url, {
                method:  'PATCH' ,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(updatedCourseData),
            });

            const result = await response.json();
            if (response.ok) {
                toast(`Course  'updated' `);
            } else {
                toast('Error:', result.message);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Show a loading message while fetching data
    }

    return (
        <div>
          
            <AdminForm
                initialData={courseData } // If there's courseData, pass it. Otherwise, pass an empty object.
                onSubmit={handleFormSubmit}
                buttonText="Update" 
            />
        </div>
    );
};

export default EditAdminCourse;
