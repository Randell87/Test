import { ProgressBarProps } from "../atoms/types";
import "../styles/ProgressBar.css";

// Компонент таймера и прогресс-бара
const ProgressBar = ({ remainingTime, progress }: ProgressBarProps) => {
  return (
    <div className="progressContainer">
      <p className="progressMessage">
        Отправка данных через {remainingTime} секунд
      </p>
      <div className="progressBar">
        <div className="progressFill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};

export default ProgressBar;
