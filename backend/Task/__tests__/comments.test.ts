import {
  beforeAll,
  beforeEach,
  afterEach,
  afterAll,
  describe,
  it,
  expect,
  jest,
} from "@jest/globals";
import request from "supertest";
import repositoryComment from "../src/model/comments/commentsRepository";
import repositoryTask from "../src/model/task/taskRepository";
import app from "../src/app";
import { ITaskModel } from "../src/model/task/taskModel";
import { ICommentsModel } from "../src/model/comments/commentsModel";

const fakeComment = [
  {
    author: "Autor 1",
    comment: "comentario 1",
    taskId: 1,
  } as unknown as ICommentsModel,
  {
    author: "Autor 2",
    comment: "comentario 2",
    taskId: 1,
  } as unknown as ICommentsModel,
];

const createdComment = {
  author: "Autor 1",
  comment: "comentario 1",
  taskId: 1,
} as unknown as ICommentsModel;

const commentUpdated = {
  author: "Autor 3",
  comment: "comentario 3",
} as unknown as ICommentsModel;

let idTask: number;
let idComment: number;

beforeAll(async () => {
  const task = {
    title: "Task 1",
    description: "descricao task 1",
  } as unknown as ITaskModel;

  const fakedTask = await repositoryTask.create(task);
  idTask = fakedTask.id;

  const comment = {
    author: "Autor 1",
    comment: "comentario 1",
  } as unknown as ICommentsModel;

  const fakedComment = await repositoryComment.addComment(idTask, comment);
  idComment = fakedComment.id;
});

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.restoreAllMocks();
});

afterAll(async () => {
  jest.clearAllMocks();
  await repositoryTask.deleteById(idTask);
  await repositoryComment.deleteComment(idComment);
});

