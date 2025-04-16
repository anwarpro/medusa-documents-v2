"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDecimalDigits = getDecimalDigits;
exports.normalizeAmount = normalizeAmount;
const jsx_runtime_1 = require("react/jsx-runtime");
const moment_1 = __importDefault(require("moment"));
const react_1 = require("react");
const ui_1 = require("@medusajs/ui");
const currencies_1 = require("./utils/currencies");
const material_1 = require("@mui/material");
const actions_dropdown_1 = require("../../actions-dropdown/actions-dropdown");
const invoice_number_from_order_1 = __importDefault(require("./invoice-number-from-order"));
const packing_slip_number_1 = __importDefault(require("./packing-slip-number"));
const icons_1 = require("@medusajs/icons");
/**
 * Checks the list of currencies and returns the divider/multiplier
 * that should be used to calculate the persited and display amount.
 * @param currency
 * @return {number}
 */
function getDecimalDigits(currency) {
    const divisionDigits = currencies_1.currencies[currency.toUpperCase()].decimal_digits;
    return Math.pow(10, divisionDigits);
}
function normalizeAmount(currency, amount) {
    const divisor = getDecimalDigits(currency);
    return Math.floor(amount) / divisor;
}
function formatAmountWithSymbol({ amount, currency, digits, }) {
    let locale = "en-US";
    // We need this to display 'Kr' instead of 'DKK'
    if (currency.toLowerCase() === "dkk") {
        locale = "da-DK";
    }
    const taxRate = 0;
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
        minimumFractionDigits: digits,
    }).format(amount * (1 + taxRate / 100));
}
const useOrderTableColumns = () => {
    const [documentNumbers, setDocumentNumbers] = (0, react_1.useState)({});
    const decideStatus = (status) => {
        switch (status) {
            case "captured":
                return ((0, jsx_runtime_1.jsx)(ui_1.StatusBadge, { color: "green", children: "Paid" }));
            case "awaiting":
                return ((0, jsx_runtime_1.jsx)(ui_1.StatusBadge, { color: "grey", children: "Awaiting" }));
            case "requires_action":
                return ((0, jsx_runtime_1.jsx)(ui_1.StatusBadge, { color: "red", children: "Requires action" }));
            case "canceled":
                return ((0, jsx_runtime_1.jsx)(ui_1.StatusBadge, { color: "orange", children: "Canceled" }));
            default:
                return ((0, jsx_runtime_1.jsx)(ui_1.StatusBadge, { color: "purple", children: "N/A" }));
        }
    };
    const decideFullfillmentStatus = (status) => {
        switch (status) {
            case "not_fulfilled":
                return ((0, jsx_runtime_1.jsx)(ui_1.StatusBadge, { color: "grey", children: "Not fulfilled" }));
            case "partially_fulfilled":
                return ((0, jsx_runtime_1.jsx)(ui_1.StatusBadge, { color: "blue", children: "Partially fulfilled" }));
            case "fulfilled":
                return ((0, jsx_runtime_1.jsx)(ui_1.StatusBadge, { color: "green", children: "Fulfilled" }));
            case "partially_shipped":
                return ((0, jsx_runtime_1.jsx)(ui_1.StatusBadge, { color: "blue", children: "Partially shipped" }));
            case "shipped":
                return ((0, jsx_runtime_1.jsx)(ui_1.StatusBadge, { color: "green", children: "Shipped" }));
            case "partially_returned":
                return ((0, jsx_runtime_1.jsx)(ui_1.StatusBadge, { color: "blue", children: "Partially returned" }));
            case "returned":
                return ((0, jsx_runtime_1.jsx)(ui_1.StatusBadge, { color: "green", children: "Returned" }));
            case "canceled":
                return ((0, jsx_runtime_1.jsx)(ui_1.StatusBadge, { color: "red", children: "Canceled" }));
            case "requires_action":
                return ((0, jsx_runtime_1.jsx)(ui_1.StatusBadge, { color: "purple", children: "Requires action" }));
            default:
                return ((0, jsx_runtime_1.jsx)(ui_1.StatusBadge, { color: "grey", children: "N/A" }));
        }
    };
    const updateInvoiceNumber = (orderId, invoiceNumber) => {
        setDocumentNumbers((prev) => ({
            ...prev,
            [orderId]: {
                ...prev[orderId],
                invoiceNumber,
            },
        }));
    };
    const updatePackingSlipNumber = (orderId, packingSlipNumber) => {
        setDocumentNumbers((prev) => ({
            ...prev,
            [orderId]: {
                ...prev[orderId],
                packingSlipNumber,
            },
        }));
    };
    const columns = (0, react_1.useMemo)(() => [
        {
            Header: (0, jsx_runtime_1.jsx)("div", { className: "pl-2", children: "Order" }),
            accessor: "display_id",
            Cell: ({ cell: { value } }) => ((0, jsx_runtime_1.jsx)("p", { className: "text-grey-90 group-hover:text-violet-60 pl-2", children: `#${value}` })),
        },
        {
            Header: ("Date added"),
            accessor: "created_at",
            Cell: ({ cell: { value } }) => {
                return ((0, jsx_runtime_1.jsx)(ui_1.TooltipProvider, { children: (0, jsx_runtime_1.jsx)(ui_1.Tooltip, { content: (0, jsx_runtime_1.jsx)(ui_1.Text, { children: (0, moment_1.default)(value).format("DD MMM YYYY hh:mm a") }), children: (0, jsx_runtime_1.jsx)("p", { className: "text-grey-90 group-hover:text-violet-60 min-w-[40px]", children: (0, moment_1.default)(value).format("DD MMM YYYY") }) }) }));
            }
        },
        {
            Header: ("Customer"),
            accessor: "customer",
            Cell: ({ row, cell: { value } }) => {
                const customer = {
                    first_name: value?.first_name ||
                        row.original.shipping_address?.first_name,
                    last_name: value?.last_name || row.original.shipping_address?.last_name,
                    email: row.original.email,
                };
                return ((0, jsx_runtime_1.jsx)("p", { className: "text-grey-90 group-hover:text-violet-60 min-w-[100px]", children: `${(customer.first_name || customer.last_name)
                        ? `${customer.first_name} ${customer.last_name}`
                        : (customer.email
                            ? customer.email
                            : "-")}` }));
            },
        },
        {
            Header: ("Fulfillment"),
            accessor: "fulfillment_status",
            Cell: ({ cell: { value } }) => decideFullfillmentStatus(value),
        },
        {
            Header: ("Payment status"),
            accessor: "payment_status",
            Cell: ({ cell: { value } }) => decideStatus(value),
        },
        {
            Header: () => ((0, jsx_runtime_1.jsx)("div", { className: "text-right", children: ("Total") })),
            accessor: "total",
            Cell: ({ row, cell: { value } }) => ((0, jsx_runtime_1.jsx)("div", { className: "text-grey-90 group-hover:text-violet-60 text-right", children: formatAmountWithSymbol({
                    amount: value,
                    currency: row.original.currency_code,
                }) })),
        },
        {
            Header: ("Documents"),
            id: "documents",
            Cell: ({ row }) => {
                const orderId = row.original.id;
                const currentDocumentNumbers = documentNumbers[orderId] || undefined;
                return ((0, jsx_runtime_1.jsx)("p", { className: "text-grey-90 group-hover:text-violet-60 pl-2", children: (0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, justifyContent: 'flex-start', direction: 'column', spacing: 1, children: [(0, jsx_runtime_1.jsx)(invoice_number_from_order_1.default, { orderId: orderId, invoiceNumber: currentDocumentNumbers ? currentDocumentNumbers.invoiceNumber : undefined }), (0, jsx_runtime_1.jsx)(packing_slip_number_1.default, { orderId: orderId, packingSlipNumber: currentDocumentNumbers ? currentDocumentNumbers.packingSlipNumber : undefined })] }) }));
            },
        },
        {
            Header: () => ((0, jsx_runtime_1.jsxs)(material_1.Grid, { container: true, justifyContent: "flex-end", alignItems: "flex-end", spacing: 1, children: [(0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(ui_1.TooltipProvider, { children: (0, jsx_runtime_1.jsx)(ui_1.Tooltip, { content: (0, jsx_runtime_1.jsxs)(material_1.Grid, { item: true, children: [(0, jsx_runtime_1.jsx)(ui_1.Text, { size: "small", children: "We do not store documents. " }), (0, jsx_runtime_1.jsx)(material_1.Link, { fontSize: 12, href: 'https://github.com/RSC-Labs/medusa-documents?tab=readme-ov-file#what-means-we-do-not-store-documents', children: "Learn more what it means." })] }), children: (0, jsx_runtime_1.jsx)(icons_1.InformationCircle, {}) }) }) }), (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: "Actions" })] })),
            id: "actions",
            Cell: ({ row }) => {
                return ((0, jsx_runtime_1.jsx)(material_1.Grid, { container: true, justifyContent: 'flex-end', children: (0, jsx_runtime_1.jsx)(material_1.Grid, { item: true, children: (0, jsx_runtime_1.jsx)(actions_dropdown_1.ActionsDropdown, { order: row.original, updateInvoiceNumber: updateInvoiceNumber, updatePackingSlipNumber: updatePackingSlipNumber }) }) }));
            }
        },
    ], [documentNumbers] // Add documentNumbers as a dependency to ensure it re-renders
    );
    return [columns, documentNumbers];
};
exports.default = useOrderTableColumns;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlLWNvbHVtbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvdWktY29tcG9uZW50cy9vcmRlcnMvb3JkZXItdGFibGUvdXNlLWNvbHVtbnMudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBaUJBLDRDQUdDO0FBRUQsMENBR0M7O0FBekJELG9EQUE0QjtBQUM1QixpQ0FBMEM7QUFFMUMscUNBQTJFO0FBQzNFLG1EQUFnRDtBQUNoRCw0Q0FBMkM7QUFDM0MsOEVBQTBFO0FBQzFFLDRGQUFpRTtBQUNqRSxnRkFBc0Q7QUFDdEQsMkNBQW9EO0FBRXBEOzs7OztHQUtHO0FBQ0gsU0FBZ0IsZ0JBQWdCLENBQUMsUUFBZ0I7SUFDL0MsTUFBTSxjQUFjLEdBQUcsdUJBQVUsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxjQUFjLENBQUE7SUFDeEUsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxjQUFjLENBQUMsQ0FBQTtBQUNyQyxDQUFDO0FBRUQsU0FBZ0IsZUFBZSxDQUFDLFFBQWdCLEVBQUUsTUFBYztJQUM5RCxNQUFNLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUMxQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFBO0FBQ3JDLENBQUM7QUFRRCxTQUFTLHNCQUFzQixDQUFDLEVBQzlCLE1BQU0sRUFDTixRQUFRLEVBQ1IsTUFBTSxHQUNXO0lBQ2pCLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQTtJQUVwQixnREFBZ0Q7SUFDaEQsSUFBSSxRQUFRLENBQUMsV0FBVyxFQUFFLEtBQUssS0FBSyxFQUFFLENBQUM7UUFDckMsTUFBTSxHQUFHLE9BQU8sQ0FBQTtJQUNsQixDQUFDO0lBQ0QsTUFBTSxPQUFPLEdBQUcsQ0FBQyxDQUFDO0lBRWxCLE9BQU8sSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLE1B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