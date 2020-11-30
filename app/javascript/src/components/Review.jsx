import React, { useState, useEffect, useMemo } from "react";
import SplitReview from "./SplitReview";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setFlashMessage } from "../redux/flash/flashActions";
import { getLoggedUser } from "../redux/auth/authActions";
import {
  Segment,
  Rating,
  Dimmer,
  Label,
  Button,
  Header,
  Divider,
} from "semantic-ui-react";
import axios from "axios";

function Review() {
  const token = localStorage.getItem("token");
  const current_user = useSelector((state) => state.auth.user);
  const [ratings, setRatings] = useState([]);
  const [currentRating, setCurrentRating] = useState({});
  const [userRating, setUserRating] = useState(0);
  const dispatch = useDispatch();
  const handleRate = (e, { rating }) => setCurrentRating({ rating });

  useEffect(() => {
    const fetchAllRatings = async () => {
      console.log("fetch all rating");
      try {
        const response = await axios.get("/api/v1/ratings");
        setRatings(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchCurrentUserRating = async () => {
      console.log("fetch current user rating");
      try {
        const response = await axios.get("/api/v1/get_score", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(response.data.score.value);
        setCurrentRating({ rating: response.data.score.value });
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllRatings();
    if (current_user.id) fetchCurrentUserRating();
    if (token && !current_user.id) dispatch(getLoggedUser(token));
  }, [current_user, userRating]);

  const handleOwnerReview = async () => {
    if (currentRating.rating === userRating) return;
    try {
      await axios.patch(
        "/api/v1/rate_by_user",
        { rating: currentRating.rating },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(
        setFlashMessage("Your Feedback Successfully Save. Thank You ", "green")
      );
      window.scrollTo(0, 0);
      setUserRating(currentRating.rating);
    } catch (error) {
      window.scrollTo(0, 0);
      dispatch(setFlashMessage(error.response.data.message, "red"));
    }
  };

  const displayAllRatings = useMemo(() => {
    const res = ratings.map((rating) => {
      const { value, user_name, time } = rating.attributes;
      return (
        <Segment key={rating.id} color="pink">
          <Label image>
            <img src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg" />
            <small>{user_name}</small> &nbsp;
            <small style={{ color: "blue" }}>{time}</small>
          </Label>
          <div>
            <Rating
              icon="star"
              rating={value}
              maxRating={5}
              size="huge"
              disabled
            />
          </div>
        </Segment>
      );
    });
    return res;
  }, [ratings]);

  function getCurrentReviewReport(initialStar) {
    return (
      <Rating
        icon="star"
        rating={initialStar}
        maxRating={5}
        size="huge"
        onRate={handleRate}
      />
    );
  }

  const getOverallRatingDetails = useMemo(() => {
    let individualStarCounts = [0, 0, 0, 0, 0];
    let total = 0;
    ratings.forEach((rating) => {
      individualStarCounts[rating.attributes.value - 1] += 1;
    });
    total = individualStarCounts.reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);

    return individualStarCounts.map((value, index) => {
      return (
        <SplitReview
          key={index}
          starCount={index + 1}
          value={value}
          total={total}
        />
      );
    });
  }, [ratings]);

  return (
    <div className="rating">
      <Segment.Group>
        {ratings.length > 0 ? (
          <>
            <Segment>Review Section</Segment>
            <Segment.Group raised>{displayAllRatings}</Segment.Group>
          </>
        ) : (
          <Segment>No review yet add one</Segment>
        )}

        <Dimmer.Dimmable as={Segment} dimmed={current_user.id ? false : true}>
          Your review section
          <div>
            {getCurrentReviewReport(currentRating.rating)}
            <Button onClick={handleOwnerReview} positive floated="right">
              Save
            </Button>
          </div>
          <Dimmer active={current_user.id ? false : true}>
            <Header as="h3" inverted>
              Please Logged In to perform the operation {"  "}
              <Button as={Link} to="/login" primary>
                Login
              </Button>
            </Header>
          </Dimmer>
        </Dimmer.Dimmable>
        <Segment>
          Overall user experience
          <Divider color="blue" />
          {getOverallRatingDetails}
        </Segment>
      </Segment.Group>
    </div>
  );
}

export default Review;
