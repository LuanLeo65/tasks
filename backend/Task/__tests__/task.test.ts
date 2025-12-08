<<<<<<< HEAD
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

=======
import { Request, Response } from 'express';
import controller from '../src/controller/task'; 
import repository from '../src/model/task/taskRepository'; 
import {
  jest,
  describe,
  it,
  expect,
  beforeEach,
} from "@jest/globals";


jest.mock('../src/model/task/taskRepository');
const mockRepository = repository as jest.Mocked<typeof repository>;

describe('Task Controller', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: jest.Mock;

  beforeEach(() => {
    mockReq = {};
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      sendStatus: jest.fn(),
    } as Partial<Response>;
    mockNext = jest.fn();
    jest.clearAllMocks();
  });

  describe('getTasks', () => {
    it('should return all tasks with status 200', async () => {
      const mockTasks = [{ id: 1, title: 'Task 1' }];
      mockRepository.findAll.mockResolvedValue(mockTasks as any);

      await controller.getTasks(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRepository.findAll).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockTasks);
    });

    it('should return 400 if no tasks found', async () => {
      mockRepository.findAll.mockResolvedValue([]);

      await controller.getTasks(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRepository.findAll).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ erro: 'Nao foi possivel encontrar nada no banco de dados' });
    });

    it('should return 500 on error', async () => {
      mockRepository.findAll.mockRejectedValue(new Error('DB Error'));

      await controller.getTasks(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRepository.findAll).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ erro: 'Ocorreu um erro ao retornar todas as tasks' });
    });
  });

  describe('getUserTasks', () => {
    it('should return user tasks with status 200', async () => {
      const mockTasks = [{ id: 1, userId: 1 }];
      mockReq.params = { userId: '1' };
      mockRepository.findByUser.mockResolvedValue(mockTasks as any);

      await controller.getUserTasks(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRepository.findByUser).toHaveBeenCalledWith(1);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockTasks);
    });

    it('should return 400 for invalid userId', async () => {
      mockReq.params = { userId: 'invalid' };

      await controller.getUserTasks(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ erro: 'Id de usuario invalido' });
    });

    it('should return 400 if no tasks found for user', async () => {
      mockReq.params = { userId: '1' };
      mockRepository.findByUser.mockResolvedValue([]);

      await controller.getUserTasks(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRepository.findByUser).toHaveBeenCalledWith(1);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ erro: 'Nao foi possivel encontrar nada no banco de dados' });
    });

    it('should return 500 on error', async () => {
      mockReq.params = { userId: '1' };
      mockRepository.findByUser.mockRejectedValue(new Error('DB Error'));

      await controller.getUserTasks(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRepository.findByUser).toHaveBeenCalledWith(1);
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ erro: 'Ocorreu um erro ao retornar todas as tasks' });
    });
  });

  describe('getTaskComments', () => {
    it('should return task comments with status 200', async () => {
      const mockTask = { id: 1, comments: [] };
      mockReq.params = { id: '1' };
      mockRepository.findByTask.mockResolvedValue(mockTask as any);

      await controller.getTaskComments(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRepository.findByTask).toHaveBeenCalledWith(1);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockTask);
    });

    it('should return 400 for invalid id', async () => {
      mockReq.params = { id: 'invalid' };

      await controller.getTaskComments(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ erro: 'Id invalido' });
    });

    it('should return 404 if task not found', async () => {
      mockReq.params = { id: '1' };
      mockRepository.findByTask.mockResolvedValue(null);

      await controller.getTaskComments(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRepository.findByTask).toHaveBeenCalledWith(1);
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ erro: 'Task nao encontrada' });
    });

    it('should return 500 on error', async () => {
      mockReq.params = { id: '1' };
      mockRepository.findByTask.mockRejectedValue(new Error('DB Error'));

      await controller.getTaskComments(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRepository.findByTask).toHaveBeenCalledWith(1);
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ erro: 'Ocorreu um erro ao procurar a tasks' });
    });
  });

  describe('getTask', () => {
    it('should return task with status 200', async () => {
      const mockTask = { id: 1, title: 'Task 1' };
      mockReq.params = { id: '1' };
      mockRepository.findById.mockResolvedValue(mockTask as any);

      await controller.getTask(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRepository.findById).toHaveBeenCalledWith(1);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockTask);
    });

    it('should return 400 for invalid id', async () => {
      mockReq.params = { id: 'invalid' };

      await controller.getTask(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ erro: 'Id invalido' });
    });

    it('should return 404 if task not found', async () => {
      mockReq.params = { id: '1' };
      mockRepository.findById.mockResolvedValue(null);

      await controller.getTask(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRepository.findById).toHaveBeenCalledWith(1);
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ erro: 'Task nao encontrada' });
    });

    it('should return 500 on error', async () => {
      mockReq.params = { id: '1' };
      mockRepository.findById.mockRejectedValue(new Error('DB Error'));

      await controller.getTask(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRepository.findById).toHaveBeenCalledWith(1);
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ erro: 'Ocorreu um erro ao procurar a tasks' });
    });
  });

  describe('addTask', () => {
    it('should create task with status 201', async () => {
      const mockTask = { id: 1, title: 'New Task' };
      mockReq.body = { title: 'New Task', description: 'Desc' };
      (mockRes.locals as any) = { payload: { userId: 1, name: 'User' } };
      mockRepository.create.mockResolvedValue(mockTask as any);

      await controller.addTask(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRepository.create).toHaveBeenCalledWith({
        ...mockReq.body,
        userId: 1,
        author: 'User',
      });
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(mockTask);
    });

    it('should return 401 if userId missing', async () => {
      (mockRes.locals as any) = { payload: { name: 'User' } };

      await controller.addTask(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.sendStatus).toHaveBeenCalledWith(401);
    });

    it('should return 401 if name missing', async () => {
      (mockRes.locals as any) = { payload: { userId: 1 } };

      await controller.addTask(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.sendStatus).toHaveBeenCalledWith(401);
    });

    it('should return 400 if body invalid', async () => {
      mockReq.body = null;
      (mockRes.locals as any) = { payload: { userId: 1, name: 'User' } };

      await controller.addTask(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ erro: 'Nao foi possivel criar a conta' });
    });

    it('should return 500 on error', async () => {
      mockReq.body = { title: 'New Task' };
      (mockRes.locals as any) = { payload: { userId: 1, name: 'User' } };
      mockRepository.create.mockRejectedValue(new Error('DB Error'));

      await controller.addTask(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRepository.create).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ erro: 'Ocorreu um erro ao criar task' });
    });
  });

  describe('setTask', () => {
    it('should update task with status 200', async () => {
      const mockTask = { id: 1, title: 'Updated' };
      mockReq.params = { id: '1' };
      mockReq.body = { title: 'Updated' };
      mockRepository.set.mockResolvedValue(mockTask as any);

      await controller.setTask(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRepository.set).toHaveBeenCalledWith(1, mockReq.body);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockTask);
    });

    it('should return 400 for invalid id', async () => {
      mockReq.params = { id: 'invalid' };

      await controller.setTask(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ erro: 'Id invalido' });
    });

    it('should return 400 if body invalid', async () => {
      mockReq.params = { id: '1' };
      mockReq.body = null;

      await controller.setTask(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ erro: 'Nao foi possivel atualizar a conta' });
    });

    it('should return 404 if task not found', async () => {
      mockReq.params = { id: '1' };
      mockReq.body = { title: 'Updated' };
      mockRepository.set.mockResolvedValue(null);

      await controller.setTask(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRepository.set).toHaveBeenCalledWith(1, mockReq.body);
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ erro: 'Task nao encontrada' });
    });

    it('should return 500 on error', async () => {
      mockReq.params = { id: '1' };
      mockReq.body = { title: 'Updated' };
      mockRepository.set.mockRejectedValue(new Error('DB Error'));

      await controller.setTask(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRepository.set).toHaveBeenCalledWith(1, mockReq.body);
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ erro: 'Ocorreu um erro ao atualizar a task' });
    });
  });

  describe('deleteTask', () => {
    it('should delete task with status 204', async () => {
      mockReq.params = { id: '1' };
      mockRepository.deleteById.mockResolvedValue(1);

      await controller.deleteTask(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRepository.deleteById).toHaveBeenCalledWith(1);
      expect(mockRes.sendStatus).toHaveBeenCalledWith(204);
    });

    it('should return 400 for invalid id', async () => {
      mockReq.params = { id: 'invalid' };

      await controller.deleteTask(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ erro: 'Id invalido' });
    });

    it('should return 500 on error', async () => {
      mockReq.params = { id: '1' };
      mockRepository.deleteById.mockRejectedValue(new Error('DB Error'));

      await controller.deleteTask(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRepository.deleteById).toHaveBeenCalledWith(1);
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ erro: 'Ocorreu um erro ao deletar a task' });
    });
  });
>>>>>>> 05048ea6ab6d5a6a28256b2572b4bfaae130d884
});
