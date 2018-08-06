const Session = require("../models/session");

const items = [
    {
        cinema: "5b5ad3b1a9ac976580447351",
        film: "5b51c3dead4035529c8614ca",
        date: 1544548028996,
        roomNumber: 0
    },
    {
        cinema: "5b5ad3b1a9ac976580447351",
        film: "5b5840d611dd374a2869fd4d",
        date: 1545548028996,
        roomNumber: 0
    },
    {
        cinema: "5b5ad3b1a9ac976580447351",
        film: "5b58417f11dd374a2869fd4f",
        date: 1544548028996,
        roomNumber: 0
    },
    {
        cinema: "5b5ad3b1a9ac976580447351",
        film: "5b681529bc3a5c972ceec4b3",
        date: 1544548028996,
        roomNumber: 0
    },
    {
        cinema: "5b5ad3b1a9ac976580447351",
        film: "5b681529bc3a5c972ceec4b4",
        date: 1544548028996,
        roomNumber: 0
    },
    {
        cinema: "5b5ad3b1a9ac976580447351",
        film: "5b681529bc3a5c972ceec4b5",
        date: 1548548028996,
        roomNumber: 0
    },
];

for (let i = 0; i < 10; i++)
    items.forEach(item => (new Session(item).save()));