const tableName = 'todos'

//
// UP
//
exports.up = (Knex, Promise) => {
  // Create dummy table
  return Knex.schema.createTable(tableName, (table) => {
    table.increments('id').primary()
    table.string('name', 60).notNullable()

    // Standards
    table.timestamps()
    table.charset('utf8')
  })
}


//
// DOWN
//
exports.down = (Knex, Promise) => {
  return Knex.schema.dropTable(tableName)
}
