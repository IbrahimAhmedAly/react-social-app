import { useState, useContext } from "react";

import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";

import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../utils/axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import Update from "../../components/update/Update";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [openUpdate, setOpenUpdate] = useState(false);

  const { id } = useParams();

  const { isLoading, data, error } = useQuery(["user"], () =>
    makeRequest.get("/users/find/" + id).then((res) => {
      return res.data;
    })
  );

  const { isLoading: rIsLoading, data: relationshipData } = useQuery(
    ["relationship"],
    () =>
      makeRequest.get("/realationships?followedUserId=" + id).then((res) => {
        return res.data;
      })
  );

  const queryClient = useQueryClient();

  // Mutations
  const mutation = useMutation(
    (following) => {
      if (following) makeRequest.delete("/realationships?followedUserId=" + id);
      return makeRequest.post("/realationships", { userId: id });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries("relationship");
      },
    }
  );

  const handleFollow = () => {
    mutation.mutate(relationshipData?.includes(currentUser.Id));
  };

  if (isLoading || rIsLoading) return "Loading...";
  return (
    <>
      <div className="profile">
        <div className="images">
          <img
            src={"/upload/" + data.coverPic}
            alt="cover-pic"
            className="cover"
          />
          <img
            src={"/upload/" + data.profilePic}
            alt="profile-pic"
            className="profilePic"
          />
        </div>
        <div className="profileContainer">
          <div className="uInfo">
            <div className="left">
              <a href="">
                <FacebookTwoToneIcon fontSize="large" />
              </a>
              <a href="">
                <InstagramIcon fontSize="large" />
              </a>
              <a href="">
                <TwitterIcon fontSize="large" />
              </a>
              <a href="">
                <LinkedInIcon fontSize="large" />
              </a>
              <a href="">
                <PinterestIcon fontSize="large" />
              </a>
            </div>
            <div className="center">
              <span>{data.name}</span>
              <div className="info">
                <div className="item">
                  <PlaceIcon />
                  <span>{data.city}</span>
                </div>
                <div className="item">
                  <a
                    href={data.website}
                    target="_blank"
                    style={{ color: "inherit" }}
                  >
                    <LanguageIcon />
                  </a>
                  <span>Web</span>
                </div>
              </div>
              {currentUser.Id === +id ? (
                <button onClick={() => setOpenUpdate(true)}>Update</button>
              ) : (
                <button onClick={handleFollow}>
                  {relationshipData?.includes(currentUser.Id)
                    ? "following"
                    : "follow"}
                </button>
              )}
            </div>
            <div className="right">
              <EmailOutlinedIcon />
              <MoreVertIcon />
            </div>
          </div>
          <Posts userId={id} />
        </div>
      </div>
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
    </>
  );
};

export default Profile;
