import React, { PureComponent } from "react";
import { withFormik } from "formik";

import { validateFilmForm, handleSubmitFilmForm } from "../util";

import "./NewFilm.css";

class InnerNewFilm extends PureComponent {

    render() {
        return (
            <div>

            </div>
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
	onSubmit: (values, actions) => {
		actions.setSubmitting(true);
	},
})(InnerNewFilm);

export default NewFilm;