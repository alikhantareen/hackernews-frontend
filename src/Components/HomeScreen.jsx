import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const HomeScreen = () => {
  const navigate = useNavigate();
  const [authenticated, setauthenticated] = useState(null);
  const [dataState, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  function fetchData() {
    fetch("http://localhost:5050/")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }
  useEffect(() => {
    fetchData();
    const loggedInUser = localStorage.getItem("token");
    if (loggedInUser) {
      setauthenticated(loggedInUser);
    }
  }, []);
  function addupvote() {
    if (authenticated) {
      alert("upvoted");
    } else {
      navigate("/login");
    }
  }
  return (
    <>
      <Navbar />
      <main className="w-full p-8">
        {loading ? (
          <p>Loading...</p>
        ) : (
          dataState.map((elem, index) => {
            return (
              <div className="flex flex-col gap-2 mb-4 shadow-md p-4 rounded-md">
                <Link to={`/post/${elem._id}`}>
                  <p className="text-xl text-slate-800">
                    {index + 1}. {elem.title}
                  </p>
                </Link>
                <div>
                  <p>
                    {elem.upVote.length} points | created at {elem.createdAt} |{" "}
                    {elem.comments.length} comments
                  </p>
                </div>
                <div className="w-1/3">
                  <button onClick={addupvote} className="btn">
                    Upvote
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </main>
    </>
  );
};

export default HomeScreen;
