import React from "react";
import "./stories.scss";

//TEMPORARY
const stories = [
  {
    id: 1,
    name: "Ibrahim Ahmed",
    img: "https://media.istockphoto.com/id/695660184/photo/buildings-and-gapstow-bridge-over-the-icy-lake-and-snow-at-central-park.jpg?s=1024x1024&w=is&k=20&c=IE-QWvl-iYwcq6lexdfB_Wm_BqqzDscQzxR4ALSJA4M=",
  },
  {
    id: 2,
    name: "Kareem Ahmed",
    img: "https://images.unsplash.com/photo-1661956602153-23384936a1d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  },
  {
    id: 3,
    name: "Ali Mohamed",
    img: "https://images.unsplash.com/photo-1533601017-dc61895e03c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  },
  // {
  //   id: 4,
  //   name: "John Doe",
  //   img: "https://images.unsplash.com/photo-1675795684921-4e554e14dccf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  // },
];

const Stories = () => {
  return (
    <div className="stories">
      <div className="story">
        <img
          src="https://images.unsplash.com/photo-1496016943515-7d33598c11e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80"
          alt="story-img"
        />
        <span>Ibrahim Ahmed</span>
        <button>+</button>
      </div>
      {stories?.map((story) => (
        <div className="story" key={story.id}>
          <img src={story.img} alt="story-img" />
          <span>{story.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Stories;
