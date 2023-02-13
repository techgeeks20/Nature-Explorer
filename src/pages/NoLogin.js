import React from "react";
import Navbar from "../components/Navbar";

const NoLogin = ({ currentUser }) => {
  return (
    <>
      <Navbar currentUser={currentUser} />
      <h1 className="text-6xl text-center text-red-600 font-extrabold mb-10">
        Please login in order to access posts
      </h1>
      <div className="mt-4 flex flex-row items-center justify-center">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHdH1PDJIL0qsfBTX0rwoSjpX67Vcb9bv81mEAfxNvqC5bkMVicBpMoj21N3ZjHaQp8eg&usqp=CAU"
          className="items-center justify-center flex"
        ></img>
      </div>
    </>
  );
};

export default NoLogin;
