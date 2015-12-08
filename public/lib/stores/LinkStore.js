import {EventEmitter} from "events";
import AppDispatcher from "../AppDispatcher";
import {ActionTypes} from "../Constants";

let _links = [];
class LinkStore extends EventEmitter{
  constructor(props) {
    super(props);
    AppDispatcher.register(action => {
      switch (action.actionType) {
        case ActionTypes.RECEIVE_LINKS:
          console.log("4. We recieved news about the new data", action);
          _links = action.links;
          this.emit("CHANGE")
          break;
        case ActionTypes.RECIEVE_ONE_LINK:
          console.log("4. We recieved new Link saved", action);
          _links.push(action.link);
          this.emit("CHANGE");
        default:
          //doNothing
      }
    })
  }

  getAll() {
    return _links.map(link => {
      link.url = link.url.startsWith("http") ? link.url :
                  `http://${link.url}`;
      link.safe = link.url.startsWith("https");
      link.favs = link.favs || [];
      return link;
    });
  }

  startListening(callback) {
    this.on("CHANGE", callback)
  }
  stopListening(callback) {
    this.removeListener("CHANGE", callback)
  }

}

export default new LinkStore();
