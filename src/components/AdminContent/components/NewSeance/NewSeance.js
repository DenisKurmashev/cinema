import React, { PureComponent } from "react";
import { withFormik } from "formik";

import { validateSeanceForm, handleSubmitSeanceForm } from "../util";

import CinemasList from "./CinemasList/CinemasList";
import FilmList    from "./FilmList/FilmList";

import "./NewSeance.css";

class InnerSeance extends PureComponent {

    componentWillUnmount() {
        this.props.seanceActions.onSeanceSuccess(null);
    }

    handleDateChangeWrapper = (event) => {
        const { handleChange } = this.props;
        const target = event.target;

        const value = parseInt(target.value, 10);
        const max   = parseInt(target.max, 10);

        if (!value || value > max) 
            target.value = 0;

        handleChange(event);
    }

    render() {
        const { values, errors, touched, handleChange, handleSubmit } = this.props;
        const { seance, films, cinema, filmsActions, cinemaActions } = this.props;

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
                
                <div className="default-form-subtitle">1. select cinema from list below</div>
                <div className="default-form__error">{errors.cinema}</div>
                <CinemasList cinema={cinema} cinemaActions={cinemaActions}  />

                <div className="default-form-subtitle">2. select film from list below</div>
                <div className="default-form__error">{errors.film}</div>
                <FilmList films={films} filmsActions={filmsActions} />

                <div className="default-form-subtitle">3. select the date for seance</div>
                <div className="default-form__error">{touched.date && errors.date}</div>
                <input type="datetime-local" placeholder="Date for seance" name="date" onChange={handleChange} value={values.date} />

                <div className="default-form-subtitle">4. select the number of room</div>
                <div className="default-form__error">{touched.roomNumber && errors.roomNumber}</div>
                <input type="number" placeholder="Date for seance" 
                    min={0} name="roomNumber" onChange={this.handleDateChangeWrapper} 
                    value={values.roomNumber} 
                    max={cinema.selectedCinema ? (cinema.selectedCinema.rooms.length - 1) : 9} 
                />

                <button type="submit" className="btn" disabled={seance.isFetching}>Add</button>
                
            </form>
        );
    }

}

const Seance = withFormik({
    validateOnBlur: false,

    mapPropsToValues: props => ({ 
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