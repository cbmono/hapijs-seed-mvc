exports.seed = (Knex, Promise) => {
  return new Promise((resolve) => {
    const tableName = 'todos';

    const now = new Date;

    // Dummy data
    const data = [
      {
        todo_list_id : 1,
        name         : 'Pay for electricity',
        created_at   : now,
        updated_at   : now,
      },
      {
        todo_list_id : 2,
        name         : 'Buy bread',
        created_at   : now,
        updated_at   : now,
      },
      {
        todo_list_id : 2,
        name         : 'Buy butter',
        created_at   : now,
        updated_at   : now,
      },
    ];

    // Insert seeds into DB
    return Knex(tableName)
      .insert(data)
      .then(resolve);
  });
};
