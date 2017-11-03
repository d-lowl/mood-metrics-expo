export default auth_reducer = (state = {}, action) => {
  switch(action.type) {
    case 'ON_AUTH':
      return {
        ...state,
        id: action.id
      }
    default:
      return state;
  }
}
