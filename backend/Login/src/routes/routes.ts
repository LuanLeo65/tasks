import { Router } from "express";
import loginController from "../controller/login"
import middleware from "./middleware";


const route = Router()

route.get("/accounts", middleware.validateAuthentication, loginController.getAccounts)
route.get("/account/:id", middleware.validateAuthentication, loginController.getOneAccount)
route.post("/account", middleware.validateAccountSchema, loginController.addAccount)
route.post("/account/login", middleware.validateAccountLoginSchema, loginController.login)
route.post("/account/logout/:id",middleware.validateAuthentication, loginController.logout)
route.patch("/account/:id", middleware.validateAuthentication, middleware.validateAccountUpdateSchema, loginController.setAccount)
route.delete("/account/:id", middleware.validateAuthentication, loginController.deleteAccount)
route.post("/account/refresh", loginController.refresh)

export default route