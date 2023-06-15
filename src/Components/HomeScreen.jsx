import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const HomeScreen = () => {
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
  function dateFunc(d) {
    let date = new Date(d);
    return date.toLocaleString();
  }
  useEffect(() => {
    fetchData();
    const loggedInUser = localStorage.getItem("token");
    if (loggedInUser) {
      setauthenticated(loggedInUser);
    }
  }, []);
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
                    {elem.upVote.length} upvotes | created at {dateFunc(elem.createdAt)} |{" "}
                    {elem.comments.length} comments
                  </p>
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
