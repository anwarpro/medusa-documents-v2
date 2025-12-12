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
const OrderTable = ({ setContextFilters, searchTerm = "" }) => {
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
        setLoading(true);
    }, [searchTerm]);
    (0, react_1.useEffect)(() => {
        if (!isLoading) {
            return;
        }
        // Fetch all orders - we'll filter client-side by display_id
        const url = `/admin/orders?order=-created_at&fields=id,status,display_id,created_at,email,fulfillment_status,payment_status,total,currency_code,metadata,items,*customer`;
        fetch(url, {
            credentials: "include",
        })
            .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
            .then((result) => {
            // Ensure result has orders array
            if (!result || !Array.isArray(result.orders)) {
                setOrdersResult({
                    count: 0,
                    limit: lim,
                    offset: 0,
                    orders: []
                });
                setLoading(false);
                return;
            }
            // Filter client-side by display_id if search term exists
            let filteredResult = result;
            if (searchTerm && searchTerm.trim() && Array.isArray(result.orders)) {
                const searchLower = searchTerm.trim().toLowerCase();
                const filteredOrders = result.orders.filter((order) => order.display_id?.toString().toLowerCase().includes(searchLower));
                filteredResult = {
                    ...result,
                    orders: filteredOrders,
                    count: filteredOrders.length
                };
            }
            setOrdersResult(filteredResult);
            setLoading(false);
        })
            .catch((error) => {
            console.error('Error fetching orders:', error);
            setOrdersResult({
                count: 0,
                limit: lim,
                offset: 0,
                orders: []
            });
            setLoading(false);
        });
    }, [isLoading, searchTerm]);
    (0, react_1.useEffect)(() => {
        const controlledPageCount = Math.ceil(ordersResult ? ordersResult.count / queryObject.limit : 0);
        setNumPages(controlledPageCount);
    }, [ordersResult, queryObject.limit]);
    const [columns] = (0, use_columns_1.default)();
    // Ensure columns is always an array
    const safeColumns = columns || [];
    // Ensure data is always an array
    const safeData = (ordersResult && Array.isArray(ordersResult.orders)) ? ordersResult.orders : [];
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, canPreviousPage, canNextPage, pageCount, gotoPage, nextPage, previousPage, 
    // Get the state from the instance
    state: { pageIndex }, } = (0, react_table_1.useTable)({
        columns: safeColumns,
        data: safeData,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXItdGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvdWktY29tcG9uZW50cy9vcmRlcnMvb3JkZXItdGFibGUudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdEQUF1QjtBQUN2QiwrQ0FBa0Q7QUFDbEQsdURBQThDO0FBQzlDLDZDQUFxRDtBQUNyRCw0RUFBMkQ7QUFDM0QseURBQTBEO0FBQzFELHFDQUFxQztBQUVyQyxNQUFNLGlCQUFpQixHQUFHLEVBQUUsQ0FBQTtBQUU1QixNQUFNLGlCQUFpQixHQUFHO0lBQ3hCLE1BQU0sRUFBRSxpREFBaUQ7SUFDekQsTUFBTSxFQUNKLHNHQUFzRztDQUN6RyxDQUFBO0FBY0QsTUFBTSxVQUFVLEdBQUcsQ0FBQyxFQUFFLGlCQUFpQixFQUFFLFVBQVUsR0FBRyxFQUFFLEVBQW1CLEVBQUUsRUFBRTtJQUU3RSxNQUFNLFFBQVEsR0FBRyxJQUFBLDhCQUFXLEdBQUUsQ0FBQTtJQUc5QixNQUFNLENBQUMsWUFBWSxFQUFFLGVBQWUsQ0FBQyxHQUFHLElBQUEsZ0JBQVEsRUFBMkIsU0FBUyxDQUFDLENBQUE7SUFDckYsTUFBTSxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsR0FBRyxJQUFBLGdCQUFRLEVBQUMsSUFBSSxDQUFDLENBQUE7SUFFOUMsSUFBSSxhQUFhLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQTtJQUVyQyxNQUFNLEVBQ0osUUFBUSxFQUNSLFdBQVcsR0FDWixHQUFHLElBQUEsNEJBQWUsRUFBQyxpQkFBaUIsQ0FBQyxDQUFBO0lBRXRDLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQTtJQUNkLE1BQU0sR0FBRyxHQUFHLGlCQUFpQixDQUFBO0lBRTdCLE1BQU0sQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLEdBQUcsSUFBQSxnQkFBUSxFQUFDLENBQUMsQ0FBQyxDQUFBO0lBRTNDLDhCQUE4QjtJQUM5QiwrREFBK0Q7SUFDL0QsWUFBWTtJQUNaLDhHQUE4RztJQUM5RyxJQUFJO0lBR0osSUFBQSxpQkFBUyxFQUFDLEdBQUcsRUFBRTtRQUNiLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQixDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFBO0lBRWhCLElBQUEsaUJBQVMsRUFBQyxHQUFHLEVBQUU7UUFDYixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDZixPQUFPO1FBQ1QsQ0FBQztRQUVELDREQUE0RDtRQUM1RCxNQUFNLEdBQUcsR0FBRyw2SkFBNkosQ0FBQztRQUUxSyxLQUFLLENBQUMsR0FBRyxFQUFFO1lBQ1QsV0FBVyxFQUFFLFNBQVM7U0FDdkIsQ0FBQzthQUNELElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ1osSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDWixNQUFNLElBQUksS0FBSyxDQUFDLHVCQUF1QixHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUN2RCxDQUFDO1lBQ0QsT0FBTyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDcEIsQ0FBQyxDQUFDO2FBQ0QsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDZixpQ0FBaUM7WUFDakMsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7Z0JBQzdDLGVBQWUsQ0FBQztvQkFDZCxLQUFLLEVBQUUsQ0FBQztvQkFDUixLQUFLLEVBQUUsR0FBRztvQkFDVixNQUFNLEVBQUUsQ0FBQztvQkFDVCxNQUFNLEVBQUUsRUFBRTtpQkFDWCxDQUFDLENBQUE7Z0JBQ0YsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFBO2dCQUNqQixPQUFNO1lBQ1IsQ0FBQztZQUVELHlEQUF5RDtZQUN6RCxJQUFJLGNBQWMsR0FBRyxNQUFNLENBQUM7WUFDNUIsSUFBSSxVQUFVLElBQUksVUFBVSxDQUFDLElBQUksRUFBRSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7Z0JBQ3BFLE1BQU0sV0FBVyxHQUFHLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDcEQsTUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFVLEVBQUUsRUFBRSxDQUN6RCxLQUFLLENBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FDakUsQ0FBQztnQkFDRixjQUFjLEdBQUc7b0JBQ2YsR0FBRyxNQUFNO29CQUNULE1BQU0sRUFBRSxjQUFjO29CQUN0QixLQUFLLEVBQUUsY0FBYyxDQUFDLE1BQU07aUJBQzdCLENBQUM7WUFDSixDQUFDO1lBQ0QsZUFBZSxDQUFDLGNBQWMsQ0FBQyxDQUFBO1lBQy9CLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNuQixDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMsd0JBQXdCLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDL0MsZUFBZSxDQUFDO2dCQUNkLEtBQUssRUFBRSxDQUFDO2dCQUNSLEtBQUssRUFBRSxHQUFHO2dCQUNWLE1BQU0sRUFBRSxDQUFDO2dCQUNULE1BQU0sRUFBRSxFQUFFO2FBQ1gsQ0FBQyxDQUFBO1lBQ0YsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ25CLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUE7SUFFM0IsSUFBQSxpQkFBUyxFQUFDLEdBQUcsRUFBRTtRQUNiLE1BQU0sbUJBQW1CLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDaEcsV0FBVyxDQUFDLG1CQUFtQixDQUFDLENBQUE7SUFDbEMsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO0lBR3JDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFBLHFCQUFtQixHQUFFLENBQUE7SUFFdkMsb0NBQW9DO0lBQ3BDLE1BQU0sV0FBVyxHQUFHLE9BQU8sSUFBSSxFQUFFLENBQUE7SUFFakMsaUNBQWlDO0lBQ2pDLE1BQU0sUUFBUSxHQUFHLENBQUMsWUFBWSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQTtJQUVoRyxNQUFNLEVBQ0osYUFBYSxFQUNiLGlCQUFpQixFQUNqQixZQUFZLEVBQ1osSUFBSSxFQUNKLFVBQVUsRUFDVixlQUFlLEVBQ2YsV0FBVyxFQUNYLFNBQVMsRUFDVCxRQUFRLEVBQ1IsUUFBUSxFQUNSLFlBQVk7SUFDWixrQ0FBa0M7SUFDbEMsS0FBSyxFQUFFLEVBQUUsU0FBUyxFQUFFLEdBQ3JCLEdBQUcsSUFBQSxzQkFBUSxFQUNWO1FBQ0UsT0FBTyxFQUFFLFdBQVc7UUFDcEIsSUFBSSxFQUFFLFFBQVE7UUFDZCxnQkFBZ0IsRUFBRSxJQUFJO1FBQ3RCLFlBQVksRUFBRTtZQUNaLFFBQVEsRUFBRSxHQUFHO1lBQ2IsU0FBUyxFQUFFLElBQUksR0FBRyxHQUFHO1lBQ3JCLGFBQWE7U0FDZDtRQUNELFNBQVMsRUFBRSxRQUFRO1FBQ25CLGFBQWEsRUFBRSxLQUFLO0tBQ3JCLEVBQ0QsMkJBQWEsQ0FDZCxDQUFBO0lBRUQsTUFBTSxVQUFVLEdBQUcsR0FBRyxFQUFFO1FBQ3RCLElBQUksV0FBVyxFQUFFLENBQUM7WUFDaEIsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ1gsUUFBUSxFQUFFLENBQUE7UUFDWixDQUFDO0lBQ0gsQ0FBQyxDQUFBO0lBRUQsTUFBTSxVQUFVLEdBQUcsR0FBRyxFQUFFO1FBQ3RCLElBQUksZUFBZSxFQUFFLENBQUM7WUFDcEIsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDWixZQUFZLEVBQUUsQ0FBQTtRQUNoQixDQUFDO0lBQ0gsQ0FBQyxDQUFBO0lBRUQsT0FBTyxDQUNMLDZEQUNFLHdCQUFDLFVBQUssT0FDQSxhQUFhLEVBQUUsRUFDbkIsU0FBUyxFQUFFLElBQUEsY0FBSSxFQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxhQUU1Qyx1QkFBQyxVQUFLLENBQUMsTUFBTSxjQUNWLFlBQVksRUFBRSxHQUFHLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQ2xDLHVCQUFDLFVBQUssQ0FBQyxHQUFHLE9BQUssV0FBVyxDQUFDLG1CQUFtQixFQUFFLFlBQzdDLFdBQVcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUNoQyx1QkFBQyxVQUFLLENBQUMsVUFBVSxPQUFLLEdBQUcsQ0FBQyxjQUFjLEVBQUUsWUFDdkMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FDSixDQUNwQixDQUFDLEdBQ1EsQ0FDYixDQUFDLEdBQ1csRUFDZix1QkFBQyxVQUFLLENBQUMsSUFBSSxPQUFLLGlCQUFpQixFQUFFLFlBQ2hDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTs0QkFDaEIsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFBOzRCQUNmLE9BQU8sQ0FDTCx1QkFBQyxVQUFLLENBQUMsR0FBRyxJQUNSLEtBQUssRUFBRSxTQUFTLEVBQ2hCLE1BQU0sRUFBRSxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsS0FDbkIsR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUNyQixTQUFTLEVBQUMsT0FBTyxZQUVoQixHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO29DQUN0QixPQUFPLENBQ0wsdUJBQUMsVUFBSyxDQUFDLElBQUksT0FBSyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUUsU0FBUyxFQUFDLDhCQUE4QixZQUMxRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUNULENBQ2QsQ0FBQTtnQ0FDSCxDQUFDLENBQUMsR0FDUSxDQUNiLENBQUE7d0JBQ0gsQ0FBQyxDQUFDLEdBQ1MsSUFDUCxFQUNSLHVCQUFDLFVBQUssQ0FBQyxVQUFVLElBQ2YsS0FBSyxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUM1QyxRQUFRLEVBQUUsV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxFQUMxQyxTQUFTLEVBQUUsU0FBUyxFQUNwQixTQUFTLEVBQUUsU0FBUyxFQUNwQixlQUFlLEVBQUUsZUFBZSxFQUNoQyxXQUFXLEVBQUUsV0FBVyxFQUN4QixZQUFZLEVBQUUsVUFBVSxFQUN4QixRQUFRLEVBQUUsVUFBVSxHQUNwQixJQUNELENBQ0osQ0FBQTtBQUNILENBQUMsQ0FBQTtBQUVELGtCQUFlLGVBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUEifQ==