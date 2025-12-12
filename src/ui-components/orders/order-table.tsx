import clsx from "clsx"
import React, { useEffect, useState } from "react"
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
  searchTerm?: string
}

type OrdersResult = {
  count: number,
  limit: number,
  offset: number,
  orders: any[]
}

const OrderTable = ({ setContextFilters, searchTerm = "" }: OrderTableProps) => {

  const location = useLocation()


  const [ordersResult, setOrdersResult] = useState<OrdersResult | undefined>(undefined)
  const [isLoading, setLoading] = useState(true)

  let hiddenColumns = ["sales_channel"]

  const {
    paginate,
    queryObject,
  } = useOrderFilters(defaultQueryProps)

  const offs = 0
  const lim = DEFAULT_PAGE_SIZE

  const [numPages, setNumPages] = useState(0)

  // const defaultQueryProps = {
  //   expand: "customer,shipping_address,billing_address,items",
  //   fields:
  //     "id,status,display_id,created_at,email,fulfillment_status,payment_status,total,currency_code,metadata",
  // }
  

  useEffect(() => {
    setLoading(true);
  }, [searchTerm])

  useEffect(() => {
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
        })
        setLoading(false)
        return
      }

      // Filter client-side by display_id if search term exists
      let filteredResult = result;
      if (searchTerm && searchTerm.trim() && Array.isArray(result.orders)) {
        const searchLower = searchTerm.trim().toLowerCase();
        const filteredOrders = result.orders.filter((order: any) => 
          order.display_id?.toString().toLowerCase().includes(searchLower)
        );
        filteredResult = {
          ...result,
          orders: filteredOrders,
          count: filteredOrders.length
        };
      }
      setOrdersResult(filteredResult)
      setLoading(false)
    })
    .catch((error) => {
      console.error('Error fetching orders:', error);
      setOrdersResult({
        count: 0,
        limit: lim,
        offset: 0,
        orders: []
      })
      setLoading(false)
    }) 
  }, [isLoading, searchTerm])

  useEffect(() => {
    const controlledPageCount = Math.ceil(ordersResult ? ordersResult.count / queryObject.limit : 0)
    setNumPages(controlledPageCount)
  }, [ordersResult, queryObject.limit])


  const [columns] = useOrderTableColums()

  // Ensure columns is always an array
  const safeColumns = columns || []
  
  // Ensure data is always an array
  const safeData = (ordersResult && Array.isArray(ordersResult.orders)) ? ordersResult.orders : []

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
