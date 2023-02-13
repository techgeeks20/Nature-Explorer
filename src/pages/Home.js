import React, { useState } from "react";
import { auth } from "../firebase";
import { storage } from "../firebase";
import { useHistory } from "react-router-dom";
import { db } from "../firebase";
import Navbar from "../components/Navbar";
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import Post from "../components/Post";
import axios from "axios";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

export default function Home({
  id,
  currentUser,
  message,
  image,
  description,
  date,
  setMessage,
  setImage,
  setDescription,
  posts,
  location,
  setLocation,
}) {
  let history = useHistory();
  const storage = getStorage();
  const storageRef = ref(storage, `images/${id}`);
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  const openHandler = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const postHandler = async (e) => {
    const uploadTask = uploadBytesResumable(storageRef, image);
    console.log(image);
    if (message === "" || description === "" || image === null) {
      alert("Please fill everything out");
    } else {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          let progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          alert(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImage(downloadURL);
            addDoc(collection(db, "posts"), {
              message: message,
              description: description,
              image: downloadURL,
              date: date,
              id: id,
              email: currentUser.email,
            });
            console.log(image);
            setOpen(false);
            setMessage("");
            setDescription("");
            setProgress(0);
            setImage(null);
          });
        }
      );
    }
  };
  const deletePostHandler = async (id) => {
    await deleteDoc(doc(db, "posts", id));
  };
  return (
    <>
      <Navbar />
      <div>
        <h1 class="mr-auto text-center mb-7 text-xl text-green-800 font-bold leading-none tracking-tight md:text-5xl lg:text-3xl">
          Feed
        </h1>

        {open ? (
          <>
            <div class="heading text-center font-bold text-2xl m-5 mb-5 text-gray-800">
              New Post
            </div>
            <form>
              <div class="editor mx-auto mb-7 w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
                <input
                  class="title bg-[#F6F6F6] text-green-700 border border-gray-300 p-2 mb-4 outline-none"
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                  placeholder="Title"
                  type="text"
                />
                <textarea
                  class="description bg-[#F6F6F6] text-green-700 sec p-3 h-60 border border-gray-300 outline-none"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  placeholder="Enter description"
                  type="text"
                ></textarea>

                <label
                  class="form-label inline-block mt-2 mb-2 text-gray-700"
                  for="file_input"
                >
                  Upload file
                </label>
                <input
                  onChange={handleFileChange}
                  class="form-control
    block
    w-full
    px-3
    py-1.5
    text-base
    font-normal
    text-gray-700
    bg-white bg-clip-padding
    border border-solid border-gray-300
    rounded
    transition
    ease-in-out
    m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  type="file"
                />
                {progress > 0 && <h2>Uploading is {progress}% complete</h2>}
                <div class="buttons flex mt-4">
                  <div
                    class="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto"
                    onClick={openHandler}
                  >
                    Cancel
                  </div>
                  <div
                    class="btn border border-bg-green-600 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-green-600 hover:green-700"
                    onClick={postHandler}
                  >
                    Post
                  </div>
                </div>
              </div>
            </form>
          </>
        ) : (
          <div class="">
            <button
              onClick={openHandler}
              className="fixed inline-block rounded-full bg-green-600 text-white leading-normal uppercase shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#78C658] active:shadow-lg transition duration-150 ease-in-out w-12 h-12 bottom-10 right-20"
            >
              +
            </button>
          </div>
        )}
      </div>
      <div>
        {posts.map((post) => (
          <Post
            key={post.id}
            deletePostHandler={deletePostHandler}
            currentUser={currentUser}
            message={post.message}
            image={post.image}
            description={post.description}
            date={post.date}
            email={post.email}
            id={post.id}
          />
        ))}
      </div>
    </>
  );
}
