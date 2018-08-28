import React, { Fragment } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from 'react-router-dom'

import * as userActions from "../actions/user";
import * as filmsActions from "../actions/films";

import UserContent from "../components/UserContent";

const App = ({ user, userActions, films, filmsActions}) => {
	return (
		<Fragment>
			<UserContent 
				user={user} 
				userActions={userActions} 
				films={films}
				filmsActions={filmsActions}
			/>
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
	// show the models
	films: PropTypes.shape({
		isFetching: PropTypes.bool,
		error: PropTypes.string,
		response: PropTypes.string,
		pageSize: PropTypes.number, 
		pageId: PropTypes.number,
		pageCount: PropTypes.number,
		loadedFilms: PropTypes.array,
		loadFilmsError: PropTypes.string,
		selectedFilm: PropTypes.shape({
			_id: PropTypes.string,
			name: PropTypes.string,
		}),
	}),

	userActions: PropTypes.shape({
		onLoginOrRegisterFetch: PropTypes.func,
		login: PropTypes.func,
		register: PropTypes.func, 
		onLogout: PropTypes.func,
	}),
	filmsActions: PropTypes.shape({
		onFilmsFilterChange: PropTypes.func,
		onFilmsPageChange: PropTypes.func,
		onFilmsFetching: PropTypes.func,
		onFilmsFailed: PropTypes.func,
		onFilmsSuccess: PropTypes.func,
		onFilmsLoad: PropTypes.func,
		onFilmsChange: PropTypes.func,
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
	// Note: show the models
	films: {
		filter: "city",
		pageId: 0,
		error: "",
		isFetching: false,
		currentFilms: [],
		allFilms: [],
	},


	userActions: {
		onLoginOrRegisterFetch: () => {},
		login: () => {},
		register: () => {}, 
		onLogout: () => {},
	},
	filmsActions: {
		onFilmsFilterChange: () => {},
		onFilmsPageChange: () => {},
		onFilmsFetching: () => {},
		onFilmsFailed: () => {},
		onFilmsSuccess: () => {},
		onFilmsLoad: () => {},
		onFilmsChange: () => {},
	},
};

// bug described here: https://github.com/ReactTraining/react-router/issues/4671
// Note: what you should do here(because connect prevents some updates on LCF "shouldComponentUpdate" to optimize rendering)
// is to wrap connect with react-router HOC "withRouter" like withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
// export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(App);
// Do not TRUST first lin from the SO, always check multiple solutions
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
