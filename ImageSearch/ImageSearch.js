import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ImageSearch.css';  // Import CSS

const ImageSearch = () => {
  const images = useSelector((state) => state.imageSearch.images);
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');

  const fetchImages = async () => {
    try {
      const response = await fetch(`https://pixabay.com/api/?key=46166847-40e887f0f1cbd269c98d3b401&q=${query}&image_type=photo`);
      const data = await response.json();

      // Kiểm tra xem có kết quả không
      if (data.hits && data.hits.length > 0) {
        const imageUrls = data.hits.map((hit) => hit.webformatURL); // Lấy URL hình ảnh
        dispatch({ type: 'SET_IMAGES', payload: imageUrls });
      } else {
        dispatch({ type: 'SET_IMAGES', payload: [] }); // Xóa ảnh nếu không có kết quả
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      dispatch({ type: 'SET_IMAGES', payload: [] }); // Xóa ảnh nếu có lỗi
    }
  };

  return (
    <div className="image-search-container">
      <h2>Image Search</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={fetchImages}>Search</button>
      <div>
        {images.map((image, index) => (
          <img key={index} src={image} alt={`search-result-${index}`} style={{ width: '100px', margin: '5px', borderRadius: '5px' }} />
        ))}
      </div>
    </div>
  );
};

export default ImageSearch;
