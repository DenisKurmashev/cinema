import React, { PureComponent } from "react";
import { withFormik } from "formik";

import { validateSeanceForm, handleSubmitSeanceForm } from "../util";

import CinemasList from "./CinemasList/CinemasList";

import "./NewSeance.css";

class InnerSeance extends PureComponent {

    render() {
        const { values, errors, touched, handleChange, handleSubmit } = this.props;
        const { seance, films, additional, cinema, additionalActions, filmsActions, seanceActions, cinemaActions } = this.props;

        const { response, error } = seance;

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
                
                <div className="default-form__title">Add new Seance</div>
                
                <CinemasList cinema={cinema} cinemaActions={cinemaActions} />

                <button type="submit" className="btn" disabled={seance.isFetching}>Add</button>
                
            </form>
        );
    }

}

const Seance = withFormik({
    validateOnBlur: false,

    mapPropsToValues: props => ({ 
        cinema: "",
        film: "", 
        date: "", 
        roomNumber: 0,

        seance: props.seance, 
        films: props.films, 
        additional: props.additional, 
        additionalActions: props.additionalActions, 
        filmsActions: props.filmsActions,
        seanceActions: props.seanceActions 
    }),
    
	validate: validateSeanceForm,
	handleSubmit: handleSubmitSeanceForm,
})(InnerSeance);

export default Seance;