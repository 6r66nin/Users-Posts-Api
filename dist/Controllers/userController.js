"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.editUser = exports.deleteUser = exports.getUser = exports.addUser = void 0;
const Validators_1 = require("../Validators/Validators");
const appError_1 = require("../Classes/appError");
const userServices = __importStar(require("../Services/userServices"));
const addUser = async (req, res) => {
    const newUser = Validators_1.userValidator.validateUSer(req.body);
    const registredUser = (await userServices.addUser(newUser));
    if (!registredUser) {
        throw new appError_1.AppError(400, "User not added");
    }
    res.json(registredUser);
};
exports.addUser = addUser;
const getUser = async (req, res) => {
    const id = Number(req.params.id);
    const user = await userServices.getUser(id);
    if (!user) {
        throw new appError_1.AppError(404, "User not found");
    }
    res.json(user);
};
exports.getUser = getUser;
const deleteUser = async (req, res) => {
    const id = Number(req.params.id);
};
exports.deleteUser = deleteUser;
const editUser = async (req, res) => {
    const id = Number(req.params.id);
};
exports.editUser = editUser;
