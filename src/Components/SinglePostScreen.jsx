import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

const SinglePostScreen = () => {
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
  }, []);
  return (
    <>
      <Navbar />
      <main className="w-full p-8">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <p className="text-2xl text-slate-800">{data.title}</p>
            <p>{data.description}</p>
            <p>{data.link}</p>
          </div>
        )}
      </main>
    </>
  );
};

export default SinglePostScreen;
