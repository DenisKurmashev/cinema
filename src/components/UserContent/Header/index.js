import React from "react";
import "./index.css";
import "../../../styles/button.css";

import SearchBar from "./SearchBar";
import UserBar from "./UserBar";

const Header = ({ user, userActions }) => (
    <header>
        <div className="header-mask">
            <UserBar user={user} userActions={userActions} />
            <SearchBar user={user} userActions={userActions} />
        </div>
    </header>
);

export default Header;