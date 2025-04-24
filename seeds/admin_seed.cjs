/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('admin').del()
  await knex('admin').insert([
    {name: 'Dan'},
    {name: 'Florea'},
    {name: 'Paunescu'}
  ]);
};
