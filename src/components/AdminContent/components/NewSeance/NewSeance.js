import React, { PureComponent } from "react";
import { withFormik } from "formik";

import { validateSeanceForm, handleSubmitSeanceForm } from "../util";

import "./NewSeance.css";

class InnerSeance extends PureComponent {

    render() {
        const { seance, values, errors, touched, handleChange, handleSubmit }
            = this.props;

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
                


                <button type="submit" className="btn" disabled={seance.isFetching}>Add</button>
                
            </form>
        );
    }

}

const Seance = withFormik({
    validateOnBlur: false,

    mapPropsToValues: props => ({ 
        name: "",
        price: 1, 
        description: "", 
        seance: props.seance, 
        seanceActions: props.seanceActions 
    }),
    
	validate: validateSeanceForm,
	handleSubmit: handleSubmitSeanceForm,
})(InnerSeance);

export default Seance;