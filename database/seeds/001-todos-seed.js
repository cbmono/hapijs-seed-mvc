exports.seed = (Knex, Promise) => {
  return new Promise((resolve) => {
    const tableName = 'todos'

    var now = new Date
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

    Knex(tableName).insert(data).then(resolve)
  })
}
