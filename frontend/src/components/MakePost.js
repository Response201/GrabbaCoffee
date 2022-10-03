import React from "react";
import "./makePost.scss";
import bean from "../images/bean.ico";

export const MakePost = ({ onSubmin, message, setMessage }) => {
  return (
    <form
      className="makePostContent"
     
    >
      <section className="textInputContainer">
        <textarea
          type="text"
          required
          minLength="5"
          maxLength="120"
          value={message}
          onChange={(e) => setMessage(e.target.value, e.target.reset)}
        />
      </section>

      <section className="submitButton">
        <button onClick={onSubmin} className={message.length >= 5? 'buttonVaild':'buttonInvalid'} >
          <img src={bean} alt="like button" /> send{" "}
          <img src={bean} alt="like button" />
        </button>
        <p> {message.length} / 120 </p>
      </section>
    </form>
  );
};
