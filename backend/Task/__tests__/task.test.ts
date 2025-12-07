import controller from '../src/controller/task';
import repositoryMock from '../src/model/task/taskRepository';
import { ITaskModel } from '../src/model/task/taskModel';
import {
  describe,
  it,
  expect,
  jest,
  beforeEach
} from '@jest/globals';

jest.mock('../src/model/task/taskRepository');
const repository = repositoryMock as jest.Mocked<typeof repositoryMock>;


function mockResponse() {
  const res: any = {};
  res.locals = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.sendStatus = jest.fn().mockReturnValue(res);
  return res;
}

function mockNext() {
  return jest.fn<(err?: any) => void>();
}

describe('Task Controller', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ------------------------------------------------------------------------
  // GET /tasks
  // ------------------------------------------------------------------------

  it('getTasks → retorna 200 com lista', async () => {
    const tasks = [{ id: 1 }, { id: 2 }] as ITaskModel[];
    (repository.findAll).mockResolvedValue(tasks);

    const req: any = {};
    const res = mockResponse();
    const next = mockNext();

    await controller.getTasks(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(tasks);
  });

  it('getTasks → chama next(PayloadNotFoundError) quando lista vazia', async () => {
    (repository.findAll).mockResolvedValue([]);

    const req: any = {};
    const res = mockResponse();
    const next = mockNext();

    await controller.getTasks(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0][0].constructor.name).toBe('PayloadNotFoundError');
  });

  // ------------------------------------------------------------------------
  // GET /tasks/user/:userId
  // ------------------------------------------------------------------------

  it('getUserTasks → retorna 200 com tasks do usuário', async () => {
    const tasks = [{ id: 1, userId: 10 }] as ITaskModel[];
    (repository.findByUser).mockResolvedValue(tasks);

    const req: any = { params: { userId: "10" } };
    const res = mockResponse();
    const next = mockNext();

    await controller.getUserTasks(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(tasks);
  });

  it('getUserTasks → erro se userId inválido', async () => {
    const req: any = { params: { userId: "abc" } };
    const res = mockResponse();
    const next = mockNext();

    await controller.getUserTasks(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0][0].constructor.name).toBe('ReqParamNotFoundError');
  });

  it('getUserTasks → erro se usuário não tem tasks', async () => {
    (repository.findByUser).mockResolvedValue([]);

    const req: any = { params: { userId: "10" } };
    const res = mockResponse();
    const next = mockNext();

    await controller.getUserTasks(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0][0].constructor.name).toBe('PayloadNotFoundError');
  });

  // ------------------------------------------------------------------------
  // GET /tasks/:id
  // ------------------------------------------------------------------------

  it('getTask → retorna 200 com task', async () => {
    const task = { id: 1 } as ITaskModel;
    (repository.findById).mockResolvedValue(task);

    const req: any = { params: { id: "1" } };
    const res = mockResponse();
    const next = mockNext();

    await controller.getTask(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(task);
  });

  it('getTask → erro se id inválido', async () => {
    const req: any = { params: { id: "abc" } };
    const res = mockResponse();
    const next = mockNext();

    await controller.getTask(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0][0].constructor.name).toBe('ReqParamNotFoundError');
  });

  it('getTask → erro se task não existe', async () => {
    (repository.findById).mockResolvedValue(null);

    const req: any = { params: { id: "1" } };
    const res = mockResponse();
    const next = mockNext();

    await controller.getTask(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0][0].constructor.name).toBe('NotFoundError');
  });

  // ------------------------------------------------------------------------
  // POST /tasks
  // ------------------------------------------------------------------------

  it('addTask → retorna 201 ao criar task', async () => {
    const created = { id: 1, name: "teste", userId: 10 } as any;

    (repository.create).mockResolvedValue(created);

    const req: any = { body: { name: "teste" } };
    const res = mockResponse();
    res.locals.payload = { userId: 10, name: "Luan" };

    const next = mockNext();

    await controller.addTask(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(created);
  });

  it('addTask → erro se userId não existe no payload', async () => {
    const req: any = { body: {} };
    const res = mockResponse();
    res.locals.payload = {}; 

    const next = mockNext();

    await controller.addTask(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0][0].constructor.name).toBe('UnauthorizedError');
  });

  // ------------------------------------------------------------------------
  // PUT /tasks/:id
  // ------------------------------------------------------------------------

  it('setTask → retorna 200 com task atualizada', async () => {
    const updated = { id: 1, name: "Nova" } as any;
    (repository.set).mockResolvedValue(updated);

    const req: any = { params: { id: "1" }, body: updated };
    const res = mockResponse();
    const next = mockNext();

    await controller.setTask(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updated);
  });

  it('setTask → erro se id inválido', async () => {
    const req: any = { params: { id: "abc" }, body: {} };
    const res = mockResponse();
    const next = mockNext();

    await controller.setTask(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0][0].constructor.name).toBe('ReqParamNotFoundError');
  });

  it('setTask → erro se task não existe', async () => {
    (repository.set).mockResolvedValue(null);

    const req: any = { params: { id: "1" }, body: { name: "x" } };
    const res = mockResponse();
    const next = mockNext();

    await controller.setTask(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0][0].constructor.name).toBe('NotFoundError');
  });

  // ------------------------------------------------------------------------
  // DELETE /tasks/:id
  // ------------------------------------------------------------------------

  it('deleteTask → retorna 204', async () => {
    (repository.deleteById).mockResolvedValue(1);

    const req: any = { params: { id: "1" } };
    const res = mockResponse();
    const next = mockNext();

    await controller.deleteTask(req, res, next);

    expect(res.sendStatus).toHaveBeenCalledWith(204);
  });

  it('deleteTask → erro se id inválido', async () => {
    const req: any = { params: { id: "xyz" } };
    const res = mockResponse();
    const next = mockNext();

    await controller.deleteTask(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0][0].constructor.name).toBe('ReqParamNotFoundError');
  });

});
