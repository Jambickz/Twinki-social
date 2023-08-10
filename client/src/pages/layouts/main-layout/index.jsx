import { Header } from './components/Header.jsx'
import { Aside } from './components/Aside.jsx'
import { Footer } from './components/Footer.jsx'
import { Outlet } from 'react-router-dom'

export const MainLayout = () => {
  return (
    <>
      <Header />
      <Aside />
      <Outlet />
      <Footer />
    </>
  )
}
