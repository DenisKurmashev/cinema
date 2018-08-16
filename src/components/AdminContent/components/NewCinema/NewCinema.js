import React, { PureComponent } from "react";
import { withFormik } from "formik";

import { validateCinemaForm, handleSubmitCinemaForm } from "../util";

import "./NewCinema.css";

class InnerNewCinema extends PureComponent {

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
                


                <button type="submit" className="btn" disabled={cinema.isFetching}>Add</button>
                
            </form>
        );
    }

}

const NewCinema = withFormik({
    validateOnBlur: false,

    mapPropsToValues: props => ({ 
        name: "",
        released: "",
        cover: "", 
        description: "", 

        cinema: props.cinema, 
        cinemaActions: props.cinemaActions 
    }),
    
	validate: validateCinemaForm,
	handleSubmit: handleSubmitCinemaForm,
})(InnerNewCinema);

export default NewCinema;