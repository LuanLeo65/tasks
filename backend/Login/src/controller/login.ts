import { Request, Response } from "express";
import accountRepository from "../model/account/accountRepository";
import refreshRepository from "../model/refreshToken/refreshRepository";
import auth, { Token } from "../auth";

async function getAccounts(req: Request, res: Response, next: any) {
  try {
    const accounts = await accountRepository.getAll();
    if (accounts.length === 0)
      return res.status(404).json({ error: "Nenhum usuario encontrado" });

    return res.status(200).json(accounts);
  } catch (error) {
    console.log("Ërro ao chamar getAccounts:" + error);
    res.sendStatus(500);
  }
}

async function getOneAccount(req: Request, res: Response, next: any) {
  try {
    const id = parseInt(req.params.id);
    if (!id) return res.status(400).json({ error: "Id invalido" });

    const account = await accountRepository.getOne(id);
    if (!account)
      return res.status(404).json({ error: "Usuario nao encontrado" });

    return res.status(200).json(account);
  } catch (error) {
    console.log("Ërro ao chamar getOneAccount:" + error);
    res.sendStatus(500);
  }
}

async function addAccount(req: Request, res: Response, next: any) {
  try {
    const payload = req.body;
    if (!payload)
      return res.status(400).json({ error: "Preencha os campos corretamente" });

    const hash = auth.hash(payload.password);
    payload.password = hash;

    const account = await accountRepository.create(payload);
    account.password = "";

    return res.status(201).json(account);
  } catch (error) {
    console.log("Ërro ao chamar addAccount:" + error);
    res.sendStatus(500);
  }
}

async function setAccount(req: Request, res: Response, next: any) {
  try {
    const id = parseInt(req.params.id);
    if (!id) return res.status(400).json({ error: "Id invalido" });

    const payloadUpdated = req.body;
    if (!payloadUpdated)
      return res.status(400).json({ error: "Preencha os campos corretamente" });

    if (payloadUpdated.password) {
      const hash = auth.hash(payloadUpdated.password);
      payloadUpdated.password = hash;
    }

    const updatedAccount = await accountRepository.set(id, payloadUpdated);
    if (!updatedAccount)
      return res.status(404).json({ error: "Usuario nao encontrado" });

    return res
      .status(200)
      .json(`Usuário ${updatedAccount.name} alterado com sucesso!`);
  } catch (error) {
    console.log("Ërro ao chamar setAccount:" + error);
    res.sendStatus(500);
  }
}

async function deleteAccount(req: Request, res: Response, next: any) {
  try {
    const id = parseInt(req.params.id);
    if (!id) return res.status(400).json({ error: "Id invalido" });

    await accountRepository.deleteById(id);

    return res.status(200).json({ message: "Usuario deletado com sucesso!" });
  } catch (error) {
    console.log("Ërro ao chamar deleteAccount:" + error);
    res.sendStatus(500);
  }
}

async function login(req: Request, res: Response, next: any) {
  try {
    const payload = req.body;
    if (!payload)
      return res.status(400).json({ error: "Preencha os campos corretamente" });

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

        res.cookie("refreshToken", refresh, { httpOnly: true, secure: false });
        return res.status(200).json({
          message: `Usuario ${account.name} logado com sucesso!`,
          token: token,
          userId: account.id,
        });
      }

      return res.status(400).json({ error: "Usuario ou senha invalidos" });
    }

    return res.status(400).json({ error: "Usuario ou senha invalidos" });
  } catch (error) {
    console.log("Ërro ao chamar login:" + error);
    res.sendStatus(500);
  }
}

async function logout(req: Request, res: Response, next: any) {
  try {
    const id = parseInt(req.params.id);
    if (!id) return res.status(400).json({ error: "id invalido" });

    await refreshRepository.deleteById(id);

    res.status(200).json({ token: null });
  } catch (error) {
    console.log("Ërro ao chamar logout:" + error);
    res.sendStatus(500);
  }
}

async function refresh(req: Request, res: Response, next: any) {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(403);

  const refreshDb = await refreshRepository.getRefreshToken(refreshToken);
  if (!refreshDb) return res.sendStatus(403);
  if (refreshDb.expires_At < new Date()) {
    await refreshRepository.deleteByToken(refreshDb.token);
    return res.status(403).json({ error: "Refresh token expirado!" });
  }

  try {
    const user = await auth.verifyRefreshToken(refreshToken);

    const account = await accountRepository.getOne(user.id);
    if (!account) return res.sendStatus(403);

    const newToken = auth.signJWT(account.id, account.name);
    res
      .status(200)
      .json({
        token: newToken,
        user: { id: user.userId },
        name: { name: user.name },
      });
  } catch (error) {
    console.log("Ërro ao chamar refresh:" + error);
    res.sendStatus(500);
  }
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
