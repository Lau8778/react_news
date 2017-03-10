import React, {Component} from 'react'
import {Link} from 'react-router'

class NewsContainer extends Component {

  render() {
    return (
      <div>
        <p><Link to={`/news_detail/${1}`}>新闻1</Link></p>
        <p><Link to={`/news_detail/${2}`}>新闻2</Link></p>
        <br/>
        <p><Link to='/user_center'>个人中心</Link></p>
        news_container...
      </div>
    )
  }
}

export default NewsContainer