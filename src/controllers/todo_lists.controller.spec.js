import { ToDoListsController } from './todo_lists.controller';

//
// Tests
//
describe('Controller: ToDo Lists', () => {
  let controller;

  beforeEach(() => {
    controller = new ToDoListsController();

    spyOn(controller.ToDoList, 'findAll').and.returnValue(Promise.resolve({}));
    spyOn(controller.ToDoList, 'findById').and.returnValue(Promise.resolve({}));
    spyOn(controller.ToDoList, 'findByIdWithToDos').and.returnValue(Promise.resolve({}));
    spyOn(controller.ToDoList, 'save').and.returnValue(Promise.resolve({}));
    spyOn(controller.ToDoList, 'update').and.returnValue(Promise.resolve({}));
    spyOn(controller.ToDoList, 'del').and.returnValue(Promise.resolve({}));
  });

  it('should be defined and inherit from BaseController', () => {
    expect(controller).not.toBe(undefined);
    expect(controller.Boom).not.toBe(undefined);
  });

  it('should expose index()', () => {
    controller.index();
    expect(controller.ToDoList.findAll).toHaveBeenCalled();
  });

  it('should expose view()', () => {
    const id = 1;
    const request = { params: { id } };

    controller.view(request);
    expect(controller.ToDoList.findById).toHaveBeenCalledWith(id);
  });

  it('should expose viewAll()', () => {
    const id = 1;
    const request = { params: { id } };

    controller.viewAll(request);
    expect(controller.ToDoList.findByIdWithToDos).toHaveBeenCalledWith(id);
  });

  it('should expose create()', () => {
    const payload = { name: 'New ToDo List' };
    const request = { payload };

    controller.create(request);
    expect(controller.ToDoList.save).toHaveBeenCalledWith(payload);
  });

  it('should expose update()', () => {
    const id = 1;
    const payload = { name: 'Updated ToDo List' };
    const request = {
      params: { id },
      payload,
    };

    controller.update(request);
    expect(controller.ToDoList.update).toHaveBeenCalledWith(id, payload);
  });

  it('should expose remove()', () => {
    const id = 1;
    const request = { params: { id } };

    controller.remove(request);
    expect(controller.ToDoList.del).toHaveBeenCalledWith(id);
  });
});
