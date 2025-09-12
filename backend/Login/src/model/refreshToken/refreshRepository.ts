import RefreshToken, { IRefreshModel, IRefreshAttributes } from "./refreshModel";


async function getRefreshToken(token:string){
  return await RefreshToken.findOne({where: { token: token}})
}


async function addRefreshToken(accountId:number, token:string){
    const sevenDays = 7 * 24 * 60 * 60 * 1000

    const payload: IRefreshAttributes = {
        token: token,
        userId: accountId,
        expires_At: new Date(Date.now() + sevenDays)
    }

    return await RefreshToken.create(payload)
}

async function deleteByToken(token:string){
    return await RefreshToken.destroy({where: {token: token}})
}

async function deleteById(id:number){
    return await RefreshToken.destroy({where: {userId: id}})
}

export default { addRefreshToken, deleteByToken, getRefreshToken, deleteById}