import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const SinglePostScreen = () => {
  const navigate = useNavigate();
  const [upvote, setUpvote] = useState(null);
  const [authenticated, setauthenticated] = useState(null);
  const [comment, setComment] = useState(null);
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setloading] = useState(true);
  function fetchPost(id) {
    fetch(`http://localhost:5050/post/${id}`)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setloading(false);
      });
  }
  function addComment(id) {
    let user = localStorage.getItem("user");
    let comment = document.querySelector("#comment").value;
    if (comment === " " || !comment) return alert("Please type comment first");
    fetch(`http://localhost:5050/post/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        comment: comment,
        username: user,
        requestFor: "comment",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.comments) {
          setComment(data.comment);
        } else {
          alert(data.error);
        }
      });
  }
  function addupvote() {
    if (authenticated) {
      fetch(`http://localhost:5050/post/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: localStorage.getItem("user"),
          requestFor: "upvote",
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.upVote) {
            setUpvote(data.upVote);
            alert("Upvoted successfully.")
          } else {
            alert(data.error);
          }
        });
    } else {
      navigate("/login");
    }
  }
  useEffect(() => {
    fetchPost(id);
    const loggedInUser = localStorage.getItem("token");
    if (loggedInUser) {
      setauthenticated(loggedInUser);
    }
  }, [comment, upvote]);
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
            <a
              href={data.link}
              target="_blank"
              className="text-xl text-slate-800"
            >
              Link: <span className="link link-primary">{data.link}</span>
            </a>
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
                <div className="flex gap-4">
                  <button
                    onClick={() => addComment(id)}
                    className="btn btn-primary"
                  >
                    Add comment
                  </button>
                  <button onClick={() => addupvote(id)} className="btn">
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
            ) : (
              <p className="text-slate-500">Please login to add comment or to upvote.</p>
            )}
            <p className="text-xl text-slate-800 font-semibold">Comments</p>
            {data.comments.length === 0 ? (
              <p className="text-slate-500">No comments to show.</p>
            ) : (
              data.comments.map((elem, index) => {
                return (
                  <div className="p-2">
                    <p>
                      {index + 1} - {elem.content} -{" "}
                      <span className="italic">
                        (comment by - {elem.username})
                      </span>
                    </p>
                  </div>
                );
              })
            )}
          </div>
        )}
      </main>
    </>
  );
};

export default SinglePostScreen;
