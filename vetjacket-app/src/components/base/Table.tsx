import { classNames } from '@src/helpers/helper';
import { TableRow } from './TableRow';
import * as React from 'react';
import Toggle from './Toggle';
import { TextareaAutosize } from '@mui/material';
import Select from './Select';
import {
  ReactComponentElement,
  ReactElement,
  useLayoutEffect,
  useRef,
  useEffect,
  useState,
} from 'react';
import { OptionType } from '@src/components/base/Select';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import TablePagination from './TablePagination';
import NoDataStateComponent from './states/NoDataStateComponent';

export interface ColumnDefType {
  width: number;
  field: string;
  formatCell?: (e: OptionType) => string | ReactElement;
  type?: string;
  editable?: boolean;
  onChange?: (rowId: string, value: any) => void;
  headerName: string;
  sortable?: boolean;
  filterable?: boolean;
  filterOptions?: OptionType[];
  columnClass?: string;
  options?: OptionType[];
  inputProps?: object;
  inputType?: string;
}

export interface Filter {
  field: string;
  value: any; // The type of this depends on your filter UI
}

export interface Sort {
  field: string;
  direction: 'asc' | 'desc';
}

export function Table({
  rows,
  columns,
  enablePagination = false,
  meta = {},
  toggleable = false,
  collapsible = false,
  onFilterChange = () => {},
  onSortChange = () => {},
  renderCollapsibleContent = (row: any) => <></>,
  rowClassNames = (row: any) => '',
  onRowClickHandler = (row: any) => {},
  onPageChange = (page) => {},
}) {
  const checkbox = useRef();
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);

  const [filters, setFilters] = useState<Filter[]>([]);
  const [sort, setSort] = useState<Sort | null>(null);

  useEffect(() => {
    onFilterChange(filters);
  }, [filters]);

  useEffect(() => {
    onSortChange(sort);
  }, [sort]);

  const handleSort = (field) => {
    setSort((prevSort) => {
      if (!prevSort || prevSort.field !== field) {
        return { field, direction: 'asc' };
      }
      return {
        field,
        direction: prevSort.direction === 'asc' ? 'desc' : 'asc',
      };
    });
  };

  const handleFilterChange = (field, value) => {
    setFilters((prevFilters) => {
      const newFilters = prevFilters.filter((f) => f.field !== field);
      if (value !== '') {
        // Assuming an empty string means no filter
        newFilters.push({ field, value });
      }
      return newFilters;
    });
  };

  useLayoutEffect(() => {
    const isIndeterminate =
      selectedRows.length > 0 && selectedRows.length < rows.length;
    setChecked(selectedRows.length === rows.length);
    setIndeterminate(isIndeterminate);
    if (checkbox.current) {
      checkbox.current.indeterminate = isIndeterminate;
    }
  }, [selectedRows, rows]);

  function toggleAll() {
    setSelectedRows(checked || indeterminate ? [] : rows);
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }

  const setRows = (newRows) => {};

  const setRow = (rowId, key, value) => {
    const newRows = [...rows];
    const rowIndex = newRows.findIndex((row) => row.id == rowId);
    rows[rowIndex][key] = value;
    setRows(newRows);
  };

  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  const handleOnRowClick = (row) => {
    if (collapsible) {
      if (expandedRows.includes(row.id)) {
        setExpandedRows(expandedRows.filter((id) => id !== row.id));
      } else {
        setExpandedRows([...expandedRows, row.id]);
      }
    }
    onRowClickHandler(row);
  };

  if (rows.length == 0) {
    return <NoDataStateComponent />;
  }

  return (
    <div>
      <table className="min-w-full table-fixed divide-y divide-gray-300 w-full">
        <thead>
          <tr>
            {toggleable && (
              <th
                scope="col"
                style={{ width: '5%' }}
                className="relative px-7 sm:w-12 sm:px-6"
              >
                <input
                  type="checkbox"
                  className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  ref={checkbox}
                  checked={checked}
                  onChange={toggleAll}
                />
              </th>
            )}
            {collapsible && (
              <th
                scope="col"
                style={{ width: '5%' }}
                className="relative px-7 sm:w-12 sm:px-6"
              ></th>
            )}
            {columns.map((column) => (
              <th
                key={column.field}
                style={{ width: column.width ? `${column.width}%` : null }}
                className="py-3.5 pr-3 text-left text-xs font-semibold text-gray-900"
              >
                <div className="flex flex-row items-center space-x-2">
                  <div> {column.headerName}</div>
                  {column.sortable && (
                    <div>
                      <button onClick={() => handleSort(column.field)}>
                        <ChevronUpIcon className="pointer w-4 h-4" />
                        <ChevronDownIcon className="pointer w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {column.filterable &&
                    // Render filter UI based on column type, e.g., dropdown, text input, etc.
                    // For example, for a dropdown filter:
                    column.filterOptions && (
                      <Select
                        selected={column.filterOptions.find(
                          (option) => option.id == column.filterValue,
                        )}
                        setSelected={(option: OptionType) =>
                          column.onChange(row.id, option.id)
                        }
                        options={column.filterOptions}
                      />
                    )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="font-light divide-y divide-gray-200 bg-white">
          {rows.map((row, index) => (
            <React.Fragment key={row.id}>
              <tr
                onClick={() => handleOnRowClick(row)}
                className={classNames(
                  (selectedRows.includes(row) ? 'bg-gray-50' : '') +
                    rowClassNames(row),
                )}
              >
                {toggleable && (
                  <td className="relative px-7 sm:w-12 sm:px-6">
                    {selectedRows.includes(row) && (
                      <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />
                    )}
                    <input
                      type="checkbox"
                      className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      checked={selectedRows.includes(row)}
                      onChange={(e) =>
                        setSelectedRows(
                          e.target.checked
                            ? [...selectedRows, row]
                            : selectedRows.filter((p) => p !== row),
                        )
                      }
                    />
                  </td>
                )}
                {collapsible && (
                  <td key={index} className="relative px-7 sm:w-12 sm:px-6">
                    {expandedRows.includes(row.id) ? (
                      <ChevronUpIcon className="pointer w-4 h-4" />
                    ) : (
                      <ChevronDownIcon className="pointer w-4 h-4" />
                    )}
                  </td>
                )}
                {columns.map((column, index) => {
                  if (column.type == 'select') {
                    return (
                      <td
                        key={index}
                        className="whitespace-normal py-4 pr-3 text-xs text-gray-900"
                      >
                        <Select
                          selected={column.options.find(
                            (option) =>
                              option.id == getNestedValue(row, column.field),
                          )}
                          setSelected={(option: OptionType) =>
                            column.onChange(row.id, option.id)
                          }
                          options={column.options}
                        />
                      </td>
                    );
                  }
                  if (column.type == 'textarea') {
                    return (
                      <td
                        key={index}
                        className={classNames(
                          'break-word whitespace-normal py-4 pr-3 text-xs font-light',
                          selectedRows.includes(row)
                            ? 'text-indigo-600'
                            : 'text-gray-900',
                        )}
                      >
                        <TextareaAutosize
                          onChange={(event) =>
                            setRow(row.id, column.field, event.target.value)
                          }
                          className="w-full p-0 border-0 text-gray-900  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                          value={row[column.field]}
                          {...column.inputProps}
                        />
                      </td>
                    );
                  }
                  if (column.type == 'text') {
                    return (
                      <td
                        key={index}
                        className={classNames(
                          column.columnClass,
                          'break-word whitespace-normal py-4 pr-3 text-xs font-light',
                          selectedRows.includes(row)
                            ? 'text-indigo-600'
                            : 'text-gray-900',
                        )}
                      >
                        {!column.editable ? (
                          column.formatCell ? (
                            column.formatCell(row)
                          ) : (
                            row[column.field]
                          )
                        ) : column.inputType == 'textarea' ? (
                          <TextareaAutosize
                            onChange={(event) =>
                              setRow(row.id, column.field, event.target.value)
                            }
                            className="w-full p-0 border-0 text-gray-900  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                            value={row[column.field]}
                            {...column.inputProps}
                          />
                        ) : (
                          <input
                            type={column.inputType ?? 'text'}
                            onChange={(event) =>
                              setRow(row.id, column.field, event.target.value)
                            }
                            className="block w-full border-0 py-1.5 text-gray-900  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xs sm:leading-6"
                            value={row[column.field]}
                            {...column.inputProps}
                          />
                        )}
                      </td>
                    );
                  }
                  if (column.type == 'boolean') {
                    return (
                      <td
                        key={index}
                        className={classNames(
                          'whitespace-normal py-4 pr-3 justify-items-center text-xs font-light',
                          selectedRows.includes(row)
                            ? 'text-indigo-600'
                            : 'text-gray-900',
                        )}
                      >
                        {' '}
                        <Toggle
                          value={row[column.field]}
                          setValue={(value) =>
                            setRow(row.id, column.field, value)
                          }
                        />
                      </td>
                    );
                  }
                })}
              </tr>
              {expandedRows.includes(row.id) && (
                <tr key={`expanded-${row.id}`}>
                  <td className="pl-8" colSpan={columns.length + 1}>
                    {renderCollapsibleContent(row)}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      {enablePagination && (
        <TablePagination meta={meta} onPageChange={onPageChange} />
      )}
    </div>
  );
}
