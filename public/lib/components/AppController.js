import React from "react";
import List from "./List";
import Form from "./Form";

import LinkActions from "../actions/LinkActions";

import LinkStore from "../stores/LinkStore";
import IpStore from "../stores/IpStore";

let _getAppState = () => {
  return { bookmarks: LinkStore.getAll() }
}

class AppController extends React.Component {
  constructor(props) {
    super(props);
    this.state = _getAppState();
    this._onChange = this._onChange.bind(this);
  }
  componentDidMount() {
    LinkActions.getAllBookmarks();
    LinkStore.startListening(this._onChange);
  }
  componentWillUnmount() {
    LinkStore.stopListening(this._onChange);
  }
  _onChange() {
    this.setState(_getAppState());
  }
  render() {
    return (
      <div className="app">
        <h2>Bookmarks!</h2>
        <Form />
        <List bookmarks={this.state.bookmarks} />
        <div>Number of bookmarks: {this.state.bookmarks.length}</div>
      </div>
    );
  }
}

export default AppController;
