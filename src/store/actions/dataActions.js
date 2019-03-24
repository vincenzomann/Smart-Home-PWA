import { rtdb } from '../../config/fbConfig'

export const fetchSystemData = () => {
  return (dispatch) => {
    // TO DO - get specific system for user
    rtdb.child('system1').on('value', snapshot => {
      dispatch({
        type: 'FETCH_SYSTEM_DATA',
        payload: snapshot.val()
      })
    })
  }
}

export const updateLight = (btnID) => {
  return (dispatch) => {
    if(btnID === 'btnLed1On'){
      rtdb.child('system1').update({led1: true})
    }
    if(btnID === 'btnLed1Off'){
      rtdb.child('system1').update({led1: false})
    }
    if(btnID === 'btnLed2On'){
      rtdb.child('system1').update({led2: true})
    }
    if(btnID === 'btnLed2Off'){
      rtdb.child('system1').update({led2: false})
    }
    if(btnID === 'btnLed3Off'){
      rtdb.child('system1').update({led3: false})
    }

    // then( () => {
    //   dispatch({
    //     type: 'LIGHT_UPDATED'
    //   })
    // })
  }
}