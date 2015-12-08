import {EventEmitter} from "events";
import AppDispatcher from "../AppDispatcher";
import {ActionTypes} from "../Constants";

let _myIp = null;
class IpStore extends EventEmitter{
  constructor(props) {
    super(props);
    AppDispatcher.register(action => {
      console.log("action in IPS",action);
      if (_myIp != null) return;
      console.log('got ip for the first time', action);
      switch (action.actionType) {
        case ActionTypes.RECEIVE_LINKS:
          _myIp = action.myIp;
          this.emit("IP_RECIEVED");
          console.log('set my ip to ', _myIp);
          break;
        default:
          //doNothing
      }
    })
  }

  getMyIp(){
    return _myIp;
  }

  startListening(callback) {
    this.on("IP_RECIEVED", callback)
  }
  stopListening(callback) {
    this.removeListener("IP_RECIEVED", callback)
  }

}

export default new IpStore();
