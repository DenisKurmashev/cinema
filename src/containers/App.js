import React, { Fragment } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import * as userActions from "../actions/user";
import * as filmsActions from "../actions/films";

import UserContent from "../components/UserContent";
import AdminContent from "../components/AdminContent";

const App = ({ user, userActions, films, filmsActions}) => {
	return (
		<Fragment>
			{
				user.isAuth && user.info.role === "admin" ?
					<AdminContent /> :
					<UserContent 
						user={user} 
						userActions={userActions} 
						films={films}
						filmsActions={filmsActions}
					/>
			}
		</Fragment>
	);
};

const mapStateToProps = state => {
	return {
		user: state.user,
		films: state.films,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		userActions: bindActionCreators(userActions, dispatch),
		filmsActions: bindActionCreators(filmsActions, dispatch),
	};
};

App.propTypes = {
	user: PropTypes.shape({
		isLoginOrRegisterFetching: PropTypes.bool,
		isAuth: PropTypes.bool,
		error: PropTypes.string,
		info: PropTypes.shape({
			name: PropTypes.string,
			role: PropTypes.string,
		}),
	}),

	userActions: PropTypes.shape({
		onLoginOrRegisterFetch: PropTypes.func,
		login: PropTypes.func,
		register: PropTypes.func, 
		onLogout: PropTypes.func,
	}),
};
App.defaultProps = {
	user: {
		isLoginOrRegisterFetching: false,
		isAuth: false,
		error: "",
		info: {
			name: "",
			role: "",
		},
	},

	userActions: {
		onLoginOrRegisterFetch: () => {},
		login: () => {},
		register: () => {}, 
		onLogout: () => {},
	},
};

// bug described here: https://github.com/ReactTraining/react-router/issues/4671
export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(App);
