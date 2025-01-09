import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout, AuthLayout } from './routes/Layout';
import SignIn from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import LoadingPage from './pages/LoadingPage';
import ProfilePage from './pages/ProfilePage';

import Home from './pages/Home';

import Chat from './pages/Chat';
import FaceDetectionPage from './pages/FaceDetection';
import ARMeditationPage from './pages/ARMeditationPage';
const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <LoadingPage />
        },
        {
          path: '/sign-in',
          element: <SignIn />
        },
        {
          path: '/sign-up',
          element: <SignUpPage />
        }
      ]
    },
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        {
          path: "/home",
          element: <Home />
        },
        {
          path: "/profile",
          element: <ProfilePage />
        },
        {
          path: "/ar-meditation",
          element: <ARMeditationPage />
        },
        {
          path: "/face-detection",
          element: <FaceDetectionPage />
        },
        {
          path: "/chat",
          element: <Chat />
        }

      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
