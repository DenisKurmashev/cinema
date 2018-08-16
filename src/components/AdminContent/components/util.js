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
    return action.props.additionalActions.addAdditional(values);
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
    return action.props.seanceActions.addNewSeance(values);
};


export const validateCinemaForm = (values, props) => {
    let errors = {};
    

    return errors;
};
export const handleSubmitCinemaForm = (values, action) => {
    console.log(values);
};