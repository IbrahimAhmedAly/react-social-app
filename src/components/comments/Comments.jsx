import { useContext, useState } from "react";
import "./commment.scss";

import moment from "moment";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../utils/axios";
import { AuthContext } from "../../context/authContext";

const Comments = ({ postId }) => {
  const queryClient = useQueryClient();

  const { currentUser } = useContext(AuthContext);
  const [desc, setDesc] = useState("");

  const { isLoading, data, error } = useQuery(["comments"], () =>
    makeRequest.get("/comments?postId=" + postId).then((res) => {
      return res.data;
    })
  );

  // Mutations
  const mutation = useMutation(
    (newComment) => {
      makeRequest.post("/comments", newComment);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries("comments");
      },
    }
  );

  const handleComment = async (e) => {
    e.preventDefault();

    mutation.mutate({ desc, postId });
    setDesc("");
  };

  return (
    <div className="comments">
      <div className="write">
        <img src={"/upload/" + currentUser.profilePic} alt="proile-pic" />
        <input
          type="text"
          placeholder="write a comment"
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={handleComment}>Send</button>
      </div>
      {isLoading
        ? "Loading..."
        : data.map((comment) => (
            <div className="comment" key={comment.Id}>
              <img src={"/upload/" + comment.profilePic} alt="" />
              <div className="info">
                <span>{currentUser.username}</span>
                <p>{comment.desc}</p>
              </div>
              <span className="date">
                {moment(comment.createdAt).fromNow()}
              </span>
            </div>
          ))}
    </div>
  );
};

export default Comments;
