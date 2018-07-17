import React from "react";
import "./index.css";

const UserBar = ({ user, userActions }) => {
    const welcomeText = `Hello, ${user.user.name || "-user-"}`;

    return (
        <div className="user-bar">
            <div className="user-bar-item">{welcomeText}</div>
            <div onClick={userActions.onLogout} className="user-bar-item btn-underline">logout</div>
        </div>
    );
};

export default UserBar;