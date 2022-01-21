// build your `Resource` model here
const ree = require('../../data/dbConfig.js');

function getAll() {
  return ree('resources');
}

function getById(id) {
  return ree('resources').where('resource_id', id).first();
}
//create some resources!
async function create(resource) {
  const [id] = await ree('resources').insert(resource);
  return getById(id);
}

module.exports = {
  getAll,
  getById,
  create,
};