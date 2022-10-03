import React from "react";
import "./post.scss";
import moment from "moment";
import bean from "../images/bean.ico"

export const Post = ({ data, key, Like }) => {
  return (
    <article key={key} className="postContainer">
      <section className="textContainer">
      <p>{data.message}</p>
      </section>

      <section className="buttonAndDateContainer">
      <section className="likeContainer"> 
      <button onClick={ () => Like(data._id)}> <img src={bean} alt='like button' /></button><p>x {data.hearts}</p>
      </section>
      <p>{moment(data.createdAt).fromNow()}</p>
    
      </section>
    </article>
  );
};
