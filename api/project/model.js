// build your `Project` model here
const proj = require('../../data/dbConfig.js');

async function getAll() {
	const projects = await proj('projects');
	const newArr = [];
	projects.forEach((each) => {
		each.project_completed === 0 ? newArr.push({ ...each, project_completed: false }) : newArr.push({ ...each, project_completed: true });
	});
	return newArr;
}

async function getById(id) {
	const project = await proj('projects').where('project_id', id).first();
	let completed = project.project_completed;
	completed === 0 || !completed ? (completed = false) : (completed = true);
	return { ...project, project_completed: completed };
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
