const Additional = require("../models/additional");
const Cinema = require("../models/cinema");
const Film = require("../models/film");
const Order = require("../models/order");
const Session = require("../models/session");
const User = require("../models/user");
const Type = require("../models/type");

const fillUser = async () => {
  const users = [
    {
      name: "default",
      email: "default@mail.com",
      password: "qwe123"
    },
    {
      name: "admin",
      email: "admin@mail.com",
      password: "qwe123",
      role: "admin"
    }
  ];

  console.log("\n");
  for (let i = 0; i < users.length; i++) {
    await new User(users[i]).save();
    console.log(
      `ROLE: ${users[i].role}   EMAIL: ${users[i].email}   PASSWORD: ${
        users[i].password
      }`
    );
  }
  console.log("\n");
};

const fillTypes = async () => {
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

  await new Type(type1).save();
  await new Type(type2).save();
  await new Type(type3).save();
};

const fillAdditional = async () => {
  const item1 = {
    name: "Popcorn",
    price: 1,
    description:
      "Corn of a variety with hard kernels that swell up and burst open with a pop when heated."
  };

  const item2 = {
    name: "Chips",
    price: 1,
    description:
      "A thin slice of food made crisp by being fried, baked, or dried and typically eaten as a snack."
  };

  const item3 = {
    name: "Bun",
    price: 1,
    description:
      "A bread roll of various shapes and flavorings, typically sweetened and often containing dried fruit."
  };

  await new Additional(item1).save();
  await new Additional(item2).save();
  await new Additional(item3).save();
};

const fillCinema = async () => {
  const item1 = {
    name: "BIG Minsk House",
    city: "Minsk"
  };

  const item2 = {
    name: "BIG Gomel House",
    city: "Gomel"
  };

  const item3 = {
    name: "BIG Vitebsk House",
    city: "Vitebsk"
  };

  await new Cinema(item1).save();
  await new Cinema(item2).save();
  await new Cinema(item3).save();
};

const fillFilm = async () => {
  const item1 = {
    name: "MISSION: IMPOSSIBLE - FALLOUT",
    released: 1532085071,
    cover:
      "https://images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster.png/0/images/masterrepository/Fandango/208387/MI6-Payoff-Poster.jpg",
    description:
      "The best intentions often come back to haunt you. MISSION: IMPOSSIBLE - FALLOUT finds Ethan Hunt (Tom Cruise) and his IMF team (Alec Baldwin, Simon Pegg, Ving Rhames) along with some familiar allies (Rebecca Ferguson, Michelle Monaghan) in a race against time after a mission gone wrong. Henry Cavill, Angela Bassett, and Vanessa Kirby also join the dynamic cast with filmmaker Christopher McQuarrie returning to the helm."
  };

  const item2 = {
    name: "CHRISTOPHER ROBIN ",
    released: 1532085071,
    cover:
      "https://images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster.png/0/images/masterrepository/Fandango/209947/Christopher%20Robin.jpg",
    description:
      "Christopher Robin -- now a family man living in London -- receives a surprise visit from his old childhood pal, Winnie-the-Pooh. With Christopher's help, Pooh embarks on a journey to find his friends -- Tigger, Eeyore, Owl, Piglet, Rabbit, Kanga and Roo. Once reunited, the lovable bear and the gang travel to the big city to help Christopher rediscover the joy of life."
  };

  const item3 = {
    name: "THE DARKEST MINDS",
    released: 1532085071,
    cover:
      "https://images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster.png/0/images/masterrepository/Fandango/210329/TDM_All_Char_Field_1s_v110_R3.jpg",
    description:
      "When teens mysteriously develop powerful new abilities, they are seen as a threat by the government and sent to detainment camps. Sixteen-year-old Ruby soon escapes from her captors and joins other runaways who are seeking a safe haven. Banded together and on the run, they soon combine their collective powers to fight the adults who tried to take away their future."
  };

  const item4 = {
    name: "THE SPY WHO DUMPED ME",
    released: 1532085071,
    cover:
      "https://images.fandango.com/ImageRenderer/200/0/redesign/static/img/default_poster.png/0/images/masterrepository/Fandango/210403/TSWDM_1Sht_Bond_VF.jpg",
    description:
      "The Spy Who Dumped Me tells the story of Audrey (Kunis) and Morgan (McKinnon), two best friends who unwittingly become entangled in an international conspiracy when one of the women discovers the boyfriend who dumped her was actually a spy."
  };

  await new Film(item1).save();
  await new Film(item2).save();
  await new Film(item3).save();
  await new Film(item4).save();
};

const fillSession = async () => {
  let items = [];

  const films = await Film.find({})
    .select("_id")
    .lean();
  const cinemas = await Cinema.find({})
    .select("_id")
    .lean();

  let filmCounter = 0;
  let cinemaCounter = 0;

  for (let i = 0; i < 100; i++) {
    if (filmCounter === films.length) filmCounter = 0;
    if (cinemaCounter === cinemas.length) cinemaCounter = 0;

    items.push({
      cinema: cinemas[cinemaCounter]._id,
      film: films[filmCounter]._id,
      date: 1544548028996,
      roomNumber: i % 2 === 0 ? 1 : 0
    });

    filmCounter++;
    cinemaCounter++;
  }

  for (let i = 0; i < items.length; i++) await new Session(items[i]).save();
};

(async () => {
  await fillUser();
  await fillTypes();
  await fillAdditional();
  await fillCinema();
  await fillFilm();
  await fillSession();
})()
  .then(() => console.log("OK"))
  .catch(err => console.log(err));
