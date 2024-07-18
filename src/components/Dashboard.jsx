import React from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {
    const user = useSelector((store) => store.user);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
            <div className="text-center p-8 bg-white bg-opacity-20 rounded-lg shadow-lg backdrop-blur-lg">
                <h1 className="text-4xl font-bold mb-4">WELCOME !! {user?.username}</h1>
                <p className="text-lg mb-8">
                    Congratulations! You have successfully been part of creating a simple yet powerful login method using Face ID! 🤳
                </p>
                <button className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition duration-300">
                    <a href='/'>Log Out</a>
                </button>
            </div>
        </div>
    );
}

export default Dashboard;
