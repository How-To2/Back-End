const db = require("../config/dbConfig.js");

module.exports = {
    find,
    findById,
    add,
    findByAuthor,
    edit,
    remove
}

function find(){
    return db("howto")
    .select("id", "title", "author", "howto")
}

function findById(id){
    return db('howto')
        .where({id})
        .first();
}

function add(howto) {
    return db("howto")
        .insert(howto)
        .then(([id]) => {
            return findById(id);
        })
}

function findByAuthor(author){
    return db('howto')
        .where({author})
        .first();
}

function edit(id, changes){
    return db('howto')
        .where({id})
        .update(changes)
}

function remove(id){
    return db('howto')
        .where({id}).del()
}