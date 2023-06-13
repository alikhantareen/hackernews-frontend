import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const HomeScreen = () => {
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
              <Link to={`/${elem._id}`}>
                <div className="flex flex-col gap-2 mb-4 shadow-md p-2">
                  <p className="text-xl text-slate-800">
                    {index + 1}. {elem.title}
                  </p>
                  <div>
                    <p>
                      {elem.upVote.length} points | created at {elem.createdAt}{" "}
                      | {elem.comments.length} comments
                    </p>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </main>
    </>
  );
};

export default HomeScreen;
