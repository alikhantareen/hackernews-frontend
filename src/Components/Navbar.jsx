import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <Link to={`/`}>
          <p className="btn btn-ghost normal-case text-xl">HackerNews</p>
        </Link>
      </div>
      <div className="navbar-end">
        <Link to={`/signup`}>
          <button className="btn btn-primary">Sign In</button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
