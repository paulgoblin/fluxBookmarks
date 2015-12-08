import {EventEmitter} from "events";
import AppDispatcher from "../AppDispatcher";
import {ActionTypes} from "../Constants";

let _myIp = null;
class IpStore extends EventEmitter{
  constructor(props) {
    super(props);
    AppDispatcher.register(action => {
      if (_myIp != null) return;
      switch (action.actionType) {
        case ActionTypes.RECIEVE_MYIP:
          _myIp = action.myIp;
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
    this.on("FIRSTCONTACT", callback)
  }
  stopListening(callback) {
    this.removeListener("FIRSTCONTACT", callback)
  }

}

export default new IpStore();
