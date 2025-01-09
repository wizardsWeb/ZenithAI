import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout, AuthLayout } from './routes/Layout';
import SignIn from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import LoadingPage from './pages/LoadingPage';
import ProfilePage from './pages/ProfilePage';
// import ARMeditationPage from './pages/ArMeditationPage';
import CategorySection from './pages/CategorySection';
import ArticleListPage from './pages/ArticleListPage';
import Blogs from './pages/Blogs';
import BlogsDescription from './pages/BlogsDescription';
import Games from './pages/Games';
import Home from './pages/Home';


import Chat from './pages/Chat';
import FaceDetectionPage from './pages/FaceDetection';
import ARMeditationPage from './pages/ArMeditationPage';
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
        },
        {
          path: "/articles",
          element: <CategorySection />
        },
        {
          path: "/articles/:category/:subcategory",
          element: <ArticleListPage />
        },
        {
          path: "/blogs",
          element: <Blogs />,
        },
        {
          path: "/description",
          element: <BlogsDescription />,
        },
        {
          path: "/games",
          element: <Games />,
        },
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App