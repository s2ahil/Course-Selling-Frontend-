import AdminForm from "./AdminForm";
import { BASE_URL } from "../baseUrl";
const CreateCourse = () => {
    const handleCreate = async (courseData) => {
        const token = localStorage.getItem("adminToken");

        try {
            const response = await fetch(`${BASE_URL}/admin/courses`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(courseData),
            });

            const result = await response.json();
            if (response.ok) {
                alert("Course created successfully");
            } else {
                alert("Error creating course: " + result.message);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to create course");
        }
    };

    return <AdminForm onSubmit={handleCreate} buttonText="Create" />;
};

export default CreateCourse;
