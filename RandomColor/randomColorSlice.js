const initialState = {
  color: '#ffffff', 
};

const randomColorReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_COLOR':
      return { ...state, color: action.payload };
    default:
      return state;
  }
};

export default randomColorReducer;
