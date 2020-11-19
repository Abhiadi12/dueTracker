import React from "react";
import { Button } from "semantic-ui-react";
import "../../stylesheets/style_for_footer";

function Footer() {
  return (
    <div className="footer">
      <h3>Abhisek Mishra</h3>
      <p> Enjoying web development</p>
      <div>
        <Button
          as="a"
          href="https://www.facebook.com"
          circular
          color="facebook"
          icon="facebook"
        />
        <Button
          as="a"
          href="https://www.twitter.com"
          circular
          color="twitter"
          icon="twitter"
        />
        <Button
          as="a"
          href="https://www.linkedin.com"
          circular
          color="linkedin"
          icon="linkedin"
        />
        <Button
          as="a"
          href="https://myaccount.google.com/profile"
          circular
          color="google plus"
          icon="google plus"
        />
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#fff"
          fillOpacity="1"
          d="M0,128L80,149.3C160,171,320,213,480,245.3C640,277,800,299,960,282.7C1120,267,1280,213,1360,186.7L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
}

export default Footer;
