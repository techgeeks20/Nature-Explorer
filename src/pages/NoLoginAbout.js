import React from "react";
import Navbar from "../components/Navbar";

const NoLoginAbout = ({ currentUser }) => {
  return (
    <>
      <Navbar currentUser={currentUser} />
      <div className="text-center">
        <h1 className="text-6xl text-green-800 font-extrabold">
          Time to learn about the <span className="text-green-600">world</span>
        </h1>
        <h1 className="text-6xl text-green-800 font-extrabold">around us</h1>
        <p class="text-center text-xl text-gray-500 mt-5">
          Ever wanted to share your love for the world around you? Look no
          further than .
        </p>
        <a
          href="/home"
          class="mt-5 inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-green-700 border border-green-800 rounded-md shadow-sm hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          data-rounded="rounded-md"
          data-primary="blue-600"
          data-primary-reset="{}"
        >
          Enter the feed!
        </a>
        <div className="mt-4 flex flex-row items-center justify-center">
          <img
            src="https://img.freepik.com/free-vector/save-planet-concept-with-people-taking-care-earth_23-2148522570.jpg"
            className="items-center justify-center flex"
          ></img>
          <div class="max-w-sm bg-white border-2 border-gray-300 p-6 rounded-md tracking-wide shadow-lg">
            <div id="header" class="flex items-center mb-4">
              <img
                alt="avatar"
                class="w-20 rounded-full border-2 border-gray-300"
                src="https://hips.hearstapps.com/hmg-prod/images/gettyimages-3091504.jpg?resize=1200:*"
              />
              <div id="header-text" class="leading-5 ml-6 sm">
                <h4 id="name" class="text-xl font-semibold">
                  Albert Einstein
                </h4>
                <h5 id="job" class="font-semibold text-[#3FA6D3]">
                  Famed Physicist
                </h5>
              </div>
            </div>
            <div id="quote">
              <q class="italic text-gray-600">
                Look deep into nature, and then you will understand everything
                better.
              </q>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoLoginAbout;
