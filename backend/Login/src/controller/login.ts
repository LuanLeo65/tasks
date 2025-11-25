import { Request, Response } from "express";
import accountRepository from "../model/account/accountRepository";
import refreshRepository from "../model/refreshToken/refreshRepository";
import auth from "../auth";
import {ReqParamNotFoundError} from 'commons/models/errors/ReqParamNotFoundError';
import { ForbidenError } from "commons/models/errors/ForbidenError";
import { NotFoundError } from "commons/models/errors/NotFoundError";
import { PayloadNotFoundError } from "commons/models/errors/PayloadNotFoundError";

async function getAccounts(req: Request, res: Response, next: any) {
    const accounts = await accountRepository.getAll();
    if (accounts.length === 0)
      return next(new NotFoundError('Nenhum usuario encontrado'));

    return res.status(200).json(accounts);
  
}

async function getOneAccount(req: Request, res: Response, next: any) {

    const id = parseInt(req.params.id);
    if (!id) return next(new ReqParamNotFoundError("id", "Id invalido"));

    const account = await accountRepository.getOne(id);
    if (!account)
      return next(new NotFoundError(`Usuario nao encontrado`));

    return res.status(200).json(account);

}

async function addAccount(req: Request, res: Response, next: any) {
    const payload = req.body;
    if (!payload)
      return next(new PayloadNotFoundError('Preencha os campos corretamente'));

    const hash = auth.hash(payload.password);
    payload.password = hash;

    const account = await accountRepository.create(payload);
    account.password = "";

    return res.status(201).json(account);
  }


async function setAccount(req: Request, res: Response, next: any) {
 
    const id = parseInt(req.params.id);
     if (!id) return next(new ReqParamNotFoundError("id", "Id invalido"));

    const payloadUpdated = req.body;
    if (!payloadUpdated)
      return next(new PayloadNotFoundError('Preencha os campos corretamente'));

    if (payloadUpdated.password) {
      const hash = auth.hash(payloadUpdated.password);
      payloadUpdated.password = hash;
    }

    const updatedAccount = await accountRepository.set(id, payloadUpdated);
    if (!updatedAccount)
      return next(new NotFoundError(`Usuario nao encontrado`));

    return res
      .status(200)
      .json(`Usuário ${updatedAccount.name} alterado com sucesso!`);
}

async function deleteAccount(req: Request, res: Response, next: any) {

    const id = parseInt(req.params.id);
     if (!id) return next(new ReqParamNotFoundError("id", "Id invalido"));

    await accountRepository.deleteById(id);

    return res.status(200).json({ message: "Usuario deletado com sucesso!" });

}

async function login(req: Request, res: Response, next: any) {

    const payload = req.body;
    if (!payload)
      return next(new PayloadNotFoundError('Preencha os campos corretamente'));

    const account = await accountRepository.findByEmail(payload.email);

    if (account !== null) {
      const comparePassword = auth.compareHash(
        payload.password,
        account.password
      );
      if (comparePassword) {
        const token = auth.signJWT(account.id, account.name);
        const refresh = auth.refreshJWT(account.id);

        await refreshRepository.addRefreshToken(account.id, refresh);

        res.cookie("refreshToken", refresh, { httpOnly: true, secure: true, sameSite: "none" });
        return res.status(200).json({
          message: `Usuario ${account.name} logado com sucesso!`,
          token: token,
          userId: account.id,
          name: account.name,
        });
      }

      return next(new PayloadNotFoundError("Usuario ou senha invalidos"));
    }

    return next(new PayloadNotFoundError("Usuario ou senha invalidos"));
}

async function logout(req: Request, res: Response, next: any) {
    const id = parseInt(req.params.id);
     if (!id) return next(new ReqParamNotFoundError("id", "Id invalido"));

    await refreshRepository.deleteById(id);

    res.status(200).json({ token: null });
}

async function refresh(req: Request, res: Response, next: any) {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return next(new ForbidenError('Function refresh - refreshToken'))

  const refreshDb = await refreshRepository.getRefreshToken(refreshToken);
  if (!refreshDb) return next(new ForbidenError('Function refresh - refreshDb'))

  if (refreshDb.expires_At < new Date()) {
    await refreshRepository.deleteByToken(refreshDb.token);
    return  next(new ForbidenError('Refresh token expirado'));
  }
  
    const user = await auth.verifyRefreshToken(refreshToken);

    const account = await accountRepository.getOne(user.id);
    if (!account) return next(new ForbidenError('Function refresh - account'));

    const newToken = auth.signJWT(account.id, account.name);
    res
      .status(200)
      .json({
        token: newToken,
        user: { id: user.userId },
        name: user.name,
      });

}

export default {
  getAccounts,
  addAccount,
  deleteAccount,
  setAccount,
  getOneAccount,
  login,
  logout,
  refresh,
};
