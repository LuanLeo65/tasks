<<<<<<< HEAD
import controller from "../src/controller/comments";
import repositoryMock from "../src/model/comments/commentsRepository";
import {
  describe, it, expect, jest, beforeEach
} from "@jest/globals";

jest.mock("../src/model/comments/commentsRepository");
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

describe("Comments Controller", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ------------------------------------------------------------------------
  // GET /comments
  // ------------------------------------------------------------------------

  it("getAllComments → retorna 200 com lista", async () => {
    const comments = [{ id: 1 }, { id: 2 }] as any[];
    repository.findAll.mockResolvedValue(comments);

    const req: any = {};
    const res = mockResponse();
    const next = mockNext();

    await controller.getAllComments(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(comments);
  });

  it("getAllComments → erro quando lista vazia", async () => {
    repository.findAll.mockResolvedValue([]);

    const req: any = {};
    const res = mockResponse();
    const next = mockNext();

    await controller.getAllComments(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0][0].constructor.name).toBe("NotFoundError");
  });

  // ------------------------------------------------------------------------
  // GET /comments/user/:userId
  // ------------------------------------------------------------------------

  it("getAllUserComments → retorna 200", async () => {
    const comments = [{ id: 1, userId: 10 }] as any[];
    repository.findByUser.mockResolvedValue(comments);

    const req: any = { params: { userId: "10" } };
    const res = mockResponse();
    const next = mockNext();

    await controller.getAllUserComments(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(comments);
  });

  it("getAllUserComments → erro se userId inválido", async () => {
    const req: any = { params: { userId: "abc" } };
    const res = mockResponse();
    const next = mockNext();

    await controller.getAllUserComments(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0][0].constructor.name).toBe("ReqParamNotFoundError");
  });

  it("getAllUserComments → erro se usuário não tem comentários", async () => {
    repository.findByUser.mockResolvedValue([]);

    const req: any = { params: { userId: "10" } };
    const res = mockResponse();
    const next = mockNext();

    await controller.getAllUserComments(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0][0].constructor.name).toBe("NotFoundError");
  });

  it("getAllUserComments → erro se userId é NaN", async () => {
  const req: any = { params: { userId: "" } };
  const res = mockResponse();
  const next = mockNext();

  await controller.getAllUserComments(req, res, next);

  expect(next).toHaveBeenCalled();
  expect(next.mock.calls[0][0].constructor.name).toBe("ReqParamNotFoundError");
  });

  // ------------------------------------------------------------------------
  // GET /comments/task/:taskId
  // ------------------------------------------------------------------------

  it("getCommentsOfTask → retorna 200", async () => {
    const comments = [{ id: 1, taskId: 5 }] as any[];
    repository.findAllbyTask.mockResolvedValue(comments);

    const req: any = { params: { taskId: "5" } };
    const res = mockResponse();
    const next = mockNext();

    await controller.getCommentsOfTask(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(comments);
  });

  it("getCommentsOfTask → erro se taskId inválido", async () => {
    const req: any = { params: { taskId: "abc" } };
    const res = mockResponse();
    const next = mockNext();

    await controller.getCommentsOfTask(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0][0].constructor.name).toBe("ReqParamNotFoundError");
  });

  it("getCommentsOfTask → erro se não existe comentários", async () => {
    repository.findAllbyTask.mockResolvedValue([]);

    const req: any = { params: { taskId: "5" } };
    const res = mockResponse();
    const next = mockNext();

    await controller.getCommentsOfTask(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0][0].constructor.name).toBe("NotFoundError");
  });

  // ------------------------------------------------------------------------
  // POST /comments/task/:taskId
  // ------------------------------------------------------------------------

  it("addComment → retorna 201 ao criar comentário", async () => {
    const created = {
      id: 1,
      comment: "Olá",
      userId: 10,
      author: "Luan",
      taskId: 5
    } as any;

    repository.addComment.mockResolvedValue(created);

    const req: any = { params: { taskId: "5" }, body: { comment: "Olá" } };
    const res = mockResponse();
    res.locals.payload = { userId: 10, name: "Luan" };

    const next = mockNext();

    await controller.addComment(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(created);
  });

  it("addComment → erro se taskId inválido", async () => {
    const req: any = { params: { taskId: "abc" }, body: {} };
    const res = mockResponse();
    res.locals.payload = { userId: 10, name: "Luan" };

    const next = mockNext();

    await controller.addComment(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0][0].constructor.name).toBe("ReqParamNotFoundError");
  });

  it("addComment → erro se não há userId no payload", async () => {
    const req: any = { params: { taskId: "5" }, body: {} };
    const res = mockResponse();
    res.locals.payload = { name: "Luan" };

    const next = mockNext();

    await controller.addComment(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0][0].constructor.name).toBe("UnauthorizedError");
  });

  it("addComment → erro se name não existe no payload", async () => {
    const req: any = { params: { taskId: "5" }, body: {} };
    const res = mockResponse();
    res.locals.payload = { userId: 10 };

    const next = mockNext();

    await controller.addComment(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0][0].constructor.name).toBe("UnauthorizedError");
  });

  it("addComment → erro se req.body for null", async () => {
  const req: any = { params: { taskId: "5" }, body: null };
  const res = mockResponse();
  res.locals.payload = { userId: 10, name: "Luan" };

  const next = mockNext();
  await controller.addComment(req, res, next);

  expect(next).toHaveBeenCalled();
  expect(next.mock.calls[0][0].constructor.name).toBe('PayloadNotFoundError');
});

  

  // ------------------------------------------------------------------------
  // PUT /comments/:id
  // ------------------------------------------------------------------------

  it("setComment → retorna 201 com comentário atualizado", async () => {
    const updated = { id: 1, comment: "Atualizado" } as any;
    repository.setComment.mockResolvedValue(updated);

    const req: any = { params: { id: "1" }, body: updated };
    const res = mockResponse();
    const next = mockNext();

    await controller.setComment(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(updated);
  });

  it("setComment → erro se id inválido", async () => {
    const req: any = { params: { id: "abc" }, body: {} };
    const res = mockResponse();
    const next = mockNext();

    await controller.setComment(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0][0].constructor.name).toBe("ReqParamNotFoundError");
  });

  it("setComment → erro se comentário não existe", async () => {
    repository.setComment.mockResolvedValue(null);

    const req: any = { params: { id: "1" }, body: { comment: "teste" } };
    const res = mockResponse();
    const next = mockNext();

    await controller.setComment(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0][0].constructor.name).toBe("NotFoundError");
  });

  it("setComment → erro se req.body for null", async () => {
  const req: any = { params: { id: "1" }, body: null };
  const res = mockResponse();
  const next = mockNext();

  await controller.setComment(req, res, next);

  expect(next).toHaveBeenCalled();
  expect(next.mock.calls[0][0].constructor.name).toBe("PayloadNotFoundError");
});

  // ------------------------------------------------------------------------
  // DELETE /comments/:id
  // ------------------------------------------------------------------------

  it("deleteComment → retorna 204", async () => {
    repository.deleteComment.mockResolvedValue(1);

    const req: any = { params: { id: "1" } };
    const res = mockResponse();
    const next = mockNext();

    await controller.deleteComment(req, res, next);

    expect(res.sendStatus).toHaveBeenCalledWith(204);
  });

  it("deleteComment → erro se id inválido", async () => {
    const req: any = { params: { id: "xyz" } };
    const res = mockResponse();
    const next = mockNext();

    await controller.deleteComment(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0][0].constructor.name).toBe("ReqParamNotFoundError");
  });

  it("deleteComment → erro se id é NaN", async () => {
  const req: any = { params: { id: "" } };
  const res = mockResponse();
  const next = mockNext();

  await controller.deleteComment(req, res, next);

  expect(next).toHaveBeenCalled();
  expect(next.mock.calls[0][0].constructor.name).toBe("ReqParamNotFoundError");
});

});
=======
import { Request, Response } from 'express';
import controller from '../src/controller/comments'; 
import repository from '../src/model/comments/commentsRepository'; 
import {
  jest,
  describe,
  it,
  expect,
  afterAll,
  beforeEach,
} from "@jest/globals";


