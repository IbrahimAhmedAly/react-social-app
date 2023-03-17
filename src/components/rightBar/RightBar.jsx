import React from "react";
import "./rightBar.scss";

import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../utils/axios";

import { useNavigate } from "react-router-dom";
const RightBar = () => {
  const navigate = useNavigate();

  const { isLoading, data, error } = useQuery(["suggestionUser"], () =>
    makeRequest.get("/users/suggestedUsers").then((res) => {
      return res.data;
    })
  );

  if (isLoading) return "loading...";
  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Suggestions for you</span>
          {data?.map((user) => (
            <div className="user" key={user.Id}>
              <div className="userInfo">
                <img src={"/upload/" + user.profilePic} alt="user-info" />
                <span>{user.username}</span>
              </div>
              <div className="buttons">
                {/* <button>follow</button> */}
                <button
                  onClick={() => {
                    navigate(`/profile/${user.Id}`);
                    window.location.reload();
                  }}
                >
                  follow
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="item">
          <span>Latest Activites</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.unsplash.com/photo-1495216875107-c6c043eb703f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                alt="user-info"
              />
              <p>
                <span>Mohamed</span> changed their cover picture
              </p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.unsplash.com/photo-1543357480-c60d40007a3f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                alt="user-info"
              />
              <p>
                <span>Kareem</span> Posted a post
              </p>
            </div>
            <span>1 hour ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=344&q=80"
                alt="user-info"
              />
              <p>
                <span>Omar</span> Liked your post
              </p>
            </div>
            <span>2 hour ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                alt="user-info"
              />
              <p>
                <span>Yasser</span> Posted a photo
              </p>
            </div>
            <span>1 day ago</span>
          </div>
        </div>
        <div className="item">
          <span>Online friends</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=344&q=80"
                alt="user-info"
              />
              <div className="online" />
              <span>Mohamed</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.unsplash.com/photo-1554311884-415bfda22b47?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                alt="user-info"
              />
              <div className="online" />
              <span>Kareem</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=848&q=80"
                alt="user-info"
              />
              <div className="online" />
              <span>Abderlrahman</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://images.unsplash.com/photo-1529675804080-e12a8d5cef9b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                alt="user-info"
              />
              <div className="online" />
              <span>Mariam</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
