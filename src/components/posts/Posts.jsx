import React from "react";
import Post from "../post/Post";
import "./posts.scss";

import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../utils/axios";

const Posts = ({ userId }) => {
  const { isLoading, data, error } = useQuery(["posts"], () =>
    makeRequest.get("/posts?userId=" + userId).then((res) => {
      return res.data;
    })
  );

  return (
    <div className="posts">
      {error
        ? "Something went wrong"
        : isLoading
        ? "Loading..."
        : data.map((post) => <Post post={post} key={post.Id} />)}
    </div>
  );
};

export default Posts;
