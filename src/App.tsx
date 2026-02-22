import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom'
import { CartProvider } from '@/context/CartContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AgeVerification from '@/components/AgeVerification'
import Home from '@/pages/Home'
import Menu from '@/pages/Menu'
import Cart from '@/pages/Cart'
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

export default function App() {
  const [verified, setVerified] = useState(false)

  return (
    <BrowserRouter>
      <CartProvider>
        <AgeVerification
          isOpen={!verified}
          onVerify={() => setVerified(true)}
          onDeny={() => window.location.href = 'https://google.com'}
        />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  )
}
