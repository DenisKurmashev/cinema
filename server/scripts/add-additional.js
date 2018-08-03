const Additional = require("../models/additional");

const item1 = {
    name: "Popcorn",
    price: 1,
    description: "Corn of a variety with hard kernels that swell up and burst open with a pop when heated."
};

const item2 = {
    name: "Chips",
    price: 1,
    description: "A thin slice of food made crisp by being fried, baked, or dried and typically eaten as a snack."
};

const item3 = {
    name: "Bun",
    price: 1,
    description: "A bread roll of various shapes and flavorings, typically sweetened and often containing dried fruit."
};

(new Additional(item1)).save();
(new Additional(item2)).save();
(new Additional(item3)).save();