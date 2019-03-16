const initState = {
  dataError: null
}

const dataReducer = (state = initState, action) => {
  // handle dispatch actions
  switch(action.type){
    case 'FETCH_SYSTEM_DATA':
      return action.payload
    case 'LIGHT_UPDATED':
      return state
    default:
      return state;
  }
}

export default dataReducer;