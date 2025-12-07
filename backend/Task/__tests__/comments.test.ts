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
