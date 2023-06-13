import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

const SinglePostScreen = () => {
  const [authenticated, setauthenticated] = useState(null);
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setloading] = useState(true);
  function apiCall(id) {
    fetch(`http://localhost:5050/${id}`)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setloading(false);
      });
  }
  useEffect(() => {
    apiCall(id);
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
          <div className="shadow-md p-8 flex flex-col gap-4 rounded-md">
            <p className="text-2xl text-slate-800">
              Title: <span className="font-semibold">{data.title}</span>
            </p>
            <p className="text-xl text-slate-800">
              Description: {data.description}
            </p>
            <a href="https://www.google.com/" target="_blank" className="text-xl text-slate-800">Link: <span className="link link-primary">{data.link}</span></a>
            <p className="text-xl text-slate-800">
              Posted on: {data.createdAt}
            </p>
            <p className="text-xl text-slate-800">
              Upvotes: {data.upVote.length}
            </p>
            {authenticated ? (
              <div className="w-1/2">
                <textarea
                  rows={3}
                  cols={100}
                  className="textarea textarea-primary"
                  placeholder="Enter your comment"
                  id="comment"
                ></textarea>
                <button className="btn btn-primary">Add comment</button>
              </div>
            ) : (
              <p className="text-slate-500">Please login to add comment.</p>
            )}
          </div>
        )}
      </main>
    </>
  );
};

export default SinglePostScreen;
