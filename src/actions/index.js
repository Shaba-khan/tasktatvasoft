import {FETCHUSER} from '../constants'
import axios from 'axios';

const url='https://randomuser.me/api/?results=1000'

 function fetchaction(){
  return(dispatch) => {
    axios.get(url)
      .then((response)=>{ console.log(response); dispatch(success(response)) })
      .catch((response)=>{return Promise.reject(response)} )
  }
  function success(user) { return {type:FETCHUSER.FETCH_USER_SUCCESS, user}}
}

export default fetchaction