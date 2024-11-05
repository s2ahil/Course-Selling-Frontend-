import { useState, useEffect } from "react";

const AdminForm = ({ initialData = {}, onSubmit, buttonText = "" }) => {
    const [title, setTitle] = useState(initialData.course?.title || "");
    const [description, setDescription] = useState(initialData.course?.description || "");
    const [image, setImage] = useState(initialData.course?.imageLink || "");
    const [video, setVideo] = useState(initialData.course?.video || "");
    const [price, setPrice] = useState(initialData.course?.price || 0);
    const [published, setPublished] = useState(initialData.course?.published || false);

    const handleSubmit = async () => {
        const courseData = {
            title,
            description,
            imageLink: image,
            video,
            price,
            published,
        };

        onSubmit(courseData);  // Pass the form data to the parent component's onSubmit handler
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-10">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6">{buttonText} Course</h1>
                <div className="flex flex-col justify-start gap-4">
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="text"
                        placeholder="Image URL"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="text"
                        placeholder="Video URL"
                        value={video}
                        onChange={(e) => setVideo(e.target.value)}
                        className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="number"
                        placeholder="Price"
                        min={0}
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <div className="flex gap-4 items-center">
                        <input
                            className="w-[2rem] h-[2rem]"
                            type="checkbox"
                            checked={published}
                            onChange={() => setPublished(!published)}
                        />
                        <span>Publish</span>
                    </div>

                    <button
                        className="bg-blue-500 text-white rounded-lg p-3 mt-4 hover:bg-blue-600 transition duration-300"
                        onClick={handleSubmit}
                    >
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminForm;
