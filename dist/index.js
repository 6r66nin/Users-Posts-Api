"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorHandler_1 = __importDefault(require("./Middleware/errorHandler"));
const postsRoutes_1 = __importDefault(require("./Routes/postsRoutes"));
const usersRoutes_1 = __importDefault(require("./Routes/usersRoutes"));
const appErrors_1 = require("./Classes/appErrors");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use("/posts", postsRoutes_1.default);
app.use("/users", usersRoutes_1.default);
app.use((_req, res) => {
    throw new appErrors_1.AppError(404, "Page not found");
});
app.use(errorHandler_1.default);
app.listen(PORT, () => console.log("Server Running"));
