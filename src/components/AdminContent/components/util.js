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
    action.props.filmsActions.addNewFilm(values);
    action.resetForm();
};


export const validateAdditionalForm = (values, props) => {
    let errors = {};

    if (values.name.length < 3) {
        errors.name = "Minimum length of film name 3 symbols!";
    }
    
    if (!values.price) {
        errors.price = "You are not select the price!";
    }

    if (values.description.length < 15) {
        errors.description = "Minimum length of description should be 15 symbols!";
    }

    return errors;
};
export const handleSubmitAdditionalForm = (values, action) => {
    action.props.additionalActions.addAdditional(values);
    action.resetForm();
};


export const validateSeanceForm = (values, props) => {
    const selectedCinema = props.cinema.selectedCinema;
    const selectedFilm   = props.films.selectedFilm;

    let errors = {};

    if (!selectedCinema) {
        errors.cinema = "You not selected cinema from list!";
    }

    if (!selectedFilm) {
        errors.film = "You not selected film from list!";
    }

    if (!values.date) {
        errors.date = "You not selected seance date!";
    } else if ((new Date(values.date)) < Date.now()) {
        errors.date = "You selected the date below now!";
    }

    return errors;
};
export const handleSubmitSeanceForm = (values, action) => {
    const { seanceActions, filmsActions, cinemaActions } = action.props;

    seanceActions.addNewSeance(values);
    filmsActions.onResetSelectedFilm();
    cinemaActions.onResetSelectedCinema();
    
    action.resetForm();
};


export const validateCinemaForm = (values, props) => {
    let errors = {};
    
    if (!values.name) {
        errors.name = "Name field should be fill!";
    } else if (values.name.length < 3) {
        errors.name = "Name of the cinema minimum should contain of 3 symbols!";
    }

    if (!values.city) {
        errors.city = "City field should be fill!";
    } else if (values.city.length < 3) {
        errors.city = "Name of the city minimum should contain of 3 symbols!";
    }

    return errors;
};
export const handleSubmitCinemaForm = (values, action) => {
    action.props.cinemaActions.addNewCinema(values);
    action.props.cinemaActions.onCurrentRoomSchemaChange([]);
    action.resetForm();
};