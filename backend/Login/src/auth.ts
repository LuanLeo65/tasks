import { Request, Response } from "express"
import Joi = require("joi")
import bcrypt from "bcrypt"
import fs from "fs"
import path from "path"
import jwt from "jsonwebtoken"
import { IRefresh } from "./model/refreshToken/refresh"

const privateKey = fs.readFileSync(path.join(__dirname, "../keys/private.key"), "utf8")
const publicKey = fs.readFileSync(path.join(__dirname, "../keys/public.key"), "utf8")
const jwtAlgorithm = "RS256"
const refreshAlgorith = "HS256"
const refreshKey = `${process.env.REFRESH_KEY}`

const saltRounds = parseInt(`${process.env.SALT_ROUNDS}`)

function hash(password: string){
    return bcrypt.hashSync(password, saltRounds)
}

function compareHash(password:string, hasPassword:string){
    return bcrypt.compareSync(password, hasPassword)
}

function signJWT(userId:number) {
    const payload ={userId}
    return jwt.sign(payload, privateKey, {expiresIn: `15m`, algorithm: jwtAlgorithm})
}

function refreshJWT(userId:number) {
    const payload ={userId}
    return jwt.sign(payload, refreshKey, {expiresIn: `7d`, algorithm: refreshAlgorith})
}

export type Token = {userId: number, jwt?: string}

function verifyJWT(req:Request, res: Response, next: any){
   try {
    const token = req.headers["x-access-token"] as string
    if(!token) return res.sendStatus(401)

    const decoded: Token= jwt.verify(token, publicKey, {algorithms: [jwtAlgorithm]}) as Token
    const payload = {userId: decoded.userId, jwt: token}

    res.locals.payload = payload

    next()
   } catch (error) {
    console.log("Erro na validacao do jwt" + error)
    res.sendStatus(401)
   }
}

function verifyRefreshToken(token:string){
    return jwt.verify(token, refreshKey, {algorithms: [refreshAlgorith]}) as IRefresh
}




 function validateSchema(schema:Joi.ObjectSchema<any>, req:Request, res: Response, next: any) {
    const { error } = schema.validate(req.body)

    if(error == null) return next()

    const { details } = error
    const message = details.map((item) => item.message).join(",")

    return res.status(422).json({error: req.body, message})
}

export default { validateSchema, compareHash, hash, signJWT, verifyJWT, refreshJWT, verifyRefreshToken}