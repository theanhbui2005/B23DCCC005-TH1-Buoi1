import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './RandomColor.css'; // Import CSS

const RandomColor = () => {
  const color = useSelector((state) => state.randomColor.color);
  const dispatch = useDispatch();
  const [autoChange, setAutoChange] = useState(null);
  const [prevColors, setPrevColors] = useState([]);
  const [currentChanges, setCurrentChanges] = useState([]);

  const generateRandomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  };

  const changeColor = () => {
    const newColor = generateRandomColor();
    if (newColor !== color) { // Chỉ lưu màu nếu có sự thay đổi
      setPrevColors((prev) => [...prev, color]); // Lưu màu trước đó vào lịch sử
      setCurrentChanges((prev) => [...prev, newColor]); // Lưu màu mới vào danh sách hiện tại
      dispatch({ type: 'CHANGE_COLOR', payload: newColor });
    }
  };

  const toggleAutoChange = () => {
    if (autoChange) {
      clearInterval(autoChange);
      setAutoChange(null); // Ngừng tự động thay đổi màu
    } else {
      const interval = setInterval(changeColor, 1000); // Thay đổi màu mỗi giây
      setAutoChange(interval);
    }
  };

  const undoColor = () => {
    if (prevColors.length > 0) {
      const lastColor = prevColors[prevColors.length - 1]; // Lấy màu cuối cùng trong lịch sử
      dispatch({ type: 'CHANGE_COLOR', payload: lastColor }); // Đặt màu thành màu trước đó
      setCurrentChanges((prev) => [...prev, lastColor]); // Thêm vào danh sách thay đổi hiện tại
      setPrevColors((prev) => prev.slice(0, -1)); // Xóa màu cuối cùng khỏi lịch sử
    }
  };

  const changeBackgroundColorOnce = () => {
    const newColor = generateRandomColor();
    if (newColor !== color) { // Chỉ lưu màu nếu có sự thay đổi
      setPrevColors((prev) => [...prev, color]); // Lưu màu trước đó vào lịch sử
      setCurrentChanges((prev) => [...prev, newColor]); // Lưu màu mới vào danh sách hiện tại
      dispatch({ type: 'CHANGE_COLOR', payload: newColor }); // Đặt màu mới
    }
  };

  return (
    <div className="random-color-container" style={{ backgroundColor: color }}>
      <h2>Random Background Color</h2>
      <button onClick={toggleAutoChange}>
        {autoChange ? 'Stop Auto Change' : 'Start Auto Change'}
      </button>
      <button onClick={changeBackgroundColorOnce}>Change Background Color</button>
      <button onClick={undoColor}>Undo</button>

      <h3>Current Change:</h3>
      <div className="color-box-container">
        {currentChanges.map((change, index) => (
          <div
            key={index}
            className="color-box"
            style={{ backgroundColor: change }}
          ></div>
        ))}
      </div>

      <h3>History Change:</h3>
      <div className="color-box-container">
        {prevColors.map((color, index) => (
          <div
            key={index}
            className="color-box"
            style={{ backgroundColor: color }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default RandomColor;
