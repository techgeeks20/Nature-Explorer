import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar";
import NoLogin from "./pages/NoLogin";
import NoLoginAbout from "./pages/NoLoginAbout";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import About from "./pages/About";
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const date = new Date().toLocaleDateString("en-US");
  const id = Math.floor(Math.random() * 100000) + 1;
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);
  useEffect(() => {
    const q = query(collection(db, "posts"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let postsArray = [];
      querySnapshot.forEach((doc) => {
        postsArray.push({ ...doc.data(), id: doc.id });
      });
      setPosts(postsArray);
    });
    return () => unsub();
  }, []);
  return (
    <>
      <Router>
        <Switch>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/home">
            {currentUser === null ? (
              <NoLogin currentUser={currentUser} />
            ) : (
              <Home
                location={location}
                setLocation={setLocation}
                id={id}
                date={date}
                currentUser={currentUser}
                posts={posts}
                message={message}
                image={image}
                description={description}
                setImage={setImage}
                setDescription={setDescription}
                setMessage={setMessage}
              />
            )}
          </Route>
          <Route path="/about">
            {currentUser === null ? (
              <NoLoginAbout currentUser={currentUser} />
            ) : (
              <About />
            )}
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
