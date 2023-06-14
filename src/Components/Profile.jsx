import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return
    }
    setUser(localStorage.getItem("user").split("@")[0].toUpperCase());
  }, []);
  return (
    <>
      <Navbar />
      <main className="w-full p-8">
        <div>
          <span className="text-2xl font-bold">Hello,</span>{" "}
          <span className="text-2xl font-semibold">{user}</span>
        </div>
      </main>
    </>
  );
};

export default Profile;
