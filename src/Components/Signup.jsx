import { Link } from "react-router-dom";


const SignUp = () => {
    return (
      <main className="w-full h-screen flex justify-center items-center -mt-[8rem]">
        <div className="form-control w-full max-w-md flex flex-col gap-6">
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
          <button type="submit" className="btn btn-primary">
            Sign up
          </button>
          <p className="w-full max-w-md text-center">
            Already registered?{" "}
            <Link to={`/signin`} className="link link-primary">
              Log in
            </Link>{" "}
            instead
          </p>
        </div>
      </main>
    );
  }


  export default SignUp