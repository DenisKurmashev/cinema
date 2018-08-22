import React from "react";
import { NavLink, Route, Redirect } from "react-router-dom";
import { withFormik } from "formik";
import PropTypes from "prop-types";
import { validate, handleLogin } from "../util";
import { REGISTER, LOGIN, ROOT } from "../../path";

const InnerLoginForm = ({ user, values, errors, touched, handleChange, handleSubmit, isSubmitting }) => {
    if (user.isAuth) 
        return <Redirect to={ROOT} />

    return (
        <form onSubmit={handleSubmit} className="default-form" noValidate>
			<div className="default-form__title">Sign in</div>

			<div className="default-form__error">{touched.email && errors.email}</div>
			<input type="email" placeholder="Email" name="email" onChange={handleChange} value={values.email} />

			<div className="default-form__error">{touched.password && errors.password}</div>
			<input type="password" placeholder="Password" name="password" onChange={handleChange} value={values.password} />

			<button type="submit" className="btn" disabled={user.isLoginOrRegisterFetching}>Sign in</button>
			
            <Route path={LOGIN} render={props => <NavLink className="btn-underline" to={REGISTER}>Not have account? Sign up.</NavLink>} />
        </form>
    );
}

const LoginForm = withFormik({
    validateOnBlur: false,
	mapPropsToValues: props => ({ email: "", password: "", user: props.user, userActions: props.userActions }),
	validate,
	handleSubmit: handleLogin,
	onSubmit: (values, actions) => {
		actions.setSubmitting(true);
	},
})(InnerLoginForm);

LoginForm.propTypes = {
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
LoginForm.defaultProps = {
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

export default LoginForm;