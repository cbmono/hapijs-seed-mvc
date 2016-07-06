const tableName = 'todo_lists';

//
// UP
//
exports.up = (Knex, Promise) => {
  // Create ToDo's list table
  return Knex.schema.createTable(tableName, (table) => {
    // Define table fields
    table.increments('id').primary();
    table.string('name', 60).notNullable();

    // Standards
    table.timestamps();    // add `created_at` and `updated_at`
    table.charset('utf8');
  });
};


//
// DOWN
// (used to rollback `exports.up()`)
//
exports.down = (Knex, Promise) => {
  return Knex.schema.dropTable(tableName);
};
