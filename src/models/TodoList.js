import { BaseModelRDMS } from './BaseModel.RDMS'
import { ToDo } from './ToDo'

//
// ToDo Lists
//
export class ToDoList extends BaseModelRDMS {

  /**
   * Constructor
   */
  constructor() {
    let tableName = 'todo_lists'
    super(tableName)

    this.ToDo = new ToDo()
  }

  /**
   * Find a specific ToDo list and all its ToDo's
   *
   * @param {integer} id
   * @return {promise}
   *         Contains an array with the ToDo List object and its ToDo's
   */
  findByIdWithTodos(id) {
    return this.findById(id).then((response) => {
      if (response.length) {
        return this.ToDo.findBy('todo_list_id', id).then((todos) => {
          response[0].todos = todos
          return response
        })
      }

      return response
    })
  }
}
