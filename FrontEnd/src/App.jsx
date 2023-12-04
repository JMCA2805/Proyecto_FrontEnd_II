import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "./contexts/AuthProvider";
import Landing from "./components/Landing/Landing";
import Login from "./components/Login";
import Registro from "./components/Registro";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Payment from "./components/Payment";
import CartButton from "./components/cartButton";
import HeroBlog from "./components/Blog/HeroBlog";
import Profile from "./components/Profile/Profile";
import Carrito from "./components/carrito";
import { CartProvider } from "./contexts/CartContext";
import MenuAdmin from "./components/Admin/MenuAdmin";
import PWA from "./components/PWA/PWA";
import AnimatedPage from "./components/AnimatedPage";
import Favoritos from "./components/favoritos";
function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
            <BrowserRouter>
              <PWA />
              <Header />
              <Routes>
                <Route
                  path="/"
                  element={
                    <div>
                      <AnimatedPage><Landing /></AnimatedPage>
                    </div>
                  }
                />
                <Route path="/Login" element={<AnimatedPage><Login /></AnimatedPage>} />
                <Route path="/Blog" element={<AnimatedPage><HeroBlog /></AnimatedPage>} />
                <Route path="/Registro" element={<AnimatedPage><Registro /></AnimatedPage>} />
                
                <Route
                  element={<ProtectedRoute allowedRoles={["admin"]} />}
                ></Route>

                <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                <Route path="/Admin" element={<AnimatedPage><MenuAdmin /></AnimatedPage>} />
                </Route>

                <Route
                  element={
                    <ProtectedRoute allowedRoles={["admin", "usuario"]} />
                  }
                >
                 <Route path="/carrito" element={<AnimatedPage><Carrito /></AnimatedPage>} />
                 <Route path="/Profile" element={<AnimatedPage><Profile /></AnimatedPage>} />
                 <Route path="/Favoritos" element={<AnimatedPage><Favoritos /></AnimatedPage>} />
                 <Route path="/Payment" element={<AnimatedPage><Payment /></AnimatedPage>} />
                
                </Route>
              </Routes>
              <Footer />
              <CartButton />
            </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
