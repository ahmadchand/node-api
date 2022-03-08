const Joi = require("joi");
const express = require("express");
const router = express.Router();

const genres = [
  {
    id: 1,
    genre: "Comedy",
    star: 4.5,
  },
  {
    id: 2,
    genre: "Action",
    star: 5,
  },
  {
    id: 3,
    genre: "Animation",
    star: 4.9,
  },
  {
    id: 4,
    genre: "Drama",
    star: 4.4,
  },
  {
    id: 5,
    genre: "Crime",
    star: 4.7,
  },
  {
    id: 6,
    genre: "Musical",
    star: 4.6,
  },
  {
    id: 7,
    genre: "Horror",
    star: 4.2,
  },
  {
    id: 8,
    genre: "Adventure",
    star: 4.1,
  },
  {
    id: 9,
    genre: "Fantasy",
    star: 4.6,
  },
  {
    id: 10,
    genre: "Thriller",
    star: 4,
  },
];

router.get("/", (req, res) => {
  res.send(genres);
});

router.get("/:id", (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("The genre with given ID was not found.");

  res.send(genre);
});

router.post("/", (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const data = {
    id: genres.length + 1,
    genre: req.body.genre,
    star: req.body.star,
  };

  genres.push(data);
  res.send(data);
});

router.put("/:id", (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("The genre with given ID was not found.");

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  genre.genre = req.body.genre;
  genre.star = req.body.star;
  res.send(genre);
});

router.delete("/:id", (req, res) => {
  const genre = genres.find((c) => c.id === parseInt(req.params.id));
  if (!genre)
    return res.status(404).send("The genre with given ID was not found.");

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genre);
});

const validateGenre = (genre) => {
  const schema = Joi.object({
    genre: Joi.string().min(3).required(),
    star: Joi.number().required(),
  });

  return schema.validate(genre);
};

module.exports = router;
