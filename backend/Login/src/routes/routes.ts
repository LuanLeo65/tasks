import { Router } from "express";
import loginController from "../controller/login"
import middleware from "./middleware";

const route = Router()

route.get("/accounts", loginController.getAccounts)
route.get("/account/:id", loginController.getOneAccount)
route.post("/account", middleware.validateAccountSchema, loginController.addAccount)
route.patch("/account/:id", middleware.validateAccountUpdateSchema, loginController.setAccount)
route.delete("/account/:id", loginController.deleteAccount)

export default route