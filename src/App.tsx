import { useState } from 'react'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import { CartProvider } from '@/context/CartContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AgeVerification from '@/components/AgeVerification'
import Home from '@/pages/Home'
import Menu from '@/pages/Menu'
import Cart from '@/pages/Cart'
import About from '@/pages/About'

function Layout() {
  return (
    <>
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
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  )
}
