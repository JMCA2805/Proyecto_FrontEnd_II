import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "./contexts/AuthProvider";
import DarkModeGlobal from "./contexts/DarkModeProvider";
import Home from "./components/Home";
import Header from "./components/Header/Header";
function App() {
  return (
    <>
      <AuthProvider>
        <DarkModeGlobal>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
            {/* <Footer /> */}
          </BrowserRouter>
        </DarkModeGlobal>
      </AuthProvider>
    </>
  );
}

export default App;
