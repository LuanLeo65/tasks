import { Router } from "express";
import loginController from "../controller/login"

const route = Router()

route.get("/accounts", loginController.getAccounts)
route.post("/account", loginController.addAccount)
route.delete("/account/:id", loginController.deleteAccount)


export default route