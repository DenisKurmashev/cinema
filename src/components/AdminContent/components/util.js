export const validateFilmForm = (values, props) => {
    let errors = {};

    if (values.name.length < 3) {
        errors.name = "Minimum length of film name 3 symbols!";
    }

    if (!values.released) {
        errors.released = "You are not select the released date!";
    }

    // cover should be link
    // https://example.com/some-img.png
    if (!/^(https?:\/\/)\S+$/gi.test(values.cover)) {
        errors.cover = "Cover should be a reference for image!";
    } else if (!/\S+(\.(png|jpg|jpeg))/gi.test(values.cover)) {
        errors.cover = "Cover should be image, with one of types: png, jpg, jpeg!";
    }

    if (values.description.length < 25) {
        errors.description = "Minimum length of description should be 25 symbols!";
    }

    return errors;
};

export const handleSubmitFilmForm = (values, action) => {
    return action.props.filmsActions.addNewFilm(values);
};