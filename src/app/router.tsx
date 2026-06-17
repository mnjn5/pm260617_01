import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../components/layout/RootLayout';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import AdminRoute from '../components/layout/AdminRoute';

import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import ProductsPage from '../pages/ProductsPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import InquiryPage from '../pages/InquiryPage';
import CommunityPage from '../pages/CommunityPage';
import PostDetailPage from '../pages/PostDetailPage';
import PostWritePage from '../pages/PostWritePage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import MyPage from '../pages/MyPage';
import AdminPage from '../pages/AdminPage';
import AdminProductsPage from '../pages/admin/AdminProductsPage';
import AdminInquiriesPage from '../pages/admin/AdminInquiriesPage';
import AdminPostsPage from '../pages/admin/AdminPostsPage';
import AdminUsersPage from '../pages/admin/AdminUsersPage';
import NotFoundPage from '../pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'products/:id', element: <ProductDetailPage /> },
      { path: 'inquiry', element: <InquiryPage /> },
      { path: 'community', element: <CommunityPage /> },
      { path: 'community/:id', element: <PostDetailPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'signup', element: <SignupPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: 'mypage', element: <MyPage /> },
          { path: 'community/new', element: <PostWritePage /> },
        ],
      },
      {
        element: <AdminRoute />,
        children: [
          { path: 'admin', element: <AdminPage /> },
          { path: 'admin/products', element: <AdminProductsPage /> },
          { path: 'admin/inquiries', element: <AdminInquiriesPage /> },
          { path: 'admin/posts', element: <AdminPostsPage /> },
          { path: 'admin/users', element: <AdminUsersPage /> },
        ],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
