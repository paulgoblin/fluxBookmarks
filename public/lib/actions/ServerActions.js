import AppDispatcher from "../AppDispatcher"
import {ActionTypes} from "../Constants"

let ServerActions = {
  recieveLinks(links, myIp){
    AppDispatcher.dispatch({
      actionType: ActionTypes.RECEIVE_LINKS,
      links
    })
    AppDispatcher.dispatch({
      actionType: ActionTypes.RECIEVE_MYIP,
      myIp
    })
  },
  recieveOneLink(link){
    AppDispatcher.dispatch({
      actionType: ActionTypes.RECIEVE_ONE_LINK,
      link
    })
  }
};

export default ServerActions;
