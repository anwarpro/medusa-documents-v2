"use strict";
const jsxRuntime = require("react/jsx-runtime");
const adminSdk = require("@medusajs/admin-sdk");
const ui = require("@medusajs/ui");
const icons = require("@medusajs/icons");
const material = require("@mui/material");
const React = require("react");
const clsx = require("clsx");
const reactRouterDom = require("react-router-dom");
const reactTable = require("react-table");
const moment = require("moment");
const reactHookForm = require("react-hook-form");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const React__default = /* @__PURE__ */ _interopDefault(React);
const clsx__default = /* @__PURE__ */ _interopDefault(clsx);
const moment__default = /* @__PURE__ */ _interopDefault(moment);
const GenerateInvoiceDropdownButton = ({ order, updateInvoiceNumber }) => {
  const [isLoading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(void 0);
  React.useEffect(() => {
    if (!isLoading) {
      return;
    }
    fetch(`/admin/documents/invoice`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        order_id: order.id
      })
    }).then((res) => res.json()).then((responseJson) => {
      if (responseJson && responseJson.message) {
        setError({
          message: responseJson.message
        });
        ui.toast.error("Invoice", {
          description: `Problem happened when generating invoice. ${responseJson.message}`
        });
      } else {
        if (responseJson.buffer) {
          updateInvoiceNumber(order.id, responseJson.invoice.displayNumber);
          const anyBuffer = responseJson.buffer;
          const blob = new Blob([new Uint8Array(anyBuffer.data)], { type: "application/pdf" });
          ui.toast.dismiss();
          const pdfURL = URL.createObjectURL(blob);
          window.open(pdfURL, "_blank");
        } else {
          ui.toast.dismiss();
          ui.toast.error("Invoice", {
            description: "Problem happened when generating invoice"
          });
        }
      }
      setLoading(false);
    }).catch((error2) => {
      var _a, _b;
      console.error(error2);
      ui.toast.dismiss();
      const trueError = error2;
      ui.toast.error("Invoice", {
        description: (_b = (_a = trueError == null ? void 0 : trueError.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message
      });
    });
  }, [isLoading]);
  return /* @__PURE__ */ jsxRuntime.jsxs(ui.DropdownMenu.Item, { className: "gap-x-2", onClick: () => setLoading(true), children: [
    /* @__PURE__ */ jsxRuntime.jsx(icons.FlyingBox, {}),
    "Generate new invoice"
  ] });
};
const GeneratePackingSlipDropdownButton = ({ order, updatePackingSlipNumber }) => {
  const [isLoading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(void 0);
  React.useEffect(() => {
    if (!isLoading) {
      return;
    }
    fetch(`/admin/documents/packing-slip`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        order_id: order.id
      })
    }).then((res) => res.json()).then((responseJson) => {
      if (responseJson && responseJson.message) {
        ui.toast.error("Packing slip", {
          description: `Problem happened when generating packing slip. ${responseJson.message}`
        });
      } else {
        if (responseJson.buffer) {
          updatePackingSlipNumber(order.id, responseJson.packingSlip.displayNumber);
          const anyBuffer = responseJson.buffer;
          const blob = new Blob([new Uint8Array(anyBuffer.data)], { type: "application/pdf" });
          ui.toast.dismiss();
          const pdfURL = URL.createObjectURL(blob);
          window.open(pdfURL, "_blank");
        } else {
          ui.toast.dismiss();
          ui.toast.error("Packing slip", {
            description: "Problem happened when generating packing slip"
          });
        }
      }
      setLoading(false);
    }).catch((error2) => {
      var _a, _b;
      console.error(error2);
      ui.toast.dismiss();
      const trueError = error2;
      ui.toast.error("Packing slip", {
        description: (_b = (_a = trueError == null ? void 0 : trueError.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message
      });
    });
  }, [isLoading]);
  return /* @__PURE__ */ jsxRuntime.jsxs(ui.DropdownMenu.Item, { className: "gap-x-2", onClick: () => setLoading(true), children: [
    /* @__PURE__ */ jsxRuntime.jsx(icons.FlyingBox, {}),
    "Generate new packing slip"
  ] });
};
function ActionsDropdown({ order, updateInvoiceNumber, updatePackingSlipNumber }) {
  return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: /* @__PURE__ */ jsxRuntime.jsxs(ui.DropdownMenu, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(ui.DropdownMenu.Trigger, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx(ui.IconButton, { children: /* @__PURE__ */ jsxRuntime.jsx(icons.EllipsisHorizontal, {}) }) }),
    /* @__PURE__ */ jsxRuntime.jsxs(ui.DropdownMenu.Content, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(GenerateInvoiceDropdownButton, { order, updateInvoiceNumber }),
      /* @__PURE__ */ jsxRuntime.jsx(ui.DropdownMenu.Separator, {}),
      /* @__PURE__ */ jsxRuntime.jsx(GeneratePackingSlipDropdownButton, { order, updatePackingSlipNumber })
    ] })
  ] }) });
}
const InvoiceNumberFromOrder = ({ orderId, invoiceNumber }) => {
  const [data, setData] = React.useState(void 0);
  const [error, setError] = React.useState(void 0);
  const [isHovered, setIsHovered] = React.useState(false);
  const [isLoading, setLoading] = React.useState(true);
  const handleClick = async () => {
    ui.toast.loading("Invoice", {
      description: "Preparing invoice...",
      duration: Infinity
    });
    const result2 = new URLSearchParams({
      includeBuffer: "true",
      orderId
    });
    fetch(`/admin/documents/invoice?${result2.toString()}`, {
      credentials: "include"
    }).then((res) => res.json()).then((result3) => {
      if (result3 && result3.buffer) {
        ui.toast.dismiss();
        openPdf(result3);
      } else {
        ui.toast.dismiss();
        ui.toast.error("Invoice", {
          description: "Problem happened when preparing invoice"
        });
      }
    }).catch((error2) => {
      setError(error2);
      console.error(error2);
      ui.toast.dismiss();
      ui.toast.error("Invoice", {
        description: error2
      });
    });
  };
  const openPdf = (invoiceResult) => {
    if (invoiceResult && invoiceResult.buffer) {
      const anyBuffer = invoiceResult.buffer;
      const blob = new Blob([new Uint8Array(anyBuffer.data)], { type: "application/pdf" });
      const pdfURL = URL.createObjectURL(blob);
      window.open(pdfURL, "_blank");
    }
  };
  const result = new URLSearchParams({
    orderId
  });
  React.useEffect(() => {
    setLoading(true);
  }, [invoiceNumber]);
  React.useEffect(() => {
    if (!isLoading) {
      return;
    }
    fetch(`/admin/documents/invoice?${result.toString()}`, {
      credentials: "include"
    }).then((res) => res.json()).then((result2) => {
      setData(result2);
      setLoading(false);
    }).catch((error2) => {
      setError(error2);
      console.error(error2);
    });
  }, [isLoading]);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsx(material.CircularProgress, { size: 8 }) });
  }
  if (data && data.invoice) {
    return /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsx(
      "p",
      {
        className: "text-grey-90 hover:text-violet-60 cursor-pointer pl-2 transition-colors duration-200",
        onClick: () => handleClick(),
        style: {
          cursor: "pointer",
          color: isHovered ? "violet" : "grey",
          textDecoration: isHovered ? "underline" : "none",
          transition: "color 0.2s, text-decoration 0.2s"
        },
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        children: `Invoice: ${data.invoice.displayNumber}`
      }
    ) });
  } else {
    return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, {});
  }
};
const PackingSlipNumber = ({ orderId, packingSlipNumber }) => {
  const [data, setData] = React.useState(void 0);
  const [error, setError] = React.useState(void 0);
  const [isHovered, setIsHovered] = React.useState(false);
  const [isLoading, setLoading] = React.useState(true);
  const handleClick = async () => {
    ui.toast.loading("Packing slip", {
      description: "Preparing packing slip...",
      duration: Infinity
    });
    const result2 = new URLSearchParams({
      includeBuffer: "true",
      orderId
    });
    fetch(`/admin/documents/packing-slip?${result2.toString()}`, {
      credentials: "include"
    }).then((res) => res.json()).then((result3) => {
      if (result3 && result3.buffer) {
        ui.toast.dismiss();
        openPdf(result3);
      } else {
        ui.toast.dismiss();
        ui.toast.error("Packing slip", {
          description: "Problem happened when preparing packing slip"
        });
      }
    }).catch((error2) => {
      setError(error2);
      console.error(error2);
      ui.toast.dismiss();
      ui.toast.error("Packing slip", {
        description: error2
      });
    });
  };
  const openPdf = (packingSlipResult) => {
    if (packingSlipResult && packingSlipResult.buffer) {
      const anyBuffer = packingSlipResult.buffer;
      const blob = new Blob([new Uint8Array(anyBuffer.data)], { type: "application/pdf" });
      const pdfURL = URL.createObjectURL(blob);
      window.open(pdfURL, "_blank");
    }
  };
  const result = new URLSearchParams({
    orderId
  });
  React.useEffect(() => {
    setLoading(true);
  }, [packingSlipNumber]);
  React.useEffect(() => {
    if (!isLoading) {
      return;
    }
    fetch(`/admin/documents/packing-slip?${result.toString()}`, {
      credentials: "include"
    }).then((res) => res.json()).then((result2) => {
      setData(result2);
      setLoading(false);
    }).catch((error2) => {
      setError(error2);
      console.error(error2);
    });
  }, [isLoading]);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntime.jsx(material.CircularProgress, { size: 8 });
  }
  if (data && data.packingSlip) {
    return /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsx(
      "p",
      {
        className: "text-grey-90 hover:text-violet-60 cursor-pointer pl-2 transition-colors duration-200",
        onClick: () => handleClick(),
        style: {
          cursor: "pointer",
          color: isHovered ? "violet" : "grey",
          textDecoration: isHovered ? "underline" : "none",
          transition: "color 0.2s, text-decoration 0.2s"
        },
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
        children: `Packing slip: ${data.packingSlip.displayNumber}`
      }
    ) });
  } else {
    return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, {});
  }
};
function formatAmountWithSymbol({
  amount,
  currency,
  digits
}) {
  let locale = "en-US";
  if (currency.toLowerCase() === "dkk") {
    locale = "da-DK";
  }
  const taxRate = 0;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: digits
  }).format(amount * (1 + taxRate / 100));
}
const useOrderTableColumns = () => {
  const [documentNumbers, setDocumentNumbers] = React.useState({});
  const decideStatus = (status) => {
    switch (status) {
      case "captured":
        return /* @__PURE__ */ jsxRuntime.jsx(ui.StatusBadge, { color: "green", children: "Paid" });
      case "awaiting":
        return /* @__PURE__ */ jsxRuntime.jsx(ui.StatusBadge, { color: "grey", children: "Awaiting" });
      case "requires_action":
        return /* @__PURE__ */ jsxRuntime.jsx(ui.StatusBadge, { color: "red", children: "Requires action" });
      case "canceled":
        return /* @__PURE__ */ jsxRuntime.jsx(ui.StatusBadge, { color: "orange", children: "Canceled" });
      default:
        return /* @__PURE__ */ jsxRuntime.jsx(ui.StatusBadge, { color: "purple", children: "N/A" });
    }
  };
  const decideFullfillmentStatus = (status) => {
    switch (status) {
      case "not_fulfilled":
        return /* @__PURE__ */ jsxRuntime.jsx(ui.StatusBadge, { color: "grey", children: "Not fulfilled" });
      case "partially_fulfilled":
        return /* @__PURE__ */ jsxRuntime.jsx(ui.StatusBadge, { color: "blue", children: "Partially fulfilled" });
      case "fulfilled":
        return /* @__PURE__ */ jsxRuntime.jsx(ui.StatusBadge, { color: "green", children: "Fulfilled" });
      case "partially_shipped":
        return /* @__PURE__ */ jsxRuntime.jsx(ui.StatusBadge, { color: "blue", children: "Partially shipped" });
      case "shipped":
        return /* @__PURE__ */ jsxRuntime.jsx(ui.StatusBadge, { color: "green", children: "Shipped" });
      case "partially_returned":
        return /* @__PURE__ */ jsxRuntime.jsx(ui.StatusBadge, { color: "blue", children: "Partially returned" });
      case "returned":
        return /* @__PURE__ */ jsxRuntime.jsx(ui.StatusBadge, { color: "green", children: "Returned" });
      case "canceled":
        return /* @__PURE__ */ jsxRuntime.jsx(ui.StatusBadge, { color: "red", children: "Canceled" });
      case "requires_action":
        return /* @__PURE__ */ jsxRuntime.jsx(ui.StatusBadge, { color: "purple", children: "Requires action" });
      default:
        return /* @__PURE__ */ jsxRuntime.jsx(ui.StatusBadge, { color: "grey", children: "N/A" });
    }
  };
  const updateInvoiceNumber = (orderId, invoiceNumber) => {
    setDocumentNumbers((prev) => ({
      ...prev,
      [orderId]: {
        ...prev[orderId],
        invoiceNumber
      }
    }));
  };
  const updatePackingSlipNumber = (orderId, packingSlipNumber) => {
    setDocumentNumbers((prev) => ({
      ...prev,
      [orderId]: {
        ...prev[orderId],
        packingSlipNumber
      }
    }));
  };
  const columns = React.useMemo(
    () => [
      {
        Header: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "pl-2", children: "Order" }),
        accessor: "display_id",
        Cell: ({ cell: { value } }) => /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-grey-90 group-hover:text-violet-60 pl-2", children: `#${value}` })
      },
      {
        Header: "Date added",
        accessor: "created_at",
        Cell: ({ cell: { value } }) => {
          return /* @__PURE__ */ jsxRuntime.jsx(ui.TooltipProvider, { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Tooltip, { content: /* @__PURE__ */ jsxRuntime.jsx(ui.Text, { children: moment__default.default(value).format("DD MMM YYYY hh:mm a") }), children: /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-grey-90 group-hover:text-violet-60 min-w-[40px]", children: moment__default.default(value).format("DD MMM YYYY") }) }) });
        }
      },
      {
        Header: "Customer",
        accessor: "customer",
        Cell: ({ row, cell: { value } }) => {
          var _a, _b;
          const customer = {
            first_name: (value == null ? void 0 : value.first_name) || ((_a = row.original.shipping_address) == null ? void 0 : _a.first_name),
            last_name: (value == null ? void 0 : value.last_name) || ((_b = row.original.shipping_address) == null ? void 0 : _b.last_name),
            email: row.original.email
          };
          return /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-grey-90 group-hover:text-violet-60 min-w-[100px]", children: `${customer.first_name || customer.last_name ? `${customer.first_name} ${customer.last_name}` : customer.email ? customer.email : "-"}` });
        }
      },
      {
        Header: "Fulfillment",
        accessor: "fulfillment_status",
        Cell: ({ cell: { value } }) => decideFullfillmentStatus(value)
      },
      {
        Header: "Payment status",
        accessor: "payment_status",
        Cell: ({ cell: { value } }) => decideStatus(value)
      },
      {
        Header: () => /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-right", children: "Total" }),
        accessor: "total",
        Cell: ({ row, cell: { value } }) => /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-grey-90 group-hover:text-violet-60 text-right", children: formatAmountWithSymbol({
          amount: value,
          currency: row.original.currency_code
        }) })
      },
      {
        Header: "Documents",
        id: "documents",
        Cell: ({ row }) => {
          const orderId = row.original.id;
          const currentDocumentNumbers = documentNumbers[orderId] || void 0;
          return /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-grey-90 group-hover:text-violet-60 pl-2", children: /* @__PURE__ */ jsxRuntime.jsxs(material.Grid, { container: true, justifyContent: "flex-start", direction: "column", spacing: 1, children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              InvoiceNumberFromOrder,
              {
                orderId,
                invoiceNumber: currentDocumentNumbers ? currentDocumentNumbers.invoiceNumber : void 0
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(
              PackingSlipNumber,
              {
                orderId,
                packingSlipNumber: currentDocumentNumbers ? currentDocumentNumbers.packingSlipNumber : void 0
              }
            )
          ] }) });
        }
      },
      {
        Header: () => /* @__PURE__ */ jsxRuntime.jsxs(material.Grid, { container: true, justifyContent: "flex-end", alignItems: "flex-end", spacing: 1, children: [
          /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsx(ui.TooltipProvider, { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Tooltip, { content: /* @__PURE__ */ jsxRuntime.jsxs(material.Grid, { item: true, children: [
            /* @__PURE__ */ jsxRuntime.jsx(ui.Text, { size: "small", children: "We do not store documents. " }),
            /* @__PURE__ */ jsxRuntime.jsx(material.Link, { fontSize: 12, href: "https://github.com/RSC-Labs/medusa-documents?tab=readme-ov-file#what-means-we-do-not-store-documents", children: "Learn more what it means." })
          ] }), children: /* @__PURE__ */ jsxRuntime.jsx(icons.InformationCircle, {}) }) }) }),
          /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: "Actions" })
        ] }),
        id: "actions",
        Cell: ({ row }) => {
          return /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { container: true, justifyContent: "flex-end", children: /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsx(
            ActionsDropdown,
            {
              order: row.original,
              updateInvoiceNumber,
              updatePackingSlipNumber
            }
          ) }) });
        }
      }
    ],
    [documentNumbers]
    // Add documentNumbers as a dependency to ensure it re-renders
  );
  return [columns, documentNumbers];
};
const atMidnight = (date) => {
  const result = moment__default.default(date);
  if (!moment__default.default.isMoment(result)) {
    console.log("date is not instance of Moment: ", date);
    return null;
  }
  result.hour(0);
  result.minute(0);
  result.second(0);
  result.millisecond(0);
  return result;
};
const relativeDateFormatToTimestamp = (value) => {
  const [count, option] = value.split("|");
  let date = moment__default.default();
  date.subtract(parseInt(count), option);
  date = atMidnight(date);
  const result = `${date.format("X")}`;
  return result;
};
const formatDateFilter = (filter) => {
  if (filter === null) {
    return filter;
  }
  const dateFormatted = Object.entries(filter).reduce((acc, [key, value]) => {
    if (value.includes("|")) {
      acc[key] = relativeDateFormatToTimestamp(value);
    } else {
      acc[key] = value;
    }
    return acc;
  }, {});
  return dateFormatted;
};
const reducer = (state, action) => {
  var _a;
  switch (action.type) {
    case "setFilters": {
      return {
        ...state,
        region: action.payload.region,
        salesChannel: action.payload.salesChannel,
        fulfillment: action.payload.fulfillment,
        payment: action.payload.payment,
        status: action.payload.status,
        date: action.payload.date,
        query: (_a = action == null ? void 0 : action.payload) == null ? void 0 : _a.query
      };
    }
    case "setQuery": {
      return {
        ...state,
        offset: 0,
        // reset offset when query changes
        query: action.payload
      };
    }
    case "setDate": {
      const newDateFilters = state.date;
      return {
        ...state,
        date: newDateFilters
      };
    }
    case "setOffset": {
      return {
        ...state,
        offset: action.payload
      };
    }
    case "reset": {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};
const useOrderFilters = (defaultFilters = null) => {
  const initial = React.useMemo(
    () => parseQueryString(defaultFilters),
    [defaultFilters]
  );
  const [state, dispatch] = React.useReducer(reducer, initial);
  const paginate = (direction) => {
    if (direction > 0) {
      const nextOffset = state.offset + state.limit;
      dispatch({ type: "setOffset", payload: nextOffset });
    } else {
      const nextOffset = Math.max(state.offset - state.limit, 0);
      dispatch({ type: "setOffset", payload: nextOffset });
    }
  };
  const getQueryObject = () => {
    const toQuery = { ...state.additionalFilters };
    for (const [key, value] of Object.entries(state)) {
      if (key === "query") {
        if (value && typeof value === "string") {
          toQuery["q"] = value;
        }
      } else if (key === "offset" || key === "limit") {
        toQuery[key] = value;
      } else if (value.open) {
        if (key === "date") {
          toQuery[stateFilterMap[key]] = formatDateFilter(
            value.filter
          );
        } else {
          toQuery[stateFilterMap[key]] = value.filter;
        }
      }
    }
    return toQuery;
  };
  const queryObject = React.useMemo(() => getQueryObject(), [state]);
  return {
    queryObject,
    paginate
  };
};
const stateFilterMap = {
  region: "region_id",
  salesChannel: "sales_channel_id",
  status: "status",
  fulfillment: "fulfillment_status",
  payment: "payment_status",
  date: "created_at"
};
const parseQueryString = (additionals = null) => {
  const defaultVal = {
    status: {
      open: false,
      filter: null
    },
    fulfillment: {
      open: false,
      filter: null
    },
    region: {
      open: false,
      filter: null
    },
    salesChannel: {
      open: false,
      filter: null
    },
    payment: {
      open: false,
      filter: null
    },
    date: {
      open: false,
      filter: null
    },
    offset: 0,
    limit: 15,
    additionalFilters: additionals
  };
  return defaultVal;
};
const DEFAULT_PAGE_SIZE = 15;
const defaultQueryProps = {
  expand: "customer,shipping_address,billing_address,items",
  fields: "id,status,display_id,created_at,email,fulfillment_status,payment_status,total,currency_code,metadata"
};
const OrderTable$1 = ({ setContextFilters }) => {
  reactRouterDom.useLocation();
  const [ordersResult, setOrdersResult] = React.useState(void 0);
  const [isLoading, setLoading] = React.useState(true);
  let hiddenColumns = ["sales_channel"];
  const {
    paginate,
    queryObject
  } = useOrderFilters(defaultQueryProps);
  const offs = queryObject.offset ?? 0;
  const lim = queryObject.limit ?? DEFAULT_PAGE_SIZE;
  const [numPages, setNumPages] = React.useState(0);
  React.useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams({
      order: "-created_at",
      fields: "id,status,display_id,created_at,email,fulfillment_status,payment_status,total,currency_code,metadata,items,*customer",
      offset: String(offs),
      limit: String(lim)
    });
    fetch(`/admin/orders?${params}`, { credentials: "include" }).then((res) => res.json()).then((result) => {
      setOrdersResult(result);
      setLoading(false);
    }).catch((error) => {
      console.error(error);
      setLoading(false);
    });
  }, [offs, lim]);
  React.useEffect(() => {
    const controlledPageCount = Math.ceil(ordersResult ? ordersResult.count / queryObject.limit : 0);
    setNumPages(controlledPageCount);
  }, [ordersResult]);
  const [columns] = useOrderTableColumns();
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    // Get the state from the instance
    state: { pageIndex }
  } = reactTable.useTable(
    {
      columns,
      data: ordersResult ? ordersResult.orders : [],
      manualPagination: true,
      initialState: {
        pageSize: lim,
        pageIndex: offs / lim,
        hiddenColumns
      },
      pageCount: numPages,
      autoResetPage: false
    },
    reactTable.usePagination
  );
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
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsxs(
      ui.Table,
      {
        ...getTableProps(),
        className: clsx__default.default({ ["relative"]: isLoading }),
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(ui.Table.Header, { children: headerGroups == null ? void 0 : headerGroups.map((headerGroup) => /* @__PURE__ */ jsxRuntime.jsx(ui.Table.Row, { ...headerGroup.getHeaderGroupProps(), children: headerGroup.headers.map((col) => /* @__PURE__ */ jsxRuntime.jsx(ui.Table.HeaderCell, { ...col.getHeaderProps(), children: col.render("Header") })) })) }),
          /* @__PURE__ */ jsxRuntime.jsx(ui.Table.Body, { ...getTableBodyProps(), children: rows.map((row) => {
            prepareRow(row);
            return /* @__PURE__ */ jsxRuntime.jsx(
              ui.Table.Row,
              {
                color: "inherit",
                linkTo: row.original.id,
                ...row.getRowProps(),
                className: "group",
                children: row.cells.map((cell) => {
                  return /* @__PURE__ */ jsxRuntime.jsx(ui.Table.Cell, { ...cell.getCellProps(), className: "inter-small-regular h-[40px]", children: cell.render("Cell") });
                })
              }
            );
          }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      ui.Table.Pagination,
      {
        count: ordersResult ? ordersResult.count : 0,
        pageSize: lim,
        pageIndex,
        pageCount,
        canPreviousPage,
        canNextPage,
        previousPage: handlePrev,
        nextPage: handleNext
      }
    )
  ] });
};
const OrderTable = React__default.default.memo(OrderTable$1);
const OrdersTab = () => {
  const [contextFilters, setContextFilters] = React.useState();
  return /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { container: true, spacing: 2, children: /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, xs: 12, md: 12, xl: 12, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Container, { children: /* @__PURE__ */ jsxRuntime.jsx(OrderTable, { setContextFilters }) }) }) });
};
var InvoiceTemplateKind = /* @__PURE__ */ ((InvoiceTemplateKind2) => {
  InvoiceTemplateKind2["BASIC"] = "BASIC";
  InvoiceTemplateKind2["BASIC_LOGO"] = "BASIC_LOGO";
  InvoiceTemplateKind2["MUSAFIR_LOGO"] = "MUSAFIR_LOGO";
  return InvoiceTemplateKind2;
})(InvoiceTemplateKind || {});
var PackingSlipTemplateKind = /* @__PURE__ */ ((PackingSlipTemplateKind2) => {
  PackingSlipTemplateKind2["BASIC"] = "BASIC";
  PackingSlipTemplateKind2["BASIC_SMALL"] = "BASIC_SMALL";
  return PackingSlipTemplateKind2;
})(PackingSlipTemplateKind || {});
const ViewExampleInvoice = ({ kind }) => {
  var _a, _b;
  const [data, setData] = React.useState(void 0);
  const [error, setError] = React.useState(void 0);
  const [isLoading, setLoading] = React.useState(true);
  const [lastKind, setLastKind] = React.useState(kind);
  React.useEffect(() => {
    if (lastKind !== kind) {
      setLastKind(kind);
      if (!isLoading) {
        setLoading(true);
      }
    }
  }, [kind]);
  React.useEffect(() => {
    if (!isLoading) {
      return;
    }
    const result = new URLSearchParams({
      template: kind
    });
    fetch(`/admin/documents/invoice/generate?${result.toString()}`, {
      credentials: "include"
    }).then((res) => res.json()).then((result2) => {
      if (result2 && result2.message) {
        setError({
          message: result2.message
        });
      } else {
        ui.toast.dismiss();
        setError(void 0);
        setData(result2);
      }
      setLoading(false);
    }).catch((error2) => {
      setError(error2);
      console.error(error2);
    });
  }, [isLoading]);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { container: true, justifyContent: "center", children: /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsx(material.CircularProgress, { size: 12 }) }) });
  }
  if (error) {
    const trueError = error;
    if (((_b = (_a = trueError.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || trueError.message) {
      if (trueError.message) {
        return /* @__PURE__ */ jsxRuntime.jsx(ui.Alert, { variant: "error", children: trueError.message });
      }
      return /* @__PURE__ */ jsxRuntime.jsx(ui.Alert, { variant: "error", children: trueError.response.data.message });
    } else {
      return /* @__PURE__ */ jsxRuntime.jsx(ui.Alert, { variant: "error", children: "Preview can't be generated" });
    }
  }
  if (data && data.buffer) {
    const anyBuffer = data.buffer;
    const blob = new Blob([new Uint8Array(anyBuffer.data)], { type: "application/pdf" });
    const pdfURL = URL.createObjectURL(blob);
    return /* @__PURE__ */ jsxRuntime.jsx("iframe", { src: pdfURL, width: 660, height: 1e3 });
  } else {
    return /* @__PURE__ */ jsxRuntime.jsx(ui.Alert, { variant: "error", children: "Preview can't be generated" });
  }
};
const ChooseTemplate$1 = (props) => {
  const handleChange = (checked) => {
    props.setKind(checked);
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(ui.RadioGroup, { onValueChange: handleChange, defaultValue: props.lastKind.toString(), children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-x-3", children: [
      /* @__PURE__ */ jsxRuntime.jsx(ui.RadioGroup.Item, { value: InvoiceTemplateKind.BASIC.toString(), id: InvoiceTemplateKind.BASIC.toString() }),
      /* @__PURE__ */ jsxRuntime.jsx(ui.Label, { htmlFor: "radio_1", weight: "plus", children: "Basic" })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-x-3", children: [
      /* @__PURE__ */ jsxRuntime.jsx(ui.RadioGroup.Item, { value: InvoiceTemplateKind.BASIC_LOGO.toString(), id: InvoiceTemplateKind.BASIC_LOGO.toString() }),
      /* @__PURE__ */ jsxRuntime.jsx(ui.Label, { htmlFor: "radio_1", weight: "plus", children: "Basic with logo" })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-x-3", children: [
      /* @__PURE__ */ jsxRuntime.jsx(ui.RadioGroup.Item, { value: InvoiceTemplateKind.MUSAFIR_LOGO.toString(), id: InvoiceTemplateKind.MUSAFIR_LOGO.toString() }),
      /* @__PURE__ */ jsxRuntime.jsx(ui.Label, { htmlFor: "radio_1", weight: "plus", children: "Musafir with Logo" })
    ] })
  ] });
};
const TemplatesTabContent$1 = ({ lastKind }) => {
  const [templateKind, setTemplateKind] = React.useState(lastKind !== void 0 && lastKind !== null ? lastKind : InvoiceTemplateKind.BASIC);
  const onSubmit = () => {
    fetch(`/admin/documents/document-invoice-settings/invoice-template`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        template: templateKind
      })
    }).then(async (response) => {
      if (response.ok) {
        ui.toast.success("Template", {
          description: "New template saved"
        });
      } else {
        const error = await response.json();
        ui.toast.error("Template", {
          description: `New template cannot be saved, some error happened. ${error.message}`
        });
      }
    }).catch((e) => {
      ui.toast.error("Template", {
        description: `New template cannot be saved, some error happened. ${e.toString()}`
      });
      console.error(e);
    });
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(material.Grid, { container: true, spacing: 2, children: [
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, xs: 3, md: 3, xl: 3, children: /* @__PURE__ */ jsxRuntime.jsxs(material.Grid, { container: true, rowSpacing: 3, children: [
      /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, xs: 12, md: 12, xl: 12, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Alert, { children: "Preview is based on the last order" }) }),
      /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, xs: 12, md: 12, xl: 12, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Container, { children: /* @__PURE__ */ jsxRuntime.jsxs(material.Grid, { container: true, rowSpacing: 3, direction: "column", children: [
        /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Heading, { level: "h1", children: "Choose template" }) }),
        /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsx(ChooseTemplate$1, { lastKind: templateKind, setKind: setTemplateKind }) }),
        /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Button, { variant: "primary", onClick: onSubmit, children: "Save" }) })
      ] }) }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, xs: 6, md: 6, xl: 6, children: /* @__PURE__ */ jsxRuntime.jsx(ViewExampleInvoice, { kind: templateKind }) })
  ] });
};
const InvoiceTemplatesTab = () => {
  var _a;
  const [data, setData] = React.useState(void 0);
  const [error, setError] = React.useState(void 0);
  const [isLoading, setLoading] = React.useState(true);
  React.useEffect(() => {
    fetch(`/admin/documents/document-invoice-settings`, {
      credentials: "include"
    }).then((res) => res.json()).then((result) => {
      setData(result);
      setLoading(false);
    }).catch((error2) => {
      setError(error2);
      console.error(error2);
    });
  }, []);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntime.jsx(material.CircularProgress, { size: 12 });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(TemplatesTabContent$1, { lastKind: (_a = data == null ? void 0 : data.settings) == null ? void 0 : _a.template });
};
const ViewExample = ({ kind }) => {
  var _a, _b;
  const [data, setData] = React.useState(void 0);
  const [error, setError] = React.useState(void 0);
  const [isLoading, setLoading] = React.useState(true);
  const [lastKind, setLastKind] = React.useState(kind);
  React.useEffect(() => {
    if (lastKind !== kind) {
      setLastKind(kind);
      if (!isLoading) {
        setLoading(true);
      }
    }
  }, [kind]);
  React.useEffect(() => {
    if (!isLoading) {
      return;
    }
    const result = new URLSearchParams({
      template: kind
    });
    fetch(`/admin/documents/packing-slip/preview?${result.toString()}`, {
      credentials: "include"
    }).then((res) => res.json()).then((result2) => {
      if (result2 && result2.message) {
        setError({
          message: result2.message
        });
      } else {
        ui.toast.dismiss();
        setData(result2);
      }
      setLoading(false);
    }).catch((error2) => {
      setError(error2);
      console.error(error2);
    });
  }, [isLoading]);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { container: true, justifyContent: "center", children: /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsx(material.CircularProgress, { size: 12 }) }) });
  }
  if (error) {
    const trueError = error;
    if (((_b = (_a = trueError.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || trueError.message) {
      if (trueError.message) {
        return /* @__PURE__ */ jsxRuntime.jsx(ui.Alert, { variant: "error", children: trueError.message });
      }
      return /* @__PURE__ */ jsxRuntime.jsx(ui.Alert, { variant: "error", children: trueError.response.data.message });
    } else {
      return /* @__PURE__ */ jsxRuntime.jsx(ui.Alert, { variant: "error", children: "Preview can't be generated" });
    }
  }
  if (data && data.buffer) {
    const anyBuffer = data.buffer;
    const blob = new Blob([new Uint8Array(anyBuffer.data)], { type: "application/pdf" });
    const pdfURL = URL.createObjectURL(blob);
    return /* @__PURE__ */ jsxRuntime.jsx("iframe", { src: pdfURL, width: 660, height: 1e3 });
  } else {
    return /* @__PURE__ */ jsxRuntime.jsx(ui.Alert, { variant: "error", children: "Preview can't be generated" });
  }
};
const ChooseTemplate = (props) => {
  const handleChange = (checked) => {
    props.setKind(checked);
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(ui.RadioGroup, { onValueChange: handleChange, defaultValue: props.lastKind.toString(), children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-x-3", children: [
      /* @__PURE__ */ jsxRuntime.jsx(ui.RadioGroup.Item, { value: PackingSlipTemplateKind.BASIC.toString(), id: PackingSlipTemplateKind.BASIC.toString() }),
      /* @__PURE__ */ jsxRuntime.jsx(ui.Label, { htmlFor: "radio_1", weight: "plus", children: "Basic" })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-x-3", children: [
      /* @__PURE__ */ jsxRuntime.jsx(ui.RadioGroup.Item, { value: PackingSlipTemplateKind.BASIC_SMALL.toString(), id: PackingSlipTemplateKind.BASIC_SMALL.toString() }),
      /* @__PURE__ */ jsxRuntime.jsx(ui.Label, { htmlFor: "radio_1", weight: "plus", children: "Basic A7" })
    ] })
  ] });
};
const TemplatesTabContent = ({ lastKind }) => {
  const [templateKind, setTemplateKind] = React.useState(lastKind !== void 0 && lastKind !== null ? lastKind : PackingSlipTemplateKind.BASIC);
  const onSubmit = () => {
    fetch(`/admin/documents/document-packing-slip-settings/template`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        template: templateKind
      })
    }).then(async (response) => {
      if (response.ok) {
        ui.toast.success("Template", {
          description: "New template saved"
        });
      } else {
        const error = await response.json();
        ui.toast.error("Template", {
          description: `New template cannot be saved, some error happened. ${error.message}`
        });
      }
    }).catch((e) => {
      ui.toast.error("Template", {
        description: `New template cannot be saved, some error happened. ${e.toString()}`
      });
      console.error(e);
    });
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(material.Grid, { container: true, spacing: 2, children: [
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, xs: 3, md: 3, xl: 3, children: /* @__PURE__ */ jsxRuntime.jsxs(material.Grid, { container: true, rowSpacing: 3, children: [
      /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, xs: 12, md: 12, xl: 12, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Alert, { children: "Preview is based on the last order" }) }),
      /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, xs: 12, md: 12, xl: 12, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Container, { children: /* @__PURE__ */ jsxRuntime.jsxs(material.Grid, { container: true, rowSpacing: 3, direction: "column", children: [
        /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Heading, { level: "h1", children: "Choose template" }) }),
        /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsx(ChooseTemplate, { lastKind: templateKind, setKind: setTemplateKind }) }),
        /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Button, { variant: "primary", onClick: onSubmit, children: "Save" }) })
      ] }) }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, xs: 6, md: 6, xl: 6, children: /* @__PURE__ */ jsxRuntime.jsx(ViewExample, { kind: templateKind }) })
  ] });
};
const PackingSlipTemplatesTab = () => {
  var _a;
  const [data, setData] = React.useState(void 0);
  const [error, setError] = React.useState(void 0);
  const [isLoading, setLoading] = React.useState(true);
  React.useEffect(() => {
    if (!isLoading) {
      return;
    }
    fetch(`/admin/documents/document-packing-slip-settings`, {
      credentials: "include"
    }).then((res) => res.json()).then((result) => {
      setData(result);
      setLoading(false);
    }).catch((error2) => {
      setError(error2);
      console.error(error2);
    });
  }, [isLoading]);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntime.jsx(material.CircularProgress, { size: 12 });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(TemplatesTabContent, { lastKind: (_a = data == null ? void 0 : data.settings) == null ? void 0 : _a.template });
};
const TemplatesTab = () => {
  return /* @__PURE__ */ jsxRuntime.jsxs(ui.Tabs, { defaultValue: "invoice", children: [
    /* @__PURE__ */ jsxRuntime.jsxs(ui.Tabs.List, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(ui.Tabs.Trigger, { value: "invoice", children: "Invoice" }),
      /* @__PURE__ */ jsxRuntime.jsx(ui.Tabs.Trigger, { value: "packing-slip", children: "Packing slip" })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(ui.Tabs.Content, { value: "invoice", children: [
      /* @__PURE__ */ jsxRuntime.jsx(material.Box, { height: 20 }),
      /* @__PURE__ */ jsxRuntime.jsx(InvoiceTemplatesTab, {})
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(ui.Tabs.Content, { value: "packing-slip", children: [
      /* @__PURE__ */ jsxRuntime.jsx(material.Box, { height: 20 }),
      /* @__PURE__ */ jsxRuntime.jsx(PackingSlipTemplatesTab, {})
    ] })
  ] });
};
const AddressField = ({ name, placeholder, initValue, register }) => {
  return /* @__PURE__ */ jsxRuntime.jsxs(material.Grid, { container: true, direction: "column", spacing: 1, marginTop: 2, children: [
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Label, { size: "small", children: name }) }),
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsx(
      ui.Input,
      {
        placeholder,
        ...register,
        defaultValue: initValue
      }
    ) })
  ] });
};
const AddressForm = ({ address, setOpenModal }) => {
  const { register, handleSubmit } = reactHookForm.useForm();
  const onSubmit = (data) => {
    fetch(`/admin/documents/document-settings/document-address`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        address: data
      })
    }).then(async (response) => {
      if (response.ok) {
        ui.toast.success("Address", {
          description: "New address saved"
        });
        setOpenModal(false);
      } else {
        const error = await response.json();
        ui.toast.error("Address", {
          description: `Address cannot be saved. ${error.message}`
        });
      }
    }).catch((e) => {
      ui.toast.error("Address", {
        description: `Address cannot be saved. ${e.toString()}`
      });
      console.error(e);
    });
  };
  return /* @__PURE__ */ jsxRuntime.jsx("form", { children: /* @__PURE__ */ jsxRuntime.jsxs(material.Grid, { container: true, direction: "column", rowSpacing: 4, paddingTop: 8, children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      AddressField,
      {
        name: "Company name",
        placeholder: "My store",
        register: register("company"),
        initValue: address == null ? void 0 : address.company
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      AddressField,
      {
        name: "First name",
        placeholder: "John",
        register: register("first_name"),
        initValue: address == null ? void 0 : address.first_name
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      AddressField,
      {
        name: "Last name",
        placeholder: "Doe",
        register: register("last_name"),
        initValue: address == null ? void 0 : address.last_name
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      AddressField,
      {
        name: "Address",
        placeholder: "56 Street",
        register: register("address_1"),
        initValue: address == null ? void 0 : address.address_1
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      AddressField,
      {
        name: "City",
        placeholder: "Warsaw",
        register: register("city"),
        initValue: address == null ? void 0 : address.city
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(
      AddressField,
      {
        name: "Postal code",
        placeholder: "55-200",
        register: register("postal_code"),
        initValue: address == null ? void 0 : address.postal_code
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsx(
      ui.Button,
      {
        type: "submit",
        variant: "primary",
        onClick: handleSubmit(onSubmit),
        children: "Save"
      }
    ) })
  ] }) });
};
const AddressModalDetails = ({ setOpenModal }) => {
  var _a;
  const [data, setData] = React.useState(void 0);
  const [error, setError] = React.useState(void 0);
  const [isLoading, setLoading] = React.useState(true);
  React.useEffect(() => {
    if (!isLoading) {
      return;
    }
    fetch(`/admin/documents/document-settings`, {
      credentials: "include"
    }).then((res) => res.json()).then((result) => {
      setData(result);
      setLoading(false);
    }).catch((error2) => {
      setError(error2);
      console.error(error2);
    });
  }, [isLoading]);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntime.jsx(ui.FocusModal.Body, { children: /* @__PURE__ */ jsxRuntime.jsx(material.CircularProgress, {}) });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(ui.FocusModal.Body, { children: /* @__PURE__ */ jsxRuntime.jsxs(material.Grid, { container: true, direction: "column", alignContent: "center", paddingTop: 8, children: [
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Heading, { children: "Store address" }) }),
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Text, { children: "This address will be used on your documents." }) }),
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Text, { children: "Presence of field on document depends on template." }) }),
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsx(AddressForm, { address: (_a = data == null ? void 0 : data.settings) == null ? void 0 : _a.storeAddress, setOpenModal }) })
  ] }) });
};
const AddressChangeModal = () => {
  const [open, setOpen] = React.useState(false);
  return /* @__PURE__ */ jsxRuntime.jsxs(
    ui.FocusModal,
    {
      open,
      onOpenChange: setOpen,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(ui.FocusModal.Trigger, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Button, { children: "Change address" }) }),
        /* @__PURE__ */ jsxRuntime.jsxs(ui.FocusModal.Content, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(ui.FocusModal.Header, {}),
          /* @__PURE__ */ jsxRuntime.jsx(AddressModalDetails, { setOpenModal: setOpen })
        ] })
      ]
    }
  );
};
const LogoFields = ({ logoSource, register }) => {
  const [logoUrl, setLogoUrl] = React.useState(logoSource);
  const [isValidUrl, setIsValidUrl] = React.useState(true);
  const [imgLoaded, setIsImageLoaded] = React.useState(false);
  const [error, setError] = React.useState(void 0);
  const handleInputChange = (event) => {
    setLogoUrl(event.target.value);
    setIsValidUrl(true);
  };
  const handleImageError = () => {
    setIsValidUrl(false);
    setIsImageLoaded(false);
  };
  const handleOnLoad = (event) => {
    setIsImageLoaded(true);
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(material.Grid, { container: true, direction: "column", spacing: 1, children: [
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Label, { size: "small", children: "Link to logo" }) }),
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsx(
      ui.Input,
      {
        placeholder: "https://raw.githubusercontent.com/RSC-Labs/medusa-store-analytics/main/docs/store-analytics-logo.PNG",
        ...register,
        defaultValue: logoSource,
        onChange: handleInputChange
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { container: true, justifyContent: "center", alignContent: "center", marginTop: 5, children: /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsx("div", { style: { height: "200px", width: "300px", overflow: "hidden", border: imgLoaded ? void 0 : "1px solid rgba(0, 0, 0, 0.12)" }, children: logoUrl && isValidUrl && /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, textAlign: "center", children: /* @__PURE__ */ jsxRuntime.jsx("img", { src: logoUrl, alt: "Preview", style: { maxWidth: 300, maxHeight: 200 }, onLoad: handleOnLoad, onError: handleImageError }) }) }) }) })
  ] });
};
const LogoForm = ({ logoSource, setOpenModal }) => {
  const { register, handleSubmit } = reactHookForm.useForm();
  const onSubmit = (data) => {
    fetch(`/admin/documents/document-settings/logo`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        logoSource: data.logoSource
      })
    }).then(async (response) => {
      if (response.ok) {
        ui.toast.success("Logo", {
          description: "New logo saved"
        });
        setOpenModal(false);
      } else {
        const error = await response.json();
        ui.toast.error("Logo", {
          description: `Logo cannot be saved, some error happened. ${error.message}`
        });
        ui.toast.error("Invoice settings", {
          description: `New invoice settings cannot be saved, some error happened.`
        });
      }
    }).catch((e) => {
      ui.toast.error("Logo", {
        description: `Logo cannot be saved, some error happened. ${e.toString()}`
      });
      console.error(e);
    });
  };
  return /* @__PURE__ */ jsxRuntime.jsx("form", { children: /* @__PURE__ */ jsxRuntime.jsxs(material.Grid, { container: true, direction: "column", rowSpacing: 4, paddingTop: 8, children: [
    /* @__PURE__ */ jsxRuntime.jsx(LogoFields, { logoSource, register: register("logoSource") }),
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsx(
      ui.Button,
      {
        type: "submit",
        variant: "primary",
        onClick: handleSubmit(onSubmit),
        children: "Save"
      }
    ) })
  ] }) });
};
const LogoModalDetails = ({ setOpenModal }) => {
  const [data, setData] = React.useState(void 0);
  const [error, setError] = React.useState(void 0);
  const [isLoading, setLoading] = React.useState(true);
  React.useEffect(() => {
    if (!isLoading) {
      return;
    }
    fetch(`/admin/documents/document-settings`, {
      credentials: "include"
    }).then((res) => res.json()).then((result) => {
      setData(result);
      setLoading(false);
    }).catch((error2) => {
      setError(error2);
      console.error(error2);
    });
  }, [isLoading]);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntime.jsx(ui.FocusModal.Body, { children: /* @__PURE__ */ jsxRuntime.jsx(material.CircularProgress, {}) });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(ui.FocusModal.Body, { children: /* @__PURE__ */ jsxRuntime.jsxs(material.Grid, { container: true, direction: "column", alignContent: "center", paddingTop: 8, children: [
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Heading, { children: "Store logo" }) }),
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Text, { children: "This logo will be used on your documents." }) }),
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Text, { children: "Presence of logo on document depends on template." }) }),
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsx(LogoForm, { logoSource: data.settings && data.settings.storeLogoSource ? data.settings.storeLogoSource : void 0, setOpenModal }) })
  ] }) });
};
const LogoChangeModal = () => {
  const [open, setOpen] = React.useState(false);
  return /* @__PURE__ */ jsxRuntime.jsxs(
    ui.FocusModal,
    {
      open,
      onOpenChange: setOpen,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(ui.FocusModal.Trigger, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Button, { children: "Change logo" }) }),
        /* @__PURE__ */ jsxRuntime.jsxs(ui.FocusModal.Content, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(ui.FocusModal.Header, {}),
          /* @__PURE__ */ jsxRuntime.jsx(LogoModalDetails, { setOpenModal: setOpen })
        ] })
      ]
    }
  );
};
const InvoiceSettingsDisplayNumber = ({ formatNumber, forcedNumber }) => {
  const result = new URLSearchParams();
  if (formatNumber) {
    result.append("formatNumber", formatNumber);
  }
  if (forcedNumber) {
    result.append("forcedNumber", forcedNumber.toString());
  }
  const [data, setData] = React.useState(void 0);
  const [error, setError] = React.useState(void 0);
  const [isLoading, setLoading] = React.useState(true);
  React.useEffect(() => {
    setLoading(true);
  }, [formatNumber, forcedNumber]);
  React.useEffect(() => {
    if (!isLoading) {
      return;
    }
    fetch(`/admin/documents/invoice/display-number?${result.toString()}`, {
      credentials: "include"
    }).then((res) => res.json()).then((result2) => {
      setData(result2);
      setLoading(false);
    }).catch((error2) => {
      setError(error2);
      console.error(error2);
    });
  }, [isLoading]);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsx(
      ui.Input,
      {
        readOnly: true
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsx(
    ui.Input,
    {
      defaultValue: data.displayNumber,
      readOnly: true
    },
    `display-number-${data.displayNumber}`
  ) });
};
const InvoiceSettingsForm = ({ invoiceSettings, setOpenModal }) => {
  const { register, handleSubmit, formState: { errors } } = reactHookForm.useForm();
  const [formatNumber, setFormatNumber] = React.useState(invoiceSettings == null ? void 0 : invoiceSettings.numberFormat);
  const [forcedNumber, setForcedNumber] = React.useState(invoiceSettings == null ? void 0 : invoiceSettings.forcedNumber);
  const [error, setError] = React.useState(void 0);
  const onSubmit = (data) => {
    fetch(`/admin/documents/document-invoice-settings`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        formatNumber: data.formatNumber,
        forcedNumber: data.forcedNumber !== void 0 && data.forcedNumber.toString().length ? data.forcedNumber : void 0
      })
    }).then(async (response) => {
      if (response.ok) {
        ui.toast.success("Invoice settings", {
          description: "New invoice settings saved"
        });
        setOpenModal(false);
      } else {
        const error2 = await response.json();
        ui.toast.error("Invoice settings", {
          description: `New invoice settings cannot be saved, some error happened. ${error2.message}`
        });
      }
    }).catch((e) => {
      ui.toast.error("Invoice settings", {
        description: `New invoice settings cannot be saved, some error happened. ${e.toString()}`
      });
      console.error(e);
    });
  };
  const INVOICE_NUMBER_PLACEHOLDER = "{invoice_number}";
  const errorText = `Text ${INVOICE_NUMBER_PLACEHOLDER} needs to be included in input.`;
  const LABEL_MUST_FORMAT = `Format must include ${INVOICE_NUMBER_PLACEHOLDER}`;
  const LABEL_MUST_FORCED = `Forced number must be a number`;
  const LABEL_INFO_FORCED = `It will auto-increment starting from this number.`;
  const validateFormatNumber = (value) => {
    if (!value.includes(INVOICE_NUMBER_PLACEHOLDER)) {
      return LABEL_MUST_FORMAT;
    }
    return true;
  };
  const validateForcedNumber = (value) => {
    if (value.length && isNaN(Number(value))) {
      return LABEL_MUST_FORCED;
    }
    return true;
  };
  return /* @__PURE__ */ jsxRuntime.jsx("form", { children: /* @__PURE__ */ jsxRuntime.jsxs(material.Grid, { container: true, direction: "column", rowSpacing: 4, paddingTop: 8, children: [
    /* @__PURE__ */ jsxRuntime.jsxs(material.Grid, { container: true, direction: "column", spacing: 1, marginTop: 2, children: [
      /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsxs(material.Grid, { container: true, direction: "column", children: [
        /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Label, { size: "small", children: "Number format" }) }),
        /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Label, { size: "xsmall", children: LABEL_MUST_FORMAT }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsx(
        ui.Input,
        {
          placeholder: INVOICE_NUMBER_PLACEHOLDER,
          defaultValue: (invoiceSettings == null ? void 0 : invoiceSettings.numberFormat) ? invoiceSettings.numberFormat : INVOICE_NUMBER_PLACEHOLDER,
          ...register("formatNumber", {
            validate: validateFormatNumber,
            onChange(e) {
              const value = e.target.value;
              if (typeof validateFormatNumber(value) === "string") {
                const result = validateFormatNumber(value);
                setError(result);
              } else {
                setError(void 0);
                setFormatNumber(value);
              }
            }
          })
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(material.Grid, { container: true, direction: "column", spacing: 1, marginTop: 2, children: [
      /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsxs(material.Grid, { container: true, direction: "column", children: [
        /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Label, { size: "small", children: "Forced number" }) }),
        /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Label, { size: "xsmall", children: LABEL_INFO_FORCED }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsx(
        ui.Input,
        {
          defaultValue: (invoiceSettings == null ? void 0 : invoiceSettings.forcedNumber) !== void 0 && invoiceSettings.forcedNumber !== null ? invoiceSettings.forcedNumber : "",
          type: "number",
          ...register("forcedNumber", {
            validate: validateForcedNumber,
            onChange(e) {
              const value = e.target.value;
              if (typeof validateForcedNumber(value) === "string") {
                const result = validateForcedNumber(value);
                setError(result);
              } else {
                setError(void 0);
                setForcedNumber(value);
              }
            }
          })
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(material.Grid, { container: true, direction: "column", spacing: 1, marginTop: 2, children: [
      /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Label, { size: "small", children: "Your next invoice number will be:" }) }),
      errors.formatNumber == void 0 && errors.forcedNumber == void 0 && error == void 0 && /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsx(InvoiceSettingsDisplayNumber, { formatNumber, forcedNumber: forcedNumber !== void 0 && forcedNumber !== null ? parseInt(forcedNumber) : void 0 }) })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsx(
      ui.Button,
      {
        type: "submit",
        variant: "primary",
        onClick: handleSubmit(onSubmit),
        children: "Save"
      }
    ) }),
    (errors.formatNumber || errors.forcedNumber) && /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Alert, { variant: "error", children: errorText }) }),
    error && /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Alert, { variant: "error", children: error }) })
  ] }) });
};
const InvoiceSettingsModalDetails = ({ setOpenModal }) => {
  const [data, setData] = React.useState(void 0);
  const [error, setError] = React.useState(void 0);
  const [isLoading, setLoading] = React.useState(true);
  React.useEffect(() => {
    if (!isLoading) {
      return;
    }
    fetch(`/admin/documents/document-invoice-settings`, {
      credentials: "include"
    }).then((res) => res.json()).then((result) => {
      setData(result);
      setLoading(false);
    }).catch((error2) => {
      setError(error2);
      console.error(error2);
    });
  }, [isLoading]);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntime.jsx(ui.FocusModal.Body, { children: /* @__PURE__ */ jsxRuntime.jsx(material.CircularProgress, {}) });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(ui.FocusModal.Body, { children: /* @__PURE__ */ jsxRuntime.jsxs(material.Grid, { container: true, direction: "column", alignContent: "center", paddingTop: 8, children: [
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Heading, { children: "Invoice settings" }) }),
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Text, { children: "These settings will be applied for newly generated invoices." }) }),
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsx(InvoiceSettingsForm, { invoiceSettings: data == null ? void 0 : data.settings, setOpenModal }) })
  ] }) });
};
const InvoiceSettingsModal = () => {
  const [open, setOpen] = React.useState(false);
  return /* @__PURE__ */ jsxRuntime.jsxs(
    ui.FocusModal,
    {
      open,
      onOpenChange: setOpen,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(ui.FocusModal.Trigger, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Button, { children: "Change settings" }) }),
        /* @__PURE__ */ jsxRuntime.jsxs(ui.FocusModal.Content, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(ui.FocusModal.Header, {}),
          /* @__PURE__ */ jsxRuntime.jsx(InvoiceSettingsModalDetails, { setOpenModal: setOpen })
        ] })
      ]
    }
  );
};
const SettingsTab = () => {
  return /* @__PURE__ */ jsxRuntime.jsxs(material.Grid, { container: true, spacing: 2, children: [
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, xs: 6, md: 6, xl: 6, children: /* @__PURE__ */ jsxRuntime.jsxs(ui.Container, { children: [
      /* @__PURE__ */ jsxRuntime.jsxs(material.Grid, { container: true, direction: "column", children: [
        /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Heading, { level: "h1", children: "Store information" }) }),
        /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Text, { size: "small", children: "Change information about your store to have it included in generated documents" }) })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(material.Grid, { container: true, marginTop: 5, direction: "row", columnSpacing: 2, children: [
        /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsx(AddressChangeModal, {}) }),
        /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsx(LogoChangeModal, {}) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, xs: 6, md: 6, xl: 6, children: /* @__PURE__ */ jsxRuntime.jsxs(ui.Container, { children: [
      /* @__PURE__ */ jsxRuntime.jsxs(material.Grid, { container: true, direction: "column", children: [
        /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Heading, { level: "h1", children: "Invoice" }) }),
        /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Text, { size: "small", children: "Change settings how invoices are generated" }) })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { container: true, marginTop: 5, direction: "row", columnSpacing: 2, children: /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsx(InvoiceSettingsModal, {}) }) })
    ] }) })
  ] });
};
const HEIGHT = 330;
const ProTab = () => {
  return /* @__PURE__ */ jsxRuntime.jsxs(material.Grid, { container: true, spacing: 2, justifyContent: "center", children: [
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { container: true, justifyContent: "center", marginTop: 6, children: /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Heading, { level: "h1", style: { color: "purple" }, children: "Manage documents on the next level" }) }) }),
    /* @__PURE__ */ jsxRuntime.jsxs(material.Grid, { container: true, justifyContent: "center", marginTop: 1, spacing: 5, children: [
      /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, xs: 3, md: 3, xl: 3, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Container, { style: { borderColor: "purple", borderWidth: 1, height: HEIGHT }, children: /* @__PURE__ */ jsxRuntime.jsxs(material.Grid, { container: true, rowSpacing: 3, children: [
        /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Heading, { level: "h1", children: "Automation" }) }),
        /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsxs("ul", { style: { listStyleType: "circle" }, children: [
          /* @__PURE__ */ jsxRuntime.jsx("li", { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Text, { children: "Automatically send invoices to customers" }) }),
          /* @__PURE__ */ jsxRuntime.jsx("li", { style: { marginTop: 3 }, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Text, { children: "Automatically send packing slips to fulfillment providers" }) }),
          /* @__PURE__ */ jsxRuntime.jsx("li", { style: { marginTop: 3 }, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Text, { children: "Automatically detect the language of your customer" }) })
        ] }) })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, xs: 3, md: 3, xl: 3, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Container, { style: { borderColor: "purple", borderWidth: 1, height: HEIGHT }, children: /* @__PURE__ */ jsxRuntime.jsxs(material.Grid, { container: true, rowSpacing: 3, children: [
        /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Heading, { level: "h1", children: "New templates" }) }),
        /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsxs("ul", { style: { listStyleType: "circle" }, children: [
          /* @__PURE__ */ jsxRuntime.jsx("li", { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Text, { children: "Access new premium templates for invoices and other documents" }) }),
          /* @__PURE__ */ jsxRuntime.jsx("li", { style: { marginTop: 3 }, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Text, { children: "Send us your custom template, and we will create it for you" }) })
        ] }) })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, xs: 3, md: 3, xl: 3, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Container, { style: { borderColor: "purple", borderWidth: 1, height: HEIGHT }, children: /* @__PURE__ */ jsxRuntime.jsxs(material.Grid, { container: true, rowSpacing: 3, children: [
        /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Heading, { level: "h1", children: "Advanced configuration" }) }),
        /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsxs("ul", { style: { listStyleType: "circle" }, children: [
          /* @__PURE__ */ jsxRuntime.jsx("li", { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Text, { children: "Set different addresses for various document types" }) }),
          /* @__PURE__ */ jsxRuntime.jsx("li", { style: { marginTop: 3 }, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Text, { children: "Customize settings for sending invoices to customers" }) }),
          /* @__PURE__ */ jsxRuntime.jsx("li", { style: { marginTop: 3 }, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Text, { children: "Tailor settings for sending packing slips to fulfillment providers" }) })
        ] }) })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, xs: 3, md: 3, xl: 3, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Container, { style: { borderColor: "purple", borderWidth: 1, height: HEIGHT }, children: /* @__PURE__ */ jsxRuntime.jsxs(material.Grid, { container: true, rowSpacing: 3, children: [
        /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Heading, { level: "h1", children: "Professional support" }) }),
        /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsxs("ul", { style: { listStyleType: "circle" }, children: [
          /* @__PURE__ */ jsxRuntime.jsx("li", { children: /* @__PURE__ */ jsxRuntime.jsx(ui.Text, { children: "Priority bug resolution" }) }),
          /* @__PURE__ */ jsxRuntime.jsx("li", { style: { marginTop: 3 }, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Text, { children: "Dedicated channel for evaluating your feature requests" }) }),
          /* @__PURE__ */ jsxRuntime.jsx("li", { style: { marginTop: 3 }, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Text, { children: "Long-term cooperation, including support for other plugins" }) })
        ] }) })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { container: true, spacing: 3, direction: "column", alignContent: "center", marginTop: 6, children: /* @__PURE__ */ jsxRuntime.jsxs(material.Grid, { container: true, direction: "row", justifyContent: "center", columnSpacing: 1, children: [
      /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Heading, { level: "h1", color: "purple", children: "Contact:" }) }),
      /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsx(material.Link, { href: "mailto:labs@rsoftcon.com", children: /* @__PURE__ */ jsxRuntime.jsx(ui.Heading, { level: "h1", color: "purple", children: "labs@rsoftcon.com" }) }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { container: true, spacing: 3, direction: "column", alignContent: "center", marginTop: 6, children: /* @__PURE__ */ jsxRuntime.jsxs(material.Grid, { container: true, direction: "row", justifyContent: "center", columnSpacing: 1, children: [
      /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsx(ui.Text, { children: "You can hide this tab if you feel it is intruisive. See:" }) }),
      /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { item: true, children: /* @__PURE__ */ jsxRuntime.jsx(material.Link, { href: "https://github.com/RSC-Labs/medusa-documents?tab=readme-ov-file#hide-pro-version-tab", children: /* @__PURE__ */ jsxRuntime.jsx(ui.Text, { children: "How to hide this tab?" }) }) })
    ] }) })
  ] });
};
const DocumentsPage = () => {
  console.log(void 0);
  return /* @__PURE__ */ jsxRuntime.jsxs(ui.Tabs, { defaultValue: "orders", children: [
    /* @__PURE__ */ jsxRuntime.jsx(ui.Toaster, { position: "top-right" }),
    /* @__PURE__ */ jsxRuntime.jsxs(ui.Tabs.List, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(ui.Tabs.Trigger, { value: "orders", children: "Orders" }),
      /* @__PURE__ */ jsxRuntime.jsx(ui.Tabs.Trigger, { value: "templates", children: "Templates" }),
      /* @__PURE__ */ jsxRuntime.jsx(ui.Tabs.Trigger, { value: "settings", children: "Settings" }),
      /* @__PURE__ */ jsxRuntime.jsx(material.Grid, { container: true, justifyContent: "end", children: /* @__PURE__ */ jsxRuntime.jsx(ui.Tabs.Trigger, { value: "pro", style: { color: "purple" }, children: "Pro version" }) })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(ui.Tabs.Content, { value: "orders", children: [
      /* @__PURE__ */ jsxRuntime.jsx(material.Box, { height: 20 }),
      /* @__PURE__ */ jsxRuntime.jsx(OrdersTab, {})
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(ui.Tabs.Content, { value: "templates", children: [
      /* @__PURE__ */ jsxRuntime.jsx(material.Box, { height: 20 }),
      /* @__PURE__ */ jsxRuntime.jsx(TemplatesTab, {})
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(ui.Tabs.Content, { value: "settings", children: [
      /* @__PURE__ */ jsxRuntime.jsx(material.Box, { height: 20 }),
      /* @__PURE__ */ jsxRuntime.jsx(SettingsTab, {})
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(ui.Tabs.Content, { value: "pro", children: [
      /* @__PURE__ */ jsxRuntime.jsx(material.Box, { height: 20 }),
      /* @__PURE__ */ jsxRuntime.jsx(ProTab, {})
    ] })
  ] });
};
const config = adminSdk.defineRouteConfig({
  label: "Invoices",
  icon: icons.DocumentText
});
const widgetModule = { widgets: [] };
const routeModule = {
  routes: [
    {
      Component: DocumentsPage,
      path: "/documents"
    }
  ]
};
const menuItemModule = {
  menuItems: [
    {
      label: config.label,
      icon: config.icon,
      path: "/documents",
      nested: void 0,
      rank: void 0,
      translationNs: void 0
    }
  ]
};
const formModule = { customFields: {} };
const displayModule = {
  displays: {}
};
const i18nModule = { resources: {} };
const plugin = {
  widgetModule,
  routeModule,
  menuItemModule,
  formModule,
  displayModule,
  i18nModule
};
module.exports = plugin;
