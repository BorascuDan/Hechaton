
exports.up = function (knex) {
    return knex.schema.createTable('senzors', function (table) {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('users.id').onDelete('CASCADE');
        table.integer('senzor_id');
        table.string('senzor_name');
        table.float('value');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('senzors');
};