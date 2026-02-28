import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Outlet, useLocation, Navigate } from 'react-router-dom'
import { ModeProvider, useMode } from '@/context/ModeContext'
import { CartProvider } from '@/context/CartContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AgeVerification from '@/components/AgeVerification'
import Landing from '@/pages/Landing'
import Home from '@/pages/Home'
import Menu from '@/pages/Menu'
import Cart from '@/pages/Cart'
import Checkout from '@/pages/Checkout'
import Confirmation from '@/pages/Confirmation'
import About from '@/pages/About'
import Contact from '@/pages/Contact'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function Layout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

function AppRoutes() {
  const { mode } = useMode()

  return (
    <Routes>
      <Route path="/" element={mode ? <Navigate to="/home" replace /> : <Landing />} />
      <Route element={<Layout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  )
}

export default function App() {
  const [verified, setVerified] = useState(false)

  return (
    <BrowserRouter>
      <ModeProvider>
        <CartProvider>
          <AgeVerification
            isOpen={!verified}
            onVerify={() => setVerified(true)}
            onDeny={() => window.location.href = 'https://google.com'}
          />
          <AppRoutes />
        </CartProvider>
      </ModeProvider>
    </BrowserRouter>
  )
}
