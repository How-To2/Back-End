const db = require("../config/dbConfig");

module.exports = {
  add,
  find,
  findBy,
  findById,
  remove
};

function find() {
  return db("users").select("id", "username", "password");
}

function findBy(filter) {
  return db("users")
    .select("id", "username", "password")
    .where(filter);
}

async function add(user) {
  let ids = await db("users")
        .insert(user, "id");
    const [id] = ids;
    return findById(id);
}

function findById(id) {
  return db("users")
    .select("id", "username")
    .where({ id })
    .first();
}

function remove(id) {
  return db('users')
    .where("id", id)
    .del()
}