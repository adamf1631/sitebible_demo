import React from "react";
import { Navbar, Image } from "react-bootstrap";
import moment from "moment";
import dioceseLogo from "../assets/DOC_LOGO_SEAL.png";
import siteBibleLogo from "../assets/site-bible-logo.png";

const Header = ({ mode }) => {
  const colorMode = () => {
    if (mode) {
      return "light";
    } else {
      return "dark";
    }
  };

  return (
    <div>
      <Navbar bg={colorMode()} expand="lg">
        <Navbar.Brand className="ml-4">
          <span>
            <Image className="mr-3" width="50px" src={dioceseLogo} />
            <Image width="120px" src={siteBibleLogo} />
          </span>
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end"></Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>{moment().format("MMMM Do YYYY")}</Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
