
const router = require("express").Router();

const howto = require("./howto-model");
const hows = require('../config/dbConfig');
const restricted = require("../auth/authenticate-middleware");

//get all how to
router.get("/", (req, res) => {

    howto.find()
    .then(dataa => {
      res.json(dataa);
    })
    .catch(() => {res.status(500).json({ message: 'does not compute'})});
});

//post new how to
router.post("/", (req, res, next) => {
    howto.add(req.body)
      .then(data => {res.json(data)})
      .catch(() => {res.status(500).json({ message: 'does not compute' })});
});

//get by id
router.get("/:id", (req, res) => {
    howto.findById(req.params.id)
      .then(data => {res.json(data)})
      .catch(() => {res.status(500).json({ message: 'does not compute'})});
});

//get by author
router.get("/author/:author", (req, res) => {
    howto.findByAuthor(req.params.author)
      .then(data => {res.json(data)})
      .catch(() => {res.status(500).json({ message: 'does not compute'})});
});

//delete 
router.delete('/:id', (req, res) => {
    hows('howto').where({id: req.params.id}).del()
    .then(() => {res.status(200).json({Message: `Deleted howto.`})})
    .catch(() => {res.status(500).json({Message: "There was a problem deleting howto."})});
});

//edit how to
router.put('/:id', restricted, (req, res) => {
    const changes = req.body;
    const id = req.params.id;
    hows('howto').where({id}).update(changes)
        .then(() => {res.status(200).json({Message: `Successfully updated!`})})
        .catch(() => {res.status(500).json({Message: "Problem updating."})});
});

module.exports = router;