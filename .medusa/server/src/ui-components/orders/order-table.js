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
const OrderTable = ({ setContextFilters, searchQuery }) => {
    const location = (0, react_router_dom_1.useLocation)();
    const [ordersResult, setOrdersResult] = (0, react_1.useState)(undefined);
    const [isLoading, setLoading] = (0, react_1.useState)(true);
    const debounceTimerRef = (0, react_1.useRef)(null);
    const isInitialMount = (0, react_1.useRef)(true);
    let hiddenColumns = ["sales_channel"];
    const { paginate, queryObject, } = (0, use_orders_1.useOrderFilters)(defaultQueryProps);
    const offs = 0;
    const lim = DEFAULT_PAGE_SIZE;
    const [numPages, setNumPages] = (0, react_1.useState)(0);
    // Fetch orders function - memoized to avoid unnecessary re-renders
    const fetchOrders = (0, react_1.useCallback)((searchValue) => {
        setLoading(true);
        const queryParams = new URLSearchParams({
            order: '-created_at',
            fields: 'id,status,display_id,created_at,email,fulfillment_status,payment_status,total,currency_code,metadata,items,*customer'
        });
        if (searchValue && searchValue.trim()) {
            const trimmedSearch = searchValue.trim();
            queryParams.append('q', trimmedSearch);
        }
        fetch(`/admin/orders?${queryParams.toString()}`, {
            credentials: "include",
        })
            .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
            .then((result) => {
            const finalResult = {
                orders: result?.orders || [],
                count: result?.count || 0,
                limit: result?.limit || DEFAULT_PAGE_SIZE,
                offset: result?.offset || 0
            };
            setOrdersResult(finalResult);
            setLoading(false);
        })
            .catch((error) => {
            console.error('Error fetching orders:', error);
            // On error, if we were searching, show empty results instead of all orders
            if (searchValue && searchValue.trim()) {
                setOrdersResult({ orders: [], count: 0, limit: DEFAULT_PAGE_SIZE, offset: 0 });
            }
            setLoading(false);
        });
    }, []);
    // Initial load on mount
    (0, react_1.useEffect)(() => {
        fetchOrders();
        isInitialMount.current = false;
    }, [fetchOrders]);
    (0, react_1.useEffect)(() => {
        if (isInitialMount.current) {
            return;
        }
        // Clear previous timer
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }
        if (!searchQuery || searchQuery.trim() === '') {
            fetchOrders(undefined); // Pass undefined to fetch all orders
            return;
        }
        // Set new timer for debounced search
        debounceTimerRef.current = setTimeout(() => {
            fetchOrders(searchQuery); // Always pass the search query
        }, 300); // Reduced to 300ms for better responsiveness
        // Cleanup
        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, [searchQuery, fetchOrders]);
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
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(ui_1.Table, { ...getTableProps(), className: (0, clsx_1.default)({ ["relative"]: isLoading }), children: [(0, jsx_runtime_1.jsx)(ui_1.Table.Header, { children: headerGroups?.map((headerGroup) => ((0, jsx_runtime_1.jsx)(ui_1.Table.Row, { ...headerGroup.getHeaderGroupProps(), children: headerGroup.headers.map((col) => ((0, jsx_runtime_1.jsx)(ui_1.Table.HeaderCell, { ...col.getHeaderProps(), children: col.render("Header") }))) }))) }), (0, jsx_runtime_1.jsxs)(ui_1.Table.Body, { ...getTableBodyProps(), children: [rows.map((row) => {
                                prepareRow(row);
                                return ((0, jsx_runtime_1.jsx)(ui_1.Table.Row, { color: "inherit", linkTo: row.original.id, ...row.getRowProps(), className: "group", children: row.cells.map((cell) => {
                                        return ((0, jsx_runtime_1.jsx)(ui_1.Table.Cell, { ...cell.getCellProps(), className: "inter-small-regular h-[40px]", children: cell.render("Cell") }));
                                    }) }));
                            }), !isLoading && rows.length === 0 && ((0, jsx_runtime_1.jsx)(ui_1.Table.Row, { children: (0, jsx_runtime_1.jsx)(ui_1.Table.Cell, { className: "text-center py-8", children: searchQuery && searchQuery.trim()
                                        ? `No orders found matching "${searchQuery}"`
                                        : 'No orders found' }) }))] })] }), (0, jsx_runtime_1.jsx)(ui_1.Table.Pagination, { count: ordersResult ? ordersResult.count : 0, pageSize: queryObject.offset + rows.length, pageIndex: pageIndex, pageCount: pageCount, canPreviousPage: canPreviousPage, canNextPage: canNextPage, previousPage: handlePrev, nextPage: handleNext })] }));
};
exports.default = react_1.default.memo(OrderTable);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItdGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvdWktY29tcG9uZW50cy9vcmRlcnMvb3JkZXItdGFibGUudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdEQUF1QjtBQUN2QiwrQ0FBdUU7QUFDdkUsdURBQThDO0FBQzlDLDZDQUFxRDtBQUNyRCw0RUFBMkQ7QUFDM0QseURBQTBEO0FBQzFELHFDQUFxQztBQUVyQyxNQUFNLGlCQUFpQixHQUFHLEVBQUUsQ0FBQTtBQUU1QixNQUFNLGlCQUFpQixHQUFHO0lBQ3hCLE1BQU0sRUFBRSxpREFBaUQ7SUFDekQsTUFBTSxFQUNKLHNHQUFzRztDQUN6RyxDQUFBO0FBY0QsTUFBTSxVQUFVLEdBQUcsQ0FBQyxFQUFFLGlCQUFpQixFQUFFLFdBQVcsRUFBbUIsRUFBRSxFQUFFO0lBRXpFLE1BQU0sUUFBUSxHQUFHLElBQUEsOEJBQVcsR0FBRSxDQUFBO0lBRTlCLE1BQU0sQ0FBQyxZQUFZLEVBQUUsZUFBZSxDQUFDLEdBQUcsSUFBQSxnQkFBUSxFQUEyQixTQUFTLENBQUMsQ0FBQTtJQUNyRixNQUFNLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxHQUFHLElBQUEsZ0JBQVEsRUFBQyxJQUFJLENBQUMsQ0FBQTtJQUM5QyxNQUFNLGdCQUFnQixHQUFHLElBQUEsY0FBTSxFQUF3QixJQUFJLENBQUMsQ0FBQTtJQUM1RCxNQUFNLGNBQWMsR0FBRyxJQUFBLGNBQU0sRUFBQyxJQUFJLENBQUMsQ0FBQTtJQUVuQyxJQUFJLGFBQWEsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFBO0lBRXJDLE1BQU0sRUFDSixRQUFRLEVBQ1IsV0FBVyxHQUNaLEdBQUcsSUFBQSw0QkFBZSxFQUFDLGlCQUFpQixDQUFDLENBQUE7SUFFdEMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxDQUFBO0lBQ2QsTUFBTSxH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