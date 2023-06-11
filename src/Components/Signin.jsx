import { Link } from "react-router-dom";

const Signin = () => {
  return (
    <main className="w-full h-screen flex justify-center items-center -mt-[8rem]">
      <div className="form-control w-full max-w-md flex flex-col gap-6">
        <div>
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
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
            type="password"
            placeholder="Type your password here"
            className="input input-bordered w-full max-w-md"
            required
          />
        </div>
        <button className="btn btn-primary" type="submit">
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
  );
};

export default Signin;
