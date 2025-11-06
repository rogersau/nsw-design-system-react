import React, { useId } from 'react';

/**
 * Table header definition
 */
export interface TableHeaderDef {
  title: string;
  key: string;
  width?: number;
  type?: 'text' | 'numeric' | string;
  render?: (cellValue: any, rowData: Record<string, any>) => React.ReactNode;
}

/**
 * Props for the top-level Table component
 *
 * @param caption - The description or summary of the table
 * @param headers - Column definitions (see TableHeaderDef)
 * @param data - Array of row objects
 * @param striped - Whether the table should be striped
 * @param bordered - Whether the table should be bordered
 * @param captionTop - Position the caption on top
 * @param className - Additional class names
 * @param firstCellIsHeader - Treat first cell in each row as a header (scope=row)
 */
export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  caption?: string;
  headers: TableHeaderDef[];
  data: Record<string, any>[];
  striped?: boolean;
  bordered?: boolean;
  captionTop?: boolean;
  className?: string;
  firstCellIsHeader?: boolean;
}

/**
 * Table
 *
 * Top-level table renderer. This component composes the smaller table
 * primitives (`TableHead`, `TableBody`, `TableRow`, `TableHeader`,
 * `TableCell`, `TableCaption`) to render accessible HTML tables used in the
 * design system.
 *
 * Behaviour and usage notes:
 * - `headers` is an array of column definitions (see `TableHeaderDef`).
 *   Each header may include `title`, `key`, optional `width` (number percent),
 *   a `type` string and an optional `render(cellValue, row)` function which
 *   will be invoked to custom-render that cell. If `render` is provided the
 *   returned node is used; otherwise the raw value `row[header.key]` is used.
 * - `data` is an array of row objects. Each row is a plain object keyed by
 *   the header `key` values.
 * - `firstCellIsHeader` instructs the renderer to render the first column of
 *   each row as a header cell (`<th scope="row">`), which helps screen
 *   readers navigate complex tables.
 * - Column `width` values are applied via inline `style` (percent) on the
 *   `<th>` to avoid incompatibilities with JSX `width` attribute typing.
 * - Unique keys for generated elements use React's `useId()` to create a base
 *   prefix and append row/column indexes; this avoids the external
 *   `react-id-generator` dependency.
 * - Any additional props passed to `Table` are spread onto the outer
 *   `<table>` element (e.g., `aria-*` attributes, role overrides).
 * - Visual modifiers supported: `striped`, `bordered`, `captionTop` and
 *   `className` to append custom classes. These map to existing CSS utility
 *   classes from the design system (e.g., `nsw-table--striped`).
 *
 * Accessibility:
 * - When `firstCellIsHeader` is true, the renderer sets `scope="row"` on
 *   the first cell of each row to provide correct semantics for assistive
 *   technologies.
 *
 * Example:
 * const headers = [{ title: 'Name', key: 'name', width: 40 }, ...];
 * const data = [{ name: 'Alice', email: 'a@example.com' }, ...];
 * <Table headers={headers} data={data} striped bordered />
 */
export const Table: React.FC<TableProps> = ({
  caption,
  headers,
  data,
  striped = false,
  bordered = false,
  captionTop = false,
  className = '',
  firstCellIsHeader = false,
  ...rest
}) => {
  const baseId = useId();
  const classNames = `nsw-table ${striped ? 'nsw-table--striped ' : ' '} ${bordered ? 'nsw-table--bordered ' : ' '} ${captionTop ? 'nsw-table--caption-top ' : ' '} ${className}`;

  return (
    <table className={classNames} {...rest}>
      {caption && <TableCaption tableCaption={caption} />}
      <TableHead>
        <TableRow>
          {headers.map((header, index) => (
            <TableHeader
              title={header.title}
              key={`${baseId}-tableHeader-${index}`}
              width={header.width}
            />
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow key={`${baseId}-tableRow-${rowIndex}`}>
            {headers.map((header, columnIndex) => {
              if (columnIndex === 0 && firstCellIsHeader === true) {
                return (
                  <TableHeader
                    key={`${baseId}-tableHeader-row-${rowIndex}-${columnIndex}`}
                    scope="row"
                    title={row[header.key] ? String(row[header.key]) : ''}
                  />
                );
              }

              return (
                <TableCell
                  key={`${baseId}-tableCell-row-${rowIndex}-${columnIndex}`}
                  data={row[header.key] ? row[header.key] : ''}
                  // pass type and render through
                  data-type={header.type}
                >
                  {header.render ? header.render(row[header.key], row) : row[header.key]}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </table>
  );
};

/**
 * TableBody - wrapper for tbody
 */
export const TableBody: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({ className = '', children, ...rest }) => (
  <tbody className={className} {...rest}>
    {children}
  </tbody>
);

/**
 * TableHead - wrapper for thead
 */
export const TableHead: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({ children, className = '', ...rest }) => (
  <thead className={className} {...rest}>
    {children}
  </thead>
);

/**
 * TableHeader - renders a th element
 */
export interface TableHeaderProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  title: string;
  width?: number;
}

export const TableHeader: React.FC<TableHeaderProps> = ({ title, width, scope = 'col', className = '', ...rest }) => {
  // width is not a standard React prop on <th>, set via style instead.
  const restStyle = (rest.style as React.CSSProperties) || {};
  const style = width ? { ...restStyle, width: `${width}%` } : restStyle;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { style: _discard, ...restProps } = rest as any;
  return (
    <th className={className} style={style} scope={scope} {...restProps}>
      {title}
    </th>
  );
};

/**
 * TableCell - renders a td element
 */
export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  data?: any;
}

export const TableCell: React.FC<TableCellProps> = ({ data, className = '', children, ...rest }) => (
  <td className={className} {...rest}>
    {children ?? data}
  </td>
);

/**
 * TableRow - renders a tr
 */
export const TableRow: React.FC<React.HTMLAttributes<HTMLTableRowElement>> = ({ children, className = '', ...rest }) => (
  <tr className={className} {...rest}>
    {children}
  </tr>
);

/**
 * TableCaption - renders a caption element
 */
export interface TableCaptionProps extends React.HTMLAttributes<HTMLTableCaptionElement> {
  tableCaption?: string;
}

export const TableCaption: React.FC<TableCaptionProps> = ({ tableCaption, className = '', ...rest }) => (
  <caption className={className} {...rest}>
    {tableCaption}
  </caption>
);

/**
 * TableResponsiveWrapper - adds horizontal scrolling wrapper
 */
export const TableResponsiveWrapper: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children }) => (
  <div className="nsw-table-responsive" role="region">
    {children}
  </div>
);

export default Table;
