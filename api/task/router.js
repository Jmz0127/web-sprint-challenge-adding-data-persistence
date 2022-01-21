// build your `/api/tasks` router here
const router = require('express').Router();
const Tasks = require('./model');
const { validateTask } = require('./task-middleware');

router.get('/', async (req, res, next) => {
	try {
		const tasks = await Tasks.getAll();
		res.json(tasks);
	} catch (err) {
		next(err);
	}
});

router.post('/', validateTask, async (req, res, next) => {
	try {
		const newTask = await Tasks.create(req.body);
		res.json(newTask);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
