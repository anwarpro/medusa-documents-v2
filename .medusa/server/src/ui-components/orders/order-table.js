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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const clsx_1 = __importDefault(require("clsx"));
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const react_table_1 = require("react-table");
const use_columns_1 = __importDefault(require("./order-table/use-columns"));
const use_orders_1 = require("./order-table/use-orders");
const ui_1 = require("@medusajs/ui");
const DEFAULT_PAGE_SIZE = 15;
const defaultQueryProps = {
    expand: "customer,shipping_address,billing_address,items",
    fields: "id,status,display_id,created_at,email,fulfillment_status,payment_status,total,currency_code,metadata",
};
const OrderTable = ({ setContextFilters }) => {
    const location = (0, react_router_dom_1.useLocation)();
    const [ordersResult, setOrdersResult] = (0, react_1.useState)(undefined);
    const [isLoading, setLoading] = (0, react_1.useState)(true);
    let hiddenColumns = ["sales_channel"];
    const { paginate, queryObject, } = (0, use_orders_1.useOrderFilters)(defaultQueryProps);
    const offs = 0;
    const lim = DEFAULT_PAGE_SIZE;
    const [numPages, setNumPages] = (0, react_1.useState)(0);
    // const defaultQueryProps = {
    //   expand: "customer,shipping_address,billing_address,items",
    //   fields:
    //     "id,status,display_id,created_at,email,fulfillment_status,payment_status,total,currency_code,metadata",
    // }
    (0, react_1.useEffect)(() => {
        if (!isLoading) {
            return;
        }
        fetch(`/admin/orders?order=-created_at&fields=id,status,display_id,created_at,email,fulfillment_status,payment_status,total,currency_code,metadata,items,*customer`, {
            credentials: "include",
        })
            .then((res) => res.json())
            .then((result) => {
            setOrdersResult(result);
            setLoading(false);
        })
            .catch((error) => {
            console.error(error);
        });
    }, [isLoading]);
    (0, react_1.useEffect)(() => {
        const controlledPageCount = Math.ceil(ordersResult ? ordersResult.count / queryObject.limit : 0);
        setNumPages(controlledPageCount);
    }, [ordersResult]);
    const [columns] = (0, use_columns_1.default)();
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, canPreviousPage, canNextPage, pageCount, gotoPage, nextPage, previousPage, 
    // Get the state from the instance
    state: { pageIndex }, } = (0, react_table_1.useTable)({
        columns,
        data: ordersResult ? ordersResult.orders : [],
        manualPagination: true,
        initialState: {
            pageSize: lim,
            pageIndex: offs / lim,
            hiddenColumns,
        },
        pageCount: numPages,
        autoResetPage: false,
    }, react_table_1.usePagination);
    const handleNext = () => {
        if (canNextPage) {
            paginate(1);
            nextPage();
        }
    };
    const handlePrev = () => {
        if (canPreviousPage) {
            paginate(-1);
            previousPage();
        }
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(ui_1.Table, { ...getTableProps(), className: (0, clsx_1.default)({ ["relative"]: isLoading }), children: [(0, jsx_runtime_1.jsx)(ui_1.Table.Header, { children: headerGroups?.map((headerGroup) => ((0, jsx_runtime_1.jsx)(ui_1.Table.Row, { ...headerGroup.getHeaderGroupProps(), children: headerGroup.headers.map((col) => ((0, jsx_runtime_1.jsx)(ui_1.Table.HeaderCell, { ...col.getHeaderProps(), children: col.render("Header") }))) }))) }), (0, jsx_runtime_1.jsx)(ui_1.Table.Body, { ...getTableBodyProps(), children: rows.map((row) => {
                            prepareRow(row);
                            return ((0, jsx_runtime_1.jsx)(ui_1.Table.Row, { color: "inherit", linkTo: row.original.id, ...row.getRowProps(), className: "group", children: row.cells.map((cell) => {
                                    return ((0, jsx_runtime_1.jsx)(ui_1.Table.Cell, { ...cell.getCellProps(), className: "inter-small-regular h-[40px]", children: cell.render("Cell") }));
                                }) }));
                        }) })] }), (0, jsx_runtime_1.jsx)(ui_1.Table.Pagination, { count: ordersResult ? ordersResult.count : 0, pageSize: queryObject.offset + rows.length, pageIndex: pageIndex, pageCount: pageCount, canPreviousPage: canPreviousPage, canNextPage: canNextPage, previousPage: handlePrev, nextPage: handleNext })] }));
};
exports.default = react_1.default.memo(OrderTable);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItdGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvdWktY29tcG9uZW50cy9vcmRlcnMvb3JkZXItdGFibGUudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdEQUF1QjtBQUN2QiwrQ0FBa0Q7QUFDbEQsdURBQThDO0FBQzlDLDZDQUFxRDtBQUNyRCw0RUFBMkQ7QUFDM0QseURBQTBEO0FBQzFELHFDQUFxQztBQUVyQyxNQUFNLGlCQUFpQixHQUFHLEVBQUUsQ0FBQTtBQUU1QixNQUFNLGlCQUFpQixHQUFHO0lBQ3hCLE1BQU0sRUFBRSxpREFBaUQ7SUFDekQsTUFBTSxFQUNKLHNHQUFzRztDQUN6RyxDQUFBO0FBYUQsTUFBTSxVQUFVLEdBQUcsQ0FBQyxFQUFFLGlCQUFpQixFQUFtQixFQUFFLEVBQUU7SUFFNUQsTUFBTSxRQUFRLEdBQUcsSUFBQSw4QkFBVyxHQUFFLENBQUE7SUFHOUIsTUFBTSxDQUFDLFlBQVksRUFBRSxlQUFlLENBQUMsR0FBRyxJQUFBLGdCQUFRLEVBQTJCLFNBQVMsQ0FBQyxDQUFBO0lBQ3JGLE1BQU0sQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLEdBQUcsSUFBQSxnQkFBUSxFQUFDLElBQUksQ0FBQyxDQUFBO0lBRTlDLElBQUksYUFBYSxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUE7SUFFckMsTUFBTSxFQUNKLFFBQVEsRUFDUixXQUFXLEdBQ1osR0FBRyxJQUFBLDRCQUFlLEVBQUMsaUJBQWlCLENBQUMsQ0FBQTtJQUV0QyxNQUFNLElBQUksR0FBRyxDQUFDLENBQUE7SUFDZCxNQUFNLEdBQUcsR0FBRyxpQkFBaUIsQ0FBQTtJQUU3QixNQUFNLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxHQUFHLElBQUEsZ0JBQVEsRUFBQyxDQUFDLENBQUMsQ0FBQTtJQUUzQyw4QkFBOEI7SUFDOUIsK0RB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