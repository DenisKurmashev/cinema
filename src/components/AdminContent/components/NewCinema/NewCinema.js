import React, { PureComponent } from "react";
import { withFormik } from "formik";

import { validateCinemaForm, handleSubmitCinemaForm } from "../util";

import RoomSchema from "./RoomSchema/RoomSchema";

import "./NewCinema.css";

class InnerNewCinema extends PureComponent {

    componentWillUnmount() {
        this.props.cinemaActions.onAddNewCinemaSuccess(null);
    }

    render() {
        const { cinema, values, errors, touched, handleChange, handleSubmit }
            = this.props;

        const { response, error } = cinema;

        return (
            <form onSubmit={handleSubmit} className="default-form" noValidate>
                <div className={"default-form-result-content " + (response ? "success" : error ? "failed" : "")} >
                    { 
                        response
                        ? response
                        : error
                            ? error
                            : null
                    }
                </div>

                <div className="default-form__title">Add new Cinema</div>
                
                <div className="default-form__error">{touched.name && errors.name}</div>
                <input type="text" placeholder="Name of cinema" name="name" onChange={handleChange} value={values.name} />

                <div className="default-form__error">{touched.city && errors.city}</div>
                <input type="text" placeholder="City" name="city" onChange={handleChange} value={values.city} />

                <RoomSchema />

                <button type="submit" className="btn" disabled={cinema.isFetching}>Add</button>
                
            </form>
        );
    }

}

const NewCinema = withFormik({
    validateOnBlur: false,

    mapPropsToValues: props => ({ 
        name: "",
        city: "",

        cinema: props.cinema, 
        cinemaActions: props.cinemaActions 
    }),
    
	validate: validateCinemaForm,
	handleSubmit: handleSubmitCinemaForm,
})(InnerNewCinema);

export default NewCinema;