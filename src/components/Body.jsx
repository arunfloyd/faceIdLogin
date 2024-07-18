import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SignUp from './SignUp';
import Login from './Login';
import Dashboard from './Dashboard';


const Body = () => {
    const appRouter = createBrowserRouter([
        {
            path: '/',
            element: <SignUp />
        },
        {
            path: '/login',
            element: <Login />
        }, {
            path: '/dashboard',
            element: <Dashboard />
        }
    ]);

    return (
        <div>
            <RouterProvider router={appRouter} />
        </div>
    );
};

export default Body;
