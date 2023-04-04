import {BrowserRouter , Routes , Route} from "react-router-dom"
import LoginPage from "./Components/Login_Register/login"
import RegisterPage from "./Components/Login_Register/register"
import HomePage from "./Components/Home/home"

const App = () =>{
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
      <Route path="/home" element={<HomePage/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App