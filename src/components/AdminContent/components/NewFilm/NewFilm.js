import React, { PureComponent } from "react";
import { withFormik } from "formik";

import { validateFilmForm, handleSubmitFilmForm } from "../util";

import "./NewFilm.css";

class InnerNewFilm extends PureComponent {

    render() {
        const { films, values, errors, touched, handleChange, handleSubmit }
            = this.props;

        return (
            <form onSubmit={handleSubmit} className="default-form" noValidate>
                <div className="default-form__title">Add new Film</div>

                <div className="default-form__error">{touched.email && errors.email}</div>
                <input type="email" placeholder="Film name" name="name" onChange={handleChange} value={values.name} />

                <div className="default-form__error">{touched.email && errors.email}</div>
                <input type="date" placeholder="Date of released" name="released" onChange={handleChange} value={values.released} />

                <div className="default-form__error">{touched.password && errors.password}</div>
                <input type="text" placeholder="Reference for cover of film" name="cover" onChange={handleChange} value={values.cover} />

                <div className="default-form__error">{touched.password && errors.password}</div>
                <textarea type="text" placeholder="Description of film" name="description" onChange={handleChange} value={values.description} />

                <button type="submit" className="btn" disabled={films.isFetching}>Add</button>
                
            </form>
        );
    }

}

const NewFilm = withFormik({
    validateOnBlur: false,

    mapPropsToValues: props => ({ 
        name: "",
        released: "",
        cover: "", 
        description: "", 
        films: props.films, 
        filmsActions: props.filmsActions 
    }),
    
	validate: validateFilmForm,
	handleSubmit: handleSubmitFilmForm,
})(InnerNewFilm);

export default NewFilm;