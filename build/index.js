"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Basic route
app.get('/', (_req, res) => {
    res.json({ message: 'Hello from Server Panda! 🐼' });
});
// Health check route
app.get('/health', (_req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});
// Start server
app.listen(PORT, () => {
    console.log(`🐼 Server Panda is running on port ${PORT}`);
});
exports.default = app;
