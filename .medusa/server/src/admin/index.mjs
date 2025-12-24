import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import React, { useState, useEffect, useMemo, useReducer, useRef, useCallback } from "react";
import { defineRouteConfig } from "@medusajs/admin-sdk";
import { toast, DropdownMenu, IconButton, TooltipProvider, Tooltip, Text, StatusBadge, Table, Container, Alert, Heading, Button, RadioGroup, Label, Tabs, FocusModal, Input, Toaster } from "@medusajs/ui";
import { FlyingBox, EllipsisHorizontal, InformationCircle, DocumentText } from "@medusajs/icons";
import { Grid, CircularProgress, Link, Box } from "@mui/material";
import clsx from "clsx";
import { useLocation } from "react-router-dom";
import { useTable, usePagination } from "react-table";
import moment from "moment";
import { useForm } from "react-hook-form";
const GenerateInvoiceDropdownButton = ({ order, updateInvoiceNumber }) => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(void 0);
  useEffect(() => {
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
        toast.error("Invoice", {
          description: `Problem happened when generating invoice. ${responseJson.message}`
        });
      } else {
        if (responseJson.buffer) {
          updateInvoiceNumber(order.id, responseJson.invoice.displayNumber);
          const anyBuffer = responseJson.buffer;
          const blob = new Blob([new Uint8Array(anyBuffer.data)], { type: "application/pdf" });
          toast.dismiss();
          const pdfURL = URL.createObjectURL(blob);
          window.open(pdfURL, "_blank");
        } else {
          toast.dismiss();
          toast.error("Invoice", {
            description: "Problem happened when generating invoice"
          });
        }
      }
      setLoading(false);
    }).catch((error2) => {
      var _a, _b;
      console.error(error2);
      toast.dismiss();
      const trueError = error2;
      toast.error("Invoice", {
        description: (_b = (_a = trueError == null ? void 0 : trueError.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message
      });
    });
  }, [isLoading]);
  return /* @__PURE__ */ jsxs(DropdownMenu.Item, { className: "gap-x-2", onClick: () => setLoading(true), children: [
    /* @__PURE__ */ jsx(FlyingBox, {}),
    "Generate new invoice"
  ] });
};
const GeneratePackingSlipDropdownButton = ({ order, updatePackingSlipNumber }) => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(void 0);
  useEffect(() => {
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
        toast.error("Packing slip", {
          description: `Problem happened when generating packing slip. ${responseJson.message}`
        });
      } else {
        if (responseJson.buffer) {
          updatePackingSlipNumber(order.id, responseJson.packingSlip.displayNumber);
          const anyBuffer = responseJson.buffer;
          const blob = new Blob([new Uint8Array(anyBuffer.data)], { type: "application/pdf" });
          toast.dismiss();
          const pdfURL = URL.createObjectURL(blob);
          window.open(pdfURL, "_blank");
        } else {
          toast.dismiss();
          toast.error("Packing slip", {
            description: "Problem happened when generating packing slip"
          });
        }
      }
      setLoading(false);
    }).catch((error2) => {
      var _a, _b;
      console.error(error2);
      toast.dismiss();
      const trueError = error2;
      toast.error("Packing slip", {
        description: (_b = (_a = trueError == null ? void 0 : trueError.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message
      });
    });
  }, [isLoading]);
  return /* @__PURE__ */ jsxs(DropdownMenu.Item, { className: "gap-x-2", onClick: () => setLoading(true), children: [
    /* @__PURE__ */ jsx(FlyingBox, {}),
    "Generate new packing slip"
  ] });
};
function ActionsDropdown({ order, updateInvoiceNumber, updatePackingSlipNumber }) {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsx(DropdownMenu.Trigger, { asChild: true, children: /* @__PURE__ */ jsx(IconButton, { children: /* @__PURE__ */ jsx(EllipsisHorizontal, {}) }) }),
    /* @__PURE__ */ jsxs(DropdownMenu.Content, { children: [
      /* @__PURE__ */ jsx(GenerateInvoiceDropdownButton, { order, updateInvoiceNumber }),
      /* @__PURE__ */ jsx(DropdownMenu.Separator, {}),
      /* @__PURE__ */ jsx(GeneratePackingSlipDropdownButton, { order, updatePackingSlipNumber })
    ] })
  ] }) });
}
const InvoiceNumberFromOrder = ({ orderId, invoiceNumber }) => {
  const [data, setData] = useState(void 0);
  const [error, setError] = useState(void 0);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const handleClick = async () => {
    toast.loading("Invoice", {
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
        toast.dismiss();
        openPdf(result3);
      } else {
        toast.dismiss();
        toast.error("Invoice", {
          description: "Problem happened when preparing invoice"
        });
      }
    }).catch((error2) => {
      setError(error2);
      console.error(error2);
      toast.dismiss();
      toast.error("Invoice", {
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
  useEffect(() => {
    setLoading(true);
  }, [invoiceNumber]);
  useEffect(() => {
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
    return /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(CircularProgress, { size: 8 }) });
  }
  if (data && data.invoice) {
    return /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(
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
    return /* @__PURE__ */ jsx(Fragment, {});
  }
};
const PackingSlipNumber = ({ orderId, packingSlipNumber }) => {
  const [data, setData] = useState(void 0);
  const [error, setError] = useState(void 0);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const handleClick = async () => {
    toast.loading("Packing slip", {
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
        toast.dismiss();
        openPdf(result3);
      } else {
        toast.dismiss();
        toast.error("Packing slip", {
          description: "Problem happened when preparing packing slip"
        });
      }
    }).catch((error2) => {
      setError(error2);
      console.error(error2);
      toast.dismiss();
      toast.error("Packing slip", {
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
  useEffect(() => {
    setLoading(true);
  }, [packingSlipNumber]);
  useEffect(() => {
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
    return /* @__PURE__ */ jsx(CircularProgress, { size: 8 });
  }
  if (data && data.packingSlip) {
    return /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(
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
    return /* @__PURE__ */ jsx(Fragment, {});
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
  const [documentNumbers, setDocumentNumbers] = useState({});
  const decideStatus = (status) => {
    switch (status) {
      case "captured":
        return /* @__PURE__ */ jsx(StatusBadge, { color: "green", children: "Paid" });
      case "awaiting":
        return /* @__PURE__ */ jsx(StatusBadge, { color: "grey", children: "Awaiting" });
      case "requires_action":
        return /* @__PURE__ */ jsx(StatusBadge, { color: "red", children: "Requires action" });
      case "canceled":
        return /* @__PURE__ */ jsx(StatusBadge, { color: "orange", children: "Canceled" });
      default:
        return /* @__PURE__ */ jsx(StatusBadge, { color: "purple", children: "N/A" });
    }
  };
  const decideFullfillmentStatus = (status) => {
    switch (status) {
      case "not_fulfilled":
        return /* @__PURE__ */ jsx(StatusBadge, { color: "grey", children: "Not fulfilled" });
      case "partially_fulfilled":
        return /* @__PURE__ */ jsx(StatusBadge, { color: "blue", children: "Partially fulfilled" });
      case "fulfilled":
        return /* @__PURE__ */ jsx(StatusBadge, { color: "green", children: "Fulfilled" });
      case "partially_shipped":
        return /* @__PURE__ */ jsx(StatusBadge, { color: "blue", children: "Partially shipped" });
      case "shipped":
        return /* @__PURE__ */ jsx(StatusBadge, { color: "green", children: "Shipped" });
      case "partially_returned":
        return /* @__PURE__ */ jsx(StatusBadge, { color: "blue", children: "Partially returned" });
      case "returned":
        return /* @__PURE__ */ jsx(StatusBadge, { color: "green", children: "Returned" });
      case "canceled":
        return /* @__PURE__ */ jsx(StatusBadge, { color: "red", children: "Canceled" });
      case "requires_action":
        return /* @__PURE__ */ jsx(StatusBadge, { color: "purple", children: "Requires action" });
      default:
        return /* @__PURE__ */ jsx(StatusBadge, { color: "grey", children: "N/A" });
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
  const columns = useMemo(
    () => [
      {
        Header: /* @__PURE__ */ jsx("div", { className: "pl-2", children: "Order" }),
        accessor: "display_id",
        Cell: ({ cell: { value } }) => /* @__PURE__ */ jsx("p", { className: "text-grey-90 group-hover:text-violet-60 pl-2", children: `#${value}` })
      },
      {
        Header: "Date added",
        accessor: "created_at",
        Cell: ({ cell: { value } }) => {
          return /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsx(Tooltip, { content: /* @__PURE__ */ jsx(Text, { children: moment(value).format("DD MMM YYYY hh:mm a") }), children: /* @__PURE__ */ jsx("p", { className: "text-grey-90 group-hover:text-violet-60 min-w-[40px]", children: moment(value).format("DD MMM YYYY") }) }) });
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
          return /* @__PURE__ */ jsx("p", { className: "text-grey-90 group-hover:text-violet-60 min-w-[100px]", children: `${customer.first_name || customer.last_name ? `${customer.first_name} ${customer.last_name}` : customer.email ? customer.email : "-"}` });
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
        Header: () => /* @__PURE__ */ jsx("div", { className: "text-right", children: "Total" }),
        accessor: "total",
        Cell: ({ row, cell: { value } }) => /* @__PURE__ */ jsx("div", { className: "text-grey-90 group-hover:text-violet-60 text-right", children: formatAmountWithSymbol({
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
          return /* @__PURE__ */ jsx("p", { className: "text-grey-90 group-hover:text-violet-60 pl-2", children: /* @__PURE__ */ jsxs(Grid, { container: true, justifyContent: "flex-start", direction: "column", spacing: 1, children: [
            /* @__PURE__ */ jsx(
              InvoiceNumberFromOrder,
              {
                orderId,
                invoiceNumber: currentDocumentNumbers ? currentDocumentNumbers.invoiceNumber : void 0
              }
            ),
            /* @__PURE__ */ jsx(
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
        Header: () => /* @__PURE__ */ jsxs(Grid, { container: true, justifyContent: "flex-end", alignItems: "flex-end", spacing: 1, children: [
          /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsx(Tooltip, { content: /* @__PURE__ */ jsxs(Grid, { item: true, children: [
            /* @__PURE__ */ jsx(Text, { size: "small", children: "We do not store documents. " }),
            /* @__PURE__ */ jsx(Link, { fontSize: 12, href: "https://github.com/RSC-Labs/medusa-documents?tab=readme-ov-file#what-means-we-do-not-store-documents", children: "Learn more what it means." })
          ] }), children: /* @__PURE__ */ jsx(InformationCircle, {}) }) }) }),
          /* @__PURE__ */ jsx(Grid, { item: true, children: "Actions" })
        ] }),
        id: "actions",
        Cell: ({ row }) => {
          return /* @__PURE__ */ jsx(Grid, { container: true, justifyContent: "flex-end", children: /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(
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
  const result = moment(date);
  if (!moment.isMoment(result)) {
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
  let date = moment();
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
  const initial = useMemo(
    () => parseQueryString(defaultFilters),
    [defaultFilters]
  );
  const [state, dispatch] = useReducer(reducer, initial);
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
  const queryObject = useMemo(() => getQueryObject(), [state]);
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
const OrderTable = ({ setContextFilters, searchQuery }) => {
  useLocation();
  const [ordersResult, setOrdersResult] = useState(void 0);
  const [isLoading, setLoading] = useState(true);
  const debounceTimerRef = useRef(null);
  const isInitialMount = useRef(true);
  let hiddenColumns = ["sales_channel"];
  const {
    paginate,
    queryObject
  } = useOrderFilters(defaultQueryProps);
  const offs = 0;
  const lim = DEFAULT_PAGE_SIZE;
  const [numPages, setNumPages] = useState(0);
  const fetchOrders = useCallback((searchValue) => {
    setLoading(true);
    const queryParams = new URLSearchParams({
      order: "-created_at",
      fields: "id,status,display_id,created_at,email,fulfillment_status,payment_status,total,currency_code,metadata,items,*customer"
    });
    if (searchValue && searchValue.trim()) {
      const trimmedSearch = searchValue.trim();
      queryParams.append("q", trimmedSearch);
    }
    fetch(`/admin/orders?${queryParams.toString()}`, {
      credentials: "include"
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    }).then((result) => {
      const finalResult = {
        orders: (result == null ? void 0 : result.orders) || [],
        count: (result == null ? void 0 : result.count) || 0,
        limit: (result == null ? void 0 : result.limit) || DEFAULT_PAGE_SIZE,
        offset: (result == null ? void 0 : result.offset) || 0
      };
      setOrdersResult(finalResult);
      setLoading(false);
    }).catch((error) => {
      console.error("Error fetching orders:", error);
      if (searchValue && searchValue.trim()) {
        setOrdersResult({ orders: [], count: 0, limit: DEFAULT_PAGE_SIZE, offset: 0 });
      }
      setLoading(false);
    });
  }, []);
  useEffect(() => {
    fetchOrders();
    isInitialMount.current = false;
  }, [fetchOrders]);
  useEffect(() => {
    if (isInitialMount.current) {
      return;
    }
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    if (!searchQuery || searchQuery.trim() === "") {
      fetchOrders(void 0);
      return;
    }
    debounceTimerRef.current = setTimeout(() => {
      fetchOrders(searchQuery);
    }, 300);
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchQuery, fetchOrders]);
  useEffect(() => {
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
  } = useTable(
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
    usePagination
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
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      Table,
      {
        ...getTableProps(),
        className: clsx({ ["relative"]: isLoading }),
        children: [
          /* @__PURE__ */ jsx(Table.Header, { children: headerGroups == null ? void 0 : headerGroups.map((headerGroup) => /* @__PURE__ */ jsx(Table.Row, { ...headerGroup.getHeaderGroupProps(), children: headerGroup.headers.map((col) => /* @__PURE__ */ jsx(Table.HeaderCell, { ...col.getHeaderProps(), children: col.render("Header") })) })) }),
          /* @__PURE__ */ jsxs(Table.Body, { ...getTableBodyProps(), children: [
            rows.map((row) => {
              prepareRow(row);
              return /* @__PURE__ */ jsx(
                Table.Row,
                {
                  color: "inherit",
                  linkTo: row.original.id,
                  ...row.getRowProps(),
                  className: "group",
                  children: row.cells.map((cell) => {
                    return /* @__PURE__ */ jsx(Table.Cell, { ...cell.getCellProps(), className: "inter-small-regular h-[40px]", children: cell.render("Cell") });
                  })
                }
              );
            }),
            !isLoading && rows.length === 0 && /* @__PURE__ */ jsx(Table.Row, { children: /* @__PURE__ */ jsx(Table.Cell, { className: "text-center py-8", children: searchQuery && searchQuery.trim() ? `No orders found matching "${searchQuery}"` : "No orders found" }) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      Table.Pagination,
      {
        count: ordersResult ? ordersResult.count : 0,
        pageSize: queryObject.offset + rows.length,
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
const OrderTable$1 = React.memo(OrderTable);
const OrdersTab = ({ searchQuery }) => {
  const [contextFilters, setContextFilters] = useState();
  return /* @__PURE__ */ jsx(Grid, { container: true, spacing: 2, children: /* @__PURE__ */ jsx(Grid, { item: true, xs: 12, md: 12, xl: 12, children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx(OrderTable$1, { setContextFilters, searchQuery }) }) }) });
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
  const [data, setData] = useState(void 0);
  const [error, setError] = useState(void 0);
  const [isLoading, setLoading] = useState(true);
  const [lastKind, setLastKind] = useState(kind);
  useEffect(() => {
    if (lastKind !== kind) {
      setLastKind(kind);
      if (!isLoading) {
        setLoading(true);
      }
    }
  }, [kind]);
  useEffect(() => {
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
        toast.dismiss();
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
    return /* @__PURE__ */ jsx(Grid, { container: true, justifyContent: "center", children: /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(CircularProgress, { size: 12 }) }) });
  }
  if (error) {
    const trueError = error;
    if (((_b = (_a = trueError.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || trueError.message) {
      if (trueError.message) {
        return /* @__PURE__ */ jsx(Alert, { variant: "error", children: trueError.message });
      }
      return /* @__PURE__ */ jsx(Alert, { variant: "error", children: trueError.response.data.message });
    } else {
      return /* @__PURE__ */ jsx(Alert, { variant: "error", children: "Preview can't be generated" });
    }
  }
  if (data && data.buffer) {
    const anyBuffer = data.buffer;
    const blob = new Blob([new Uint8Array(anyBuffer.data)], { type: "application/pdf" });
    const pdfURL = URL.createObjectURL(blob);
    return /* @__PURE__ */ jsx("iframe", { src: pdfURL, width: 660, height: 1e3 });
  } else {
    return /* @__PURE__ */ jsx(Alert, { variant: "error", children: "Preview can't be generated" });
  }
};
const ChooseTemplate$1 = (props) => {
  const handleChange = (checked) => {
    props.setKind(checked);
  };
  return /* @__PURE__ */ jsxs(RadioGroup, { onValueChange: handleChange, defaultValue: props.lastKind.toString(), children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-x-3", children: [
      /* @__PURE__ */ jsx(RadioGroup.Item, { value: InvoiceTemplateKind.BASIC.toString(), id: InvoiceTemplateKind.BASIC.toString() }),
      /* @__PURE__ */ jsx(Label, { htmlFor: "radio_1", weight: "plus", children: "Basic" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-x-3", children: [
      /* @__PURE__ */ jsx(RadioGroup.Item, { value: InvoiceTemplateKind.BASIC_LOGO.toString(), id: InvoiceTemplateKind.BASIC_LOGO.toString() }),
      /* @__PURE__ */ jsx(Label, { htmlFor: "radio_1", weight: "plus", children: "Basic with logo" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-x-3", children: [
      /* @__PURE__ */ jsx(RadioGroup.Item, { value: InvoiceTemplateKind.MUSAFIR_LOGO.toString(), id: InvoiceTemplateKind.MUSAFIR_LOGO.toString() }),
      /* @__PURE__ */ jsx(Label, { htmlFor: "radio_1", weight: "plus", children: "Musafir with Logo" })
    ] })
  ] });
};
const TemplatesTabContent$1 = ({ lastKind }) => {
  const [templateKind, setTemplateKind] = useState(lastKind !== void 0 && lastKind !== null ? lastKind : InvoiceTemplateKind.BASIC);
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
        toast.success("Template", {
          description: "New template saved"
        });
      } else {
        const error = await response.json();
        toast.error("Template", {
          description: `New template cannot be saved, some error happened. ${error.message}`
        });
      }
    }).catch((e) => {
      toast.error("Template", {
        description: `New template cannot be saved, some error happened. ${e.toString()}`
      });
      console.error(e);
    });
  };
  return /* @__PURE__ */ jsxs(Grid, { container: true, spacing: 2, children: [
    /* @__PURE__ */ jsx(Grid, { item: true, xs: 3, md: 3, xl: 3, children: /* @__PURE__ */ jsxs(Grid, { container: true, rowSpacing: 3, children: [
      /* @__PURE__ */ jsx(Grid, { item: true, xs: 12, md: 12, xl: 12, children: /* @__PURE__ */ jsx(Alert, { children: "Preview is based on the last order" }) }),
      /* @__PURE__ */ jsx(Grid, { item: true, xs: 12, md: 12, xl: 12, children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs(Grid, { container: true, rowSpacing: 3, direction: "column", children: [
        /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(Heading, { level: "h1", children: "Choose template" }) }),
        /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(ChooseTemplate$1, { lastKind: templateKind, setKind: setTemplateKind }) }),
        /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(Button, { variant: "primary", onClick: onSubmit, children: "Save" }) })
      ] }) }) })
    ] }) }),
    /* @__PURE__ */ jsx(Grid, { item: true, xs: 6, md: 6, xl: 6, children: /* @__PURE__ */ jsx(ViewExampleInvoice, { kind: templateKind }) })
  ] });
};
const InvoiceTemplatesTab = () => {
  var _a;
  const [data, setData] = useState(void 0);
  const [error, setError] = useState(void 0);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
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
    return /* @__PURE__ */ jsx(CircularProgress, { size: 12 });
  }
  return /* @__PURE__ */ jsx(TemplatesTabContent$1, { lastKind: (_a = data == null ? void 0 : data.settings) == null ? void 0 : _a.template });
};
const ViewExample = ({ kind }) => {
  var _a, _b;
  const [data, setData] = useState(void 0);
  const [error, setError] = useState(void 0);
  const [isLoading, setLoading] = useState(true);
  const [lastKind, setLastKind] = useState(kind);
  useEffect(() => {
    if (lastKind !== kind) {
      setLastKind(kind);
      if (!isLoading) {
        setLoading(true);
      }
    }
  }, [kind]);
  useEffect(() => {
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
        toast.dismiss();
        setData(result2);
      }
      setLoading(false);
    }).catch((error2) => {
      setError(error2);
      console.error(error2);
    });
  }, [isLoading]);
  if (isLoading) {
    return /* @__PURE__ */ jsx(Grid, { container: true, justifyContent: "center", children: /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(CircularProgress, { size: 12 }) }) });
  }
  if (error) {
    const trueError = error;
    if (((_b = (_a = trueError.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || trueError.message) {
      if (trueError.message) {
        return /* @__PURE__ */ jsx(Alert, { variant: "error", children: trueError.message });
      }
      return /* @__PURE__ */ jsx(Alert, { variant: "error", children: trueError.response.data.message });
    } else {
      return /* @__PURE__ */ jsx(Alert, { variant: "error", children: "Preview can't be generated" });
    }
  }
  if (data && data.buffer) {
    const anyBuffer = data.buffer;
    const blob = new Blob([new Uint8Array(anyBuffer.data)], { type: "application/pdf" });
    const pdfURL = URL.createObjectURL(blob);
    return /* @__PURE__ */ jsx("iframe", { src: pdfURL, width: 660, height: 1e3 });
  } else {
    return /* @__PURE__ */ jsx(Alert, { variant: "error", children: "Preview can't be generated" });
  }
};
const ChooseTemplate = (props) => {
  const handleChange = (checked) => {
    props.setKind(checked);
  };
  return /* @__PURE__ */ jsxs(RadioGroup, { onValueChange: handleChange, defaultValue: props.lastKind.toString(), children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-x-3", children: [
      /* @__PURE__ */ jsx(RadioGroup.Item, { value: PackingSlipTemplateKind.BASIC.toString(), id: PackingSlipTemplateKind.BASIC.toString() }),
      /* @__PURE__ */ jsx(Label, { htmlFor: "radio_1", weight: "plus", children: "Basic" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-x-3", children: [
      /* @__PURE__ */ jsx(RadioGroup.Item, { value: PackingSlipTemplateKind.BASIC_SMALL.toString(), id: PackingSlipTemplateKind.BASIC_SMALL.toString() }),
      /* @__PURE__ */ jsx(Label, { htmlFor: "radio_1", weight: "plus", children: "Basic A7" })
    ] })
  ] });
};
const TemplatesTabContent = ({ lastKind }) => {
  const [templateKind, setTemplateKind] = useState(lastKind !== void 0 && lastKind !== null ? lastKind : PackingSlipTemplateKind.BASIC);
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
        toast.success("Template", {
          description: "New template saved"
        });
      } else {
        const error = await response.json();
        toast.error("Template", {
          description: `New template cannot be saved, some error happened. ${error.message}`
        });
      }
    }).catch((e) => {
      toast.error("Template", {
        description: `New template cannot be saved, some error happened. ${e.toString()}`
      });
      console.error(e);
    });
  };
  return /* @__PURE__ */ jsxs(Grid, { container: true, spacing: 2, children: [
    /* @__PURE__ */ jsx(Grid, { item: true, xs: 3, md: 3, xl: 3, children: /* @__PURE__ */ jsxs(Grid, { container: true, rowSpacing: 3, children: [
      /* @__PURE__ */ jsx(Grid, { item: true, xs: 12, md: 12, xl: 12, children: /* @__PURE__ */ jsx(Alert, { children: "Preview is based on the last order" }) }),
      /* @__PURE__ */ jsx(Grid, { item: true, xs: 12, md: 12, xl: 12, children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs(Grid, { container: true, rowSpacing: 3, direction: "column", children: [
        /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(Heading, { level: "h1", children: "Choose template" }) }),
        /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(ChooseTemplate, { lastKind: templateKind, setKind: setTemplateKind }) }),
        /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(Button, { variant: "primary", onClick: onSubmit, children: "Save" }) })
      ] }) }) })
    ] }) }),
    /* @__PURE__ */ jsx(Grid, { item: true, xs: 6, md: 6, xl: 6, children: /* @__PURE__ */ jsx(ViewExample, { kind: templateKind }) })
  ] });
};
const PackingSlipTemplatesTab = () => {
  var _a;
  const [data, setData] = useState(void 0);
  const [error, setError] = useState(void 0);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
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
    return /* @__PURE__ */ jsx(CircularProgress, { size: 12 });
  }
  return /* @__PURE__ */ jsx(TemplatesTabContent, { lastKind: (_a = data == null ? void 0 : data.settings) == null ? void 0 : _a.template });
};
const TemplatesTab = () => {
  return /* @__PURE__ */ jsxs(Tabs, { defaultValue: "invoice", children: [
    /* @__PURE__ */ jsxs(Tabs.List, { children: [
      /* @__PURE__ */ jsx(Tabs.Trigger, { value: "invoice", children: "Invoice" }),
      /* @__PURE__ */ jsx(Tabs.Trigger, { value: "packing-slip", children: "Packing slip" })
    ] }),
    /* @__PURE__ */ jsxs(Tabs.Content, { value: "invoice", children: [
      /* @__PURE__ */ jsx(Box, { height: 20 }),
      /* @__PURE__ */ jsx(InvoiceTemplatesTab, {})
    ] }),
    /* @__PURE__ */ jsxs(Tabs.Content, { value: "packing-slip", children: [
      /* @__PURE__ */ jsx(Box, { height: 20 }),
      /* @__PURE__ */ jsx(PackingSlipTemplatesTab, {})
    ] })
  ] });
};
const AddressField = ({ name, placeholder, initValue, register }) => {
  return /* @__PURE__ */ jsxs(Grid, { container: true, direction: "column", spacing: 1, marginTop: 2, children: [
    /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(Label, { size: "small", children: name }) }),
    /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(
      Input,
      {
        placeholder,
        ...register,
        defaultValue: initValue
      }
    ) })
  ] });
};
const AddressForm = ({ address, setOpenModal }) => {
  const { register, handleSubmit } = useForm();
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
        toast.success("Address", {
          description: "New address saved"
        });
        setOpenModal(false);
      } else {
        const error = await response.json();
        toast.error("Address", {
          description: `Address cannot be saved. ${error.message}`
        });
      }
    }).catch((e) => {
      toast.error("Address", {
        description: `Address cannot be saved. ${e.toString()}`
      });
      console.error(e);
    });
  };
  return /* @__PURE__ */ jsx("form", { children: /* @__PURE__ */ jsxs(Grid, { container: true, direction: "column", rowSpacing: 4, paddingTop: 8, children: [
    /* @__PURE__ */ jsx(
      AddressField,
      {
        name: "Company name",
        placeholder: "My store",
        register: register("company"),
        initValue: address == null ? void 0 : address.company
      }
    ),
    /* @__PURE__ */ jsx(
      AddressField,
      {
        name: "First name",
        placeholder: "John",
        register: register("first_name"),
        initValue: address == null ? void 0 : address.first_name
      }
    ),
    /* @__PURE__ */ jsx(
      AddressField,
      {
        name: "Last name",
        placeholder: "Doe",
        register: register("last_name"),
        initValue: address == null ? void 0 : address.last_name
      }
    ),
    /* @__PURE__ */ jsx(
      AddressField,
      {
        name: "Address",
        placeholder: "56 Street",
        register: register("address_1"),
        initValue: address == null ? void 0 : address.address_1
      }
    ),
    /* @__PURE__ */ jsx(
      AddressField,
      {
        name: "City",
        placeholder: "Warsaw",
        register: register("city"),
        initValue: address == null ? void 0 : address.city
      }
    ),
    /* @__PURE__ */ jsx(
      AddressField,
      {
        name: "Postal code",
        placeholder: "55-200",
        register: register("postal_code"),
        initValue: address == null ? void 0 : address.postal_code
      }
    ),
    /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(
      Button,
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
  const [data, setData] = useState(void 0);
  const [error, setError] = useState(void 0);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
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
    return /* @__PURE__ */ jsx(FocusModal.Body, { children: /* @__PURE__ */ jsx(CircularProgress, {}) });
  }
  return /* @__PURE__ */ jsx(FocusModal.Body, { children: /* @__PURE__ */ jsxs(Grid, { container: true, direction: "column", alignContent: "center", paddingTop: 8, children: [
    /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(Heading, { children: "Store address" }) }),
    /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(Text, { children: "This address will be used on your documents." }) }),
    /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(Text, { children: "Presence of field on document depends on template." }) }),
    /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(AddressForm, { address: (_a = data == null ? void 0 : data.settings) == null ? void 0 : _a.storeAddress, setOpenModal }) })
  ] }) });
};
const AddressChangeModal = () => {
  const [open, setOpen] = useState(false);
  return /* @__PURE__ */ jsxs(
    FocusModal,
    {
      open,
      onOpenChange: setOpen,
      children: [
        /* @__PURE__ */ jsx(FocusModal.Trigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { children: "Change address" }) }),
        /* @__PURE__ */ jsxs(FocusModal.Content, { children: [
          /* @__PURE__ */ jsx(FocusModal.Header, {}),
          /* @__PURE__ */ jsx(AddressModalDetails, { setOpenModal: setOpen })
        ] })
      ]
    }
  );
};
const LogoFields = ({ logoSource, register }) => {
  const [logoUrl, setLogoUrl] = useState(logoSource);
  const [isValidUrl, setIsValidUrl] = useState(true);
  const [imgLoaded, setIsImageLoaded] = useState(false);
  const [error, setError] = useState(void 0);
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
  return /* @__PURE__ */ jsxs(Grid, { container: true, direction: "column", spacing: 1, children: [
    /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(Label, { size: "small", children: "Link to logo" }) }),
    /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(
      Input,
      {
        placeholder: "https://raw.githubusercontent.com/RSC-Labs/medusa-store-analytics/main/docs/store-analytics-logo.PNG",
        ...register,
        defaultValue: logoSource,
        onChange: handleInputChange
      }
    ) }),
    /* @__PURE__ */ jsx(Grid, { container: true, justifyContent: "center", alignContent: "center", marginTop: 5, children: /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx("div", { style: { height: "200px", width: "300px", overflow: "hidden", border: imgLoaded ? void 0 : "1px solid rgba(0, 0, 0, 0.12)" }, children: logoUrl && isValidUrl && /* @__PURE__ */ jsx(Grid, { item: true, textAlign: "center", children: /* @__PURE__ */ jsx("img", { src: logoUrl, alt: "Preview", style: { maxWidth: 300, maxHeight: 200 }, onLoad: handleOnLoad, onError: handleImageError }) }) }) }) })
  ] });
};
const LogoForm = ({ logoSource, setOpenModal }) => {
  const { register, handleSubmit } = useForm();
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
        toast.success("Logo", {
          description: "New logo saved"
        });
        setOpenModal(false);
      } else {
        const error = await response.json();
        toast.error("Logo", {
          description: `Logo cannot be saved, some error happened. ${error.message}`
        });
        toast.error("Invoice settings", {
          description: `New invoice settings cannot be saved, some error happened.`
        });
      }
    }).catch((e) => {
      toast.error("Logo", {
        description: `Logo cannot be saved, some error happened. ${e.toString()}`
      });
      console.error(e);
    });
  };
  return /* @__PURE__ */ jsx("form", { children: /* @__PURE__ */ jsxs(Grid, { container: true, direction: "column", rowSpacing: 4, paddingTop: 8, children: [
    /* @__PURE__ */ jsx(LogoFields, { logoSource, register: register("logoSource") }),
    /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(
      Button,
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
  const [data, setData] = useState(void 0);
  const [error, setError] = useState(void 0);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
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
    return /* @__PURE__ */ jsx(FocusModal.Body, { children: /* @__PURE__ */ jsx(CircularProgress, {}) });
  }
  return /* @__PURE__ */ jsx(FocusModal.Body, { children: /* @__PURE__ */ jsxs(Grid, { container: true, direction: "column", alignContent: "center", paddingTop: 8, children: [
    /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(Heading, { children: "Store logo" }) }),
    /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(Text, { children: "This logo will be used on your documents." }) }),
    /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(Text, { children: "Presence of logo on document depends on template." }) }),
    /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(LogoForm, { logoSource: data.settings && data.settings.storeLogoSource ? data.settings.storeLogoSource : void 0, setOpenModal }) })
  ] }) });
};
const LogoChangeModal = () => {
  const [open, setOpen] = useState(false);
  return /* @__PURE__ */ jsxs(
    FocusModal,
    {
      open,
      onOpenChange: setOpen,
      children: [
        /* @__PURE__ */ jsx(FocusModal.Trigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { children: "Change logo" }) }),
        /* @__PURE__ */ jsxs(FocusModal.Content, { children: [
          /* @__PURE__ */ jsx(FocusModal.Header, {}),
          /* @__PURE__ */ jsx(LogoModalDetails, { setOpenModal: setOpen })
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
  const [data, setData] = useState(void 0);
  const [error, setError] = useState(void 0);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
  }, [formatNumber, forcedNumber]);
  useEffect(() => {
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
    return /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(
      Input,
      {
        readOnly: true
      }
    ) });
  }
  return /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(
    Input,
    {
      defaultValue: data.displayNumber,
      readOnly: true
    },
    `display-number-${data.displayNumber}`
  ) });
};
const InvoiceSettingsForm = ({ invoiceSettings, setOpenModal }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [formatNumber, setFormatNumber] = useState(invoiceSettings == null ? void 0 : invoiceSettings.numberFormat);
  const [forcedNumber, setForcedNumber] = useState(invoiceSettings == null ? void 0 : invoiceSettings.forcedNumber);
  const [error, setError] = useState(void 0);
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
        toast.success("Invoice settings", {
          description: "New invoice settings saved"
        });
        setOpenModal(false);
      } else {
        const error2 = await response.json();
        toast.error("Invoice settings", {
          description: `New invoice settings cannot be saved, some error happened. ${error2.message}`
        });
      }
    }).catch((e) => {
      toast.error("Invoice settings", {
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
  return /* @__PURE__ */ jsx("form", { children: /* @__PURE__ */ jsxs(Grid, { container: true, direction: "column", rowSpacing: 4, paddingTop: 8, children: [
    /* @__PURE__ */ jsxs(Grid, { container: true, direction: "column", spacing: 1, marginTop: 2, children: [
      /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsxs(Grid, { container: true, direction: "column", children: [
        /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(Label, { size: "small", children: "Number format" }) }),
        /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(Label, { size: "xsmall", children: LABEL_MUST_FORMAT }) })
      ] }) }),
      /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(
        Input,
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
    /* @__PURE__ */ jsxs(Grid, { container: true, direction: "column", spacing: 1, marginTop: 2, children: [
      /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsxs(Grid, { container: true, direction: "column", children: [
        /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(Label, { size: "small", children: "Forced number" }) }),
        /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(Label, { size: "xsmall", children: LABEL_INFO_FORCED }) })
      ] }) }),
      /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(
        Input,
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
    /* @__PURE__ */ jsxs(Grid, { container: true, direction: "column", spacing: 1, marginTop: 2, children: [
      /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(Label, { size: "small", children: "Your next invoice number will be:" }) }),
      errors.formatNumber == void 0 && errors.forcedNumber == void 0 && error == void 0 && /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(InvoiceSettingsDisplayNumber, { formatNumber, forcedNumber: forcedNumber !== void 0 && forcedNumber !== null ? parseInt(forcedNumber) : void 0 }) })
    ] }),
    /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(
      Button,
      {
        type: "submit",
        variant: "primary",
        onClick: handleSubmit(onSubmit),
        children: "Save"
      }
    ) }),
    (errors.formatNumber || errors.forcedNumber) && /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(Alert, { variant: "error", children: errorText }) }),
    error && /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(Alert, { variant: "error", children: error }) })
  ] }) });
};
const InvoiceSettingsModalDetails = ({ setOpenModal }) => {
  const [data, setData] = useState(void 0);
  const [error, setError] = useState(void 0);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
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
    return /* @__PURE__ */ jsx(FocusModal.Body, { children: /* @__PURE__ */ jsx(CircularProgress, {}) });
  }
  return /* @__PURE__ */ jsx(FocusModal.Body, { children: /* @__PURE__ */ jsxs(Grid, { container: true, direction: "column", alignContent: "center", paddingTop: 8, children: [
    /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(Heading, { children: "Invoice settings" }) }),
    /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(Text, { children: "These settings will be applied for newly generated invoices." }) }),
    /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(InvoiceSettingsForm, { invoiceSettings: data == null ? void 0 : data.settings, setOpenModal }) })
  ] }) });
};
const InvoiceSettingsModal = () => {
  const [open, setOpen] = useState(false);
  return /* @__PURE__ */ jsxs(
    FocusModal,
    {
      open,
      onOpenChange: setOpen,
      children: [
        /* @__PURE__ */ jsx(FocusModal.Trigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { children: "Change settings" }) }),
        /* @__PURE__ */ jsxs(FocusModal.Content, { children: [
          /* @__PURE__ */ jsx(FocusModal.Header, {}),
          /* @__PURE__ */ jsx(InvoiceSettingsModalDetails, { setOpenModal: setOpen })
        ] })
      ]
    }
  );
};
const SettingsTab = () => {
  return /* @__PURE__ */ jsxs(Grid, { container: true, spacing: 2, children: [
    /* @__PURE__ */ jsx(Grid, { item: true, xs: 6, md: 6, xl: 6, children: /* @__PURE__ */ jsxs(Container, { children: [
      /* @__PURE__ */ jsxs(Grid, { container: true, direction: "column", children: [
        /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(Heading, { level: "h1", children: "Store information(update)" }) }),
        /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(Text, { size: "small", children: "Change information about your store to have it included in generated documents" }) })
      ] }),
      /* @__PURE__ */ jsxs(Grid, { container: true, marginTop: 5, direction: "row", columnSpacing: 2, children: [
        /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(AddressChangeModal, {}) }),
        /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(LogoChangeModal, {}) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Grid, { item: true, xs: 6, md: 6, xl: 6, children: /* @__PURE__ */ jsxs(Container, { children: [
      /* @__PURE__ */ jsxs(Grid, { container: true, direction: "column", children: [
        /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(Heading, { level: "h1", children: "Invoice" }) }),
        /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(Text, { size: "small", children: "Change settings how invoices are generated" }) })
      ] }),
      /* @__PURE__ */ jsx(Grid, { container: true, marginTop: 5, direction: "row", columnSpacing: 2, children: /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(InvoiceSettingsModal, {}) }) })
    ] }) })
  ] });
};
const HEIGHT = 330;
const ProTab = () => {
  return /* @__PURE__ */ jsxs(Grid, { container: true, spacing: 2, justifyContent: "center", children: [
    /* @__PURE__ */ jsx(Grid, { container: true, justifyContent: "center", marginTop: 6, children: /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(Heading, { level: "h1", style: { color: "purple" }, children: "Manage documents on the next level" }) }) }),
    /* @__PURE__ */ jsxs(Grid, { container: true, justifyContent: "center", marginTop: 1, spacing: 5, children: [
      /* @__PURE__ */ jsx(Grid, { item: true, xs: 3, md: 3, xl: 3, children: /* @__PURE__ */ jsx(Container, { style: { borderColor: "purple", borderWidth: 1, height: HEIGHT }, children: /* @__PURE__ */ jsxs(Grid, { container: true, rowSpacing: 3, children: [
        /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(Heading, { level: "h1", children: "Automation" }) }),
        /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsxs("ul", { style: { listStyleType: "circle" }, children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Text, { children: "Automatically send invoices to customers" }) }),
          /* @__PURE__ */ jsx("li", { style: { marginTop: 3 }, children: /* @__PURE__ */ jsx(Text, { children: "Automatically send packing slips to fulfillment providers" }) }),
          /* @__PURE__ */ jsx("li", { style: { marginTop: 3 }, children: /* @__PURE__ */ jsx(Text, { children: "Automatically detect the language of your customer" }) })
        ] }) })
      ] }) }) }),
      /* @__PURE__ */ jsx(Grid, { item: true, xs: 3, md: 3, xl: 3, children: /* @__PURE__ */ jsx(Container, { style: { borderColor: "purple", borderWidth: 1, height: HEIGHT }, children: /* @__PURE__ */ jsxs(Grid, { container: true, rowSpacing: 3, children: [
        /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(Heading, { level: "h1", children: "New templates" }) }),
        /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsxs("ul", { style: { listStyleType: "circle" }, children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Text, { children: "Access new premium templates for invoices and other documents" }) }),
          /* @__PURE__ */ jsx("li", { style: { marginTop: 3 }, children: /* @__PURE__ */ jsx(Text, { children: "Send us your custom template, and we will create it for you" }) })
        ] }) })
      ] }) }) }),
      /* @__PURE__ */ jsx(Grid, { item: true, xs: 3, md: 3, xl: 3, children: /* @__PURE__ */ jsx(Container, { style: { borderColor: "purple", borderWidth: 1, height: HEIGHT }, children: /* @__PURE__ */ jsxs(Grid, { container: true, rowSpacing: 3, children: [
        /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(Heading, { level: "h1", children: "Advanced configuration" }) }),
        /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsxs("ul", { style: { listStyleType: "circle" }, children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Text, { children: "Set different addresses for various document types" }) }),
          /* @__PURE__ */ jsx("li", { style: { marginTop: 3 }, children: /* @__PURE__ */ jsx(Text, { children: "Customize settings for sending invoices to customers" }) }),
          /* @__PURE__ */ jsx("li", { style: { marginTop: 3 }, children: /* @__PURE__ */ jsx(Text, { children: "Tailor settings for sending packing slips to fulfillment providers" }) })
        ] }) })
      ] }) }) }),
      /* @__PURE__ */ jsx(Grid, { item: true, xs: 3, md: 3, xl: 3, children: /* @__PURE__ */ jsx(Container, { style: { borderColor: "purple", borderWidth: 1, height: HEIGHT }, children: /* @__PURE__ */ jsxs(Grid, { container: true, rowSpacing: 3, children: [
        /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(Heading, { level: "h1", children: "Professional support" }) }),
        /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsxs("ul", { style: { listStyleType: "circle" }, children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Text, { children: "Priority bug resolution" }) }),
          /* @__PURE__ */ jsx("li", { style: { marginTop: 3 }, children: /* @__PURE__ */ jsx(Text, { children: "Dedicated channel for evaluating your feature requests" }) }),
          /* @__PURE__ */ jsx("li", { style: { marginTop: 3 }, children: /* @__PURE__ */ jsx(Text, { children: "Long-term cooperation, including support for other plugins" }) })
        ] }) })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsx(Grid, { container: true, spacing: 3, direction: "column", alignContent: "center", marginTop: 6, children: /* @__PURE__ */ jsxs(Grid, { container: true, direction: "row", justifyContent: "center", columnSpacing: 1, children: [
      /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(Heading, { level: "h1", color: "purple", children: "Contact:" }) }),
      /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(Link, { href: "mailto:labs@rsoftcon.com", children: /* @__PURE__ */ jsx(Heading, { level: "h1", color: "purple", children: "labs@rsoftcon.com" }) }) })
    ] }) }),
    /* @__PURE__ */ jsx(Grid, { container: true, spacing: 3, direction: "column", alignContent: "center", marginTop: 6, children: /* @__PURE__ */ jsxs(Grid, { container: true, direction: "row", justifyContent: "center", columnSpacing: 1, children: [
      /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(Text, { children: "You can hide this tab if you feel it is intruisive. See:" }) }),
      /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(Link, { href: "https://github.com/RSC-Labs/medusa-documents?tab=readme-ov-file#hide-pro-version-tab", children: /* @__PURE__ */ jsx(Text, { children: "How to hide this tab?" }) }) })
    ] }) })
  ] });
};
const DocumentsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  console.log(void 0);
  return /* @__PURE__ */ jsxs(Tabs, { defaultValue: "orders", children: [
    /* @__PURE__ */ jsx(Toaster, { position: "top-right" }),
    /* @__PURE__ */ jsxs(Tabs.List, { children: [
      /* @__PURE__ */ jsx(Tabs.Trigger, { value: "orders", children: "Orders" }),
      /* @__PURE__ */ jsx(Tabs.Trigger, { value: "templates", children: "Templates" }),
      /* @__PURE__ */ jsx(Tabs.Trigger, { value: "settings", children: "Settings" }),
      /* @__PURE__ */ jsxs(Grid, { container: true, justifyContent: "end", alignItems: "center", spacing: 2, style: { flex: 1, marginLeft: "auto" }, children: [
        /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(
          Input,
          {
            type: "text",
            placeholder: "Search by order number...",
            value: searchQuery,
            onChange: (e) => setSearchQuery(e.target.value),
            style: { minWidth: "250px" }
          }
        ) }),
        /* @__PURE__ */ jsx(Grid, { item: true, children: /* @__PURE__ */ jsx(Tabs.Trigger, { value: "pro", style: { color: "purple" }, children: "Pro version" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Tabs.Content, { value: "orders", children: [
      /* @__PURE__ */ jsx(Box, { height: 20 }),
      /* @__PURE__ */ jsx(OrdersTab, { searchQuery })
    ] }),
    /* @__PURE__ */ jsxs(Tabs.Content, { value: "templates", children: [
      /* @__PURE__ */ jsx(Box, { height: 20 }),
      /* @__PURE__ */ jsx(TemplatesTab, {})
    ] }),
    /* @__PURE__ */ jsxs(Tabs.Content, { value: "settings", children: [
      /* @__PURE__ */ jsx(Box, { height: 20 }),
      /* @__PURE__ */ jsx(SettingsTab, {})
    ] }),
    /* @__PURE__ */ jsxs(Tabs.Content, { value: "pro", children: [
      /* @__PURE__ */ jsx(Box, { height: 20 }),
      /* @__PURE__ */ jsx(ProTab, {})
    ] })
  ] });
};
const config = defineRouteConfig({
  label: "Invoices",
  icon: DocumentText
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
export {
  plugin as default
};
