import { IAccount } from "./account";
import Account from "./accountModel";

async function getOne(id: number){
    return await Account.findByPk(id)
}

async function getAll(){
    return await Account.findAll()
}

async function create(body: IAccount){
    return await Account.create(body)
}

async function findByEmail(email:string){
    return await Account.findOne({where: { email: email}})
}

async function set(id:number, body:IAccount){
    const originalAccount = await Account.findByPk(id)

    if(originalAccount !== null){
        if(body.name) originalAccount.name = body.name
        if(body.email) originalAccount.email = body.email
        if(body.password) originalAccount.password = body.password
        if(body.birth) originalAccount.birth = body.birth

        await originalAccount.save()

        return originalAccount
    }

    return null
}

async function destroyAccount(id: number){
    return await Account.destroy({where: { id: id}})
}

export default { getOne, getAll, create, set, destroyAccount, findByEmail}