import { ToDosController } from './todos.controller';


//
// Tests
//
describe('Controller: ToDo\'s', () => {
  let controller;

  beforeEach(() => {
    controller = new ToDosController();

    spyOn(controller.ToDo, 'findAll').and.returnValue(Promise.resolve({}));
    spyOn(controller.ToDo, 'findById').and.returnValue(Promise.resolve({}));
    spyOn(controller.ToDo, 'save').and.returnValue(Promise.resolve({}));
    spyOn(controller.ToDo, 'update').and.returnValue(Promise.resolve({}));
    spyOn(controller.ToDo, 'del').and.returnValue(Promise.resolve({}));
  });

  it('should be defined and inherit from BaseController', () => {
    expect(controller).not.toBe(undefined);
    expect(controller.Boom).not.toBe(undefined);
  });

  it('should expose index()', () => {
    controller.index();
    expect(controller.ToDo.findAll).toHaveBeenCalled();
  });

  it('should expose view()', () => {
    const id = 1;
    const request = { params : { id } };

    controller.view(request);
    expect(controller.ToDo.findById).toHaveBeenCalledWith(id);
  });

  it('should expose create()', () => {
    const payload = { name : 'New ToDo' };
    const request = { payload };

    controller.create(request);
    expect(controller.ToDo.save).toHaveBeenCalledWith(payload);
  });

  it('should expose update()', () => {
    const id = 1;
    const payload = { name : 'Updated ToDo' };
    const request = {
      params : { id },
      payload,
    };

    controller.update(request);
    expect(controller.ToDo.update).toHaveBeenCalledWith(id, payload);
  });

  it('should expose remove()', () => {
    const id = 1;
    const request = { params : { id } };

    controller.remove(request);
    expect(controller.ToDo.del).toHaveBeenCalledWith(id);
  });
});
