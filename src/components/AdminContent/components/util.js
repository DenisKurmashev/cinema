export const validateFilmForm = (value, props) => {
    let errors = {};
};

export const handleSubmitFilmForm = (values, action) => {
    return action.props.filmsActions.addNewFilm(values);
};