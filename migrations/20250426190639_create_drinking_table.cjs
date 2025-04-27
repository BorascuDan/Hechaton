
exports.up = function (knex) {
    return knex.schema.createTable('drink', function (table) {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('users.id').onDelete('CASCADE');
        table.integer('sips');
        table.boolean('location').default(false);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('drink');
};