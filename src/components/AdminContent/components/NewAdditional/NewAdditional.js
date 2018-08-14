import React, { PureComponent } from "react";
import { withFormik } from "formik";

import { validateAdditionalForm, handleSubmitAdditionalForm } from "../util";

import "./NewAdditional.css";

class InnerAdditional extends PureComponent {

    render() {
        const { additional, values, errors, touched, handleChange, handleSubmit }
            = this.props;

        const { response, error } = additional;

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
                
                <div className="default-form__title">Add new Additional</div>

                <div className="default-form__error">{touched.name && errors.name}</div>
                <input type="email" placeholder="Film name" name="name" onChange={handleChange} value={values.name} />

                <div className="default-form__error">{touched.price && errors.price}</div>
                <input type="number" placeholder="Price of additional service" min={1} name="price" onChange={handleChange} value={values.price} />

                <div className="default-form__error">{touched.description && errors.description}</div>
                <textarea type="text" placeholder="Description of film" name="description" onChange={handleChange} value={values.description} />

                <button type="submit" className="btn" disabled={additional.isFetching}>Add</button>
                
            </form>
        );
    }

}

const Additional = withFormik({
    validateOnBlur: false,

    mapPropsToValues: props => ({ 
        name: "",
        price: 1, 
        description: "", 
        additional: props.additional, 
        additionalActions: props.additionalActions 
    }),
    
	validate: validateAdditionalForm,
	handleSubmit: handleSubmitAdditionalForm,
})(InnerAdditional);

export default Additional;