export const validate = (values, props) => {
    let errors = {};

    // if name exist in values
    // therefore it is validate of reg form
    if ("name" in values) {
        if (values.name.length < 5) {
            errors.name = "Name should contain at least 5 characters!";
        } else if (!/[a-z]/gi.test(values.name)) {
            errors.name = "Name should contain only from characters!";
        } else if (!/[A-Z][a-z]+/g.test(values.name)) {
            errors.name = "The name must begin with a letter in the upper case!";            
        }
    }

    if (!values.email) {
        errors.email = "Email is not required!";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address!";
    }

    if (!values.password) {
        errors.password = "Password is not required!";
    } else if (values.password.length < 5) {
        errors.password = "Password should contain at least 5 characters!";
    } else if (/[a-z]+/gi.test(values.password)) { // TO-DO: fix bug !!!
        errors.password = "The password is not to contain only from characters!";
    } else if (/\d+/g.test(values.password)) {
        errors.password = "The password is not to contain only from numbers!";
    } else if (!/[a-zA-Z0-9].+/g.test(values.password)) {
        errors.password = "The password is too weak! You can use characters in lowercase and upper case.";
    }

    return errors;
};

export const handleSubmit = values => {
    console.log(values);
};