import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "./contexts/AuthProvider";
import DarkModeGlobal from "./contexts/DarkModeProvider";
import Landing from "./components/Landing/Landing"
import Login from "./components/Login"
import Registro from "./components/Registro"
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Payment from "./components/Payment";
import CartButton from "./components/cartButton";
import HeroBlog from "./components/Blog/HeroBlog"
import TablaArt from "./components/Admin/TablaArt"
import Profile from "./components/Profile"
import TablaOffers from "./components/Admin/Tablaoffers";
import Carrito from "./components/carrito"
import Card from "./components/card"
import CrearProduct from "./components/CrearProduct"


function App() {
  return (
    <>
      <AuthProvider>
        <DarkModeGlobal>
          <BrowserRouter>
            <Header />
            <Routes>

              <Route path="/" element={<Landing />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Blog" element={ <HeroBlog />} />
             

              <Route path="/Registro" element={<Registro />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/Card" element={<Card />} />
              <Route path="/CrearP" element={<CrearProduct />} />
              <Route path="/Payment" element={<Payment />} />
              <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                <Route
                  path="/Admin"
                  element={
                    <>
                      <TablaArt />
                      <TablaOffers />
                    </>
                  }
                />
              </Route>
            </Routes>
            <Footer />
            <CartButton />
          </BrowserRouter>
        </DarkModeGlobal>
      </AuthProvider>
    </>
  );
}

export default App;
