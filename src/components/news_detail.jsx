import React, {Component} from 'react'

class NewsDetail extends Component {
  render() {
    return (
      <div>
        news_detail...{this.props.params.news_id}
      </div>
    )
  }
}

export default NewsDetail