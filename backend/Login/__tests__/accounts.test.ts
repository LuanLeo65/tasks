import request from "supertest"
import app from "../src/app"
import accountRepository from "../src/model/account/accountRepository"
import refreshRepository from "../src/model/refreshToken/refreshRepository"
import {jest, describe, it, expect, beforeAll, afterAll, beforeEach, afterEach} from "@jest/globals"
import { IAccount } from "../src/model/account/account"
import auth from "../src/auth"

const testEmail = "jest@email.com"
const testPassword = "123456"
const testEmailCreate= "jest1@jest.com"
let idTest = 0
let jwt = ""
let refreshJwt = ""

beforeAll(async () => {
    const payload = {
        name: "Jest",
        email:testEmail,
        password:auth.hash(testPassword),
        birth: new Date("2000-09-15")
    } as IAccount;

   const account = await accountRepository.create(payload)
   idTest = account.id
   jwt = auth.signJWT(idTest)
   refreshJwt = auth.refreshJWT(idTest)

})

afterAll(async () => {
    await refreshRepository.deleteById(idTest)
    await accountRepository.deleteByEmail(testEmail)
    await accountRepository.deleteByEmail(testEmailCreate)
})


describe("testando as rotas de accounts/login", () =>{
    it("GET /accounts - Deve retornar 200", async () => {
        const result = await request(app)
                            .get("/accounts")
                            .set("x-access-token", jwt)
        
            expect(result.status).toEqual(200)
            expect(result.body[0]).toMatchObject({
                id: expect.any(Number),
                name: expect.any(String),
            });
    })

    it("GET /accounts - Deve retornar 401", async () => {    
        const result = await request(app)
                        .get("/accounts")
    
        expect(result.status).toEqual(401)
        
    })

    it("GET /accounts - Deve retornar 404", async () => {
        jest.spyOn(accountRepository, "getAll").mockResolvedValue([]);
        const result = await request(app)
                            .get("/accounts")
                            .set("x-access-token", jwt)
        
        expect(result.status).toEqual(404)
        
    })

    it("GET /accounts - Deve retornar 500", async () => { 
        jest.spyOn(accountRepository, "getAll").mockRejectedValue(Error);

        const result = await request(app)
                            .get("/accounts")
                            .set("x-access-token", jwt)
        
            expect(result.status).toEqual(500)
        
    })

    it("GET /account/:id - Deve retornar 200", async () => {
        const result = await request(app)
                            .get("/account/" + idTest)
                            .set("x-access-token", jwt)
        
            expect(result.status).toEqual(200)
            expect(result.body.name).toEqual("Jest")
            
    })

    it("GET /account/:id - Deve retornar 400", async () => {
        const result = await request(app)
                            .get("/account/ass")
                            .set("x-access-token", jwt)
        
            expect(result.status).toEqual(400)
            expect(result.body.error).toEqual("Id invalido")
            
    })

    it("GET /account/:id - Deve retornar 404", async () => {
        const result = await request(app)
                            .get("/account/-1")
                            .set("x-access-token", jwt)
        
            expect(result.status).toEqual(404)
            expect(result.body.error).toEqual("Usuario nao encontrado")
            
    })

    it("GET /account:id - Deve retornar 401", async () => {
        const result = await request(app)
                            .get("/account/" + idTest)
        
            expect(result.status).toEqual(401)
            
    })

    it("GET /account/:id - Deve retornar 500", async () => { 
        jest.spyOn(accountRepository, "getOne").mockRejectedValue(Error);

        const result = await request(app)
                            .get("/accounts")
                            .set("x-access-token", jwt)
        
            expect(result.status).toEqual(500)
        
    })

    it("POST /account - Deve retornar 201", async () => {
        const createPayload = {
             name: "Jest1",
            email:testEmailCreate,
            password:"123456",
            birth: new Date("2000-09-15")
        } as IAccount

        const result = await request(app)
                            .post("/account")
                            .send(createPayload)
        
            expect(result.status).toEqual(201)
            expect(result.body.name).toEqual("Jest1")
    })

    it("POST /account - Deve retornar 400", async () => {
        const result = await request(app)
                            .post("/account")
        
            expect(result.status).toEqual(400)

    })

    it("POST /account - Deve retornar 422", async () => {
        const createPayload = {
             endereco: "rua 02",
             cidade: "Pindamonhangaba"
        }
        const result = await request(app)
                            .post("/account")
                            .send(createPayload)
        
            expect(result.status).toEqual(422)

    })

    it("POST /account - Deve retornar 500", async () => { 
        jest.spyOn(accountRepository, "create").mockRejectedValue(Error);

        const createPayload = {
             name: "Jest1",
            email:testEmailCreate,
            password:"123456",
            birth: new Date("2000-09-15")
        } as IAccount

        const result = await request(app)
                            .post("/account")
                            .send(createPayload)
        
            expect(result.status).toEqual(500)
        
    })

    it("POST /account/login - Deve retornar 200", async () => { 
        const loginPayload = {
            email: testEmail,
            password: testPassword
        }

        const result = await request(app)
                            .post("/account/login" )
                            .send(loginPayload)
        
            expect(result.status).toEqual(200)             
            expect(result.body.message).toEqual(`Usuario Jest logado com sucesso!`)             
    })

    it("POST /account/login - Deve retornar 400", async () => { 

        const result = await request(app)
                            .post("/account/login" )
        
            expect(result.status).toEqual(400)             
            expect(result.body.error).toEqual("Preencha os campos corretamente")             
    })

    it("POST /account/login - Deve retornar 400", async () => { 
        const loginPayload = {
            email: "asdfa@asdfa.com",
            password: testPassword
        }

        const result = await request(app)
                            .post("/account/login" )
                            .send(loginPayload)
        
            expect(result.status).toEqual(400) 
            expect(result.body.error).toEqual('Usuario ou senha invalidos')             

    })

    it("POST /account/login - Deve retornar 400", async () => { 
        const loginPayload = {
            email: testEmail,
            password: "654321"
        }

        const result = await request(app)
                            .post("/account/login" )
                            .send(loginPayload)
        
            expect(result.status).toEqual(400) 
            expect(result.body.error).toEqual('Usuario ou senha invalidos')             

    })


    it("POST /account/login - Deve retornar 422", async () => { 
        const loginPayload = {
            endereco: "rua dos bobo",
            numero: 0
        }

        const result = await request(app)
                            .post("/account/login" )
                            .send(loginPayload)
        
            expect(result.status).toEqual(422)            

    })

    it("POST /account/login - Deve retornar 500", async () => { 
        jest.spyOn(accountRepository, "findByEmail").mockRejectedValue(Error);
        
        const loginPayload = {
            email: testEmail,
            password: testPassword
        }

        const result = await request(app)
                            .post("/account/login" )
                            .send(loginPayload)
        
            expect(result.status).toEqual(500)             
    })



    it("PATCH /account/:id - Deve retornar 200", async () => {
        const UpdatePayload = {
             name: "Jest12",
        } as IAccount

        const result = await request(app)
                            .patch("/account/"+ idTest)
                            .send(UpdatePayload)
                            .set("x-access-token", jwt)

            expect(result.status).toEqual(200)
            expect(result.body).toEqual("Usuário Jest12 alterado com sucesso!")
    })

    it("PATCH /account/:id - Deve retornar 400", async () => {
        const UpdatePayload = {
             name: "Jest12",
        } as IAccount

        const result = await request(app)
                            .patch("/account/asd")
                            .send(UpdatePayload)
                            .set("x-access-token", jwt)

            expect(result.status).toEqual(400)
            expect(result.body.error).toEqual("Id invalido")
    })

    it("PATCH /account/:id - Deve retornar 400", async () => {

        const result = await request(app)
                            .patch("/account/" + idTest)
                            .set("x-access-token", jwt)

            expect(result.status).toEqual(400)
            expect(result.body.error).toEqual("Preencha os campos corretamente")
    })

   it("PATCH /account/:id - Deve retornar 401", async () => {
        const UpdatePayload = {
             name: "Jest12",
        } as IAccount

        const result = await request(app)
                            .patch("/account/"+ idTest)
                            .send(UpdatePayload)

            expect(result.status).toEqual(401)
    })

    it("PATCH /account/:id - Deve retornar 404", async () => {
        const UpdatePayload = {
             name: "Jest12",
        } as IAccount

        const result = await request(app)
                            .patch("/account/-1")
                            .send(UpdatePayload)
                            .set("x-access-token", jwt)

            expect(result.status).toEqual(404)
            expect(result.body.error).toEqual("Usuario nao encontrado")
    })

    it("PATCH /account/:id - Deve retornar 500", async () => { 
        jest.spyOn(accountRepository, "set").mockRejectedValue(Error);

        const UpdatePayload = {
             name: "Jest12",
        } as IAccount

        const result = await request(app)
                           .patch("/account/-1")
                            .send(UpdatePayload)
                            .set("x-access-token", jwt)
        
            expect(result.status).toEqual(500)
        
    })

    it("DELETE /account/:id - Deve retornar 400", async () => { 

        const result = await request(app)
                            .delete("/account/as")
                            .set("x-access-token", jwt)
        
            expect(result.status).toEqual(400)
            expect(result.body.error).toEqual("Id invalido")
        
    })

    it("DELETE /account/:id - Deve retornar 401", async () => { 

        const result = await request(app)
                            .delete("/account/" + idTest)
        
            expect(result.status).toEqual(401)
        
    })

    it("DELETE /account/:id - Deve retornar 500", async () => { 
        jest.spyOn(accountRepository, "deleteById").mockRejectedValue(Error);

        const result = await request(app)
                            .delete("/account/" + idTest)
                            .set("x-access-token", jwt)
        
            expect(result.status).toEqual(500)       
    })

    it("POST /account/logout/:id - Deve retornar 200", async () => { 
        const result = await request(app)
                            .post("/account/logout/" + idTest )
                            .set("x-access-token", jwt)

        
            expect(result.status).toEqual(200)             
             
    })

    it("POST /account/logout/:id - Deve retornar 400", async () => { 
        const result = await request(app)
                            .post("/account/logout/asd" )
                            .set("x-access-token", jwt)

        
            expect(result.status).toEqual(400)             
            expect(result.body.error).toEqual("id invalido")             
             
    })

    it("POST /account/logout/:id - Deve retornar 400", async () => { 
        const result = await request(app)
                            .post("/account/logout/" + idTest)
       
            expect(result.status).toEqual(401)                         
             
    })

    it("POST /account/logout/:id - Deve retornar 500", async () => { 
        jest.spyOn(refreshRepository, "deleteById").mockRejectedValue(Error);

        const result = await request(app)
                            .post("/account/logout/" + idTest )
                            .set("x-access-token", jwt)

        
            expect(result.status).toEqual(500)             
             
    })
})