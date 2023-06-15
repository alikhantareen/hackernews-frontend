import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const AddPost = () => {
  const navigate = useNavigate();
  const [authenticated, setauthenticated] = useState(null);
  function formSubmission() {
    let title = document.querySelector("#title").value;
    let link = document.querySelector("#link").value;
    let description = document.querySelector("#description").value;
    if (
      !title ||
      title === "" ||
      !link ||
      link === "" ||
      !description ||
      description === ""
    ) {
      alert("Please fill all the fields");
      return;
    }
    const reqBody = {
      title: title,
      link: link,
      description: description,
      token: localStorage.getItem("token"),
      user: localStorage.getItem("user_id")
    };
    fetch("http://localhost:5050/addpost", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqBody),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.user) {
          navigate("/");
        } else {
          alert(data.error);
        }
      });
  }
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }
  });
  return (
    <>
      <Navbar />
      <main className="w-full p-8">
        <div className="shadow-md p-8 flex flex-col gap-4 rounded-md justify-center items-center">
          <div className="flex flex-col justify-center items-center gap-4 w-1/2">
            <p className="text-3xl font-semibold">ADD NEW POST</p>
            <input
              id="title"
              type="text"
              placeholder="Enter title"
              className="input input-bordered input-primary w-full max-w-md"
            />
            <input
              id="link"
              type="text"
              placeholder="Enter link"
              className="input input-bordered input-primary w-full max-w-md"
            />
            <textarea
              id="description"
              className="textarea textarea-primary w-full max-w-md"
              placeholder="Enter description"
              rows={5}
            ></textarea>
            <button
              type="submit"
              onClick={formSubmission}
              className="btn btn-primary w-full max-w-md"
            >
              Submit
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default AddPost;
