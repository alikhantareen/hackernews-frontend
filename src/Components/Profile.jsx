import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  function getUserPosts(id) {
    fetch(`http://localhost:5050/profile/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUserPosts(data);
        setLoading(false);
      });
  }
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }
    getUserPosts(id);
    setUser(localStorage.getItem("user").split("@")[0].toUpperCase());
  }, []);
  return (
    <>
      <Navbar />
      <main className="w-full p-8">
        <div className="shadow-md p-8 flex flex-col gap-4 rounded-md">
          <div className="flex justify-between w-full items-center">
            <div>
              <span className="text-2xl font-bold">Hello,</span>{" "}
              <span className="text-2xl font-semibold">{user}</span>
            </div>
            <div>
              <Link to={`/addpost`}>
                <button className="btn btn-primary">Add new post</button>
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-xl font-semibold">My posts</p>
            {loading ? (
              <p>Loading...</p>
            ) : userPosts.length === 0 ? (
              <p>No post to show.</p>
            ) : (
              userPosts.map((elem, index) => {
                return (
                  <div className="flex flex-col gap-2 mb-4 shadow-md p-4 rounded-md">
                    <Link to={`/post/${elem._id}`}>
                      <p className="text-xl text-slate-800">
                        {index + 1}. {elem.title}
                      </p>
                    </Link>
                    <div>
                      <p>
                        {elem.upVote.length} upvotes | created at{" "}
                        {elem.createdAt} | {elem.comments.length} comments
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;
