import { beforeAll, beforeEach, afterEach, afterAll, describe, it, expect, jest} from '@jest/globals'
import request from "supertest";
import app from "../src/app";
import repository from "../src/model/task/taskRepository";
import { ITaskModel } from "../src/model/task/taskModel";

const task = [
  {
    id: 1,
    title: "Task 1",
    description: "descricao task 1",
  } as unknown as ITaskModel,
  {
    id: 2,
    title: "Task 2",
    description: "descricao task 2",
  } as unknown as ITaskModel,
];

const taskCreated = {
  title: "Task 1",
  description: "descricao task 1",
} as unknown as ITaskModel;

const taskCommented = {
  id: 1,
  title: "Task 1",
  description: "Descricao task 1",
  comment: {
    author: "autor 1",
    comment: "comentario 1",
  },
} as unknown as ITaskModel;

let idTask: number;

beforeAll(async () => {
  const fakeTaskParams = {
    title: "Task 5",
    description: "Descricao task 5",
  } as unknown as ITaskModel;

  const fakeTask = await repository.create(fakeTaskParams);
  idTask = fakeTask.id;
});

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.restoreAllMocks();
});

afterAll(async () => {
  jest.clearAllMocks();
  await repository.deleteById(idTask);
});

describe("testando as tasks", () => {
  it("GET /task - deve retornar 200", async () => {
    jest.spyOn(repository, "findAll").mockResolvedValue(task);

    const result = await request(app).get("/task");

    expect(result.status).toBe(200);
    expect(Array.isArray(result.body)).toBe(true);
    expect(result.body.length).toBe(2);
  });

  it("GET /task - deve retornar 400, quando nao houver task", async () => {
    jest.spyOn(repository, "findAll").mockResolvedValue([]);

    const result = await request(app).get("/task");

    expect(result.status).toBe(400);
    expect(result.body).toHaveProperty("erro");
  });

  it("GET /task - deve retornar 500, quando houver erro interno", async () => {
    jest.spyOn(repository, "findAll").mockRejectedValue(new Error("db error"));

    const result = await request(app).get("/task");

    expect(result.status).toBe(500);
    expect(result.body).toHaveProperty("erro");
  });

  it("GET /task/:id - deve retornar 200, retornar uma task", async () => {
    jest.spyOn(repository, "findById").mockResolvedValue(taskCreated);

    const result = await request(app).get("/task/1");

    expect(result.status).toBe(200);
    expect(result.body.title).toBe("Task 1");
  });

  it("GET /task/:id - deve retornar 400, quando id for invalido", async () => {
    jest.spyOn(repository, "findById").mockResolvedValue(taskCreated);

    const result = await request(app).get("/task/asdf");

    expect(result.status).toBe(400);
    expect(result.body.erro).toBe("Id invalido");
  });

  it("GET /task/:id - deve retornar 404, quando nao houver task", async () => {
    jest.spyOn(repository, "findById").mockResolvedValue(null);

    const result = await request(app).get("/task/-1");

    expect(result.status).toBe(404);
    expect(result.body.erro).toBe("Task nao encontrada");
  });

  it("GET /task/:id - deve retornar 500, quando houver erro interno", async () => {
    jest.spyOn(repository, "findById").mockRejectedValue(new Error("db error"));

    const result = await request(app).get("/task/1");

    expect(result.status).toBe(500);
    expect(result.body).toHaveProperty("erro");
  });

  it("POST /task - deve retornar 201, criar task", async () => {
    jest.spyOn(repository, "create").mockResolvedValue(taskCreated);

    const result = await request(app).post("/task").send(taskCreated);

    expect(result.status).toBe(201);
    expect(result.body.title).toBe("Task 1");
  });

  it("POST /task - deve retornar 400, quando falha ao criar a task", async () => {
    jest.spyOn(repository, "create").mockResolvedValue(taskCreated);

    const result = await request(app).post("/task");

    expect(result.status).toBe(400);
  });

  it("POST /task - deve retornar 422, informaçoes errada ao criar a task", async () => {
    jest.spyOn(repository, "create").mockResolvedValue(taskCreated);

    const result = await request(app).post("/task").send({
      title: 1234,
      description: 3212,
    });

    expect(result.status).toBe(422);
  });

  it("POST /task - deve retornar 500, quando houver erro interno", async () => {
    jest.spyOn(repository, "create").mockRejectedValue(new Error("db error"));

    const result = await request(app).post("/task").send(taskCreated);

    expect(result.status).toBe(500);
    expect(result.body).toHaveProperty("erro");
  });

  it("PATCH /task/:id - deve retornar 200, atualizar task", async () => {
    const result = await request(app)
      .patch("/task/" + idTask)
      .send({
        title: "Task 4",
        description: "descricao task 4",
      });

    expect(result.status).toBe(200);
    expect(result.body.title).toBe("Task 4");
  });

  it("PATCH /task/:id - deve retornar 400, id invalido", async () => {
    const result = await request(app).patch("/task/asd").send({
      title: "Task 4",
      description: "descricao task 4",
    });

    expect(result.status).toBe(400);
    expect(result.body.erro).toBe("Id invalido");
  });

  it("PATCH /task/:id - deve retornar 422, corpo invalido", async () => {
    const result = await request(app)
      .patch("/task/" + idTask)
      .send({
        title: 32452,
        description: 32453,
      });

    expect(result.status).toBe(422);
  });

  it("PATCH /task/:id - deve retornar 400, corpo vazio", async () => {
    const result = await request(app).patch("/task/1").send();

    expect(result.status).toBe(400);
    expect(result.body.erro).toBe("Nao foi possivel atualizar a conta");
  });

  it("PATCH /task - deve retornar 500, quando houver erro interno", async () => {
    jest.spyOn(repository, "set").mockRejectedValue(new Error("db error"));

    const result = await request(app)
      .patch("/task/" + idTask)
      .send(taskCreated);

    expect(result.status).toBe(500);
    expect(result.body).toHaveProperty("erro");
  });

  it("DELETE /task/:id - deve retornar 204, deletar task", async () => {
    const result = await request(app).delete("/task/" + idTask);

    expect(result.status).toBe(204);
  });

  it("DELETE /task/:id - deve retornar 500, quando houver erro interno", async () => {
    jest.spyOn(repository, "deleteById").mockRejectedValue(new Error());

    const result = await request(app).delete("/task/" + idTask);

    expect(result.status).toBe(500);
    expect(result.body).toHaveProperty("erro");
  });

  it("GET /task/all/:id - deve retornar 200, task com comentarios", async () => {
    jest.spyOn(repository, "findByTask").mockResolvedValue(taskCommented);

    const result = await request(app).get("/task/all/1");

    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty("comment");
  });

  it("GET /task/all/:id - deve retornar 400, task com comentarios", async () => {
    jest.spyOn(repository, "findByTask").mockResolvedValue(taskCommented);

    const result = await request(app).get("/task/all/asd");

    expect(result.status).toBe(400);
    expect(result.body.erro).toBe("Id invalido");
  });

  it("GET /task/all/:id - deve retornar 404, task com comentarios", async () => {
    jest.spyOn(repository, "findByTask").mockResolvedValue(null);

    const result = await request(app).get("/task/all/-1");

    expect(result.status).toBe(404);
    expect(result.body.erro).toBe("Task nao encontrada");
  });

  it("GET /task/all/:id - deve retornar 500, task com comentarios", async () => {
    jest
      .spyOn(repository, "findByTask")
      .mockRejectedValue(new Error("db error"));

    const result = await request(app).get("/task/all/1");

    expect(result.status).toBe(500);
  });
});

