import React, { PropTypes } from 'react'
import LinkActions from "../actions/LinkActions"
import IpStore from "../stores/IpStore";

class Link extends React.Component {
  deleteBookmark() {
    LinkActions.deleteBookmark(this.props.link.id);
  }
  toggleFavBookmark() {
    LinkActions.toggleFavBookmark(this.props.link.id);
  }
  render () {
    let ip = IpStore.getMyIp();
    let { title, url, safe, favs } = this.props.link;
    let starType = (favs.indexOf(ip) != -1) ? "fa fa-star" : "fa fa-star-o";
    console.log("favs", favs);
    return (
      <div className="link">
        <a className="favButton">
          <i className={starType} onClick={this.toggleFavBookmark.bind(this)}>FAV</i>
        </a>
        <a href={url}
           target="_blank"
           style={ { color: (safe ? "green" : "black") } }>
          {title}
        </a>
        <a className="deleteButton">
          <i className="fa fa-trash-o" onClick={this.deleteBookmark.bind(this)}>DEL</i>
        </a>
      </div>
    )
  }
}

export default Link;
