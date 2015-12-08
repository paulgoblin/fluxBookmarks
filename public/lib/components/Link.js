import React, { PropTypes } from 'react'
import LinkActions from "../actions/LinkActions"
import IpStore from "../stores/IpStore";

let _getAppIp = () => {
  console.log("iip", IpStore.getMyIp());
  return { ip: IpStore.getMyIp() }
}

class Link extends React.Component {
  constructor(props) {
    super(props);
    this.state = _getAppIp();
    this._onRecievedIp = this._onRecievedIp.bind(this);
  }
  componentDidMount() {
    IpStore.startListening(this._onRecievedIp);
  }
  componentWillUnmount() {
    IpStore.stopListening(this._onRecievedIp);
  }
  _onRecievedIp() {
    this.setState(_getAppIp());
  }
  deleteBookmark() {
    LinkActions.deleteBookmark(this.props.link.id);
  }
  toggleFavBookmark() {
    LinkActions.toggleFavBookmark(this.props.link.id);
  }
  render () {
    let ip = this.state.ip;
    let { title, url, safe, favs } = this.props.link;
    let starType = (favs.indexOf(ip) != -1) ? "fa fa-star" : "fa fa-star-o";
    console.log("my ip", ip, favs);
    return (
      <div className="link">
        <a className="favButton">
          <i className={starType} onClick={this.toggleFavBookmark.bind(this)}></i>
        </a>
        <a href={url}
           target="_blank"
           style={ { color: (safe ? "green" : "black") } }>
          {title}
        </a>
        <a className="deleteButton">
          <i className="fa fa-trash-o" onClick={this.deleteBookmark.bind(this)}></i>
        </a>
        <span className="likes">Likes: {favs.length}</span>
      </div>
    )
  }
}

export default Link;
