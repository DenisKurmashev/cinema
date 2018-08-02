const Type = require("../models/type");

const type1 = {
    matrixNumber: 1,
    name: "Default place",
    price: 14,
    description: "Default place including soft seat"
};

const type2 = {
    matrixNumber: 2,
    name: "LoveSeats place",
    price: 14,
    description: "LoveSeats place soft couch for couples"
};

const type3 = {
    matrixNumber: 3,
    name: "VIP place",
    price: 14,
    description: "VIP place big sofa for big companies"
};

(new Type(type1)).save();
(new Type(type2)).save();
(new Type(type3)).save();