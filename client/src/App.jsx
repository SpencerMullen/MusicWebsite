import React, { useState, useEffect } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { getUserStatus } from './utils/requestUtils.js'
// Routes
import RootLayout from './routes/Root.jsx'
import HomePage from './routes/Home.jsx'
import ListPage from './routes/List.jsx'
import EntryPage from './routes/Entry.jsx'
import AboutPage from './routes/About.jsx'
import LoginPage from './routes/Login.jsx'
import ErrorPage from './routes/Error.jsx'

// Font
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Main app component
function App() {
  const [userStatus, setUserStatus] = useState({ isAuthenticated: false });
  const awaitUserStatus = async () => {
    const status = await getUserStatus();
    setUserStatus(status);
  };
  const handleUserStatus = (status) => {
    console.log('User status:', status);
    setUserStatus(status);
  };
  useEffect(() => {
    awaitUserStatus();
  }, []);

  // Create a new react router for page navigation
  // Use the root layout as the base and add the routes as children
  // (This helps us keep elements like the header on all pages)
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout userStatus={userStatus} handleUserStatus={handleUserStatus} />,
      children: [
        { path: '/', element: <HomePage userStatus={userStatus} /> },
        { path: '/list', element: <ListPage userStatus={userStatus} /> },
        { path: '/entry/:id', element: <EntryPage userStatus={userStatus} /> },
        { path: '/about', element: <AboutPage /> },
        { path: '/login', element: <LoginPage userStatus={userStatus} handleUserStatus={handleUserStatus} /> },
        { path: '*', element: <ErrorPage /> }
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App