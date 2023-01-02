import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom';

import Root from './components/root.jsx';
import Error from './components/error.jsx';
import Profile from './components/profile.jsx';
import Login from './components/login.jsx';
import CreatePet from './components/createPet';

import './styles.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    errorElement: <Error/>,
    children: [
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/',
        element: <Profile/>
      },
      {
        path: '/createPet',
        element: <CreatePet/>
      }
    ]
  }
]);


// ReactDOM.createRoot(document.getElementById('root')).render(
//   // <React.StrictMode>
//     // <App/>
//     <RouterProvider router={router} />
//   // </React.StrictMode>,
// )

ReactDOM.render(
  <RouterProvider router={router} />,
  document.getElementById('root')
);
