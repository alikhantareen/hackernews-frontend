import HomeScreen from "./Components/HomeScreen";
import SignUp from "./Components/Signup";
import Signin from "./Components/Signin";
import { Routes, Route } from "react-router-dom";
import SinglePostScreen from "./Components/SinglePostScreen";
import Profile from './Components/Profile';
import AddPost from './Components/AddPost'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" exact={true} element={<HomeScreen />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/post/:id" element={<SinglePostScreen />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/addpost" element={<AddPost />} />
      </Routes>
    </div>
  );
}

export default App;
