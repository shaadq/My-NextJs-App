import React from "react";
import "./Header.scss";
import { RxHamburgerMenu } from "react-icons/rx";
import { GiHamburgerMenu } from "react-icons/gi";
import { useAppContext } from "@/app/context/AppContext";

const Header = (props) => {
  const { toggle, setToggle } = useAppContext();

  return (
    <header className={` ${toggle ? "header-max" : ""}`}>
      {/*  <GiHamburgerMenu /> */}
      <div
        className="toggle-wrapper ms-4 bg-success"
        onClick={() => setToggle(!toggle)}
      >
        <RxHamburgerMenu />
      </div>
      <div className="px-4 h-100 w-100">{props.children}</div>
    </header>
  );
};

export default Header;
