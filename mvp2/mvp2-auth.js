const bcrypt = require('bcryptjs');
const router = require('express').Router();
const jwt = require('jsonwebtoken');

const Users = require("../users/model.js");
const { jwtSecret } = require("../config/secrets.js");

router.post("/register", (req, res) => {
    let user = req.body;

    const hash = bcrypt.hashSync(user.password, 8);

    user.password = hash;

    Users.add(user)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(err => {
            res.status(500).json(console.log(err));
        });
});

router.post("/login", (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)) {
                const token = generateToken(user)
                res.status(200).json({ message: `welcome ${user.username}`, token})
            } else {
                res.status(401).json({ message: "invalid entry" });
            }
        })
        .catch(err => {
            res.status(500).json(console.log(err));
        })
})

router.delete("/:id", (req, res) => {
    Users.remove(req.params.id)
        .then(count => {
            res.status(200).json({ deleted: count})
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "error"})
        })
});

function generateToken(user){
    const payload = {
        subject: user.id,
        username: user.username
    }
    const options = {
        expiresIn: '24h'
    }
    
    return jwt.sign(payload, jwtSecret, options)
}

router.get("/logout", (req, res) => {

    req.session.destroy(err => {
        err ?
        res.status(500).json({message: "error"})
        : res.status(200).json( {message: "logged out successfully "})
    })
})

module.exports = router;