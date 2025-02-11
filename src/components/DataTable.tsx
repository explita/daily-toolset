"use client";

import React, {
  ChangeEvent,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  FaArrowDownAZ,
  FaArrowDownZA,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa6";
import { stripTags } from "../react/snippets";
import { Button, Input, Select } from "../form/inputs";

function defaultColumns<D extends object>(
  columns: Column<D>[],
  sortable?: boolean
): Column<D>[] {
  if (!sortable) return columns;

  return columns.map((col) => ({
    ...col,
    sortable: col.sortable ?? true,
  }));
}

export function DataTable<D extends Record<string, any>>({
  sortable = true,
  columns = [],
  data = [],
  onRowClick,
  hideFilter = false,
  hideHeader = false,
  hideFooter = false,
  additionalFilter,
  ref,
  emptyMessage = "No records found.",
}: TableProps<D>) {
  const [filterValue, setFilterValue] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: columns[0]?.key as SortDescriptor["column"],
    direction: "asc" as SortDescriptor["direction"],
  });

  useEffect(() => {
    if (hideFooter === true) setRowsPerPage(data?.length);
  }, [data, hideFooter]);

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = useMemo(() => {
    let filteredData = [...data];

    if (hasSearchFilter) {
      filteredData = filteredData.filter((item) => {
        return Object.values(item)
          .map((item) => stripTags(item))
          .join("")
          .toLowerCase()
          .includes(filterValue.toLowerCase());
      });
    }

    return filteredData;
  }, [data, filterValue, hasSearchFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    if (!sortable) return items;

    return [...items].sort((a, b) => {
      const typeOfA = typeof a[sortDescriptor.column];
      const typeOfB = typeof b[sortDescriptor.column];

      const first =
        typeOfA === "number"
          ? Number(a[sortDescriptor.column])
          : stripTags(a[sortDescriptor.column]);
      const second =
        typeOfB === "number"
          ? Number(b[sortDescriptor.column])
          : stripTags(b[sortDescriptor.column]);

      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "desc" ? -cmp : cmp;
    });
  }, [sortDescriptor, items, sortable]);

  const onNextPage = useCallback(() => {
    if (page < pages) setPage(page + 1);
    else setPage(1);
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) setPage(page - 1);
    else setPage(pages);
  }, [page, pages]);

  const onRowsPerPageChange = useCallback((value: string | null) => {
    setRowsPerPage(Number(value));
    setPage(1);
  }, []);

  const onSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setFilterValue(e.target.value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  return (
    <div className="explita-table-container">
      {(pages > 0 || filterValue !== "") && hideFilter === false && (
        <TableFilter
          {...{
            filterValue,
            onSearchChange,
            rowsPerPage,
            onRowsPerPageChange,
            additionalFilter,
          }}
        />
      )}

      <div className="table-main">
        <table className="explita-table" ref={ref}>
          {hideHeader === false && (
            <TableHeader
              {...{ columns, setSortDescriptor, sortDescriptor, sortable }}
            />
          )}
          <tbody>
            {sortedItems.map((row, index: number) => {
              return (
                <tr key={index} onClick={() => onRowClick?.(row)}>
                  {columns.map((column, index) => {
                    // if (row.includes("_id_")) return;
                    return (
                      <td
                        key={index}
                        style={column.style}
                        className={column.className || ""}
                        data-title={
                          typeof column.title === "string" ? column.title : ""
                        }
                      >
                        <div
                          className={
                            column.key === "actions" ? "actions-container" : ""
                          }
                        >
                          {column.render
                            ? column.render(row)
                            : (row[column.key] as ReactNode)}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
            {sortedItems.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  data-empty={sortedItems.length === 0}
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {pages > 0 &&
        filteredItems.length > rowsPerPage &&
        hideFooter === false && (
          <TableFooter
            {...{ pages, page, onNextPage, onPreviousPage, filteredItems }}
          />
        )}
    </div>
  );
}

function TableFilter({
  filterValue,
  onSearchChange,
  rowsPerPage,
  onRowsPerPageChange,
  additionalFilter,
}: TableFilterProps) {
  return (
    <div className="table-filter">
      <div>
        <span className="label">Show</span>
        <Select
          defaultValue={rowsPerPage.toString()}
          options={[
            { value: 10, label: "10 Records" },
            { value: 25, label: "25 Records" },
            { value: 50, label: "50 Records" },
            { value: 100, label: "100 Records" },
          ]}
          isClearable={false}
          handleSelection={onRowsPerPageChange}
        />
      </div>
      <div>
        {additionalFilter}
        <Input.Search
          defaultValue={filterValue}
          placeholder="Search table..."
          onChange={onSearchChange}
        />
      </div>
    </div>
  );
}

function TableHeader<D extends object>({
  columns,
  sortable,
  sortDescriptor,
  setSortDescriptor,
}: TableHeaderProps<D>) {
  const processedColumns = defaultColumns(columns, sortable);

  const setSortDescription = useCallback(
    (item: Column<D>) => {
      if (!item.sortable || !sortable) return;
      if (item.key === sortDescriptor.column) {
        if (sortDescriptor.direction === "asc") {
          setSortDescriptor({ column: item.key, direction: "desc" });
        } else {
          setSortDescriptor({ column: item.key, direction: "asc" });
        }
      } else {
        setSortDescriptor({
          column: String(item.key),
          direction: item.sortDir ?? "asc",
        });
      }
    },
    [sortDescriptor, setSortDescriptor, sortable]
  );

  return (
    <thead>
      <tr>
        {processedColumns.map((item, i: number) => (
          <th
            key={i}
            style={{ width: item.width }}
            onClick={() => setSortDescription(item)}
            role="button"
          >
            <div className="header-container">
              {item.title}
              {item.key !== "actions" && (
                <SortArrow
                  {...{
                    sortDescriptor,
                    sortable: !item.sortable ? false : sortable,
                    columnKey: String(item.key),
                  }}
                />
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
}

function TableFooter({
  pages,
  page,
  onNextPage,
  onPreviousPage,
  filteredItems,
}: TableFooterProps) {
  return (
    <div className="footer-container">
      <div>
        <span>
          Page {page} / {pages}
        </span>
        <span>of {filteredItems.length} records</span>
      </div>
      <div>
        <Button
          size="icon"
          variant={"outline"}
          isDisabled={pages === 1}
          onClick={onPreviousPage}
        >
          <FaChevronLeft />
          <span className="label">Previous</span>
        </Button>
        <Button
          size="icon"
          variant={"outline"}
          isDisabled={pages === 1}
          onClick={onNextPage}
        >
          <FaChevronRight />
          <span className="label">Next</span>
        </Button>
      </div>
    </div>
  );
}

function SortArrow({ columnKey, sortable, sortDescriptor }: SortArrowProps) {
  if (!sortable || sortDescriptor.column === "") return null;

  return sortDescriptor.column === columnKey ? (
    <span
      className={`sort-icon ${
        sortDescriptor.direction === "asc" ? "asc" : "desc"
      }`}
    >
      {sortDescriptor.direction === "desc" ? (
        <FaArrowDownZA />
      ) : (
        <FaArrowDownAZ />
      )}
    </span>
  ) : (
    <span className="sort-icon inactive">
      <FaArrowDownAZ />
    </span>
  );
}

type Column<Data extends object> = {
  title: string | ReactNode;
  key: keyof Data;
  width?: number;
  sortable?: boolean;
  sortDir?: "asc" | "desc";
  render?: (data: Data) => ReactNode;
  style?: React.CSSProperties;
  className?: string;
};

type TableProps<Data extends object = any> = {
  sortable?: boolean;
  columns?: Column<Data>[];
  data?: Data[];
  onRowClick?: (data: Data) => void;
  hideFilter?: boolean;
  hideHeader?: boolean;
  hideFooter?: boolean;
  additionalFilter?: ReactNode;
  additionalFooter?: ReactNode;
  ref?: React.RefObject<HTMLTableElement>;
  emptyMessage?: string;
};

type TableFilterProps = {
  filterValue: string;
  onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  rowsPerPage: number;
  onRowsPerPageChange: (value: string) => void;
  additionalFilter?: ReactNode;
};

type TableHeaderProps<D extends object> = {
  columns: Column<D>[];
  sortable?: boolean;
  sortDescriptor: SortDescriptor;
  setSortDescriptor: Dispatch<SetStateAction<SortDescriptor>>;
};

type TableFooterProps = {
  pages: number;
  page: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
  filteredItems: any[];
};

type SortArrowProps = {
  columnKey: string;
  sortable?: boolean;
  sortDescriptor: SortDescriptor;
};

type SortDescriptor = {
  column: string;
  direction: "asc" | "desc";
};
