"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const documents_1 = __importDefault(require("../modules/documents"));
const order_1 = __importDefault(require("@medusajs/medusa/order"));
const utils_1 = require("@medusajs/framework/utils");
exports.default = (0, utils_1.defineLink)(order_1.default.linkable.order, {
    linkable: documents_1.default.linkable.documentInvoice,
    deleteCascade: true
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52b2ljZS1vcmRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saW5rcy9pbnZvaWNlLW9yZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEscUVBQWtEO0FBQ2xELG1FQUFnRDtBQUNoRCxxREFBc0Q7QUFFdEQsa0JBQWUsSUFBQSxrQkFBVSxFQUN2QixlQUFXLENBQUMsUUFBUSxDQUFDLEtBQUssRUFDMUI7SUFDRSxRQUFRLEVBQUUsbUJBQWUsQ0FBQyxRQUFRLENBQUMsZUFBZTtJQUNsRCxhQUFhLEVBQUUsSUFBSTtDQUNwQixDQUNGLENBQUEifQ==