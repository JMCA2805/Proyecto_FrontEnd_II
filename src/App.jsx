import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "./contexts/AuthProvider";
import DarkModeGlobal from "./contexts/DarkModeProvider";
import Home from "./components/Home"
import Login from "./components/Login"
import Registro from "./components/Registro"

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <AuthProvider>
        <DarkModeGlobal>
          <BrowserRouter>
            {/* <Header /> */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Registro" element={<Registro />} />

              <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                <Route
                  path="/Admin"
                  element={<Home />}
                />
              </Route>


            </Routes>
            {/* <Footer /> */}
          </BrowserRouter>
        </DarkModeGlobal>
      </AuthProvider>
    </>
  );
}

export default App;
