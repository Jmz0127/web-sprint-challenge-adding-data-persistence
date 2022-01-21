// build your `/api/resources` router here
const Resource = require('./model');
const router = require('express').Router();

//get everything from resource table - id, name, description
router.get('/', (req, res) => {
	Resource.getAll()
		.then((resources) => {
			res.json(resources);
		})
		.catch((err) => {
			res.status(500).json({ message: 'failed to retrieve resources', error: err.message });
		});
});

//post a new resource
router.post('/', (req, res) => {
	Resource.create(req.body)
		.then((newResource) => {
			res.status(201).json(newResource);
		})
		.catch((err) => {
			res.status(500).json({ message: 'Oops! Failed to create new resource!', error: err.message });
		});
});

module.exports = router;
