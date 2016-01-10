exports.seed = (Knex, Promise) => {
  return new Promise((resolve) => {
    const tableName = 'todo_lists'

    var now = new Date

    // Dummy data
    var data = [
      {
        name: 'Housing',
        created_at: now,
        updated_at: now
      },
      {
        name: 'Food',
        created_at: now,
        updated_at: now
      },
      {
        name: 'Shopping',
        created_at: now,
        updated_at: now
      }
    ]

    // Insert seeds into DB
    return Knex(tableName)
      .insert(data)
      .then(resolve)
  })
}
