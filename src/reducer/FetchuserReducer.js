import {FETCHUSER} from '../constants'

export function FetchuserReducer (state={},action){
	switch (action.type){
	    case FETCHUSER.FETCHUSER :
	      return {
            items: [...state, action.payload]
	      }
	     case FETCHUSER.FETCH_USER_SUCCESS :
	      return {
            users: [action.user]
	      }
        default :
        return state
	}
}