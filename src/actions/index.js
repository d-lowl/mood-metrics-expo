export const setState = n => {
  return {
    type: 'SET_SIMPLE_STATE',
    n
  }
}

export const newEntry = (datetime,mood) => {
  return {
    type: 'NEW_ENTRY',
    datetime,
    mood
  }
}

export const onAuth = (id) => {
  return {
    type: 'ON_AUTH',
    id
  }
}
