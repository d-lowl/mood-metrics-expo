export default simple_reducer = (state = {}, action) => {
  console.log(state);
  switch(action.type) {
    case 'SET_SIMPLE_STATE':
      return {
        ...state,
        n: action.n
      }
    default:
      return state;
  }
}
