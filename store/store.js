import { createStore, combineReducers } from 'redux';
import todoReducer from '../TodoList/todoSlice';
import imageSearchReducer from '../ImageSearch/imageSearchSlice';
import randomColorReducer from '../RandomColor/randomColorSlice';

const rootReducer = combineReducers({
  todo: todoReducer,
  imageSearch: imageSearchReducer,
  randomColor: randomColorReducer,
});


const store = createStore(rootReducer);

export default store;
