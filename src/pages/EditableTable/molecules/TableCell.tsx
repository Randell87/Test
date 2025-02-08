/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableCellProps } from "../atoms/types";
import "../styles/TableCell.css";

// Компонент ячейки таблицы
const TableCell = ({ cell, rowIndex, colIndex, onChange }: TableCellProps) => {
  // Добавляем % в конец строки
  const formatValue = (value: any) => {
    return value ? `${value}%` : "";
  };

  return (
    <td
      colSpan={cell.colSpan}
      rowSpan={cell.rowSpan}
      className={rowIndex === 0 ? "tableCellHeader" : "tableCellBody"}
    >
      <div className="cellContent">
        {cell.label && <label>{cell.label}</label>}
        {cell.multiLine ? (
          <textarea
            value={cell.value}
            onChange={(e) => onChange(rowIndex, colIndex, e.target.value)}
            style={{
              fontWeight: cell.fontWeight,
              textAlign: cell.align,
              color: cell.color,
            }}
          />
        ) : (
          <input
            type="text"
            value={
              cell.type !== "percent" ? cell.value : formatValue(cell.value)
            }
            onChange={(e) => onChange(rowIndex, colIndex, e.target.value)}
            style={{
              fontWeight: cell.fontWeight,
              textAlign: cell.align,
              color: cell.color,
            }}
          />
        )}
      </div>
    </td>
  );
};

export default TableCell;
