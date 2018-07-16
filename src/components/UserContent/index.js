import React from "react";
import LoginAndRegisterForm from "./Forms/login-register";

const UserContent = ({ user, userActions }) => {
    return (
        <div>
            <LoginAndRegisterForm user={user} userActions={userActions} />
        </div>
    );
};

export default UserContent;