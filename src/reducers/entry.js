export default entry_reducer = (state = {}, action) => {
  switch(action.type) {
    case 'NEW_ENTRY':
      return {
        datetime: action.datetime,
        mood: action.mood
      }
    default:
      return state;
  }
}
