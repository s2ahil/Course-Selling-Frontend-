import  { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { BASE_URL } from '../baseUrl';
const PurchaseAnalytics = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const token = localStorage.getItem('adminToken'); // Adjust this according to where your token is stored

                const response = await axios.get(`${BASE_URL}/admin/courses/analytics`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                    },
                });

                setData(response.data);
                
                console.log(response.data); // Log the response data directly
            } catch (error) {
                console.error("Error fetching analytics:", error);
            }
        };

        fetchAnalytics();
    }, []);

    return (
        <div className="w-full h-96 bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Course Purchases</h2>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="purchases" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default PurchaseAnalytics;
