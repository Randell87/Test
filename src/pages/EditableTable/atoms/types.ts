// Типы ячеек
export type CellType = "text" | "number" | "percent" | "fio";

// Интерфейс данных ячейки таблицы
export interface TableField {
  id: number;
  name: string;
  value: string;
  type: CellType;
  colSpan: number;
  rowSpan: number;
  fontWeight: string;
  color?: string;
  align: "left" | "center";
  label?: string;
  multiLine?: boolean;
}

// Интерфейс ячейки таблицы
export interface TableCellProps {
  cell: TableField;
  rowIndex: number;
  colIndex: number;
  onChange: (rowIndex: number, colIndex: number, value: string) => void;
}

// Интерфейс прогресс-бара
export interface ProgressBarProps {
  remainingTime: number;
  progress: number;
}
