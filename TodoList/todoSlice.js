const initialState = {
  todos: [],
};

const todoListReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return { ...state, todos: [...state.todos, { text: action.payload, completed: false }] };
    case 'REMOVE_TODO':
      return { ...state, todos: state.todos.filter((_, index) => index !== action.payload) };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo, index) =>
          index === action.payload ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    case 'EDIT_TODO':
      return {
        ...state,
        todos: state.todos.map((todo, index) =>
          index === action.payload.index ? { ...todo, text: action.payload.newText } : todo
        ),
      };
    default:
      return state;
  }
};

export default todoListReducer;
