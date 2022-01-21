// build your `Project` model here
const proj = require('../../data/dbConfig.js');

function getAll() {
	return proj('projects');
}

function getById(id) {
	return proj('projects').where('project_id', id).first();
}
//create some resources!
async function create(project) {
	const [id] = await proj('projects').insert(project);
	return getById(id);
}

module.exports = {
	getAll,
	getById,
	create
};
