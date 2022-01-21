exports.up = async function (knex) {
	await knex.schema
		.createTable('projects', (table) => {
			table.increments('project_id');
			table.string('project_name', 128).notNullable();
			table.string('project_description', 128);
			table.boolean('project_completed').defaultTo(0); //false not avail in sqlite, using the 0 false 1 true structure as an alternative
		})
		.createTable('resources', (table) => {
			table.increments('resource_id');
			table.string('resource_name', 128).notNullable().unique();
			table.string('resource_description', 128);
		})
		.createTable('tasks', (table) => {
			table.increments('task_id');
			table.string('task_description', 128).notNullable();
			table.string('task_notes', 128);
			table.boolean('task_completed').defaultTo(0); //false not avail in sqlite, using the 0 false 1 true structure as an alternative
			table.integer('project_id').unsigned().references('project_id').inTable('projects').notNullable().onDelete('RESTRICT').onUpdate('RESTRICT');
		})
		.createTable('project_resources', (table) => {
			table.increments('project_resources_id');
			table.integer('project_id').unsigned().references('project_id').inTable('projects').notNullable().onDelete('RESTRICT').onUpdate('RESTRICT');

			table.integer('resource_id').unsigned().references('resource_id').inTable('resources').notNullable().onDelete('RESTRICT').onUpdate('RESTRICT');
		});
};

exports.down = async function (knex) {
	await knex.schema.dropTableIfExists('project_resources').dropTableIfExists('tasks').dropTableIfExists('resources').dropTableIfExists('projects'); //reversed order compared to .up based on what is dependant and what isn't
};
