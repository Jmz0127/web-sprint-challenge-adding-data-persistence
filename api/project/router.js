// build your `/api/projects` router here
const Project = require('./model');
const router = require('express').Router();

//get everything from project table - id, name, description, completed
router.get('/', (req, res) => {
	Project.getAll()
		.then((projects) => {
			res.json(projects);
		})
		.catch((err) => {
			res.status(500).json({ message: 'failed to retrieve projects', error: err.message });
		});
});

//post a new project
router.post('/', (req, res) => {
	Project.create(req.body)
		.then((newProject) => {
			res.status(201).json(newProject);
		})
		.catch((err) => {
			res.status(500).json({ message: 'Oops! Failed to create new project!', error: err.message });
		});
});

module.exports = router;
