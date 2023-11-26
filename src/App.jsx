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
              <Route path="/Payment" element={<Payment />} />
              <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                <Route
                  path="/Admin"
                  element={
                    <div>
                      <TablaArt></TablaArt>
                    </div>
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
