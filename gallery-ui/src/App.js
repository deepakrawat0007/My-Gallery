import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "./Components/Login_Register/login"
import RegisterPage from "./Components/Login_Register/register"
import HomePage from "./Components/Home/home"
import { ToastContextProvider } from "./Components/Home/context/ToastContext"

const App = () => {
  return (
    <BrowserRouter>
      <ToastContextProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </ToastContextProvider>
    </BrowserRouter>
  )
}

export default App