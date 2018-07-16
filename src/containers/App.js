import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as userActions from "../actions/user";

import UserContent from "../components/UserContent";
import AdminContent from "../components/AdminContent";

const App = ({ user, userActions }) => {
    return (
        <div className="App">
            {
                user.isAuth && user.user.role === "admin" ?
                <AdminContent /> :
                <UserContent user={user} userActions={userActions} />
            }
        </div>
    );
};

const mapStateToProps = state => {
    return {
        user: state.user,
    };
};


const mapDispatchToProps = dispatch => {
    return {
        userActions: bindActionCreators(userActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
