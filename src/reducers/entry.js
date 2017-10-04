export default entry_reducer = (state = {}, action) => {
  console.log(state);
  switch(action.type) {
    case 'NEW_ENTRY':
      return {
        datetime: action.datetime,
        mood: action.mood,
        value: action.value
      }
    default:
      return state;
  }
}
