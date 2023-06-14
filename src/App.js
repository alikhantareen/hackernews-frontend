import HomeScreen from "./Components/HomeScreen";
import SignUp from "./Components/Signup";
import Signin from "./Components/Signin";
import { Routes, Route } from "react-router-dom";
import SinglePostScreen from "./Components/SinglePostScreen";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" exact={true} element={<HomeScreen />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/post/:id" element={<SinglePostScreen />} />
      </Routes>
    </div>
  );
}

export default App;
