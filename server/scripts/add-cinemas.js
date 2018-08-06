const Cinema = require("../models/cinema");

const item1 = {
    name: "Best cinema",
    city: "Minsk",
};

const item2 = {
    name: "Night Minsk",
    city: "Minsk",
};

const item3 = {
    name: "Nice Gomel",
    city: "Gomel",
};

(new Cinema(item1)).save();
(new Cinema(item2)).save();
(new Cinema(item3)).save();