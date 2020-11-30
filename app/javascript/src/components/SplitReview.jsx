import React from "react";
import { Rating, Label } from "semantic-ui-react";
function SplitReview({ starCount, value, total }) {
  return (
    <div>
      <Rating icon="star" rating={starCount} maxRating={5} disabled />

      <Label pointing="left">
        {value} out of {total}
      </Label>
    </div>
  );
}

export default SplitReview;