jest.mock('../src/model/comments/commentsRepository');
const mockRepository = repository as jest.Mocked<typeof repository>;


const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});

describe('Comments Controller', () => {
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

  afterAll(() => {
    mockConsoleLog.mockRestore(); 
  });

  describe('getAllComments', () => {
    it('should return all comments with status 200', async () => {
      const mockComments = [{ id: 1, comment: 'Comment 1' }];
      mockRepository.findAll.mockResolvedValue(mockComments as any);

      await controller.getAllComments(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRepository.findAll).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockComments);
    });

    it('should return 404 if no comments found', async () => {
      mockRepository.findAll.mockResolvedValue([]);

      await controller.getAllComments(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRepository.findAll).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ erro: 'Nao foi possivel encontrar nenhum comentario' });
    });

    it('should return 500 on error', async () => {
      mockRepository.findAll.mockRejectedValue(new Error('DB Error'));

      await controller.getAllComments(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRepository.findAll).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ erro: 'Erro ao retornar todos os comentarios' });
    });
  });

  describe('getAllUserComments', () => {
    it('should return user comments with status 200', async () => {
      const mockComments = [{ id: 1, userId: 1 }];
      mockReq.params = { userId: '1' };
      mockRepository.findByUser.mockResolvedValue(mockComments as any);

      await controller.getAllUserComments(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRepository.findByUser).toHaveBeenCalledWith(1);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockComments);
    });

    it('should return 400 for invalid userId', async () => {
      mockReq.params = { userId: 'invalid' };

      await controller.getAllUserComments(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ erro: 'Id de usuario invalido' });
    });

    it('should return 404 if no comments found for user', async () => {
      mockReq.params = { userId: '1' };
      mockRepository.findByUser.mockResolvedValue([]);

      await controller.getAllUserComments(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRepository.findByUser).toHaveBeenCalledWith(1);
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ erro: 'Nao foi possivel encontrar nenhum comentario' });
    });

    it('should return 500 on error', async () => {
      mockReq.params = { userId: '1' };
      mockRepository.findByUser.mockRejectedValue(new Error('DB Error'));

      await controller.getAllUserComments(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRepository.findByUser).toHaveBeenCalledWith(1);
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ erro: 'Erro ao retornar todos os comentarios' });
    });
  });

  describe('getCommentsOfTask', () => {
    it('should return comments of task with status 200', async () => {
      const mockComments = [{ id: 1, taskId: 1 }];
      mockReq.params = { taskId: '1' };
      mockRepository.findAllbyTask.mockResolvedValue(mockComments as any);

      await controller.getCommentsOfTask(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRepository.findAllbyTask).toHaveBeenCalledWith(1);
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockComments);
    });

    it('should return 400 for invalid taskId', async () => {
      mockReq.params = { taskId: 'invalid' };

      await controller.getCommentsOfTask(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ erro: 'Id invalido' });
    });

    it('should return 404 if no comments found for task', async () => {
      mockReq.params = { taskId: '1' };
      mockRepository.findAllbyTask.mockResolvedValue([]);

      await controller.getCommentsOfTask(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRepository.findAllbyTask).toHaveBeenCalledWith(1);
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ erro: 'Task nao encontrada' });
    });

    it('should return 500 on error', async () => {
      mockReq.params = { taskId: '1' };
      mockRepository.findAllbyTask.mockRejectedValue(new Error('DB Error'));

      await controller.getCommentsOfTask(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRepository.findAllbyTask).toHaveBeenCalledWith(1);
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ erro: 'Erro ao retornar o comentario dessa task' });
    });
  });

  describe('addComment', () => {
    it('should add comment with status 201', async () => {
      const mockComment = { id: 1, comment: 'New Comment' };
      mockReq.params = { taskId: '1' };
      mockReq.body = { comment: 'New Comment' };
      (mockRes.locals as any) = { payload: { userId: 1, name: 'User' } };
      mockRepository.addComment.mockResolvedValue(mockComment as any);

      await controller.addComment(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRepository.addComment).toHaveBeenCalledWith(1, {
        ...mockReq.body,
        userId: 1,
        author: 'User',
      });
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(mockComment);
    });

    it('should return 400 for invalid taskId', async () => {
      mockReq.params = { taskId: 'invalid' };
      (mockRes.locals as any) = { payload: { userId: 1, name: 'User' } };

      await controller.addComment(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ erro: 'Id invalido' });
    });

    it('should return 401 if userId missing', async () => {
      mockReq.params = { taskId: '1' };
      (mockRes.locals as any) = { payload: { name: 'User' } };

      await controller.addComment(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.sendStatus).toHaveBeenCalledWith(401);
    });

    it('should return 401 if name missing', async () => {
      mockReq.params = { taskId: '1' };
      (mockRes.locals as any) = { payload: { userId: 1 } };

      await controller.addComment(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.sendStatus).toHaveBeenCalledWith(401);
    });

    it('should return 400 if body invalid', async () => {
      mockReq.params = { taskId: '1' };
      mockReq.body = null;
      (mockRes.locals as any) = { payload: { userId: 1, name: 'User' } };

      await controller.addComment(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ erro: 'Informações invalidas' });
    });

    it('should return 500 on error', async () => {
      mockReq.params = { taskId: '1' };
      mockReq.body = { comment: 'New Comment' };
      (mockRes.locals as any) = { payload: { userId: 1, name: 'User' } };
      mockRepository.addComment.mockRejectedValue(new Error('DB Error'));

      await controller.addComment(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRepository.addComment).toHaveBeenCalled();
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ erro: 'Erro ao adicionar o comentario' });
    });
  });

  describe('deleteComment', () => {
    it('should delete comment with status 204', async () => {
      mockReq.params = { id: '1' };
      mockRepository.deleteComment.mockResolvedValue(1);

      await controller.deleteComment(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRepository.deleteComment).toHaveBeenCalledWith(1);
      expect(mockRes.sendStatus).toHaveBeenCalledWith(204);
    });

    it('should return 400 for invalid id', async () => {
      mockReq.params = { id: 'invalid' };

      await controller.deleteComment(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ erro: 'Id invalido' });
    });

    it('should return 500 on error', async () => {
      mockReq.params = { id: '1' };
      mockRepository.deleteComment.mockRejectedValue(new Error('DB Error'));

      await controller.deleteComment(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRepository.deleteComment).toHaveBeenCalledWith(1);
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ erro: 'Erro ao deletar o comentario' });
    });
  });

  describe('setComment', () => {
    it('should update comment with status 201', async () => {
      const mockComment = { id: 1, comment: 'Updated' };
      mockReq.params = { id: '1' };
      mockReq.body = { comment: 'Updated' };
      mockRepository.setComment.mockResolvedValue(mockComment as any);

      await controller.setComment(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRepository.setComment).toHaveBeenCalledWith(1, mockReq.body);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(mockComment);
    });

    it('should return 400 for invalid id', async () => {
      mockReq.params = { id: 'invalid' };

      await controller.setComment(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ erro: 'Id invalido' });
    });

    it('should return 400 if body invalid', async () => {
      mockReq.params = { id: '1' };
      mockReq.body = null;

      await controller.setComment(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalledWith({ erro: 'Informacoes invalidas' });
    });

    it('should return 404 if comment not found', async () => {
      mockReq.params = { id: '1' };
      mockReq.body = { comment: 'Updated' };
      mockRepository.setComment.mockResolvedValue(null);

      await controller.setComment(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRepository.setComment).toHaveBeenCalledWith(1, mockReq.body);
      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ erro: 'Comentario nao encontrado' });
    });

    it('should return 500 on error', async () => {
      mockReq.params = { id: '1' };
      mockReq.body = { comment: 'Updated' };
      mockRepository.setComment.mockRejectedValue(new Error('DB Error'));

      await controller.setComment(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRepository.setComment).toHaveBeenCalledWith(1, mockReq.body);
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ erro: 'Erro ao deletar o comentario' }); 
    });
  });
});
>>>>>>> 05048ea6ab6d5a6a28256b2572b4bfaae130d884
