const router = require("express").Router();

const mvp2 = require('./mvp2-model.js');

router.get("/", (req, res) => {
    mvp2.find()
        .then(howto => {
            res.status(200).json(howto);
        })
        .catch(err => {res.status(500).json({message: "failed to get"})})
})

router.get("/:id", (req, res) => {
    mvp2.findById(req.params.id)
        .then(howto => {res.status(200).json(howto)})
        .catch(err => {res.status(500).json({ message: "failed to get" })})
})

router.get('/author/:author', (req, res) => {
    mvp2.findByAuthor(req.params.author)
        .then(howto => {res.status(200).json(howto)})
        .catch(err => {res.status(500).json({ message: "failed to get" })})
})

router.post("/", (req, res) => {
    mvp2.add(req.body)
        .then(howto => {res.status(201).json(howto)})
        .catch(err => {res.status(500).json({ message: "failed to post" })})
})

router.put('/:id', (req, res) => {
    mvp2.edit(req.params.id, req.body)
        .then(() => {res.status(200).json({message: "updated successfully"})})
        .catch(err => {res.status(500).json({ message: "failed to update."})})
})

router.delete('/:id', (req, res) => {
    mvp2.remove(req.params.id)
        .then(() => {res.status(200).json({message: "deleted successfully"})})
        .catch(err => {res.status(500).json({ message: "failed to delete."})})
})

module.exports = router;