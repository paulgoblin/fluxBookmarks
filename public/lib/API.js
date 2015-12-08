import {get, post} from "jquery"
import ServerActions from "./actions/ServerActions"

let API = {
  toggleFavBookmark(id) {
    post(`/api/links/fav/${id}`).done( data => {
      ServerActions.recieveLinks(data.links)
    })
  },
  deleteBookmark(id){
    post(`/api/links/delete/${id}`).done( data => {
      ServerActions.recieveLinks(data.links)
    });
  },
  saveBookmark(newBookmark) {
    post('/api/links', newBookmark).done( data => {
      ServerActions.recieveOneLink(data)
    })
  },
  fetchAllBookmarks() {
    get('/api/links').done( data => ServerActions.recieveLinks(data.links, data.yourIp) );
  }
}

export default API;
