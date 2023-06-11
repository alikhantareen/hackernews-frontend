import HomeScreen from "./Components/HomeScreen";
import Navbar from "./Components/Navbar";
import SignUp from "./Components/Signup";
import Signin from "./Components/Signin";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" exact={true} element={<HomeScreen />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </div>
  );
}

export default App;
