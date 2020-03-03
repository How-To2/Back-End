const db = require("../config/dbConfig");

module.exports = {
  find,
  findById,
  add,
  findByAuthor
};

function find() {
  return db("howto")
  .select("id", "title", "author", "howto")
}

function findById(id){
    return db('howto')
        .where({id})
        .first();
}

function add(data) {
    return db("howto")
      .insert(data)
      .then(([id]) => {
        return findById(id);
      });
}

function findByAuthor(author){
    return db('howto')
        .where({author})
        .first();
}
