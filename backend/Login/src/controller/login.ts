import { Request, Response } from "express";
import repository from "../model/accountRepository";

async function getAccounts(req: Request, res: Response, next:any) {
    try {
        const accounts = await repository.getAll()
        if(!accounts) return res.status(404).json({error: "Usuario nao encontrado"})

        return res.status(200).json(accounts)
    } catch (error) {
        console.log("Ërro ao chamar getAccounts:" + error)
    }  
}

async function addAccount(req: Request, res: Response, next:any){
    try {
        const payload = req.body
        if(!payload) return res.status(400).json({error: "Preencha os campos corretamente"})
        
        const account = await repository.create(payload)

        return res.status(201).json(account)

    } catch (error) {
        console.log("Ërro ao chamar addAccount:" + error)
    }
}

async function deleteAccount(req: Request, res: Response, next:any){
    try {
        const id = parseInt(req.params.id)
        if(!id) return res.status(400).json({error: "Id invalido"})

        await repository.destroyAccount(id)

        return res.status(200).json({message: "Usuario deletado com sucesso!"})

    } catch (error) {
        console.log("Ërro ao chamar deleteAccount:" + error)

    }
}

export default {getAccounts, addAccount, deleteAccount}