describe("Testando as rotas do comments", () => {
  it("GET /task/:id/comments, deve retornar 200", async () => {
    jest
      .spyOn(repositoryComment, "findAllbyTask")
      .mockResolvedValue(fakeComment);

    const result = await request(app).get("/task/1/comments");

    expect(result.status).toBe(200);
    expect(Array.isArray(result.body)).toBeTruthy();
  });

  it("GET /task/:id/comments, deve retornar 400, id invalido", async () => {
    jest
      .spyOn(repositoryComment, "findAllbyTask")
      .mockResolvedValue(fakeComment);

    const result = await request(app).get("/task/asd/comments");

    expect(result.status).toBe(400);
    expect(result.body.erro).toBe("Id invalido");
  });

  it("GET /task/:id/comments, deve retornar 404, id nao encontrado", async () => {
    jest.spyOn(repositoryComment, "findAllbyTask").mockResolvedValue([]);

    const result = await request(app).get("/task/-1/comments");

    expect(result.status).toBe(404);
    expect(result.body.erro).toBe("Task nao encontrada");
  });

  it("GET /task/:id/comments, deve retornar 500, erro interno", async () => {
    jest
      .spyOn(repositoryComment, "findAllbyTask")
      .mockRejectedValue(new Error());

    const result = await request(app).get("/task/1/comments");

    expect(result.status).toBe(500);
  });

  it("POST /task/:id/comments, deve retornar 201", async () => {
    jest
      .spyOn(repositoryComment, "addComment")
      .mockResolvedValue(createdComment);

    const result = await request(app).post("/task/1/comments").send({
      author: "Autor 1",
      comment: "comentario 1",
    });

    expect(result.status).toBe(201);
    expect(result.body.author).toBe("Autor 1");
  });

  it("POST /task/:id/comments, deve retornar 400", async () => {
    jest
      .spyOn(repositoryComment, "addComment")
      .mockResolvedValue(createdComment);

    const result = await request(app).post("/task/asdf/comments").send({
      author: "Autor 1",
      comment: "comentario 1",
    });

    expect(result.status).toBe(400);
    expect(result.body.erro).toBe("Id invalido");
  });

  it("POST /task/:id/comments, deve retornar 422", async () => {
    jest
      .spyOn(repositoryComment, "addComment")
      .mockResolvedValue(createdComment);

    const result = await request(app).post("/task/asdf/comments").send({
      author: 2345234,
      comment: 23453,
    });

    expect(result.status).toBe(422);
  });

  it("POST /task/:id/comments, deve retornar 400", async () => {
    jest
      .spyOn(repositoryComment, "addComment")
      .mockResolvedValue(createdComment);

    const result = await request(app).post("/task/1/comments").send();

    expect(result.status).toBe(400);
    expect(result.body.erro).toBe("Informações invalidas");
  });

  it("POST /task/:id/comments, deve retornar 500, erro interno", async () => {
    jest.spyOn(repositoryComment, "addComment").mockRejectedValue(new Error());

    const result = await request(app).post("/task/1/comments").send({
      author: "Autor 1",
      comment: "comentario 1",
    });

    expect(result.status).toBe(500);
  });

  it("GET /task/comments, deve retornar 200", async () => {
    const result = await request(app).get("/task/comments");

    expect(result.status).toBe(200);
    expect(Array.isArray(result.body)).toBeTruthy();
  });

  it("GET /task/comments, deve retornar 404", async () => {
    jest.spyOn(repositoryComment, "findAll").mockResolvedValue([]);

    const result = await request(app).get("/task/comments");

    expect(result.status).toBe(404);
    expect(result.body.erro).toBe(
      "Nao foi possivel encontrar nenhum comentario"
    );
  });

  it("GET /task/comments, deve retornar 500", async () => {
    jest.spyOn(repositoryComment, "findAll").mockRejectedValue(new Error());

    const result = await request(app).get("/task/comments");

    expect(result.status).toBe(500);
  });

  it("DELETE /task/comments, deve retornar 204", async () => {
    const result = await request(app).delete("/task/comments/" + idComment);

    expect(result.status).toBe(204);
  });

  it("DELETE /task/comments, deve retornar 400", async () => {
    const result = await request(app).delete("/task/comments/asd");

    expect(result.status).toBe(400);
    expect(result.body.erro).toBe("Id invalido");
  });

  it("PATCH /task/:id/comments, deve retornar 201", async () => {
    jest
      .spyOn(repositoryComment, "setComment")
      .mockResolvedValue(commentUpdated);
    const result = await request(app)
      .patch(`/task/2/comments/`)
      .send(commentUpdated);

    expect(result.status).toBe(201);
    expect(result.body.author).toBe("Autor 3");
  });

  it("PATCH /task/:id/comments, deve retornar 422", async () => {
    jest
      .spyOn(repositoryComment, "setComment")
      .mockResolvedValue(commentUpdated);
    const result = await request(app).patch(`/task/2/comments/`).send({
      author: 23452,
      comment: 3452,
    });

    expect(result.status).toBe(422);
  });

  it("PATCH /task/:id/comments, deve retornar 400- Id invalido", async () => {
    jest
      .spyOn(repositoryComment, "setComment")
      .mockResolvedValue(commentUpdated);
    const result = await request(app)
      .patch(`/task/asdf/comments/`)
      .send(commentUpdated);

    expect(result.status).toBe(400);
    expect(result.body.erro).toBe("Id invalido");
  });

  it("PATCH /task/:id/comments, deve retornar 400, corpo invalido", async () => {
    jest
      .spyOn(repositoryComment, "setComment")
      .mockResolvedValue(commentUpdated);
    const result = await request(app).patch(`/task/2/comments/`).send();

    expect(result.status).toBe(400);
    expect(result.body.erro).toBe("Informacoes invalidas");
  });

  it("PATCH /task/:id/comments, deve retornar 404, comentario nao encontrado", async () => {
    const result = await request(app)
      .patch(`/task/-1/comments/`)
      .send(commentUpdated);

    expect(result.status).toBe(404);
    expect(result.body.erro).toBe("Comentario nao encontrado");
  });

  it("PATCH /task/:id/comments, deve retornar 500, erro interno", async () => {
    jest
      .spyOn(repositoryComment, "setComment")
      .mockRejectedValue(new Error("db error"));
    const result = await request(app)
      .patch(`/task/2/comments/`)
      .send(commentUpdated);

    expect(result.status).toBe(500);
  });
});
