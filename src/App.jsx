import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "./contexts/AuthProvider";
import DarkModeGlobal from "./contexts/DarkModeProvider";
import Landing from "./components/Landing/Landing"
import Login from "./components/Login"
import Registro from "./components/Registro"
import Card from "./components/card";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Payment from "./components/Payment";
import CartButton from "./components/cartButton";

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
              <Route path="/Registro" element={<Registro />} />
              <Route path="/Card" element={<Card />} />
              <Route path="/Payment" element={<Payment />} />
              <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                <Route
                  path="/Admin"
                  element={<></>}
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
