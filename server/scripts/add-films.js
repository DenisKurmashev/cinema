const Film = require("../models/film");

const item1 = {
    name: "MISSION: IMPOSSIBLE - FALLOUT",
    released: 1532085071,
    cover: "https://images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster.png/0/images/masterrepository/Fandango/208387/MI6-Payoff-Poster.jpg",
    description: "The best intentions often come back to haunt you. MISSION: IMPOSSIBLE - FALLOUT finds Ethan Hunt (Tom Cruise) and his IMF team (Alec Baldwin, Simon Pegg, Ving Rhames) along with some familiar allies (Rebecca Ferguson, Michelle Monaghan) in a race against time after a mission gone wrong. Henry Cavill, Angela Bassett, and Vanessa Kirby also join the dynamic cast with filmmaker Christopher McQuarrie returning to the helm."
};

const item2 = {
    name: "CHRISTOPHER ROBIN ",
    released: 1532085071,
    cover: "https://images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster.png/0/images/masterrepository/Fandango/209947/Christopher%20Robin.jpg",
    description: "Christopher Robin -- now a family man living in London -- receives a surprise visit from his old childhood pal, Winnie-the-Pooh. With Christopher's help, Pooh embarks on a journey to find his friends -- Tigger, Eeyore, Owl, Piglet, Rabbit, Kanga and Roo. Once reunited, the lovable bear and the gang travel to the big city to help Christopher rediscover the joy of life."
};

const item3 = {
    name: "THE DARKEST MINDS",
    released: 1532085071,
    cover: "https://images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster.png/0/images/masterrepository/Fandango/210329/TDM_All_Char_Field_1s_v110_R3.jpg",
    description: "When teens mysteriously develop powerful new abilities, they are seen as a threat by the government and sent to detainment camps. Sixteen-year-old Ruby soon escapes from her captors and joins other runaways who are seeking a safe haven. Banded together and on the run, they soon combine their collective powers to fight the adults who tried to take away their future."
};

const item4 = {
    name: "THE SPY WHO DUMPED ME",
    released: 1532085071,
    cover: "https://images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster.png/0/images/masterrepository/Fandango/210403/TSWDM_1Sht_Bond_VF.jpg",
    description: "The Spy Who Dumped Me tells the story of Audrey (Kunis) and Morgan (McKinnon), two best friends who unwittingly become entangled in an international conspiracy when one of the women discovers the boyfriend who dumped her was actually a spy."
};

(new Film(item1)).save();
(new Film(item2)).save();
(new Film(item3)).save();
(new Film(item4)).save();