import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const SignUp = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  function signup() {
    let email = document.querySelector("#email").value;
    let pass = document.querySelector("#pass").value;
    fetch("http://localhost:5050/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: pass }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "User already registered") {
          setError("User already registered");
          return;
        }
        if(data.message === "Please Provide Required Information") {
          setError("Please Provide Required Information");
          return;
        }
        if (data.message === "User created Successfully") {
          signIn(email, pass);
        }
      });
  }
  function signIn(email, pass) {
    fetch("http://localhost:5050/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: pass }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "User does not exist..!") {
          setError("User does not exist..!");
          return;
        }
        if (data.message === "Something went wrong!") {
          setError("Something went wrong!");
          return;
        }
        if (data.token) {
          let user = data.user.email;
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", user.split('@')[0]);
          navigate("/");
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
          <p className="text-2xl text-slate-900 font-semibold text-center">Sign up for an account</p>
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
              name="email"
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
              name="password"
            />
          </div>
          <button onClick={signup} type="submit" className="btn btn-primary">
            Sign up
          </button>
          <p className="w-full max-w-md text-center">
            Already registered?{" "}
            <Link to={`/login`} className="link link-primary">
              Log in
            </Link>{" "}
            instead
          </p>
        </div>
      </main>
    </>
  );
};

export default SignUp;
