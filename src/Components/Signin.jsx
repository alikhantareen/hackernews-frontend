import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Signin = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  function signin() {
    setError('');
    let email = document.querySelector("#email").value;
    let pass = document.querySelector("#pass").value;
    fetch("http://localhost:5050/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: pass }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", data.user.email);
          localStorage.setItem("user_id", data.user._id);
          navigate("/");
        } else {
          setError("Username/Password invalid. Try again.");
        }
      });
  }
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <Navbar />
      <main className="w-full h-screen flex justify-center items-center -mt-[8rem]">
        <div className="form-control w-full max-w-md flex flex-col gap-6 shadow-xl rounded-lg p-4">
          <p className="text-2xl text-slate-900 font-semibold text-center">
            Sign in to your account
          </p>
          {
            error ? <p className="text-red-500 text-center">{error}</p> : ''
          }
          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              id="email"
              type="text"
              placeholder="Type your email here"
              className="input input-bordered w-full max-w-md"
              required
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              id="pass"
              type="password"
              placeholder="Type your password here"
              className="input input-bordered w-full max-w-md"
              required
            />
          </div>
          <button onClick={signin} className="btn btn-primary" type="submit">
            Sign in
          </button>
          <p className="max-w-md text-center">
            Not yet registered?{" "}
            <Link to={`/signup`} className="link link-primary">
              Sign up
            </Link>{" "}
            instead
          </p>
        </div>
      </main>
    </>
  );
};

export default Signin;
