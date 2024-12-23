import React from "react";
import regimes from "../../constants/regimes";
import Delimiter from "../Delimiter/Delimiter";
import RegimeButton from "../RegimeButton/RegimeButton";
import convertToText from "../../functions/convertToText";
import downloadFile from "../../functions/downloadFile";
import readFile from "../../functions/readFile";
import convertFromText from "../../functions/convertFromText";
import {
  FaSyncAlt, // Вращать сцену
  FaDotCircle, // Добавить точку
  FaDrawPolygon, // Добавить линию
  FaTrashAlt, // Удалить элемент
  FaObjectGroup, // Группировать
  FaArrowsAlt, // Перемещение группы
  FaSync, // Вращение группы
  FaClone, // Зеркалирование группы
  FaExpandArrowsAlt, // Масштабирование группы
  FaFileExport, // Скачать файл
  FaFileImport, // Открыть модель из файла
  FaTrash, // Очистить
} from "react-icons/fa";

/** Кнопки с режимами работы */
const RegimeButtons = ({
                         regime,
                         regimeChange,
                         points,
                         pointsChange,
                         sticks,
                         sticksChange,
                         reset,
                         height,
                         padding,
                       }) => {
  const delimiter = "delimiter";
  const drawRegimes = [
    {
      title: "Вращать сцену",
      icon: <FaSyncAlt />,
      disabled: regime === regimes.totalRotation,
      onClick: () => regimeChange(regimes.totalRotation),
    },
    {
      title: "Добавить точку",
      icon: <FaDotCircle />,
      disabled: regime === regimes.addPoint,
      onClick: () => regimeChange(regimes.addPoint),
    },
    {
      title: "Добавить линию",
      icon: <FaDrawPolygon />,
      disabled: regime === regimes.addStick,
      onClick: () => regimeChange(regimes.addStick),
    },
    {
      title: "Удалить элемент",
      icon: <FaTrashAlt />,
      disabled: regime === regimes.delete,
      onClick: () => regimeChange(regimes.delete),
    },
    {
      title: "Группировать",
      icon: <FaObjectGroup />,
      disabled: regime === regimes.group,
      onClick: () => regimeChange(regimes.group),
    },
    {
      title: "Перемещение группы",
      icon: <FaArrowsAlt />,
      disabled: regime === regimes.groupMoving,
      onClick: () => regimeChange(regimes.groupMoving),
    },
    {
      title: "Вращение группы",
      icon: <FaSync />,
      disabled: regime === regimes.groupRotation,
      onClick: () => regimeChange(regimes.groupRotation),
    },
    {
      title: "Зеркалирование группы",
      icon: <FaClone />,
      disabled: regime === regimes.groupMirror,
      onClick: () => regimeChange(regimes.groupMirror),
    },
    {
      title: "Масштабирование группы",
      icon: <FaExpandArrowsAlt />,
      disabled: regime === regimes.groupScale,
      onClick: () => regimeChange(regimes.groupScale),
    },
    delimiter,
    {
      title: "Скачать файл",
      icon: <FaFileExport />,
      disabled: false,
      onClick: () => {
        let text = convertToText(points, sticks);
        downloadFile(text, "model.txt");
      },
    },
    {
      title: "Открыть модель из файла",
      icon: <FaFileImport />,
      disabled: false,
      onClick: () => {
        readFile((t, n) => {
          const [p, s] = convertFromText(t);
          pointsChange(p);
          sticksChange(s);
        });
      },
    },
    {
      title: "Очистить",
      icon: <FaTrash />,
      disabled: false,
      onClick: () => reset(),
    },
  ];

  return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", padding: "10px", zIndex: "99999" }}>
        {drawRegimes.map((drawRegime, index) =>
            drawRegime === delimiter ? (
                <Delimiter key={index} />
            ) : (
                <RegimeButton
                    key={index}
                    title={drawRegime.title}
                    icon={drawRegime.icon}
                    size={height - 2 * padding}
                    disabled={drawRegime.disabled}
                    onClick={drawRegime.onClick}
                />
            )
        )}
      </div>
  );
};

export default RegimeButtons;