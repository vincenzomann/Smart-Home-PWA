const initState = {
  sysError: null,
  userID: null,
  light: {
    value: null
  },
  temperature: {
    reading: null,
    target: null
  },
  pulse: {
    connected: null,
    maxValue: null,
    minValue: null,
    reading: null
  },
  contacts: [],
  alerts: [],
}

const systemReducer = (state = initState, action) => {
  // handle dispatch actions
  switch(action.type){
    case 'CREATE_SYSTEM_SUCCESS':
      console.log('create system success\n');
      return {
        ...state,
        sysError: null
      }
    case 'CREATE_SYSTEM_ERROR':
      console.log('create system error', action.err);
      return {
        ...state,
        sysError: 'create system failed'
      }
    
    default:
      return state;
  }
}

export default systemReducer;