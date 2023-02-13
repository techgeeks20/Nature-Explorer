import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import ModalUI from "./ModalUI";

const Post = ({
  id,
  email,
  currentUser,
  message,
  image,
  description,
  date,
  deletePostHandler,
}) => {
  const [responseName, setResponseName] = useState("");
  const [responseDescription, setResponseDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const modalOpenHandler = () => {
    if (modalOpen) {
      setModalOpen(false);
    } else {
      setModalOpen(true);
    }
  };

  const urls = [image];
  const getBase64FromUrl = async (url) => {
    try {
      const response = await axios.get(
        `https://cors-anywhere.herokuapp.com/${url}`,
        {
          responseType: "arraybuffer",
        }
      );
      return btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
    } catch (error) {}
  };

  const getBase64FilesFromUrls = async (urls) => {
    return Promise.all(urls.map(async (url) => await getBase64FromUrl(url)));
  };

  const main = async () => {
    setModalOpen(true);
    setIsLoading(true);
    const base64files = await getBase64FilesFromUrls(urls);

    const data = {
      api_key: "e4hpvTDb9DZwOOUjyKL7grhY6Zy9DjMlCfkv4v6UFdC03Uuk8F",
      images: base64files,
      modifiers: ["crops_fast", "similar_images"],
      plant_language: "en",
      plant_details: [
        "common_names",
        "url",
        "name_authority",
        "wiki_description",
        "taxonomy",
        "synonyms",
      ],
    };

    try {
      const response = await axios.post(
        "https://api.plant.id/v2/identify",
        data
      );
      let suggestions = response.data["suggestions"];

      suggestions.sort((a, b) => b.probability - a.probability);
      let largestProbPlant = suggestions[0].plant_name;
      setResponseName(largestProbPlant);
      setResponseDescription(
        response.data["suggestions"][0]["plant_details"]["wiki_description"][
          "value"
        ]
      );
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto w-[30%]">
      <a class="break-words block mb-4 rounded-lg shadow-lg shadow-indigo-100">
        <button onClick={main}>
          <img src={image} class="h-[40%] w-full rounded-lg object-cover" />
        </button>
        {modalOpen && (
          <ModalUI
            responseName={responseName}
            responseDescription={responseDescription}
            modalOpenHandler={modalOpenHandler}
          />
        )}

        <div class="mt-2 p-4">
          <dl>
            <div>
              <dd class="font-medium text-2xl">{message}</dd>
              <p className="text-gray-600 text-sm mt-2 ">{description}</p>
            </div>
          </dl>

          <div class="mt-6 flex items-center gap-8 text-xs">
            <div class="sm:inline-flex sm:shrink-0 sm:items-center">
              <img
                className="h-6"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Calendar_font_awesome.svg/1024px-Calendar_font_awesome.svg.png"
              />

              <div class="mt-1.5 sm:ml-3 sm:mt-0">
                <p class="text-gray-500">Date</p>

                <p class="font-medium">{date}</p>
              </div>
            </div>

            <div class="sm:inline-flex sm:shrink-0 sm:items-center">
              <img
                className="h-6"
                src="https://freesvg.org/img/abstract-user-flat-4.png"
              ></img>

              <div class="mt-1.5 sm:ml-3 sm:mt-0">
                <p class="text-gray-500">User</p>

                <p class="font-medium">{email}</p>
              </div>
            </div>
            <div class="sm:inline-flex sm:shrink-0 sm:items-center">
              {currentUser.email === email && (
                <img
                  onClick={() => deletePostHandler(id)}
                  className="h-6"
                  src="https://cdn4.iconfinder.com/data/icons/social-messaging-ui-coloricon-1/21/51-512.png"
                ></img>
              )}
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default Post;
