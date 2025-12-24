import clsx from "clsx"
import React, { useEffect, useState, useRef, useCallback } from "react"
import { useLocation } from "react-router-dom"
import { usePagination, useTable } from "react-table"
import useOrderTableColums from "./order-table/use-columns"
import { useOrderFilters } from "./order-table/use-orders"
import { Table } from "@medusajs/ui";

const DEFAULT_PAGE_SIZE = 15

const defaultQueryProps = {
  expand: "customer,shipping_address,billing_address,items",
  fields:
    "id,status,display_id,created_at,email,fulfillment_status,payment_status,total,currency_code,metadata",
}

type OrderTableProps = {
  setContextFilters: (filters: Record<string, { filter: string[] }>) => void
  searchQuery?: string
}

type OrdersResult = {
  count: number,
  limit: number,
  offset: number,
  orders: any[]
}

const OrderTable = ({ setContextFilters, searchQuery }: OrderTableProps) => {

  const location = useLocation()

  const [ordersResult, setOrdersResult] = useState<OrdersResult | undefined>(undefined)
  const [isLoading, setLoading] = useState(true)
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)
  const isInitialMount = useRef(true)

  let hiddenColumns = ["sales_channel"]

  const {
    paginate,
    queryObject,
  } = useOrderFilters(defaultQueryProps)

  const offs = 0
  const lim = DEFAULT_PAGE_SIZE

  const [numPages, setNumPages] = useState(0)

  // Fetch orders function - memoized to avoid unnecessary re-renders
  const fetchOrders = useCallback((searchValue?: string) => {
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
      setOrdersResult(finalResult)
      setLoading(false)
    })
    .catch((error) => {
      console.error('Error fetching orders:', error);
      // On error, if we were searching, show empty results instead of all orders
      if (searchValue && searchValue.trim()) {
        setOrdersResult({ orders: [], count: 0, limit: DEFAULT_PAGE_SIZE, offset: 0 })
      }
      setLoading(false)
    })
  }, [])

  // Initial load on mount
  useEffect(() => {
    fetchOrders();
    isInitialMount.current = false;
  }, [fetchOrders])

  useEffect(() => {
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
  }, [searchQuery, fetchOrders])

  useEffect(() => {
    const controlledPageCount = Math.ceil(ordersResult ? ordersResult.count / queryObject.limit : 0)
    setNumPages(controlledPageCount)
  }, [ordersResult])


  const [columns] = useOrderTableColums()

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
    state: { pageIndex },
  } = useTable(
    {
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
    },
    usePagination
  )

  const handleNext = () => {
    if (canNextPage) {
      paginate(1)
      nextPage()
    }
  }

  const handlePrev = () => {
    if (canPreviousPage) {
      paginate(-1)
      previousPage()
    }
  }

  return (
    <>
      <Table
        {...getTableProps()}
        className={clsx({ ["relative"]: isLoading })}
      >
        <Table.Header>
          {headerGroups?.map((headerGroup) => (
            <Table.Row {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((col) => (
                <Table.HeaderCell {...col.getHeaderProps()}>
                  {col.render("Header")}
                </Table.HeaderCell>
              ))}
            </Table.Row>
          ))}
        </Table.Header>
        <Table.Body {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)
            return (
              <Table.Row
                color={"inherit"}
                linkTo={row.original.id}
                {...row.getRowProps()}
                className="group"
              >
                {row.cells.map((cell) => {
                  return (
                    <Table.Cell {...cell.getCellProps()} className="inter-small-regular h-[40px]">
                      {cell.render("Cell")}
                    </Table.Cell>
                  )
                })}
              </Table.Row>
            )
          })}
          {!isLoading && rows.length === 0 && (
            <Table.Row>
              <Table.Cell className="text-center py-8">
                {searchQuery && searchQuery.trim() 
                  ? `No orders found matching "${searchQuery}"`
                  : 'No orders found'}
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
      <Table.Pagination
        count={ordersResult ? ordersResult.count : 0}
        pageSize={queryObject.offset + rows.length}
        pageIndex={pageIndex}
        pageCount={pageCount}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        previousPage={handlePrev}
        nextPage={handleNext}
      />
    </>
  )
}

export default React.memo(OrderTable)
