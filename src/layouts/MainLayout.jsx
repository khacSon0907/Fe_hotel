import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet, useLocation } from 'react-router-dom'
import '../styles/layouts/MainLayout.scss'

export default function MainLayout() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="main-layout">
      <Header />
      <div className={`page-content ${isHome ? 'home-page' : ''}`}>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
