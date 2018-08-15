const Cinema = require("../models/cinema");

const item1 = {
    name: "BIG Minsk House",
    city: "Minsk",
};

const item2 = {
    name: "BIG Gomel House",
    city: "Gomel",
};

const item3 = {
    name: "BIG Vitebsk House",
    city: "Vitebsk",
};

(new Cinema(item1)).save();
(new Cinema(item2)).save();
(new Cinema(item3)).save();