import { RouterProvider, createBrowserRouter } from 'react-router-dom'

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

// Create a new react router for page navigation
// Use the root layout as the base and add the routes as children
// (This helps us keep elements like the header on all pages)
const router = createBrowserRouter([
  { 
    path: '/',
    element: <RootLayout />,
    children: [ 
      { path: '/', element: <HomePage /> },
      { path: '/list', element: <ListPage />},
      { path: '/entry/:id', element: <EntryPage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '*', element: <ErrorPage /> }
    ]}
]);
  
// Main app component
function App() {
  return (
    <RouterProvider router={router} />
    )
}

export default App