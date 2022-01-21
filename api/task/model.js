// build your `Task` model here
const taskdb = require('../../data/dbConfig.js');

async function getAll() {
    const tasks = await taskdb("tasks as t")
        .leftJoin("projects as p", "t.project_id", "p.project_id")
        .select("t.*", "p.project_name", "p.project_description")
    const newArr = []
    tasks.forEach(each => {
        const taskComplete = each.task_completed
        taskComplete === 0 || !taskComplete ? newArr.push({...each, task_completed: false}) :
        newArr.push({...each, task_completed: true})
    })
    return newArr
}

async function getById(id) {
	const task = await taskdb('tasks').where('task_id', id).first();
	let completed = task.project_completed;
	completed === 0 || !completed ? (completed = false) : (completed = true);
	return { ...task, task_completed: completed };
}
//create some tasks!
async function create(task) {
	const [task_id] = await taskdb('tasks').insert(task);
	return getById(task_id);
}

module.exports = {
	getAll,
	getById,
	create
};
