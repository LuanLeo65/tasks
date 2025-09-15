"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupAssociations = setupAssociations;
const accountModel_1 = __importDefault(require("./account/accountModel"));
const refreshModel_1 = __importDefault(require("./refreshToken/refreshModel"));
function setupAssociations() {
    accountModel_1.default.hasMany(refreshModel_1.default, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        as: "refresh",
    });
    refreshModel_1.default.belongsTo(accountModel_1.default, { foreignKey: "userId", as: "account" });
}
