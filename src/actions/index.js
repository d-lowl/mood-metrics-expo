export const setState = n => {
  return {
    type: 'SET_SIMPLE_STATE',
    n
  }
}

export const newEntry = (datetime,mood,value) => {
  return {
    type: 'NEW_ENTRY',
    datetime,
    mood,
    value
  }
}
