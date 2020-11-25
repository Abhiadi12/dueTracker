import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLoggedUser } from "../redux/auth/authActions";
import { fetchAllPosts } from "../redux/contact/contactActions";
import { Redirect } from "react-router-dom";
import PlaceholderExampleLine from "./PlaceholderExampleLine";
import Unprocessable from "./Unprocessable";
import ContactGrid from "./ContactGrid";
import { Segment, Dimmer } from "semantic-ui-react";

function Profile() {
  const current_user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.contact.loading);
  const error = useSelector((state) => state.contact.error);

  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Profile Component");
    if (current_user.id) dispatch(fetchAllPosts(token));
  }, [current_user]);

  if (token && !current_user.username) {
    dispatch(getLoggedUser(token));
    return (
      <Segment>
        <Dimmer active />
      </Segment>
    );
  } else {
    return (
      <>
        {token ? (
          <div className="container">
            <h1>
              Welcome {current_user.username} from {current_user.country}
              {error && <Unprocessable message={error} />}
              {loading && !error ? (
                <PlaceholderExampleLine />
              ) : (
                <div>
                  <h3>Your due tracker details </h3>
                  <ContactGrid />
                </div>
              )}
            </h1>
          </div>
        ) : (
          <Redirect to="/login" />
        )}
      </>
    );
  }
}

export default Profile;
