import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

function Profile() {
  const current_user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  return (
    <>
      {token ? (
        <h1>
          Welcome {current_user.username} from {current_user.country}
        </h1>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
}

export default Profile;
