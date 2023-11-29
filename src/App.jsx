import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "./contexts/AuthProvider";
import DarkModeGlobal from "./contexts/DarkModeProvider";
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
import Card from "./components/card";
import { CartProvider } from "./contexts/CartContext";
import MenuAdmin from "./components/Admin/MenuAdmin";

function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <DarkModeGlobal>
            <BrowserRouter>
              <Header />
              <Routes>
                <Route
                  path="/"
                  element={
                    <div>
                      <Landing />
                    </div>
                  }
                />
                <Route path="/Login" element={<Login />} />
                <Route path="/Blog" element={<HeroBlog />} />
                <Route path="/Registro" element={<Registro />} />

                <Route
                  element={<ProtectedRoute allowedRoles={["admin"]} />}
                ></Route>

                <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                  <Route path="/Admin" element={<MenuAdmin />} />
                </Route>

                <Route
                  element={
                    <ProtectedRoute allowedRoles={["admin", "usuario"]} />
                  }
                >
                  <Route path="/carrito" element={<Carrito />} />
                  <Route path="/Profile" element={<Profile />} />
                  <Route path="/Payment" element={<Payment />} />
                </Route>
              </Routes>
              <Footer />
              <CartButton />
            </BrowserRouter>
          </DarkModeGlobal>
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
