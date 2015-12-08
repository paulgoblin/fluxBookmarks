import API from '../API';

let LinkActions = {
  getAllBookmarks(){
    API.fetchAllBookmarks();
  },
  saveBookmark(bookmark){
    API.saveBookmark(bookmark);
  },
  deleteBookmark(id){
    API.deleteBookmark(id);
  },
  toggleFavBookmark(id){
    API.toggleFavBookmark(id);
  }
};

export default LinkActions;
