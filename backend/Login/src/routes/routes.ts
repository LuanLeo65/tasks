import { Router } from "express";
import loginController from "../controller/login"

const route = Router()

route.get("/accounts", loginController.getAccounts)
route.get("/account/:id", loginController.getOneAccount)
route.post("/account", loginController.addAccount)
route.patch("/account/:id", loginController.setAccount)
route.delete("/account/:id", loginController.deleteAccount)


export default route