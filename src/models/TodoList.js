//
// Internal dependencies
//
import { BaseModelRDMS } from './BaseModel.RDMS'
import { ToDo } from './ToDo'


/******************************************
 *
 * ToDo lists
 *
 ******************************************/
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
   */
  findByIdWithTodos(id) {
    return this.findById(id)
      .then((response) => this.ToDo.findBy('todo_list_id', id)
        .then((todos) => {
          response.todos = todos
          return response
        })
      )
  }
}
