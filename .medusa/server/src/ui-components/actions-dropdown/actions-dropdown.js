"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionsDropdown = ActionsDropdown;
const jsx_runtime_1 = require("react/jsx-runtime");
const icons_1 = require("@medusajs/icons");
const ui_1 = require("@medusajs/ui");
const button_generate_invoice_1 = __importDefault(require("./invoice/button-generate-invoice"));
const button_generate_packing_slip_1 = __importDefault(require("./packing-slip/button-generate-packing-slip"));
function ActionsDropdown({ order, updateInvoiceNumber, updatePackingSlipNumber }) {
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)(ui_1.DropdownMenu, { children: [(0, jsx_runtime_1.jsx)(ui_1.DropdownMenu.Trigger, { asChild: true, children: (0, jsx_runtime_1.jsx)(ui_1.IconButton, { children: (0, jsx_runtime_1.jsx)(icons_1.EllipsisHorizontal, {}) }) }), (0, jsx_runtime_1.jsxs)(ui_1.DropdownMenu.Content, { children: [(0, jsx_runtime_1.jsx)(button_generate_invoice_1.default, { order: order, updateInvoiceNumber: updateInvoiceNumber }), (0, jsx_runtime_1.jsx)(ui_1.DropdownMenu.Separator, {}), (0, jsx_runtime_1.jsx)(button_generate_packing_slip_1.default, { order: order, updatePackingSlipNumber: updatePackingSlipNumber })] })] }) }));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9ucy1kcm9wZG93bi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy91aS1jb21wb25lbnRzL2FjdGlvbnMtZHJvcGRvd24vYWN0aW9ucy1kcm9wZG93bi50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFLQSwwQ0FrQkM7O0FBdkJELDJDQUFvRDtBQUNwRCxxQ0FBdUQ7QUFDdkQsZ0dBQThFO0FBQzlFLCtHQUE0RjtBQUU1RixTQUFnQixlQUFlLENBQUMsRUFBQyxLQUFLLEVBQUUsbUJBQW1CLEVBQUUsdUJBQXVCLEVBQXdFO0lBRTFKLE9BQU8sQ0FDTCwyREFDQSx3QkFBQyxpQkFBWSxlQUNYLHVCQUFDLGlCQUFZLENBQUMsT0FBTyxJQUFDLE9BQU8sa0JBQzNCLHVCQUFDLGVBQVUsY0FDVCx1QkFBQywwQkFBa0IsS0FBRyxHQUNYLEdBQ1EsRUFDdkIsd0JBQUMsaUJBQVksQ0FBQyxPQUFPLGVBQ25CLHVCQUFDLGlDQUE2QixJQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsbUJBQW1CLEVBQUUsbUJBQW1CLEdBQUcsRUFDeEYsdUJBQUMsaUJBQVksQ0FBQyxTQUFTLEtBQUcsRUFDMUIsdUJBQUMsc0NBQWlDLElBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSx1QkFBdUIsRUFBRSx1QkFBdUIsR0FBRyxJQUMvRSxJQUNWLEdBQ1osQ0FDSixDQUFBO0FBQ0gsQ0FBQyJ9