import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useHistory } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();
  const register = (e) => {
    e.preventDefault();
  
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => history.push("/home"))
        .catch((err) => alert(err.message));

      setEmail("");
      setPassword("");
    }
  
  const goToLogin = (e) => {
    e.preventDefault();
    history.push("/");
  };
  return (
    <div>
      <div class="h-screen md:flex">
      <div class="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-700 to-green-300 i justify-around items-center hidden">
        <div className="mb-24">
        <img src="https://freesvg.org/img/Green-Earth.png" className="h-56"></img>
          <h1 class="text-white font-bold text-4xl font-sans">Nature Explorer</h1>
          <p class="text-white mt-1">Post about your adventures</p>
            <button
              onClick={() => {
                history.push("/about")
              }}
            type="submit"
            class="block w-28 bg-white text-indigo-800 mt-4 py-2 ml-10 rounded-2xl font-bold mb-2"
          >
            Read More
          </button>
        </div>
        <div class="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div class="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div class="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        <div class="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
      </div>
      <div class="flex md:w-1/2 justify-center py-10 items-center bg-white">
        <form onSubmit={register}  class="bg-white">
          <h1 class="text-gray-800 font-bold text-2xl mb-1">Sign Up</h1>
          <p class="text-sm font-normal text-gray-600 mb-7">Register here</p>
          <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
            <input
              className="pl-2 outline-none border-none"
              name=""
              id=""
              type="email"
              value={email}
              required
              placeholder=" Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div class="flex items-center border-2 py-2 px-3 rounded-2xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clip-rule="evenodd"
              />
            </svg>
            <input
              class="pl-2 outline-none border-none"
              name=""
              id=""
              type="password"
              value={password}
              required
              placeholder=" Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            class="block w-full bg-green-600 hover:bg-green-700 mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
          >
            Sign Up
          </button>
          <span
            class="text-sm ml-2 hover:text-blue-500 cursor-pointer"
            onClick={goToLogin}
          >
           Already have an account?
          </span>
        </form>
      </div>
    </div>
    </div>
  );
};

export default SignUp;
