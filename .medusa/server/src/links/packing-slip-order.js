"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const documents_1 = __importDefault(require("../modules/documents"));
const order_1 = __importDefault(require("@medusajs/medusa/order"));
const utils_1 = require("@medusajs/framework/utils");
exports.default = (0, utils_1.defineLink)(order_1.default.linkable.order, {
    linkable: documents_1.default.linkable.documentPackingSlip,
    deleteCascade: true
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFja2luZy1zbGlwLW9yZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpbmtzL3BhY2tpbmctc2xpcC1vcmRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHFFQUFrRDtBQUNsRCxtRUFBZ0Q7QUFDaEQscURBQXNEO0FBRXRELGtCQUFlLElBQUEsa0JBQVUsRUFDdkIsZUFBVyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQzFCO0lBQ0UsUUFBUSxFQUFFLG1CQUFlLENBQUMsUUFBUSxDQUFDLG1CQUFtQjtJQUN0RCxhQUFhLEVBQUUsSUFBSTtDQUNwQixDQUNGLENBQUEifQ==