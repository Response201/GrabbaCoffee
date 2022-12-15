import React, { useState, useEffect } from "react";
import { FallingEmojis } from "falling-emojis";
import "./App.scss";
import { MakePost } from "./components/MakePost";
import { Post } from "./components/Post";
import bean from "./images/bean.ico";


export const App = () => {

  const [allPosts, setAllPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [emojiRain, setEmojiRain] = useState(false);

  /*   useEffect to load all existing posts when app starts */

  useEffect(() => {
    Fetchdata();
  }, []);

  const Fetchdata = () => {
    fetch(`${process.env.REACT_APP_URL}/postCoffee`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin':'*'
      }
  })
      .then((response) => response.json())
      .then((result) => setAllPosts(result));
  };

  const Rain = () => {
    setEmojiRain(true);
    setTimeout(() => {
      setEmojiRain(false);
    }, 9000);
  };

  const New = (e) => {
    e.preventDefault();
    if (newPost.length >= 5) {
      fetch(`${process.env.REACT_APP_URL}/newCoffee`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin':'*'
        },
        body: JSON.stringify({ message: newPost })
      })
        .then((response) => response.json())
        .then((result) => {
          Fetchdata();
          setNewPost("");
          Rain();
        });
    }
  };

  const Like = (postId) => {
    if (postId) {
      const options = {
        method: "POST"
      };

      fetch(`${process.env.REACT_APP_URL}/post/${postId}/likeCoffee`, options)
        .then((res) => res.json())
        .then((data) => {
          Fetchdata();
        });
    }
  };

  return (
    <article className="App">
      {emojiRain ? <FallingEmojis emoji={"☕️"} /> : ""}

      <section className="headerContainer">
        {" "}
        <h1>Coffee</h1> <img src={bean} alt="coffee bean" />{" "}
      </section>

      <section className="makePostContainer">
        <MakePost onSubmin={New} message={newPost} setMessage={setNewPost} />
      </section>

      <section className="AllpostsContainer">
        {allPosts.map((post) => (
          <Post key={post._id} data={post} Like={Like} />
        ))}
      </section>
    </article>
  );
};

export default App;
