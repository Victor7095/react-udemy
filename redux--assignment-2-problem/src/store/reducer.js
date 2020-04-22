const initialState = {
  persons: [],
};

const reducer = (state = initialState, {type, payload}) => {
  const actions = {

  }
  if(actions[type]) return actions[type];
  return state;
};

export default reducer;
