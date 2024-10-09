const initialState = {
  images: [],
};

const imageSearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_IMAGES':
      return { ...state, images: action.payload };
    default:
      return state;
  }
};

export default imageSearchReducer;
