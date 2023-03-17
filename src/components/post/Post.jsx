import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./post.scss";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import Comments from "../comments/Comments";
import moment from "moment";

import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../utils/axios";
import { AuthContext } from "../../context/authContext";

const Post = ({ post }) => {
  const { currentUser } = useContext(AuthContext);

  const [openComment, setOpenComment] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const { isLoading, data, error } = useQuery(["likes", post.Id], () =>
    makeRequest.get("/likes?postId=" + post.Id).then((res) => {
      return res.data;
    })
  );

  const queryClient = useQueryClient();

  // Mutations
  const mutation = useMutation(
    (liked) => {
      if (liked) makeRequest.delete("/likes?postId=" + post.Id);
      return makeRequest.post("/likes", { postId: post.Id });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries("likes");
      },
    }
  );

  const handleLike = () => {
    mutation.mutate(data?.includes(currentUser.Id));
  };

  const deleteMutation = useMutation(
    (postId) => {
      return makeRequest.delete("/posts/" + postId);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleDelete = () => {
    deleteMutation.mutate(post.Id);
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={"/upload/" + post.profilePic} alt="profile-pic" />
            <div className="details">
              <Link to={`/profile/${post.userId}`} style={{ color: "inherit" }}>
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <MoreHorizIcon onClick={() => setOpenMenu(!openMenu)} />
          {openMenu && post.userId === currentUser.Id && (
            <button className="openMenu" onClick={handleDelete}>
              Delete
            </button>
          )}
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={"/upload/" + post.img} alt="post-img" />
        </div>
        <div className="info">
          <div className="item">
            {isLoading ? (
              "loading"
            ) : data.includes(currentUser.Id) ? (
              <FavoriteOutlinedIcon
                style={{ color: "red" }}
                onClick={handleLike}
              />
            ) : (
              <FavoriteBorderOutlinedIcon onClick={handleLike} />
            )}
            {data?.length} Likes
          </div>
          <div className="item">
            <TextsmsOutlinedIcon onClick={() => setOpenComment(!openComment)} />
            Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>

        {openComment && <Comments postId={post.Id} />}
      </div>
    </div>
  );
};

export default Post;
