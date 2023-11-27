import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
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
import TablaArt from "./components/Admin/TablaArt";
import Profile from "./components/Profile";
import TablaOffers from "./components/Admin/Tablaoffers";
import Carrito from "./components/carrito";
import Card from "./components/card";
import UserTable from "./components/Admin/TablaUsers";
import TablaProductos from "./components/Admin/TablaProductos"

function App() {

  const [showTablaArt, setShowTablaArt] = useState(false);
  const [showTablaOffers, setShowTablaOffers] = useState(false);
  const [showUserTable, setShowUserTable] = useState(false);
  const [showTablaProductos, setShowTablaProductos] = useState(false);

  
  return (
    <>
      <AuthProvider>
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
    path="/Admin"
    element={
      <div>
        <div className="flex justify-center mb-4 mt-4">
          <div className="flex flex-col items-center gap-4">
            <button
              className={`block md:inline-block rounded-md p-2 text-white font-bold bg-azul focus:outline-none focus:text-white border-b-4 ${
                showTablaArt ? 'border-azulO' : 'border-azul'
              } dark:border-azulO/70 ${
                showTablaArt ? 'hover:bg-azulC' : 'hover:bg-azul'
              } focus-within:bg-azulO`}
              onClick={() => {
                setShowTablaArt(!showTablaArt);
                setShowTablaOffers(false);
                setShowUserTable(false);
                setShowTablaProductos(false);
              }}
            >
              Mostrar/ocultar TablaArt
            </button>
            <button
              className={`block md:inline-block rounded-md p-2 text-white font-bold bg-azul focus:outline-none focus:text-white border-b-4 ${
                showTablaOffers ? 'border-azulO' : 'border-azul'
              } dark:border-azulO/70 ${
                showTablaOffers ? 'hover:bg-azulC' : 'hover:bg-azul'
              } focus-within:bg-azulO`}
              onClick={() => {
                setShowTablaOffers(!showTablaOffers);
                setShowTablaArt(false);
                setShowUserTable(false);
                setShowTablaProductos(false);
              }}
            >
              Mostrar/ocultar TablaOffers
            </button>
            <button
              className={`block md:inline-block rounded-md p-2 text-white font-bold bg-azul focus:outline-none focus:text-white border-b-4 ${
                showUserTable ? 'border-azulO' : 'border-azul'
              } dark:border-azulO/70 ${
                showUserTable ? 'hover:bg-azulC' : 'hover:bg-azul'
              } focus-within:bg-azulO`}
              onClick={() => {
                setShowUserTable(!showUserTable);
                setShowTablaArt(false);
                setShowTablaOffers(false);
                setShowTablaProductos(false);
              }}
            >
              Mostrar/ocultar UserTable
            </button>
            <button
              className={`block md:inline-block rounded-md p-2 text-white font-bold bg-azul focus:outline-none focus:text-white border-b-4 ${
                showTablaProductos ? 'border-azulO' : 'border-azul'
              } dark:border-azulO/70 ${
                showTablaProductos ? 'hover:bg-azulC' : 'hover:bg-azul'
              } focus-within:bg-azulO`}
              onClick={() => {
                setShowTablaProductos(!showTablaProductos);
                setShowTablaArt(false);
                setShowTablaOffers(false);
                setShowUserTable(false);
              }}
            >
              Mostrar/ocultar TablaProductos
            </button>
          </div>
        </div>
          <div>
            {showTablaArt && <TablaArt />}
            {showTablaOffers && <TablaOffers />}
            {showUserTable && <UserTable />}
            {showTablaProductos && <TablaProductos />}
        </div>
      </div>
    }
  />
              
              <Route
                element={<ProtectedRoute allowedRoles={["admin", "usuario"]} />}
              >
                <Route
                  path="/carrito"
                  element={
                    <Carrito/>
                  }
                />
                <Route
                  path="/Profile"
                  element={
      
                      <Profile />

                  }
                />
                <Route
                  path="/Payment"
                  element={
      
                      <Payment/>

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
