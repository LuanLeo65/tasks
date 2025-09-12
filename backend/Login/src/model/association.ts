import Account from "./account/accountModel";
import RefreshToken from "./refreshToken/refreshModel";

export function setupAssociations() {
    Account.hasMany(RefreshToken, { foreignKey: "userId", onDelete:"CASCADE", as: "refresh"})
    RefreshToken.belongsTo(Account, { foreignKey: "userId", as: "account"})
}