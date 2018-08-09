import React from "react";
import { NavLink, Route } from "react-router-dom";
import { withFormik } from "formik";
import PropTypes from "prop-types";
import { validate, handleRegister } from "../util";
import { LOGIN, REGISTER } from "../../path";

const InnerRegisterForm = ({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => {
    return (
        <form onSubmit={handleSubmit} className="default-form" noValidate>
			<div className="default-form__title">Sign up</div>

            <div className="default-form__error">{touched.name && errors.name}</div>
			<input type="text" placeholder="Name" autoComplete="off" name="name" onChange={handleChange} value={values.name} />

			<div className="default-form__error">{touched.email && errors.email}</div>
			<input type="email" placeholder="Email" autoComplete="off" name="email" onChange={handleChange} value={values.email} />

			<div className="default-form__error">{touched.password && errors.password}</div>
			<input type="password" placeholder="Password" name="password" onChange={handleChange} value={values.password} />

			<button type="submit" className="btn" disabled={isSubmitting}>Sign up</button>
			
            <Route path={REGISTER} render={props => <NavLink className="btn-underline" to={LOGIN}>Already have account? Sign in.</NavLink>} />
        </form>	
    );
}

const RegisterForm = withFormik({
    validateOnBlur: false,
	mapPropsToValues: props => ({ name: "", email: "", password: "", user: props.user, userActions: props.userActions }),
	validate,
	handleSubmit: handleRegister,
	onSubmit: (values, actions) => {
		actions.setSubmitting(true);
	},
})(InnerRegisterForm);

RegisterForm.propTypes = {
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
RegisterForm.defaultProps = {
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

export default RegisterForm;