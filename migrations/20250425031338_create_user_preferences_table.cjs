exports.up = function (knex) {
    return knex.schema.createTable('user_preferences', function (table) {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('users.id').onDelete('CASCADE');
        table.boolean('notification_emails').defaultTo(true);
        table.boolean('push_notifications').defaultTo(true);
        table.boolean('goal_reminders').defaultTo(true);
        table.enum('unit_preferences', ['metric', 'imperial']).defaultTo('metric');
        table.timestamps(true, true);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('user_preferences');
};