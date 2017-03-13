import React,{Component} from 'react'
import {Link} from 'react-router'

export default class NewsDetail extends Component{
    render (){
        return(
            <div>
                <h2>我是新闻详情</h2>
                <p>{this.props.params.newsId}</p>
            </div>
        )
    }
}