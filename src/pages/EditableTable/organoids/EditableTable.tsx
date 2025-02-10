import { useState, useEffect } from "react";
import { initialData } from "../atoms/initialData";
import { TableField, CellType } from "../atoms/types";
import ProgressBar from "../molecules/ProgressBar";
import TableCell from "../molecules/TableCell";
import "../styles/EditableTable.css";

// Компонент адаптивной таблицы с возможностью редактирования ячеек
const EditableTable = () => {
  const [data, setData] = useState<TableField[][]>(initialData);
  const [editedCells, setEditedCells] = useState<Record<string, string>>({});
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [remainingTime, setRemainingTime] = useState<number>(10);
  const [isSending, setIsSending] = useState<boolean>(false);

  // Отслеживание "отправки данных"
  useEffect(() => {
    if (isSending) {
      let counter = 10;
      setRemainingTime(counter);
      const interval = setInterval(() => {
        counter--;
        setRemainingTime(counter);
        setProgress((prev) => prev + 10);
        if (counter === 0) {
          clearInterval(interval);
          setIsSending(false);
          console.log("Отправленные данные:");
          console.table(editedCells);
          console.log(JSON.stringify(editedCells, null, 2));
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isSending]);

  // Валидация данных
  const validateInput = (value: string, type: CellType) => {
    switch (type) {
      case "number":
        return value.replace(/\D/g, "");
      case "percent": {
        return  value.replace(/[^0-9.]/g, "");
      }
      case "fio":
        return value.replace(/[^а-яА-Я. ]/g, "");
      default:
        return value;
    }
  };

  // Обработчик изменений в ячейке
  const handleChange = (rowIndex: number, colIndex: number, value: string) => {
    const updatedData = JSON.parse(JSON.stringify(data));
    const cell = updatedData[rowIndex][colIndex];
    const validatedValue = validateInput(value, cell.type);
    updatedData[rowIndex][colIndex].value = validatedValue;
    setData(updatedData);

    setIsSending(false); //останавливаем загрузку

    if (JSON.stringify(updatedData) !== JSON.stringify(initialData)) { //сравниваем со старым значением
      if (validatedValue === initialData[rowIndex][colIndex].value) {
        setEditedCells((prev) => {
          const newEdits = { ...prev };
          delete newEdits[cell.name];
          // Вариант с id
          // delete newEdits[cell.id];
          return newEdits;
        });
      } else {
        setEditedCells((prev) => ({ ...prev, [cell.name]: validatedValue }));
      }
      
      // Вариант с id
      // setEditedCells((prev) => ({ ...prev, [cell.id]: validatedValue }));
      if (timer) clearTimeout(timer);
      setTimer(
        setTimeout(() => {
          setIsSending(true);
          setProgress(0);
        }, 5000)
      );
    } else {
      if (timer) clearTimeout(timer);
      setEditedCells((prev) => {
        const newEdits = { ...prev };
        delete newEdits[cell.name];
        // Вариант с id
        // delete newEdits[cell.id];
        return newEdits;
      });
    }
  };

  return (
    <div className="container">
      <div className="tableContainer">
        <table>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <TableCell
                    key={colIndex}
                    cell={cell}
                    rowIndex={rowIndex}
                    colIndex={colIndex}
                    onChange={handleChange}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {isSending && (
          <ProgressBar remainingTime={remainingTime} progress={progress} />
        )}
      </div>
    </div>
  );
};

export default EditableTable;
