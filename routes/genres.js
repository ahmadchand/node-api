const Joi = require("joi");
const express = require("express");
const router = express.Router();

const genres = [
  {
    id: 1,
    genre: "Comedy",
  },
  {
    id: 2,
    genre: "Action",
  },
  {
    id: 3,
    genre: "Animation",
  },
  {
    id: 4,
    genre: "Drama",
  },
  {
    id: 5,
    genre: "Crime",
  },
  {
    id: 6,
    genre: "Musical",
  },
  {
    id: 7,
    genre: "Horror",
  },
  {
    id: 8,
    genre: "Adventure",
  },
  {
    id: 9,
    genre: "Fantasy",
  },
  {
    id: 10,
    genre: "Thriller",
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
  });

  return schema.validate(genre);
};

module.exports = router;
