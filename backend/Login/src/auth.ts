import { Request, Response } from "express"
import Joi = require("joi")
import bcrypt, { hashSync } from "bcrypt"

const saltRounds = parseInt(`${process.env.SALT_ROUNDS}`)

function hash(password: string){
    return bcrypt.hashSync(password, saltRounds)
}

function compareHash(password:string, hasPassword:string){
    return bcrypt.compareSync(password, hasPassword)
}

 function validateSchema(schema:Joi.ObjectSchema<any>, req:Request, res: Response, next: any) {
    const { error } = schema.validate(req.body)

    if(error == null) return next()

    const { details } = error
    const message = details.map((item) => item.message).join(",")

    return res.status(422).json({error: req.body, message})
}

export default { validateSchema, compareHash, hash }