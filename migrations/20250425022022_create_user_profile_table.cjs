exports.up = function (knex) {
    return knex.schema.createTable('user_profiles', function (table) {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('users.id').onDelete('CASCADE');
        table.integer('age').nullable();
        table.float('weight').nullable();
        table.float('height').nullable();
        table.boolean('gender').defaultTo(true);
        table.boolean('profile_completed').defaultTo(false);
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('user_profiles');
};