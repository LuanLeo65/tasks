import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { Request, Response } from "express";
import Joi from "joi";
import fs from "fs";
import path from "path";

export type Token = { userId: number; name: string; jwt?: string };
const publicKey = fs.readFileSync(
  path.join(__dirname, "../keys/public.key"),
  "utf8"
);
const jwtAlgorithm = "RS256";

function validateSchemas(
  schema: Joi.ObjectSchema<any>,
  req: Request,
  res: Response,
  next: any
) {
  const { error } = schema.validate(req.body);

  if (error == null) return next();

  const { details } = error;
  const message = details.map((item) => item.message).join(",");

  console.log(`validateSchema: ${message}`);
  return res.status(422).json({
    error: req.body,
    message,
  });
}

async function verifyJWT(req: Request, res: Response, next: any) {
  try {
    const token = req.headers["x-access-token"] as string;
    if (!token) return res.sendStatus(401);

    const decoded: Token = jwt.verify(token, publicKey, {
      algorithms: [jwtAlgorithm],
    }) as Token;

    const payload: Token = {
      userId: decoded.userId,
      name: decoded.name,
      jwt: token,
    };

    res.locals.payload = payload;

    next();
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      return res.sendStatus(401);
    }

    console.log("Erro no verifyJWT" + error);
    res.sendStatus(401);
  }
}

export default { verifyJWT, validateSchemas };
