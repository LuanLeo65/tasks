import { Router } from "express";
import loginController from "../controller/login"
import middleware from "./middleware";
import auth from "../auth";

const route = Router()

route.get("/accounts", auth.verifyJWT, loginController.getAccounts)
route.get("/account/:id", auth.verifyJWT, loginController.getOneAccount)
route.post("/account", middleware.validateAccountSchema, loginController.addAccount)
route.post("/account/login", middleware.validateAccountLoginSchema, loginController.login)
route.patch("/account/:id", auth.verifyJWT, middleware.validateAccountUpdateSchema, loginController.setAccount)
route.delete("/account/:id", auth.verifyJWT, loginController.deleteAccount)

export default route